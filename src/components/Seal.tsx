/** A tiny cinnabar seal stamp carrying one character. */
export function Seal({
  char = "柔",
  size = "sm",
  className = "",
}: {
  char?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const dims = size === "md" ? "h-9 w-9 text-[1.15rem]" : "h-6 w-6 text-[0.8rem]";
  return (
    <span
      lang="zh-Hant"
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-[2px] bg-cinnabar font-zh leading-none text-paper ${dims} ${className}`}
      style={{ boxShadow: "inset 0 0 0 1.5px var(--cinnabar), inset 0 0 0 2.5px rgb(242 237 227 / 0.55)" }}
    >
      {char}
    </span>
  );
}

/** Section heading: seal + quiet serif title. */
export function SectionTitle({
  seal,
  children,
  id,
  className = "",
  tone = "ink",
}: {
  seal: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Seal char={seal} />
      <h2
        id={id}
        className={`font-display text-[2rem] font-light leading-none tracking-[0.01em] md:text-[2.5rem] ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
