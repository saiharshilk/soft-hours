import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { MotionProvider } from "@/components/MotionProvider";
import { FlowerClipDefs } from "@/components/FlowerWindow";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  // Cormorant has no pinyin tone marks (ǎ, ě …); pinyin is set in Noto Serif TC.
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Chinese fonts are megabytes in full. These are subsets holding only the
// characters the site uses (see scripts/subset-fonts.mjs, `npm run fonts`):
// about 20 KB each, with `swap` so they never block first paint.
const notoSerifTC = localFont({
  src: "../fonts/noto-serif-tc-subset.woff2",
  weight: "400",
  variable: "--font-noto-tc",
  display: "swap",
  // Tiny after subsetting, and 柔時閑堂 is in the hero, so fetch it early.
  preload: true,
});

const wenkai = localFont({
  src: "../fonts/lxgw-wenkai-tc-subset.woff2",
  weight: "400",
  variable: "--font-wenkai",
  display: "swap",
  preload: false,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiharshilk.github.io/soft-hours";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`),
  title: t(site.seo.title),
  description: t(site.seo.description),
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    title: t(site.seo.title),
    description: t(site.seo.description),
    siteName: t(site.fullName),
    locale: "en_US",
    images: [{ url: "og.png", width: 1200, height: 630, alt: t(site.seo.title) }],
  },
  twitter: { card: "summary_large_image", images: ["og.png"] },
  robots: site.noindex ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f2ede3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${hanken.variable} ${notoSerifTC.variable} ${wenkai.variable}`}
    >
      <body>
        <FlowerClipDefs />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
