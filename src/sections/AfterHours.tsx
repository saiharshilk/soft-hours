import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

export function AfterHours() {
  const a = site.afterHours;
  return (
    <section aria-labelledby="after-title" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-y-16 px-5 py-28 md:grid-cols-12 md:gap-x-8 md:px-10 md:py-44 lg:px-16">
        <Reveal className="md:col-span-5 md:col-start-2">
          <SectionTitle seal="閑" id="after-title" tone="paper">
            {t(a.title)}
          </SectionTitle>
          <p className="mt-10 max-w-[26rem] font-display text-[1.875rem] font-light leading-[1.3] text-paper md:text-[2.375rem]">
            {t(a.body)}
          </p>
          <p className="mt-8 text-[0.875rem] text-celadon">{t(a.detail)}</p>
        </Reveal>

        {/* The one glowing line: a neon tube bending like a distant ridge. */}
        <div className="relative md:col-span-5 md:col-start-8">
          <svg viewBox="0 0 400 220" className="h-auto w-full overflow-visible" aria-hidden="true">
            <path
              d="M6 168 C60 166 84 120 120 112 C156 104 170 150 206 146 C246 142 262 64 304 58 C342 52 362 96 394 102"
              pathLength={1}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="neon-line"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
