import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { Seal } from "@/components/Seal";

export function Footer() {
  return (
    <footer className="border-t border-wood/25">
      <div className="mx-auto flex max-w-[1440px] items-start gap-10 px-5 pb-12 pt-16 md:gap-16 md:px-10 md:pb-16 md:pt-24 lg:px-16">
        <div className="flex flex-col items-center gap-4">
          <p lang="zh-Hant" className="vertical font-zh text-[1.625rem] leading-none tracking-[0.42em] text-ink md:text-[2rem]">
            {site.name.zh}
          </p>
          <Seal char="柔" />
        </div>

        <div className="flex min-h-full flex-1 flex-col gap-10 md:flex-row md:justify-between">
          <div className="space-y-2 text-[0.875rem] text-ink-soft">
            <p className="font-display text-[1.25rem] leading-snug text-ink md:text-[1.375rem]">{t(site.fullName)}</p>
            <p>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </p>
            <p>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link">
                {site.instagram.handle}
              </a>
            </p>
          </div>
          <div className="space-y-2 text-[0.8125rem] text-ink-soft md:text-right">
            <p>{t(site.identity)}</p>
            <p className="pt-6 text-[0.75rem]">{t(site.footer.credit)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
