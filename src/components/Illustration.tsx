import type { FallbackKind } from "@/content/site";
import { FLOWER_PATH } from "./FlowerWindow";

/**
 * Illustrated stand-ins for photos: ink-wash, celadon, wood.
 * Very low contrast on purpose. They should read as quiet paintings,
 * not as "image missing".
 */

export const RIDGES = {
  far: "M0 262 C30 236 52 228 78 244 C104 258 120 214 150 206 C182 198 196 236 226 238 C256 240 272 196 304 192 C338 188 360 226 400 218 V520 H0Z",
  mid: "M0 318 C36 290 70 300 96 312 C124 326 150 280 188 284 C226 288 236 322 270 318 C304 314 330 286 362 292 C382 296 392 304 400 300 V520 H0Z",
  near: "M0 372 C44 352 82 360 120 374 C160 388 190 350 236 352 C282 354 300 384 340 380 C368 378 386 368 400 366 V520 H0Z",
  shore: "M0 430 C60 418 120 426 180 432 C250 440 320 424 400 428 V520 H0Z",
};

export function MountainDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e9e6dc" />
        <stop offset="0.55" stopColor="#dde6df" />
        <stop offset="1" stopColor="#c9d8d2" />
      </linearGradient>
      <radialGradient id={`${id}-sun`} cx="0.68" cy="0.3" r="0.45">
        <stop offset="0" stopColor="#fbf8f1" stopOpacity="0.95" />
        <stop offset="1" stopColor="#fbf8f1" stopOpacity="0" />
      </radialGradient>
      {(
        [
          ["far", "#9fb7af", 0.38],
          ["mid", "#7f9c93", 0.42],
          ["near", "#5c766d", 0.42],
          ["shore", "#3a4a43", 0.4],
        ] as const
      ).map(([k, c, o]) => (
        <linearGradient key={k} id={`${id}-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity={o} />
          <stop offset="0.5" stopColor={c} stopOpacity={o * 0.45} />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      ))}
    </defs>
  );
}

function Mountains({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <MountainDefs id={id} />
      <rect width="400" height="500" fill={`url(#${id}-sky)`} />
      <rect width="400" height="500" fill={`url(#${id}-sun)`} />
      <path d={RIDGES.far} fill={`url(#${id}-far)`} />
      <path d={RIDGES.mid} fill={`url(#${id}-mid)`} />
      <path d={RIDGES.near} fill={`url(#${id}-near)`} />
      <path d={RIDGES.shore} fill={`url(#${id}-shore)`} />
    </svg>
  );
}

function Beams({ id }: { id: string }) {
  const beams = [
    [40, 26],
    [128, 20],
    [200, 15],
    [258, 11],
    [302, 8],
    [336, 6],
  ];
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ddd3c3" />
          <stop offset="1" stopColor="#ebe5d9" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a4f" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#8a6a4f" stopOpacity="0.32" />
          <stop offset="1" stopColor="#8a6a4f" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="0.75" cy="0.85" r="0.6">
          <stop offset="0" stopColor="#fbf8f1" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fbf8f1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      {beams.map(([y, h]) => (
        <rect key={y} x="0" y={y} width="400" height={h} fill={`url(#${id}-beam)`} />
      ))}
      <line x1="0" y1="372" x2="400" y2="372" stroke="#8a6a4f" strokeOpacity="0.18" />
      <rect width="400" height="500" fill={`url(#${id}-light)`} />
    </svg>
  );
}

function WindowLight({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4dccd" />
          <stop offset="1" stopColor="#d6cdbc" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-wall)`} />
      <g transform="translate(110 70) scale(210 250) skewX(-8)" filter={`url(#${id}-soft)`}>
        <path d={FLOWER_PATH} fill="#fbf8f1" opacity="0.85" />
      </g>
      <g transform="translate(110 70) scale(210 250) skewX(-8)">
        <path d={FLOWER_PATH} fill="#dfe8e3" opacity="0.35" />
      </g>
    </svg>
  );
}

function Neon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#ff9e8a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ff9e8a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="#1f2622" />
      <rect width="300" height="400" fill={`url(#${id}-halo)`} />
      <path
        className="neon-line"
        d="M70 250 C70 170 120 120 160 140 C205 162 170 230 130 214 C96 200 118 150 170 150 C228 150 236 236 196 270"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Tea({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-table`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b59a80" />
          <stop offset="1" stopColor="#9c7f64" />
        </linearGradient>
        <radialGradient id={`${id}-bowl`} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#d6e3de" />
          <stop offset="1" stopColor="#a9c0b8" />
        </radialGradient>
        <radialGradient id={`${id}-liquor`} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#c99a62" stopOpacity="0.85" />
          <stop offset="1" stopColor="#8f5f35" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-table)`} />
      {[60, 120, 180, 240].map((y) => (
        <path key={y} d={`M0 ${y} C120 ${y - 6} 260 ${y + 6} 400 ${y - 2}`} stroke="#6b5440" strokeOpacity="0.12" fill="none" />
      ))}
      <ellipse cx="178" cy="156" rx="82" ry="80" fill="#1f2622" opacity="0.08" />
      <circle cx="172" cy="148" r="78" fill={`url(#${id}-bowl)`} />
      <circle cx="172" cy="148" r="56" fill={`url(#${id}-liquor)`} />
      <circle cx="172" cy="148" r="56" fill="none" stroke="#f2ede3" strokeOpacity="0.35" />
      <circle cx="300" cy="96" r="30" fill={`url(#${id}-bowl)`} />
      <circle cx="300" cy="96" r="20" fill={`url(#${id}-liquor)`} />
    </svg>
  );
}

function Straw({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ece6da" />
          <stop offset="1" stopColor="#dcd3c2" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#dbe6e1" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${id}-tea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2a873" stopOpacity="0.55" />
          <stop offset="1" stopColor="#a8723f" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      <rect x="0" y="380" width="400" height="120" fill="#8a6a4f" opacity="0.16" />
      <ellipse cx="200" cy="384" rx="70" ry="8" fill="#1f2622" opacity="0.08" />
      <path d="M140 220 L148 380 Q200 392 252 380 L260 220 Z" fill={`url(#${id}-tea)`} />
      <path d="M140 180 L148 380 Q200 392 252 380 L260 180 Z" fill={`url(#${id}-glass)`} stroke="#8a6a4f" strokeOpacity="0.25" />
      <ellipse cx="200" cy="180" rx="60" ry="7" fill="none" stroke="#8a6a4f" strokeOpacity="0.3" />
      {/* the tiny straw */}
      <line x1="214" y1="232" x2="226" y2="160" stroke="#1f2622" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Illustration({ kind, id }: { kind: FallbackKind; id: string }) {
  switch (kind) {
    case "mountains":
      return <Mountains id={id} />;
    case "beams":
      return <Beams id={id} />;
    case "window-light":
      return <WindowLight id={id} />;
    case "neon":
      return <Neon id={id} />;
    case "tea":
      return <Tea id={id} />;
    case "straw":
      return <Straw id={id} />;
  }
}
