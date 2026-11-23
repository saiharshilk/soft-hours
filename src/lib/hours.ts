import { site, type DayHours } from "@/content/site";
import { fill, t } from "@/lib/i18n";
import { zonedNow } from "@/lib/time";

const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "12:00" → "12 PM", "17:30" → "5:30 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

const byIndex = (i: number): DayHours | undefined =>
  site.hours.find((d) => d.index === i);

/**
 * A short, honest status line in the shop's time zone.
 * It only says "Open now" when that day's opening AND closing time are known.
 */
export function statusLine(date: Date = new Date()): string {
  const s = site.status;
  const now = zonedNow(site.timeZone, date);
  const today = byIndex(now.weekday);

  // Known hours today.
  if (today && !today.closed && today.open) {
    const open = toMinutes(today.open);
    if (now.minutes < open) {
      return fill(t(s.closedOpens), { time: formatTime(today.open), day: t(s.today) });
    }
    if (today.close) {
      const close = toMinutes(today.close);
      if (now.minutes < close) {
        return fill(t(s.openUntil), { time: formatTime(today.close) });
      }
    } else {
      return fill(t(s.openFromToday), { time: formatTime(today.open) });
    }
  }

  // Closed today (or after closing): name the next confirmed opening, but only
  // if every day in between is known to be closed.
  if (today?.closed || (today?.open && today?.close)) {
    for (let step = 1; step <= 7; step++) {
      const d = byIndex((now.weekday + step) % 7);
      if (!d) break;
      if (d.closed) continue;
      if (d.open) {
        return fill(t(s.closedOpens), { time: formatTime(d.open), day: SHORT[d.index] });
      }
      break; // unknown day in between: don't guess
    }
  }

  return t(s.closedMondays);
}
