/**
 * ALL site content lives here.
 *
 * Every user-facing string is a `L` (localized) object: { en, zh? }.
 * Today the site shows English everywhere and Chinese only where the design
 * calls for it (the name, tea names, solar terms). A full 中文 toggle later
 * only needs `zh` filled in and a language switch in `src/lib/i18n.ts`.
 *
 * Search for "TODO" to find everything that still needs the owner's input.
 */

export type L = { en: string; zh?: string };

export type FallbackKind =
  | "mountains"
  | "beams"
  | "window-light"
  | "neon"
  | "tea"
  | "straw";

export type ImageSlot = {
  /** File name inside /public/images */
  file: string;
  alt: L;
  /** CSS aspect-ratio, e.g. "4 / 5" */
  ratio: string;
  /** Illustration shown while there is no photo */
  fallback: FallbackKind;
  /**
   * Flip to `true` once /public/images/<file> exists.
   * While false, the illustrated fallback renders and no request is made.
   */
  available: boolean;
};

export type DayHours = {
  day: L;
  /** 0 = Sunday … 6 = Saturday */
  index: number;
  closed?: boolean;
  /** 24h "HH:MM" or null when not yet confirmed */
  open: string | null;
  close: string | null;
};

export type Tea = {
  name: L;
  kind: L;
  /** 0 = lightest / most yin, 1 = fullest / most yang */
  position: number;
  /** Leave empty until the owner writes them. Never invent tasting notes. */
  notes?: L;
  placeholder?: boolean;
};

export type Confection = {
  name: L;
  description?: L;
  price?: string;
};

export const site = {
  /**
   * While this is a concept/pitch site, keep search engines away so it is not
   * mistaken for the official site. Set to false once the owner adopts it.
   */
  noindex: true,

  name: { en: "Soft Hours", zh: "柔時閑堂" } satisfies L,
  fullName: { en: "Soft Hours | Tea House & Wine Bar" } satisfies L,
  tagline: { en: "Tea House & Wine Bar" } satisfies L,

  seo: {
    title: {
      en: "Soft Hours 柔時閑堂 | Chinese Tea House & Wine Bar on Hester Street",
    } satisfies L,
    description: {
      en: "A Song dynasty–inspired tea house on Hester Street in Manhattan's Chinatown, pouring Chinese teas by the 24 solar terms. Four tables, traditional tea snacks, and a wine bar after hours.",
    } satisfies L,
  },

  owner: "Juno Shen",
  identity: {
    en: "Women-owned · Asian-owned · LGBTQ+ friendly",
  } satisfies L,

  address: {
    street: "119 Hester St, Front B",
    locality: "New York",
    region: "NY",
    postalCode: "10002",
    country: "US",
    line: { en: "119 Hester St, Front B, New York, NY 10002" } satisfies L,
  },
  geo: { lat: 40.7167453, lng: -73.9933686 },
  phone: { display: "(585) 209-0268", tel: "+15852090268" },
  instagram: {
    handle: "@softhours.world",
    url: "https://www.instagram.com/softhours.world/",
  },
  // TODO replace with the exact Google Maps place URL (Share → Copy link).
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Soft+Hours+Tea+House+%26+Wine+Bar+119+Hester+St+New+York+NY+10002",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Soft+Hours,+119+Hester+St,+New+York,+NY+10002&ll=40.7167453,-73.9933686&z=17&output=embed",
  rating: { value: "4.6", count: 164, source: { en: "Google" } satisfies L },
  services: [
    { en: "Dine-in" },
    { en: "Takeout" },
    { en: "Delivery" },
  ] satisfies L[],

  /** Times are America/New_York. */
  timeZone: "America/New_York",
  // TODO confirm every day with the owner. Only Monday (closed) and the
  // Tuesday 12 PM opening are confirmed so far. Unconfirmed values stay null,
  // and the status line never claims "Open now" from a guess.
  hours: [
    { index: 1, day: { en: "Monday" }, closed: true, open: null, close: null },
    { index: 2, day: { en: "Tuesday" }, open: "12:00", close: null },
    { index: 3, day: { en: "Wednesday" }, open: null, close: null },
    { index: 4, day: { en: "Thursday" }, open: null, close: null },
    { index: 5, day: { en: "Friday" }, open: null, close: null },
    { index: 6, day: { en: "Saturday" }, open: null, close: null },
    { index: 0, day: { en: "Sunday" }, open: null, close: null },
  ] satisfies DayHours[],
  hoursNote: {
    en: "For other days, check Instagram for current hours.",
  } satisfies L,

  // TODO ask the owner whether they take reservations. If yes, set the URL
  // and the "Reserve" button appears in Visit.
  reservationUrl: null as string | null,

  nav: [
    { href: "#tea", label: { en: "Tea" } },
    { href: "#confections", label: { en: "Confections" } },
    { href: "#season", label: { en: "The Season" } },
    { href: "#visit", label: { en: "Visit" } },
  ] satisfies { href: string; label: L }[],

  status: {
    openNow: { en: "Open now" },
    openUntil: { en: "Open now · until {time}" },
    openFromToday: { en: "Open from {time} today" },
    closedOpens: { en: "Closed · Opens {time} {day}" },
    closedMondays: { en: "Closed Mondays" },
    today: { en: "today" },
  } satisfies Record<string, L>,

  hero: {
    headline: [{ en: "Slow down." }, { en: "Stay a while." }] satisfies L[],
    subline: {
      en: "A Song dynasty–inspired tea house on Hester Street, pouring Chinese teas by the season.",
    } satisfies L,
    cta: { en: "Plan your visit" } satisfies L,
    image: {
      file: "hero.jpg",
      alt: {
        en: "Soft light through the flower-shaped window at Soft Hours",
      },
      ratio: "1 / 1",
      fallback: "mountains",
      available: false,
    } satisfies ImageSlot,
  },

  season: {
    title: { en: "The Season" } satisfies L,
    intro: {
      en: "Our menu follows the 24 solar terms, micro-seasons that turn about every two weeks.",
    } satisfies L,
    now: { en: "Now" } satisfies L,
    next: { en: "Next" } satisfies L,
    inDays: { en: "in {n} days" } satisfies L,
    tomorrow: { en: "tomorrow" } satisfies L,
    light: {
      label: { en: "Light, yin" },
      body: {
        en: "In the warm half of the year we lean toward lighter, brighter teas.",
      },
    },
    warm: {
      label: { en: "Warming, yang" },
      body: {
        en: "In the cool half of the year we lean toward roasted, fuller teas.",
      },
    },
    scale: { light: { en: "Light · yin" }, warm: { en: "Warming · yang" } },
    allTerms: { en: "The 24 solar terms" } satisfies L,
    balance: { en: "Balance" } satisfies L,
  },

  philosophy: {
    title: { en: "The way we pour" } satisfies L,
    blocks: [
      {
        seal: "時",
        title: { en: "Seasons" },
        body: {
          en: "The menu moves with the 24 solar terms, the old calendar of micro-seasons. What we pour shifts about every two weeks.",
        },
      },
      {
        seal: "柔",
        title: { en: "Balance" },
        body: {
          en: "Our teas run from light-bodied to full-bodied, yin to yang. By tradition, lighter teas belong to summer and warmer ones to winter.",
        },
      },
      {
        seal: "閑",
        title: { en: "Pause" },
        body: {
          en: "Iced tea arrives with a very small straw. It is there to slow you down.",
        },
      },
    ] satisfies { seal: string; title: L; body: L }[],
  },

  tea: {
    title: { en: "Tea" } satisfies L,
    intro: {
      en: "Five teas, arranged from light-bodied to full-bodied.",
    } satisfies L,
    ends: {
      light: { en: "Light · yin" },
      full: { en: "Full-bodied · yang" },
    },
    placeholderLabel: { en: "To be announced" } satisfies L,
    // TODO get the full tea list from the owner (three teas still missing)
    // and set each tea's position on the light → full scale.
    items: [
      {
        name: { en: "To be announced" },
        kind: { en: "" },
        position: 0.08,
        placeholder: true,
      },
      {
        name: { en: "To be announced" },
        kind: { en: "" },
        position: 0.27,
        placeholder: true,
      },
      {
        name: { en: "To be announced" },
        kind: { en: "" },
        position: 0.46,
        placeholder: true,
      },
      {
        name: { en: "Dahongpao", zh: "大紅袍" },
        kind: { en: "Wuyi rock oolong" },
        position: 0.68,
        notes: undefined, // TODO tasting notes from owner
      },
      {
        name: { en: "Dian Hong", zh: "滇紅" },
        kind: { en: "Yunnan black tea" },
        position: 0.9,
        notes: undefined, // TODO tasting notes from owner
      },
    ] satisfies Tea[],
  },

  confections: {
    title: { en: "Confections" } satisfies L,
    subtitle: { en: "Traditional Chinese tea snacks" } satisfies L,
    /** Set to true once prices are confirmed and filled in below. */
    showPrices: false,
    // TODO descriptions (and prices) from the owner.
    items: [
      { name: { en: "Black Sesame Cookie" } },
      { name: { en: "Rose Water Meringue" } },
      { name: { en: "Osmanthus Amber Candy" } },
      { name: { en: "Red Bean Chestnut Yokan" } },
    ] satisfies Confection[],
  },

  afterHours: {
    title: { en: "After hours" } satisfies L,
    body: {
      en: "When the light softens, the tea house becomes a wine bar.",
    } satisfies L,
    // TODO confirm evening hours and the wine list with the owner.
    detail: { en: "Evening hours and the wine list are coming soon." } satisfies L,
  },

  space: {
    title: { en: "The space" } satisfies L,
    caption: { en: "Neon pieces designed by Juno Shen." } satisfies L,
    images: [
      {
        file: "space-beams.jpg",
        alt: { en: "Exposed wooden beams across the ceiling" },
        ratio: "4 / 5",
        fallback: "beams",
        available: false,
      },
      {
        file: "space-window-light.jpg",
        alt: { en: "Diffused daylight through the flower-shaped window" },
        ratio: "1 / 1",
        fallback: "window-light",
        available: false,
      },
      {
        file: "space-neon.jpg",
        alt: { en: "A glowing neon sculpture by Juno Shen" },
        ratio: "3 / 4",
        fallback: "neon",
        available: false,
      },
      {
        file: "space-tea-service.jpg",
        alt: { en: "Tea service set on a wooden table" },
        ratio: "4 / 3",
        fallback: "tea",
        available: false,
      },
      {
        file: "space-iced-tea.jpg",
        alt: { en: "Iced tea served with a tiny straw" },
        ratio: "4 / 5",
        fallback: "straw",
        available: false,
      },
    ] satisfies ImageSlot[],
  },

  reviews: {
    title: { en: "Guests" } satisfies L,
    label: { en: "Google review" } satisfies L,
    readMore: { en: "Read reviews on Google Maps" } satisfies L,
    pause: { en: "Pause" } satisfies L,
    play: { en: "Play" } satisfies L,
    // REAL Google reviews only, quoted exactly. Never edit, combine, or invent.
    items: [
      {
        author: "Angelina",
        quote: {
          en: "I loved this place so much!! Everything was immaculate, from the calm ambiance, to the exceptional service that I received when choosing my tea and snacks…",
        },
      },
      {
        author: "Cecilia",
        quote: {
          en: "If you're a tea connoisseur or simply appreciate high-quality tea, Soft Hours is a spot worth checking out. Their menu isn't massive, but they select top-tier teas that deliver incredible flavor.",
        },
      },
    ] satisfies { author: string; quote: L }[],
  },

  visit: {
    title: { en: "Visit" } satisfies L,
    noteTitle: { en: "Good to know" } satisfies L,
    notes: [
      { en: "Four tables only" },
      { en: "50-minute visits" },
      { en: "Closed Mondays" },
      { en: "Takeout & delivery available" },
    ] satisfies L[],
    addressLabel: { en: "Address" } satisfies L,
    directions: { en: "Get directions" } satisfies L,
    phoneLabel: { en: "Phone" } satisfies L,
    hoursLabel: { en: "Hours" } satisfies L,
    closed: { en: "Closed" } satisfies L,
    opensAt: { en: "From {time}" } satisfies L,
    reserve: { en: "Reserve a table" } satisfies L,
    mapTitle: { en: "Map showing Soft Hours at 119 Hester Street" } satisfies L,
  },

  footer: {
    credit: { en: "Website concept by Sai Konchada" } satisfies L,
  },
} as const;

export type Site = typeof site;
