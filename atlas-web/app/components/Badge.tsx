import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "navy" | "sand" | "sky";
  className?: string;
};

const tones = {
  navy: "bg-[var(--atlas-navy-soft)] text-[var(--atlas-navy)]",
  sand: "bg-[var(--atlas-sand)] text-[var(--atlas-sand-ink)]",
  sky: "bg-[var(--atlas-sky)] text-[var(--atlas-sky-ink)]",
};

export function Badge({ children, tone = "navy", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
