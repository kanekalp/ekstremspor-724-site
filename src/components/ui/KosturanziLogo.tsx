type Props = {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  dark?: boolean;
};

export function KosturanziLogo({ size = "md", invert = false, dark = false }: Props) {
  const sizeMap = {
    sm: {
      badge: "h-5 px-1.5 text-[9px] rounded-[5px]",
      text: "text-[13px]",
      gap: "gap-1.5",
    },
    md: {
      badge: "h-6 px-2   text-[10px] rounded-[6px]",
      text: "text-[15px]",
      gap: "gap-2",
    },
    lg: {
      badge: "h-8 px-2.5 text-[13px] rounded-[8px]",
      text: "text-[22px]",
      gap: "gap-2.5",
    },
  };

  const { badge, text, gap } = sizeMap[size];

  let badgeCls = invert ? "bg-paper/15 text-paper" : "bg-ink text-paper";
  let textCls = "text-ink";

  if (dark) {
    badgeCls = "bg-white/20 text-white";
    textCls = "text-white";
  }

  return (
    <div className={`flex items-center ${gap}`}>
      <span
        className={`inline-flex shrink-0 items-center font-heading font-extrabold tracking-tighter ${badge} ${badgeCls}`}
      >
        ytu
      </span>
      <span
        className={`font-heading font-bold tracking-tight leading-none ${text} ${textCls}`}
      >
        kosturanzi<span className="text-sun">.</span>
      </span>
    </div>
  );
}
