#!/bin/bash
# Creates (or updates) the WAF rate-limiting rule on /api/*.
#
# WHY THIS EXISTS
# The Worker's FORM_LIMITER binding is documented in lib/handlers/shared.ts as
# eventually consistent and deliberately permissive: measured on the deployed Worker
# it let a small burst through before the counter caught up. That makes it defence in
# depth, not a control. This rule is the enforcement layer. Rate limiting rules run in
# the http_ratelimit phase, which is a security phase and therefore executes BEFORE
# Workers — so blocked floods cost zero Worker invocations and never touch the
# 100k/day free budget the whole setup is built around.
#
# STATUS: the rule below is already deployed. It was created by hand in the dashboard,
# so this script is here to document why it exists and to restore or re-tune it, not
# because anything is outstanding. Running it is idempotent — it replaces the phase's
# rules, and Free allows exactly one.
#
# Verified on the live zone after deployment: ten rapid GETs to /api/quote returned
# 405,405,405,405,405 then 429,429,429,429,429 — so five pass through to the Worker and
# the rest are blocked at the edge. Every static page still returned 200 while that IP
# was mitigated, confirming the match is scoped to /api/ and cannot take the site down,
# and /api/quote answered 405 again once the 10s expired.
#
# Rate limiting rules only apply to traffic proxied through Cloudflare. If a record is
# ever flipped to DNS-only, the rule stops applying to it with no error anywhere.
#
# FREE PLAN CONSTRAINTS (all of these are locked, not chosen):
#   * exactly 1 rate limiting rule per zone
#   * period locked to 10s, mitigation_timeout locked to 10s
#   * the only counting characteristic is IP
#   * the action can only be `block` — managed challenge is Pro and above
#   * expressions may reference only Path and Verified Bot, and regex is not available
#     on Free, which is why the match below uses starts_with() and not matches "^/api/"
#
# Needs an API token (NOT the wrangler OAuth login, which only carries zone:read) with:
#   Zone > Zone > Read     — to resolve the zone ID
#   Zone > Zone WAF > Edit — to write the ruleset
# Create one at dash.cloudflare.com/profile/api-tokens, then:
#   CLOUDFLARE_API_TOKEN=... ./set-waf-ratelimit.sh
set -euo pipefail
cd "$(dirname "$0")"

# Threshold. Deliberately generous rather than matched to the Worker's nominal 3/min:
# this rule is the volumetric backstop, not the business limit. Turnstile, the honeypot
# and the 3s time trap remain the controls that stop individual bad submissions. With a
# 10s window counted per IP, 5 is far above anything a human produces on a two-endpoint
# form — including several people behind one office NAT — while still cutting a scripted
# flood down to 5 requests per 10 seconds at the edge.
REQUESTS_PER_PERIOD=5

# Derived from .env so this can never drift from the origin the site actually builds for.
SITE_URL=$(grep -E '^NEXT_PUBLIC_SITE_URL=' .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '"')
[ -n "${SITE_URL:-}" ] || { echo "NEXT_PUBLIC_SITE_URL not found in .env"; exit 1; }
HOSTNAME=${SITE_URL#*://}; HOSTNAME=${HOSTNAME%%/*}
# The zone is the registrable domain, not the www host the site is served on.
ZONE_NAME=$(echo "$HOSTNAME" | awk -F. '{print $(NF-1)"."$NF}')

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

echo "Zone:      $ZONE_NAME  (site: $HOSTNAME)"

ZONE=$(cf GET "/zones?name=${ZONE_NAME}" | check)
ZONE_ID=$(echo "$ZONE" | python3 -c 'import json,sys; z=json.load(sys.stdin); print(z[0]["id"] if z else "")')
if [ -z "$ZONE_ID" ]; then
  echo "No Cloudflare zone named ${ZONE_NAME} on this account."
  echo "The domain is still on its old nameservers — move it to Cloudflare first."
  exit 1
fi
STATUS=$(echo "$ZONE" | python3 -c 'import json,sys; print(json.load(sys.stdin)[0]["status"])')
echo "Zone ID:   $ZONE_ID  (status: $STATUS)"
[ "$STATUS" = "active" ] || echo "WARNING: zone is not active yet; the rule will not take effect until it is."

RULE=$(python3 -c '
import json,sys
print(json.dumps({"rules":[{
  "description": "Rate limit /api/* form endpoints (volumetric backstop; see set-waf-ratelimit.sh)",
  # POST-only would be better, but http.request.method is not an allowed field on the
  # Free plan. Harmless: the Worker already answers non-POST /api/* with a 405, and
  # anything hammering those paths with GETs is abuse worth counting anyway.
  "expression": "starts_with(http.request.uri.path, \"/api/\")",
  "action": "block",
  "ratelimit": {
    "characteristics": ["ip.src", "cf.colo.id"],
    "period": 10,
    "requests_per_period": int(sys.argv[1]),
    "mitigation_timeout": 10,
  },
}]}))' "$REQUESTS_PER_PERIOD")

echo
echo "Existing rules in the http_ratelimit phase:"
cf GET "/zones/${ZONE_ID}/rulesets/phases/http_ratelimit/entrypoint" 2>/dev/null \
  | python3 -c '
import json, sys
try:
    rules = (json.load(sys.stdin).get("result") or {}).get("rules") or []
except Exception:
    rules = []
for rule in rules:
    print("  - " + (rule.get("description") or rule.get("expression") or "?"))
if not rules:
    print("  (none)")' || echo "  (none)"

echo
echo "Applying: block when one IP exceeds ${REQUESTS_PER_PERIOD} requests to /api/* in 10s (block lasts 10s)."
# PUT on the phase entrypoint REPLACES the phase's rules. That is what we want: the
# Free plan allows exactly one rule, so re-running this updates in place instead of
# failing on a second rule.
cf PUT "/zones/${ZONE_ID}/rulesets/phases/http_ratelimit/entrypoint" "$RULE" | check >/dev/null
echo "ok    rate limiting rule deployed"
echo
echo "Verify: Security > WAF > Rate limiting rules, and watch Security Events for blocks."
