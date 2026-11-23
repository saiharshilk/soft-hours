"use client";

import { useEffect, useState } from "react";
import { statusLine } from "@/lib/hours";

/** Live open/closed line in America/New_York time. Empty until mounted. */
export function StatusLine({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const update = () => setText(statusLine());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={`inline-flex min-h-[1.5em] items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full bg-wood transition-opacity duration-1000 ${text ? "opacity-100" : "opacity-0"}`}
      />
      <span
        aria-live="polite"
        className={`transition-opacity duration-1000 ${text ? "opacity-100" : "opacity-0"}`}
      >
        {text}
      </span>
    </span>
  );
}
