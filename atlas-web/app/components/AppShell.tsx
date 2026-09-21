"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button } from "@/app/components/Button";
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

const NAV = [
  { href: "/", label: "Overview", icon: OverviewIcon },
  { href: "/journey", label: "Journey", icon: JourneyIcon },
  { href: "/documents", label: "Documents", icon: DocumentsIcon, badge: true },
  { href: "/deadlines", label: "Deadlines", icon: DeadlinesIcon },
  { href: "/guides", label: "Guides", icon: GuidesIcon },
];

type AppShellProps = {
  userName: string;
  plan: string;
  documentsAttention: number;
  dateLabel: string;
  greeting: string;
  origin: string;
  destination: string;
  goal: string;
  children: ReactNode;
};

export function AppShell({
  userName,
  plan,
  documentsAttention,
  dateLabel,
  greeting,
  origin,
  destination,
  goal,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--atlas-bg)] text-[var(--atlas-ink)]">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[rgba(20,32,54,0.35)] lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
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
            type="button"
            className="rounded-full p-2 text-[var(--atlas-navy)] lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col gap-1">
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
                <span className="flex-1">{item.label}</span>
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
          <Link
            href="/guides"
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-[var(--atlas-muted)] hover:bg-[var(--atlas-mist)] hover:text-[var(--atlas-navy)]"
          >
            <AdvisorIcon className="h-5 w-5" />
            Talk to an advisor
          </Link>
          <Link
            href="/guides"
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-[var(--atlas-muted)] hover:bg-[var(--atlas-mist)] hover:text-[var(--atlas-navy)]"
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
          <div className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--atlas-navy-soft)] text-sm font-semibold text-[var(--atlas-navy)]">
              JA
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--atlas-navy)]">
                {userName}
              </p>
              <p className="text-xs text-[var(--atlas-muted)]">{plan}</p>
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
                  aria-label="Open navigation"
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
                <span className="text-[var(--atlas-ink)]">{origin}</span>
                <span aria-hidden>→</span>
                <span aria-hidden>🇪🇸</span>
                <span className="text-[var(--atlas-ink)]">{destination}</span>
                <span className="text-[var(--atlas-line-strong)]">•</span>
                <span>{goal}</span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 pt-1">
              <button
                type="button"
                className="hidden rounded-full p-2.5 text-[var(--atlas-navy)] hover:bg-white sm:inline-flex"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />
              </button>
              <Button variant="secondary" icon={<AdvisorIcon className="h-4 w-4" />}>
                Ask an advisor
              </Button>
            </div>
          </div>
        </header>

        <div className="px-4 pb-24 pt-2 sm:px-8 lg:pb-10">{children}</div>
      </div>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--atlas-line)] bg-white/95 px-2 py-2 backdrop-blur lg:hidden"
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
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
