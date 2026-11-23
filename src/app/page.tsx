import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { zonedNow } from "@/lib/time";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { Season } from "@/sections/Season";
import { Philosophy } from "@/sections/Philosophy";
import { Tea } from "@/sections/Tea";
import { Confections } from "@/sections/Confections";
import { AfterHours } from "@/sections/AfterHours";
import { Space } from "@/sections/Space";
import { Reviews } from "@/sections/Reviews";
import { Visit } from "@/sections/Visit";
import { Footer } from "@/sections/Footer";

function jsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    additionalType: "https://en.wikipedia.org/wiki/Teahouse",
    name: t(site.fullName),
    alternateName: site.name.zh,
    description: t(site.seo.description),
    telephone: site.phone.tel,
    servesCuisine: ["Chinese tea", "Tea snacks", "Wine"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.googleMapsUrl,
    sameAs: [site.instagram.url],
    founder: { "@type": "Person", name: site.owner },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  // Build-time fallback; the widget recalculates in New York time on load.
  const { year, month, day } = zonedNow(site.timeZone);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] bg-paper px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Season initial={{ year, month, day }} />
        <Philosophy />
        <Tea />
        <Confections />
        <AfterHours />
        <Space />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
