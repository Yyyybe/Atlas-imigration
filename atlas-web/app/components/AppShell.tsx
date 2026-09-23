"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/app/components/Button";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import {
  useLocale,
  type TranslationKey,
} from "@/app/i18n/LocaleProvider";
import {
  AdvisorIcon,
  BellIcon,
  CloseIcon,
  DeadlinesIcon,
  DocumentsIcon,
  GuidesIcon,
  JourneyIcon,
  MenuIcon,
  OverviewIcon,
  SettingsIcon,
} from "@/app/components/Icons";

const NAV: Array<{
  href: string;
  label: TranslationKey;
  icon: typeof OverviewIcon;
  badge?: boolean;
}> = [
  { href: "/overview", label: "nav.overview", icon: OverviewIcon },
  { href: "/journey", label: "nav.journey", icon: JourneyIcon },
  { href: "/documents", label: "nav.documents", icon: DocumentsIcon, badge: true },
  { href: "/deadlines", label: "nav.deadlines", icon: DeadlinesIcon },
  { href: "/guides", label: "nav.guides", icon: GuidesIcon },
];

type AppShellProps = {
  userName: string;
  plan: string;
  documentsAttention: number;
  origin: string;
  destination: string;
  goal: string;
  children: ReactNode;
};

export function AppShell({
  userName,
  plan,
  documentsAttention,
  origin,
  destination,
  goal,
  children,
}: AppShellProps) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat(
    locale === "pt" ? "pt-BR" : "en-GB",
    { weekday: "long", day: "numeric", month: "long" },
  ).format(now);
  const greetingLabel =
    now.getHours() < 12
      ? t("greeting.morning")
      : now.getHours() < 18
        ? t("greeting.afternoon")
        : t("greeting.evening");
  const greeting = `${greetingLabel}, ${userName.split(/\s+/)[0] ?? userName}`;
  const localizedPlan =
    plan === "Preview workspace" ? t("shell.previewPlan") : plan;
  const localizedOrigin = origin === "Brazil" ? t("shell.origin") : origin;
  const localizedDestination =
    destination === "Barcelona, Spain" ? t("shell.destination") : destination;
  const localizedGoal =
    goal === "Residence permit" ? t("shell.goal") : goal;

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[var(--atlas-bg)] text-[var(--atlas-ink)]">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[rgba(20,32,54,0.35)] lg:hidden"
          aria-label={t("nav.close")}
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        ref={drawerRef}
        id="primary-navigation"
        aria-label={t("nav.primary")}
        className={`fixed inset-y-0 left-0 z-40 w-[16.5rem] flex-col border-r border-[var(--atlas-line)] bg-white px-4 py-5 lg:flex ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--atlas-navy)] text-sm font-bold text-white">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight text-[var(--atlas-navy)]">
              Atlas
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-full p-2 text-[var(--atlas-navy)] lg:hidden"
            onClick={() => setOpen(false)}
            aria-label={t("nav.close")}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label={t("nav.primary")} className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--atlas-navy-soft)] text-[var(--atlas-navy)]"
                    : "text-[var(--atlas-muted)] hover:bg-[var(--atlas-mist)] hover:text-[var(--atlas-navy)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{t(item.label)}</span>
                {item.badge && documentsAttention > 0 ? (
                  <span className="rounded-full bg-[var(--atlas-badge)] px-1.5 text-[11px] font-bold text-white">
                    {documentsAttention}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-1 border-t border-[var(--atlas-line)] pt-4">
          <div
            aria-disabled="true"
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-[var(--atlas-muted)]"
          >
            <AdvisorIcon className="h-5 w-5" />
            <span className="flex-1">{t("nav.advisor")}</span>
            <span className="text-xs">{t("nav.comingSoon")}</span>
          </div>
          <div
            aria-disabled="true"
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-[var(--atlas-muted)]"
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="flex-1">{t("nav.settings")}</span>
            <span className="text-xs">{t("nav.comingSoon")}</span>
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--atlas-navy-soft)] text-sm font-semibold text-[var(--atlas-navy)]">
              {initials || "A"}
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--atlas-navy)]">
                {userName}
              </p>
              <p className="text-xs text-[var(--atlas-muted)]">{localizedPlan}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[16.5rem]">
        <header className="sticky top-0 z-20 border-b border-transparent bg-[var(--atlas-bg)]/90 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  className="rounded-full p-2 text-[var(--atlas-navy)] hover:bg-white"
                  onClick={() => setOpen(true)}
                  aria-label={t("nav.open")}
                  aria-controls="primary-navigation"
                  aria-expanded={open}
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
                <span className="font-semibold text-[var(--atlas-navy)]">
                  Atlas
                </span>
              </div>
              <p className="text-sm text-[var(--atlas-muted)]">{dateLabel}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--atlas-navy)] sm:text-4xl">
                {greeting}
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--atlas-muted)]">
                <span aria-hidden>🇧🇷</span>
                <span className="text-[var(--atlas-ink)]">{localizedOrigin}</span>
                <span aria-hidden>→</span>
                <span aria-hidden>🇪🇸</span>
                <span className="text-[var(--atlas-ink)]">{localizedDestination}</span>
                <span className="text-[var(--atlas-line-strong)]">•</span>
                <span>{localizedGoal}</span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 pt-1">
              <LanguageSwitcher />
              <button
                type="button"
                className="hidden cursor-not-allowed rounded-full p-2.5 text-[var(--atlas-navy)] opacity-60 sm:inline-flex"
                aria-label={t("shell.notifications")}
                disabled
              >
                <BellIcon className="h-5 w-5" />
              </button>
              <Button
                variant="secondary"
                icon={<AdvisorIcon className="h-4 w-4" />}
                disabled
                title={t("shell.advisorTitle")}
              >
                {t("shell.advisorButton")}
              </Button>
            </div>
          </div>
        </header>

        <div className="px-4 pb-24 pt-2 sm:px-8 lg:pb-10">{children}</div>
      </div>

      <nav
        aria-label={t("nav.mobile")}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--atlas-line)] bg-white/95 px-2 py-2 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <ul className="grid grid-cols-5 gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-medium ${
                    active
                      ? "text-[var(--atlas-navy)]"
                      : "text-[var(--atlas-muted)]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {t(item.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
