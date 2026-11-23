import { site } from "@/content/site";
import { fill, t } from "@/lib/i18n";
import { formatTime } from "@/lib/hours";
import { Seal, SectionTitle } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

export function Visit() {
  const v = site.visit;
  const knownHours = site.hours.filter((d) => d.closed || d.open);
  const hasUnknown = site.hours.some((d) => !d.closed && !d.open);

  return (
    <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-16">
      <Reveal>
        <SectionTitle seal="堂" id="visit-title">
          {t(v.title)}
        </SectionTitle>
      </Reveal>

      <div className="mt-16 grid gap-y-16 md:mt-20 md:grid-cols-12 md:gap-x-8">
        {/* Scholar's note: a slip of darker paper, written top to bottom. */}
        <Reveal className="md:col-span-4">
          <aside aria-labelledby="note-title" className="relative bg-paper-deep px-8 pb-10 pt-12">
            <div className="pointer-events-none absolute inset-2 border border-wood/30" aria-hidden="true" />
            <Seal char="閑" className="absolute right-6 top-6" />
            <h3 id="note-title" className="smallcaps text-wood-deep">
              {t(v.noteTitle)}
            </h3>
            <ul className="mt-6 space-y-4">
              {v.notes.map((n) => (
                <li key={n.en} className="font-display text-[1.375rem] leading-snug text-ink">
                  {t(n)}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>

        <Reveal className="space-y-10 md:col-span-3 md:col-start-6" delay={0.1}>
          <div>
            <h3 className="smallcaps text-wood-deep">{t(v.addressLabel)}</h3>
            <address className="mt-3 not-italic text-ink">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block text-[0.875rem]">
              {t(v.directions)}
            </a>
          </div>
          <div>
            <h3 className="smallcaps text-wood-deep">{t(v.phoneLabel)}</h3>
            <a href={`tel:${site.phone.tel}`} className="link mt-3 inline-block text-ink">
              {site.phone.display}
            </a>
          </div>
          <div>
            <h3 className="smallcaps text-wood-deep">{t(v.hoursLabel)}</h3>
            <table className="mt-3 w-full text-left text-[0.9375rem]">
              <caption className="sr-only">{t(v.hoursLabel)}</caption>
              <tbody>
                {knownHours.map((d) => (
                  <tr key={d.index}>
                    <th scope="row" className="py-1 pr-6 font-normal text-ink">
                      {t(d.day)}
                    </th>
                    <td className="py-1 text-ink-soft">
                      {d.closed
                        ? t(v.closed)
                        : d.open && d.close
                          ? `${formatTime(d.open)} – ${formatTime(d.close)}`
                          : d.open
                            ? fill(t(v.opensAt), { time: formatTime(d.open) })
                            : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hasUnknown && <p className="mt-3 text-[0.8125rem] text-ink-soft">{t(site.hoursNote)}</p>}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link text-ink">
              {site.instagram.handle}
            </a>
            {site.reservationUrl && (
              <a href={site.reservationUrl} className="link text-ink">
                {t(v.reserve)}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-celadon-soft md:aspect-[4/5]">
            <iframe
              src={site.mapEmbedUrl}
              title={t(v.mapTitle)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-tint absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-celadon mix-blend-multiply opacity-25" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
