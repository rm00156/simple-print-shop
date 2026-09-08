"use client";

import { useSyncExternalStore } from "react";

// The year cannot change in a way we need to react to during a session, so there is
// nothing to subscribe to. Both callbacks are module-level so their identity is stable.
const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();

/**
 * Renders the build year into the static HTML, then the real year on the client.
 *
 * Under `output: "export"` there is no server to re-render the page, so a bare
 * `new Date().getFullYear()` in the footer would freeze at whenever the site was
 * last deployed. useSyncExternalStore is the sanctioned way to render one value
 * during hydration and another afterwards: React uses the server snapshot to
 * hydrate, so there is no mismatch, then swaps to the client snapshot.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, getCurrentYear, () => fallback);
  return <>{year}</>;
}
