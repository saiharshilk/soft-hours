import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

const BAR = "linear-gradient(var(--dir), var(--celadon) 0%, #c9c3a8 45%, var(--wood) 100%)";

function TeaLabel({ tea }: { tea: (typeof site.tea.items)[number] }) {
  if (tea.placeholder) {
    return <p className="font-display text-[1.0625rem] text-ink-soft">{t(site.tea.placeholderLabel)}</p>;
  }
  return (
    <div>
      {tea.name.zh && (
        <p lang="zh-Hant" className="font-zh text-[1.125rem] tracking-[0.12em] text-ink">
          {tea.name.zh}
        </p>
      )}
      <p className="font-display text-[1.375rem] leading-tight text-ink">{t(tea.name)}</p>
      {tea.kind.en && <p className="mt-1 text-[0.8125rem] text-ink-soft">{t(tea.kind)}</p>}
      {tea.notes && <p className="mt-3 max-w-[14rem] text-[0.8125rem] text-ink-soft">{t(tea.notes)}</p>}
    </div>
  );
}

export function Tea() {
  const tea = site.tea;
  const teas = [...tea.items].sort((a, b) => a.position - b.position);

  return (
    <section id="tea" aria-labelledby="tea-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-16">
      <Reveal className="md:ml-[8.333%]">
        <SectionTitle seal="柔" id="tea-title">
          {t(tea.title)}
        </SectionTitle>
        <p className="mt-8 max-w-[22rem] text-ink-soft">{t(tea.intro)}</p>
      </Reveal>

      {/* Mobile: a vertical bar, light at the top, full-bodied at the bottom. */}
      <Reveal className="mt-14 md:hidden">
        <p className="smallcaps text-wood-deep">{t(tea.ends.light)}</p>
        <ol className="relative mt-5 space-y-10 pl-10">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-[3px]"
            style={{ background: BAR.replace("var(--dir)", "180deg") }}
          />
          {teas.map((item, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-10 top-2 h-[13px] w-[13px] rounded-full border ${
                  item.placeholder ? "border-wood/60 bg-paper" : "border-ink bg-ink"
                }`}
              />
              <TeaLabel tea={item} />
            </li>
          ))}
        </ol>
        <p className="smallcaps mt-6 text-wood-deep">{t(tea.ends.full)}</p>
      </Reveal>

      {/* Desktop: a horizontal bar with teas placed along it, alternating above and below. */}
      <Reveal className="relative mt-24 hidden md:block" delay={0.1}>
        <ol className="relative h-[22rem]">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
            style={{ background: BAR.replace("var(--dir)", "90deg") }}
          />
          {teas.map((item, i) => {
            const above = i % 2 === 1;
            return (
              <li
                key={i}
                className="absolute top-0 h-full w-0"
                style={{ left: `${item.position * 100}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                    item.placeholder ? "border-wood/60 bg-paper" : "border-ink bg-ink"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 w-px bg-wood/35 ${above ? "bottom-1/2 mb-3 h-12" : "top-1/2 mt-3 h-12"}`}
                />
                <div
                  className={`absolute left-0 w-[13rem] -translate-x-1/2 text-center ${
                    above ? "bottom-1/2 mb-[4.5rem]" : "top-1/2 mt-[4.5rem]"
                  }`}
                >
                  <TeaLabel tea={item} />
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex justify-between">
          <p className="smallcaps text-wood-deep">{t(tea.ends.light)}</p>
          <p className="smallcaps text-wood-deep">{t(tea.ends.full)}</p>
        </div>
      </Reveal>
    </section>
  );
}
