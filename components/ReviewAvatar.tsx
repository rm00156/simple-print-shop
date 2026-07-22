"use client";

import Image from "next/image";
import { useState } from "react";

export function ReviewAvatar({ name, photoUrl }: { name: string; photoUrl?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (photoUrl && !failed) {
    return (
      <Image
        src={photoUrl}
        alt=""
        width={36}
        height={36}
        className="size-9 shrink-0 rounded-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}
