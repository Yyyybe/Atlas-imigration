"use client";

import { useLocale } from "@/app/i18n/LocaleProvider";

type LanguageSwitcherProps = {
  tone?: "dark" | "light";
};

export function LanguageSwitcher({
  tone = "light",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale();
  const dark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center rounded-full border p-1 ${
        dark
          ? "border-white/20 bg-white/[0.06]"
          : "border-[var(--atlas-line)] bg-white"
      }`}
      role="group"
      aria-label={t("language.label")}
    >
      {(["en", "pt"] as const).map((option) => {
        const selected = locale === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => setLocale(option)}
            className={`min-h-8 min-w-9 rounded-full px-2 text-xs font-bold tracking-wide transition ${
              selected
                ? dark
                  ? "bg-white text-[var(--landing-night)] shadow-sm"
                  : "bg-[var(--atlas-navy)] text-white shadow-sm"
                : dark
                  ? "text-white/65 hover:text-white"
                  : "text-[var(--atlas-muted)] hover:text-[var(--atlas-navy)]"
            }`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
