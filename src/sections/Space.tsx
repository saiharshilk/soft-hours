import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { FlowerFrame } from "@/components/FlowerWindow";

// Asymmetric placement on a 12-column grid, like objects on a long scroll.
const layout = [
  "md:col-span-4 md:col-start-1",
  "md:col-span-4 md:col-start-6 md:mt-40",
  "md:col-span-3 md:col-start-10 md:mt-10",
  "md:col-span-5 md:col-start-2 md:mt-24",
  "md:col-span-3 md:col-start-9 md:mt-56",
];
const sizes = [
  "(min-width: 768px) 33vw, 100vw",
  "(min-width: 768px) 33vw, 100vw",
  "(min-width: 768px) 25vw, 100vw",
  "(min-width: 768px) 42vw, 100vw",
  "(min-width: 768px) 25vw, 100vw",
];

export function Space() {
  const sp = site.space;
  return (
    <section aria-labelledby="space-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40 lg:px-16">
      <Reveal>
        <SectionTitle seal="堂" id="space-title">
          {t(sp.title)}
        </SectionTitle>
      </Reveal>

      <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
        {sp.images.map((slot, i) => {
          const isWindow = slot.fallback === "window-light";
          return (
            <li
              key={slot.file}
              className={`${layout[i]} ${i === 0 || i === 3 ? "col-span-2" : "col-span-1"}`}
            >
              <Reveal delay={(i % 3) * 0.1}>
                {isWindow ? (
                  <FlowerFrame className="aspect-square w-full">
                    <ImageSlot slot={slot} sizes={sizes[i]} />
                  </FlowerFrame>
                ) : (
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: slot.ratio }}>
                    <ImageSlot slot={slot} sizes={sizes[i]} />
                  </div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>

      <p className="mt-14 text-[0.8125rem] tracking-[0.02em] text-ink-soft md:ml-[66.6%] md:mt-20">
        {t(sp.caption)}
      </p>
    </section>
  );
}
