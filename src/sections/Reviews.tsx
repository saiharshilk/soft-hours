"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

const INTERVAL = 9000;

export function Reviews() {
  const r = site.reviews;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  // Don't auto-advance for people who prefer reduced motion, unless they press Play.
  const playing = userPaused === null ? !reduce : !userPaused;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % r.items.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, r.items.length]);

  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40 lg:px-16">
      <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-3">
          <SectionTitle seal="柔" id="reviews-title">
            {t(r.title)}
          </SectionTitle>
          <p className="mt-8 text-[0.875rem] text-ink-soft">
            {site.rating.value} on {t(site.rating.source)} · {site.rating.count} reviews
          </p>
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-3 inline-block text-[0.875rem] text-ink"
          >
            {t(r.readMore)}
          </a>
        </Reveal>

        <div className="md:col-span-8 md:col-start-5">
          {/* All quotes share one grid cell so the height never jumps. */}
          <div className="grid">
            {r.items.map((item, i) => {
              const on = i === active;
              return (
                <figure
                  key={item.author}
                  aria-hidden={!on}
                  className={`col-start-1 row-start-1 transition-[opacity,filter] duration-[1600ms] ease-[var(--ease-soft)] ${
                    on ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[3px]"
                  }`}
                >
                  <blockquote className="font-display text-[1.625rem] font-light leading-[1.4] text-ink md:text-[2.375rem] md:leading-[1.35]">
                    <p>
                      <span aria-hidden="true">“</span>
                      {t(item.quote)}
                      <span aria-hidden="true">”</span>
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 text-[0.8125rem] tracking-[0.03em] text-ink-soft">
                    {item.author}, {t(r.label)}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-8 text-[0.8125rem] text-ink-soft">
            <div className="flex gap-3" role="group" aria-label="Choose review">
              {r.items.map((item, i) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Review by ${item.author}`}
                  aria-pressed={i === active}
                  className="grid h-6 w-6 place-items-center"
                >
                  <span
                    className={`block h-px transition-all duration-1000 ${i === active ? "w-6 bg-ink" : "w-3 bg-wood/60"}`}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setUserPaused(playing)} className="link">
              {playing ? t(r.pause) : t(r.play)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
