import { site, type Confection } from "@/content/site";
import { t } from "@/lib/i18n";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { FlowerOutline } from "@/components/FlowerWindow";

export function Confections() {
  const c = site.confections;
  const items: readonly Confection[] = c.items;
  return (
    <section id="confections" aria-labelledby="confections-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-16">
      <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
        <Reveal className="md:col-span-4 md:col-start-8">
          <SectionTitle seal="閑" id="confections-title">
            {t(c.title)}
          </SectionTitle>
          <p className="mt-8 text-ink-soft">{t(c.subtitle)}</p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-px bg-wood/25 sm:grid-cols-2 md:col-span-10 md:col-start-2 md:row-start-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.name.en} className="bg-paper">
              <Reveal delay={i * 0.1} className="flex h-full flex-col px-2 py-10 sm:px-8 md:min-h-[17rem] md:py-12">
                <span aria-hidden="true" className="relative block h-7 w-7 text-wood/60">
                  <FlowerOutline />
                </span>
                <h3 className="mt-auto pt-10 font-display text-[1.5rem] font-light leading-[1.15]">{t(item.name)}</h3>
                {item.description && (
                  <p className="mt-3 text-[0.875rem] text-ink-soft">{t(item.description)}</p>
                )}
                {c.showPrices && item.price && (
                  <p className="mt-3 text-[0.8125rem] tracking-[0.04em] text-wood-deep">{item.price}</p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
