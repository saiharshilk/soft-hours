/**
 * The 24 solar terms (二十四節氣).
 *
 * Each term begins when the sun reaches a further 15° of ecliptic longitude.
 * That moment drifts by about a day from year to year, so this table uses the
 * usual approximate Gregorian start dates. The result can be off by ±1 day
 * around a boundary, which is fine for a menu that turns every two weeks.
 *
 * The list is in calendar order starting from 小寒 (early January), which
 * makes "find the latest term that has started" a simple scan.
 */

export type SolarTerm = {
  zh: string;
  pinyin: string;
  en: string;
  month: number; // 1-12
  day: number;
  line: string; // a short poetic description
};

export const SOLAR_TERMS: SolarTerm[] = [
  { zh: "小寒", pinyin: "Xiǎohán", en: "Minor Cold", month: 1, day: 5, line: "The cold deepens; plum buds wait under frost." },
  { zh: "大寒", pinyin: "Dàhán", en: "Major Cold", month: 1, day: 20, line: "The coldest stretch of the year, and the last before spring." },
  { zh: "立春", pinyin: "Lìchūn", en: "Start of Spring", month: 2, day: 4, line: "Spring begins in name; the east wind loosens the ice." },
  { zh: "雨水", pinyin: "Yǔshuǐ", en: "Rain Water", month: 2, day: 19, line: "Snow gives way to rain, and the ground softens." },
  { zh: "驚蟄", pinyin: "Jīngzhé", en: "Awakening of Insects", month: 3, day: 5, line: "First thunder stirs whatever slept through winter." },
  { zh: "春分", pinyin: "Chūnfēn", en: "Spring Equinox", month: 3, day: 20, line: "Day and night stand even; swallows return." },
  { zh: "清明", pinyin: "Qīngmíng", en: "Clear and Bright", month: 4, day: 4, line: "Clear air, new leaves, the first spring teas." },
  { zh: "穀雨", pinyin: "Gǔyǔ", en: "Grain Rain", month: 4, day: 20, line: "Rain for the seedlings; the last term of spring." },
  { zh: "立夏", pinyin: "Lìxià", en: "Start of Summer", month: 5, day: 5, line: "Summer begins; the garden turns a deeper green." },
  { zh: "小滿", pinyin: "Xiǎomǎn", en: "Grain Buds", month: 5, day: 21, line: "Grain fills but is not yet full. Enough, not more." },
  { zh: "芒種", pinyin: "Mángzhòng", en: "Grain in Ear", month: 6, day: 5, line: "A busy season in the fields; plums ripen in the rain." },
  { zh: "夏至", pinyin: "Xiàzhì", en: "Summer Solstice", month: 6, day: 21, line: "The longest day. Light lingers late on the water." },
  { zh: "小暑", pinyin: "Xiǎoshǔ", en: "Minor Heat", month: 7, day: 7, line: "Warm winds arrive; crickets move under the eaves." },
  { zh: "大暑", pinyin: "Dàshǔ", en: "Major Heat", month: 7, day: 22, line: "The height of summer. Find shade, sip slowly." },
  { zh: "立秋", pinyin: "Lìqiū", en: "Start of Autumn", month: 8, day: 7, line: "Autumn begins in name; a cooler wind at evening." },
  { zh: "處暑", pinyin: "Chǔshǔ", en: "End of Heat", month: 8, day: 23, line: "The heat withdraws; nights grow clear." },
  { zh: "白露", pinyin: "Báilù", en: "White Dew", month: 9, day: 7, line: "Dew whitens the grass at dawn." },
  { zh: "秋分", pinyin: "Qiūfēn", en: "Autumn Equinox", month: 9, day: 22, line: "Day and night are even again; the moon is bright." },
  { zh: "寒露", pinyin: "Hánlù", en: "Cold Dew", month: 10, day: 8, line: "Dew turns cold; chrysanthemums open." },
  { zh: "霜降", pinyin: "Shuāngjiàng", en: "Frost's Descent", month: 10, day: 23, line: "First frost settles; the leaves turn." },
  { zh: "立冬", pinyin: "Lìdōng", en: "Start of Winter", month: 11, day: 7, line: "Winter begins; the year turns inward." },
  { zh: "小雪", pinyin: "Xiǎoxuě", en: "Minor Snow", month: 11, day: 22, line: "The first light snow. A season for warm cups." },
  { zh: "大雪", pinyin: "Dàxuě", en: "Major Snow", month: 12, day: 7, line: "Heavier snow, quieter streets, longer evenings." },
  { zh: "冬至", pinyin: "Dōngzhì", en: "Winter Solstice", month: 12, day: 21, line: "The longest night; from here the light returns." },
];

/** Traditional order of the year, starting at 立春 (Start of Spring). */
export const TERMS_FROM_SPRING: number[] = Array.from(
  { length: 24 },
  (_, i) => (i + 2) % 24,
);

const DAY = 86_400_000;
const utc = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);

export type SeasonState = {
  index: number; // index into SOLAR_TERMS
  term: SolarTerm;
  nextIndex: number;
  next: SolarTerm;
  daysUntilNext: number;
  /** "light" (yin) from the spring equinox to the autumn equinox, else "warm" (yang). */
  mode: "light" | "warm";
  /** 0 = most yin (summer solstice) … 1 = most yang (winter solstice). */
  yang: number;
};

/**
 * Work out the current solar term for a calendar date (year, month, day)
 * that has already been converted to the shop's time zone.
 */
export function seasonFor(year: number, month: number, day: number): SeasonState {
  const today = utc(year, month, day);

  // Latest term whose start date is on or before today. Before 小寒 (Jan 1–4)
  // we are still in the previous year's 冬至.
  let index = 23;
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const t = SOLAR_TERMS[i];
    if (utc(year, t.month, t.day) <= today) index = i;
  }

  const nextIndex = (index + 1) % 24;
  const next = SOLAR_TERMS[nextIndex];
  let nextDate = utc(year, next.month, next.day);
  if (nextDate <= today) nextDate = utc(year + 1, next.month, next.day);
  const daysUntilNext = Math.round((nextDate - today) / DAY);

  // Position in the yin–yang cycle, following the sun: lightest at the
  // summer solstice (~Jun 21), most warming at the winter solstice (~Dec 21).
  const summer = utc(year, 6, 21);
  const phase = ((today - summer) / DAY / 365.2422) * 2 * Math.PI;
  const yang = (1 - Math.cos(phase)) / 2;

  // Equinox split: 春分 (index 5) up to, not including, 秋分 (index 17).
  const mode = index >= 5 && index < 17 ? "light" : "warm";

  return {
    index,
    term: SOLAR_TERMS[index],
    nextIndex,
    next,
    daysUntilNext,
    mode,
    yang,
  };
}
