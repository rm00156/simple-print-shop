"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { Button } from "./Button";

/*
  Click-to-load Google Map. The embed sets Google's own cookies the moment it loads,
  and those aren't strictly necessary, so UK cookie law wants the visitor's say-so
  first. Nothing is fetched from Google until the button is pressed — the placeholder
  carries the address, so a visitor who never loads the map still knows where we are.
*/
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={site.mapEmbedUrl}
        title={`${site.name} location on Google Maps`}
        className="block h-[260px] w-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-[260px] flex-col items-center justify-center gap-3 bg-surface-1 px-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-teal">
        <MapPin size={20} aria-hidden="true" />
      </span>
      <p className="max-w-xs text-sm leading-[1.6] text-ink-2">
        {site.address.full}
      </p>
      <Button variant="outline" size="sm" onClick={() => setLoaded(true)}>
        Show map
      </Button>
      <p className="max-w-xs text-[11px] leading-[1.5] text-ink-3">
        Loads Google Maps, which may set cookies.{" "}
        <a href="/cookies#google-maps" className="underline hover:text-ink">
          Cookie policy
        </a>
      </p>
    </div>
  );
}
