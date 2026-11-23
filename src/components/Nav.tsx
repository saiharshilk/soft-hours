"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { StatusLine } from "./StatusLine";
import { Seal } from "./Seal";

function Wordmark() {
  return (
    <a href="#top" className="group relative inline-block pb-2" aria-label={`${t(site.name)}, back to top`}>
      <span className="neon-word font-display text-[1.45rem] font-normal leading-none tracking-[0.06em] text-ink">
        {t(site.name)}
      </span>
      {/* The single neon line, drawing itself in once on load. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 4"
        preserveAspectRatio="none"
        className="absolute -bottom-0.5 left-0 h-[4px] w-full overflow-visible"
      >
        <path d="M0 2 L100 2" pathLength={1} className="neon-line neon-draw" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/85 backdrop-blur-[6px]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10 lg:px-16">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-display text-[1.125rem] tracking-[0.04em] text-ink transition-opacity duration-700 hover:opacity-60">
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
          <StatusLine className="min-w-[13rem] justify-end text-[0.75rem] tracking-[0.02em] text-ink-soft" />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 p-2 font-display text-[1.125rem] tracking-[0.04em] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>

      {/* Outside the header: its backdrop-filter would trap a fixed child. */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Main">
              <ul className="space-y-5">
                {site.nav.map((item, i) => (
                  <li key={item.href}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-[2.5rem] font-light leading-tight text-ink"
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto flex items-end justify-between gap-6 text-[0.8125rem] text-ink-soft">
              <div className="space-y-1">
                <StatusLine />
                <p>{t(site.address.line)}</p>
                <a className="link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  {site.instagram.handle}
                </a>
              </div>
              <span lang="zh-Hant" className="vertical font-zh text-[1.25rem] tracking-[0.3em] text-ink">
                {site.name.zh}
              </span>
            </div>
            <Seal char="閑" className="absolute right-5 top-28" />
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
