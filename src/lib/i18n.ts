import type { L } from "@/content/site";

export type Lang = "en" | "zh";

/**
 * Resolve a localized string. The site currently renders English only;
 * a future 中文 toggle can pass "zh" (falling back to English when missing).
 */
export function t(value: L, lang: Lang = "en"): string {
  if (lang === "zh" && value.zh) return value.zh;
  return value.en;
}

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
