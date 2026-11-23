import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

// Three blocks, set down the page like inscriptions on a hand scroll.
const placement = [
  "md:col-span-4 md:col-start-1",
  "md:col-span-4 md:col-start-6 md:mt-28",
  "md:col-span-3 md:col-start-10 md:mt-56",
];

export function Philosophy() {
  const p = site.philosophy;
  return (
    <section aria-labelledby="philosophy-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-16">
      <h2 id="philosophy-title" className="sr-only">
        {t(p.title)}
      </h2>
      <div className="grid gap-y-20 md:grid-cols-12 md:gap-x-8">
        {p.blocks.map((b, i) => (
          <Reveal key={b.title.en} className={placement[i]} delay={i * 0.12}>
            <div className="flex items-baseline gap-4">
              <Seal char={b.seal} />
              <h3 className="font-display text-[1.75rem] font-light leading-none md:text-[2rem]">{t(b.title)}</h3>
            </div>
            <p className="mt-6 max-w-[21rem] text-ink-soft">{t(b.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
