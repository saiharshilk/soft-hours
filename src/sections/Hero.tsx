"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { FlowerFrame } from "@/components/FlowerWindow";
import { ImageSlot } from "@/components/ImageSlot";
import { MountainDefs, RIDGES } from "@/components/Illustration";
import { StatusLine } from "@/components/StatusLine";

/** The view through the window: layered ink-wash ridges drifting at different speeds. */
function MountainScene({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const reduce = useReducedMotion();
  const far = useTransform(progress, [0, 1], [0, -18]);
  const mid = useTransform(progress, [0, 1], [0, -36]);
  const near = useTransform(progress, [0, 1], [0, -62]);
  const shore = useTransform(progress, [0, 1], [0, -90]);
  const id = "hero-mtn";
  const layer = (d: string, k: string, y: typeof far) => (
    <m.path d={d} fill={`url(#${id}-${k})`} style={reduce ? undefined : { y }} />
  );
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <MountainDefs id={id} />
      <rect width="400" height="500" fill={`url(#${id}-sky)`} />
      <rect width="400" height="500" fill={`url(#${id}-sun)`} />
      {layer(RIDGES.far, "far", far)}
      {layer(RIDGES.mid, "mid", mid)}
      {layer(RIDGES.near, "near", near)}
      {layer(RIDGES.shore, "shore", shore)}
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-24 md:px-10 md:pb-36 md:pt-36 lg:px-16"
    >
      <div className="grid items-end gap-y-12 md:grid-cols-12 md:gap-x-8">
        {/* Window + hanging-scroll name */}
        <div className="mist-in relative flex items-start justify-end gap-5 md:order-2 md:col-span-6 md:col-start-7 md:gap-8">
          <FlowerFrame className="aspect-square w-[78%] max-w-[560px] md:w-full">
            <ImageSlot
              slot={site.hero.image}
              sizes="(min-width: 768px) 45vw, 78vw"
              priority
              fallback={<MountainScene progress={scrollYProgress} />}
            />
          </FlowerFrame>
          <p
            lang="zh-Hant"
            className="vertical font-zh text-[1.5rem] font-normal leading-none tracking-[0.42em] text-ink md:text-[2rem]"
          >
            {site.name.zh}
          </p>
        </div>

        {/* Words */}
        <div className="md:order-1 md:col-span-5 md:pb-6">
          <h1
            id="hero-title"
            className="mist-in font-display text-[3.25rem] font-light leading-[0.98] tracking-[-0.01em] text-ink sm:text-[4.25rem] md:text-[3.75rem] lg:text-[5rem] xl:text-[5.75rem]"
            style={{ animationDelay: "300ms" }}
          >
            {site.hero.headline.map((line) => (
              <span key={line.en} className="block whitespace-nowrap">
                {t(line)}
              </span>
            ))}
          </h1>
          <div className="mist-in" style={{ animationDelay: "650ms" }}>
            <p className="mt-8 max-w-[24rem] text-[0.9375rem] leading-[1.8] text-ink-soft md:mt-10">
              {t(site.hero.subline)}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a href="#visit" className="group inline-flex items-center gap-4 font-display text-[1.25rem] tracking-[0.03em] text-ink">
                <span aria-hidden="true" className="h-px w-10 bg-ink transition-[width] duration-1000 ease-[var(--ease-soft)] group-hover:w-16" />
                {t(site.hero.cta)}
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-[0.8125rem] tracking-[0.03em] text-ink-soft"
              >
                {site.instagram.handle}
              </a>
            </div>
            <StatusLine className="mt-10 text-[0.75rem] tracking-[0.02em] text-ink-soft md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
