import type { ReactNode } from "react";

/**
 * The begonia (海棠) window of a Suzhou garden: four overlapping lobes with
 * small cusps between them. Drawn in a 0–1 box so it can be used as an
 * objectBoundingBox clip path and stretched to any frame.
 *
 * Each lobe is an arc of radius .28 centred .22 from the middle; neighbouring
 * lobes meet at (.5 ± .2746, .5 ± .2746).
 */
export const FLOWER_PATH =
  "M0.7746 0.2254 A0.28 0.28 0 0 1 0.7746 0.7746 A0.28 0.28 0 0 1 0.2254 0.7746 A0.28 0.28 0 0 1 0.2254 0.2254 A0.28 0.28 0 0 1 0.7746 0.2254 Z";

/** Rendered once in the layout; referenced with clip-path: url(#flower-window). */
export function FlowerClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <clipPath id="flower-window" clipPathUnits="objectBoundingBox">
          <path d={FLOWER_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/** A thin outline of the window, laid over a clipped image like a carved frame. */
export function FlowerOutline({
  className = "",
  inset = 0,
}: {
  className?: string;
  inset?: number;
}) {
  // A positive inset draws the outline slightly outside the clipped image.
  const s = 1 - inset * 2;
  return (
    <svg
      viewBox={`${inset} ${inset} ${s} ${s}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
    >
      <path
        d={FLOWER_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Clips its children to the flower window, with an offset outline frame. */
export function FlowerFrame({
  children,
  className = "",
  outline = true,
}: {
  children: ReactNode;
  className?: string;
  outline?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0" style={{ clipPath: "url(#flower-window)" }}>
        {children}
      </div>
      {outline && <FlowerOutline inset={0.025} className="text-wood/50" />}
    </div>
  );
}
