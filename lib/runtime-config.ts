/**
 * Reads a configuration value in a way that works on both hosts.
 *
 * Next.js on a Node server exposes configuration through `process.env`.
 * Cloudflare Workers deliver vars and secrets as properties on the `env` object
 * handed to `fetch`, and only mirror them onto `process.env` when the runtime
 * happens to populate it. Depending on that mirroring is fragile: a deployed
 * Worker was observed with its secrets attached and `process.env` empty, which
 * failed every form submission with a misleading "send_failed".
 *
 * Checking `env` first and falling back to `process.env` works under both, and
 * needs no compatibility flag to be correct.
 */
export type ConfigSource = Record<string, unknown> | undefined;

export function readConfig(key: string, env?: ConfigSource): string | undefined {
  const fromBinding = env?.[key];
  if (typeof fromBinding === "string" && fromBinding.length > 0) return fromBinding;

  // `process` is absent in some runtimes, so this must not be assumed.
  const fromProcess =
    typeof process !== "undefined" && process.env ? process.env[key] : undefined;
  return fromProcess && fromProcess.length > 0 ? fromProcess : undefined;
}
