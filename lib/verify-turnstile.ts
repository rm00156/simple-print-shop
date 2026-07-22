const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: "config_error" | "verify_failed" | "verify_request_failed" };

export async function verifyTurnstileToken(token: string, remoteIp: string): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile verification skipped: TURNSTILE_SECRET_KEY is not set");
    return { ok: false, reason: "config_error" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error("Turnstile siteverify request failed", res.status);
      return { ok: false, reason: "verify_request_failed" };
    }

    const data: SiteverifyResponse = await res.json();
    if (!data.success) {
      console.error("Turnstile verification rejected", data["error-codes"]);
      return { ok: false, reason: "verify_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("Turnstile siteverify request threw", err);
    return { ok: false, reason: "verify_request_failed" };
  }
}
