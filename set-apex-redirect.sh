#!/bin/bash
# Creates (or updates) the 301 that sends the apex domain to the www host.
#
# WHY THIS EXISTS
# Both hosts currently answer 200 with the same HTML — verified with
# `curl -I https://thebluwavegroup.com/` returning 200 rather than a redirect. The DNS
# record for the apex points at the same Pages project as www, and Pages does not do
# host canonicalisation on its own.
#
# The pages carry a self-referencing canonical pointing at www, so Google will very
# probably consolidate the two anyway. That is not the reason to fix it. The reason is
# crawl budget: while the site is sitting in "Discovered - currently not indexed" with
# 54 URLs never crawled, we are inviting Googlebot to spend its allocation discovering
# 84 duplicate URLs on a second host. A 301 costs it one cheap fetch per URL instead.
#
# It also closes the smaller holes a duplicate host opens regardless of Google: links
# and shares that pick up the wrong host, analytics split across two origins, and a
# cookie/Turnstile domain mismatch if anyone ever lands on the apex mid-form.
#
# Redirect Rules run in the http_request_dynamic_redirect phase, which executes at the
# edge BEFORE Pages/Workers — so a redirected request never reaches the site and never
# costs a Worker invocation.
#
# STATUS: not yet deployed. Run this once, then re-verify with the curl at the bottom.
#
# Redirect Rules only apply to traffic proxied through Cloudflare (orange cloud). If the
# apex record is DNS-only, this rule silently does nothing — check that first if the
# verification below still shows a 200.
#
# FREE PLAN CONSTRAINTS:
#   * 10 dynamic redirect rules per zone — this uses one, and the script preserves any
#     others rather than replacing the phase wholesale (unlike set-waf-ratelimit.sh,
#     where Free allows exactly one rule so replace-the-phase is the only option).
#
# Needs an API token (NOT the wrangler OAuth login, which only carries zone:read) with:
#   Zone > Zone > Read              — to resolve the zone ID
#   Zone > Dynamic Redirect > Edit  — to write the ruleset
# Create one at dash.cloudflare.com/profile/api-tokens, then:
#   CLOUDFLARE_API_TOKEN=... ./set-apex-redirect.sh
set -euo pipefail
cd "$(dirname "$0")"

# Derived from .env so this can never drift from the origin the site actually builds
# for — the same derivation set-waf-ratelimit.sh uses.
SITE_URL=$(grep -E '^NEXT_PUBLIC_SITE_URL=' .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '"')
[ -n "${SITE_URL:-}" ] || { echo "NEXT_PUBLIC_SITE_URL not found in .env"; exit 1; }
WWW_HOST=${SITE_URL#*://}; WWW_HOST=${WWW_HOST%%/*}
# The zone is the registrable domain, which is also the apex we redirect FROM.
ZONE_NAME=$(echo "$WWW_HOST" | awk -F. '{print $(NF-1)"."$NF}')

# Guard against pointing this at itself. If NEXT_PUBLIC_SITE_URL is ever changed to the
# apex, the rule below would redirect the apex to the apex — an infinite loop served at
# the edge, which would take the whole site down until the rule was deleted.
[ "$WWW_HOST" != "$ZONE_NAME" ] || {
  echo "NEXT_PUBLIC_SITE_URL is the apex ($ZONE_NAME), not a www host."
  echo "This script would redirect the apex to itself. Fix .env or delete this script."
  exit 1
}

[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { echo "CLOUDFLARE_API_TOKEN is not set (see header)"; exit 1; }
API="https://api.cloudflare.com/client/v4"
AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json")

cf() { # cf <method> <path> [body]
  if [ $# -ge 3 ]; then curl -sS -X "$1" "${API}$2" "${AUTH[@]}" --data "$3"
  else curl -sS -X "$1" "${API}$2" "${AUTH[@]}"; fi
}

# Fails loudly rather than letting a partial response look like success.
check() { python3 -c '
import json,sys
r=json.load(sys.stdin)
if not r.get("success"):
    print("Cloudflare API error:", json.dumps(r.get("errors"), indent=2), file=sys.stderr); sys.exit(1)
print(json.dumps(r["result"]))'; }

echo "Zone:      $ZONE_NAME  (redirecting $ZONE_NAME -> $WWW_HOST)"

ZONE=$(cf GET "/zones?name=${ZONE_NAME}" | check)
ZONE_ID=$(echo "$ZONE" | python3 -c 'import json,sys; z=json.load(sys.stdin); print(z[0]["id"] if z else "")')
if [ -z "$ZONE_ID" ]; then
  echo "No Cloudflare zone named ${ZONE_NAME} on this account."
  exit 1
fi
STATUS=$(echo "$ZONE" | python3 -c 'import json,sys; print(json.load(sys.stdin)[0]["status"])')
echo "Zone ID:   $ZONE_ID  (status: $STATUS)"
[ "$STATUS" = "active" ] || echo "WARNING: zone is not active yet; the rule will not take effect until it is."

DESCRIPTION="Redirect apex to www (301) — see set-apex-redirect.sh"

echo
echo "Existing rules in the http_request_dynamic_redirect phase:"
EXISTING=$(cf GET "/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint" 2>/dev/null \
  | python3 -c '
import json, sys
try:
    rules = (json.load(sys.stdin).get("result") or {}).get("rules") or []
except Exception:
    rules = []
print(json.dumps(rules))' || echo '[]')
echo "$EXISTING" | python3 -c '
import json, sys
rules = json.load(sys.stdin)
for rule in rules:
    print("  - " + (rule.get("description") or rule.get("expression") or "?"))
if not rules:
    print("  (none)")'

# Rebuild the phase: keep every rule that is not ours, then append ours. A PUT on the
# entrypoint replaces the phase, so anything dropped here is deleted for real — hence
# preserving the others rather than sending our rule alone.
BODY=$(echo "$EXISTING" | python3 -c '
import json, sys
apex, www, description = sys.argv[1], sys.argv[2], sys.argv[3]
rules = [r for r in json.load(sys.stdin) if r.get("description") != description]
# Strip server-assigned fields; the API rejects them on the way back in.
rules = [{k: v for k, v in r.items() if k not in ("id", "version", "last_updated", "ref")} for r in rules]
rules.append({
    "description": description,
    "expression": f'"'"'http.host eq "{apex}"'"'"',
    "action": "redirect",
    "action_parameters": {
        "from_value": {
            "status_code": 301,
            # Dynamic (not static) so the path carries over — a static redirect would
            # send every apex URL to the www homepage, which Google reads as a soft 404
            # and which would be worse than the duplicate host we are fixing.
            "target_url": {"expression": f'"'"'concat("https://{www}", http.request.uri.path)'"'"'},
            "preserve_query_string": True,
        }
    },
})
print(json.dumps({"rules": rules}))' "$ZONE_NAME" "$WWW_HOST" "$DESCRIPTION")

echo
echo "Applying: 301 https://${ZONE_NAME}/<path> -> https://${WWW_HOST}/<path> (query preserved)."
cf PUT "/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint" "$BODY" | check >/dev/null
echo "ok    redirect rule deployed"

echo
echo "Verifying (expect 301 then 200):"
curl -sS -o /dev/null -w "  %{http_code} -> %{redirect_url}\n" "https://${ZONE_NAME}/contact" || true
curl -sS -o /dev/null -w "  %{http_code} -> %{url_effective}\n" -L "https://${ZONE_NAME}/contact" || true
echo
echo "Also check: Rules > Redirect Rules in the dashboard."
