"use client";

import { Card } from "@/app/components/Card";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { OverviewModel } from "@/app/lib/overview-view-model";

type ProgressCardProps = {
  progress: OverviewModel["progress"];
};

export function ProgressCard({ progress }: ProgressCardProps) {
  const { locale, t } = useLocale();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress.percent / 100) * circumference;

  return (
    <Card aria-labelledby="progress-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative mx-auto h-[7.25rem] w-[7.25rem] sm:mx-0">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 96 96"
            role="img"
            aria-label={`${progress.percent} ${t("overview.percentComplete")}`}
          >
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="var(--atlas-ring)"
              strokeWidth="10"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="var(--atlas-navy)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="motion-safe:transition-[stroke-dashoffset] motion-reduce:transition-none"
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-[var(--atlas-navy)]">
              {progress.percent}%
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--atlas-muted)]">
              {t("overview.complete")}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="progress-heading"
            className="text-xl font-semibold text-[var(--atlas-navy)]"
          >
            {progress.headline}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--atlas-muted)]">
            {progress.body}
          </p>
        </div>
      </div>

      <div
        className="mt-6 flex gap-1.5"
        aria-label={`${t("overview.stage")} ${progress.stagesDone} ${t("overview.of")} ${progress.stagesTotal}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={progress.stagesTotal}
        aria-valuenow={progress.stagesDone}
      >
        {Array.from({ length: progress.stagesTotal }, (_, index) => (
          <span
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < progress.stagesDone
                ? "bg-[var(--atlas-navy)]"
                : "bg-[var(--atlas-ring)]"
            }`}
          />
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-[var(--atlas-line)] pt-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[var(--atlas-muted)]">
            {t("overview.stagesDone")}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-[var(--atlas-navy)]">
            {progress.stagesDone} {t("overview.of")} {progress.stagesTotal}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[var(--atlas-muted)]">
            {t("overview.started")}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-[var(--atlas-navy)]">
            {new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-GB", {
              month: "long",
              year: "numeric",
            }).format(new Date(progress.startedIso))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[var(--atlas-muted)]">
            {t("overview.estimated")}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-[var(--atlas-navy)]">
            {new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-GB", {
              month: "long",
              year: "numeric",
            }).format(new Date(progress.estimatedPermitIso))}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
