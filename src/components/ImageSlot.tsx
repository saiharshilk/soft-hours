"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { ImageSlot as Slot } from "@/content/site";
import { t } from "@/lib/i18n";
import { Illustration } from "./Illustration";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * A photo slot. Shows /public/images/<file> when `available` is true,
 * otherwise (or if the file fails to load) an illustrated fallback.
 * Fills its parent; the parent sets size / aspect ratio.
 */
export function ImageSlot({
  slot,
  sizes,
  priority = false,
  fallback,
}: {
  slot: Slot;
  sizes: string;
  priority?: boolean;
  /** Optional custom fallback (e.g. the parallax hero scene). */
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const id = `ill-${slot.file.replace(/\W+/g, "-")}`;

  if (!slot.available || failed) {
    return (
      // The illustration is decorative; it is not the photo the alt describes.
      <div aria-hidden="true" className="absolute inset-0">
        {fallback ?? <Illustration kind={slot.fallback} id={id} />}
      </div>
    );
  }

  return (
    <Image
      src={`${base}/images/${slot.file}`}
      alt={t(slot.alt)}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
