"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { fill, t } from "@/lib/i18n";
import { SOLAR_TERMS, TERMS_FROM_SPRING, seasonFor, type SeasonState } from "@/lib/solarTerms";
import { zonedNow } from "@/lib/time";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Today's date in the shop's time zone, as "YYYY-M-D". */
function shopDateKey(): string {
  const n = zonedNow(site.timeZone);
  return `${n.year}-${n.month}-${n.day}`;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60 * 60 * 1000);
  return () => window.clearInterval(id);
}

export function Season({ initial }: { initial: { year: number; month: number; day: number } }) {
  // `initial` is the build date, so the section is never empty in the HTML;
  // in the browser it switches to today's date in New York time.
  const initialKey = `${initial.year}-${initial.month}-${initial.day}`;
  const key = useSyncExternalStore(subscribe, shopDateKey, () => initialKey);
  const state: SeasonState = useMemo(() => {
    const [y, m, d] = key.split("-").map(Number);
    return seasonFor(y, m, d);
  }, [key]);
  const stripRef = useRef<HTMLOListElement>(null);

  // Keep the current term in view inside the strip (without scrolling the page).
  useEffect(() => {
    const strip = stripRef.current;
    const current = strip?.querySelector<HTMLElement>("[aria-current='true']");
    if (!strip || !current) return;
    strip.scrollLeft = current.offsetLeft - strip.clientWidth / 2 + current.clientWidth / 2;
  }, [state.index]);

  const { term, next, daysUntilNext, mode, yang } = state;
  const s = site.season;
  const tone = mode === "light" ? s.light : s.warm;
  const until =
    daysUntilNext === 1 ? t(s.tomorrow) : fill(t(s.inDays), { n: daysUntilNext });

  return (
    <section id="season" aria-labelledby="season-title" className="relative bg-paper-deep/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <Reveal className="md:col-span-4">
            <SectionTitle seal="時" id="season-title">
              {t(s.title)}
            </SectionTitle>
            <p className="mt-8 max-w-[22rem] text-ink-soft">{t(s.intro)}</p>
          </Reveal>

          {/* The current term */}
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.15}>
            <div className="flex items-start gap-8 md:gap-14">
              <p
                lang="zh-Hant"
                className="vertical shrink-0 font-kai text-[4.5rem] leading-none tracking-[0.08em] text-ink md:text-[7rem]"
                aria-hidden="true"
              >
                {term.zh}
              </p>
              <div className="pt-1">
                <p className="smallcaps text-wood-deep">{t(s.now)}</p>
                <h3 className="mt-3 font-display text-[2.25rem] font-light leading-[1.05] md:text-[3.25rem]">
                  <span lang="zh-Hant" className="sr-only">
                    {term.zh}{" "}
                  </span>
                  <span lang="zh-Latn-pinyin" className="mb-2 block font-zh text-[1.25rem] tracking-[0.06em] text-ink-soft md:text-[1.5rem]">{term.pinyin}</span>
                  <span className="block">{term.en}</span>
                </h3>
                <p className="mt-6 max-w-[26rem] font-display text-[1.375rem] leading-[1.45] text-ink">
                  {term.line}
                </p>

                <dl className="mt-10 grid max-w-[28rem] gap-8 border-t border-wood/30 pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="smallcaps text-wood-deep">{t(s.next)}</dt>
                    <dd className="mt-2">
                      <span lang="zh-Hant" className="font-zh">
                        {next.zh}
                      </span>{" "}
                      <span className="font-display text-[1.125rem]">{next.en}</span>
                      <span className="block text-[0.8125rem] text-ink-soft">{until}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="smallcaps text-wood-deep">{t(s.balance)}</dt>
                    <dd className="mt-2">
                      <span className="block font-display text-[1.125rem]">{t(tone.label)}</span>
                      <div
                        className="relative mt-4 h-[3px] w-full"
                        style={{ background: "linear-gradient(90deg, var(--celadon), var(--wood))" }}
                        role="img"
                        aria-label={`${t(tone.label)}`}
                      >
                        <span
                          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-paper"
                          style={{ left: `${(yang * 100).toFixed(1)}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[0.6875rem] tracking-[0.04em] text-ink-soft">
                        <span>{t(s.scale.light)}</span>
                        <span>{t(s.scale.warm)}</span>
                      </div>
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 max-w-[28rem] text-[0.875rem] text-ink-soft">{t(tone.body)}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* All 24 terms */}
        <div className="mt-20 md:mt-28">
          <h3 className="sr-only">{t(s.allTerms)}</h3>
          <ol
            ref={stripRef}
            className="no-scrollbar relative flex snap-x gap-0 overflow-x-auto border-y border-wood/25 py-6"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            }}
            aria-label={t(s.allTerms)}
            tabIndex={0}
          >
            {TERMS_FROM_SPRING.map((i) => {
              const term = SOLAR_TERMS[i];
              const current = i === state.index;
              return (
                <li
                  key={term.zh}
                  aria-current={current ? "true" : undefined}
                  className={`flex w-[4.75rem] shrink-0 snap-center flex-col items-center gap-3 py-3 transition-colors duration-1000 ${
                    current ? "bg-celadon/70" : ""
                  }`}
                >
                  <span
                    lang="zh-Hant"
                    className={`vertical font-zh text-[1.0625rem] leading-none tracking-[0.15em] ${
                      current ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {term.zh}
                  </span>
                  <span className="text-[0.625rem] tracking-[0.06em] text-ink-soft">
                    {MONTHS[term.month - 1]} {term.day}
                  </span>
                  <span className="sr-only">{term.en}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
