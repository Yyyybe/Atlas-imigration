"use client";

import { Badge } from "@/app/components/Badge";
import { Card } from "@/app/components/Card";
import { ClockIcon, SparkleIcon } from "@/app/components/Icons";
import type { OverviewModel } from "@/app/lib/overview-view-model";
import { useLocale } from "@/app/i18n/LocaleProvider";

type NextStepCardProps = {
  nextStep: OverviewModel["nextStep"];
  source: OverviewModel["nextStepSource"];
};

export function NextStepCard({ nextStep, source }: NextStepCardProps) {
  const { t } = useLocale();

  return (
    <Card aria-labelledby="next-step-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Badge>
            <SparkleIcon className="h-3.5 w-3.5" />
            {t("overview.nextStep")}
          </Badge>
          <h2
            id="next-step-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-[var(--atlas-navy)]"
          >
            {nextStep.title}
          </h2>
          <p className="mt-1 text-sm text-[var(--atlas-muted)]">
            {nextStep.context}
            {source === "api"
              ? ` · ${t("overview.liveSource")}`
              : ` · ${t("overview.sampleTask")}`}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--atlas-muted)] sm:flex-row sm:gap-6">
            <p className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              {nextStep.requestTime}
            </p>
            <p className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              {nextStep.waitTime}
            </p>
          </div>
        </div>
        <p className="rounded-[1.25rem] bg-[var(--atlas-sand)] px-4 py-3 text-center sm:min-w-[7.5rem]">
          <span className="block text-2xl font-semibold text-[var(--atlas-sand-ink)]">
            {nextStep.daysLeft}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--atlas-sand-ink)]">
            {t("overview.daysLeft")}
          </span>
        </p>
      </div>

      <div className="mt-6 rounded-[1.15rem] bg-[var(--atlas-mist)] px-4 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--atlas-muted)]">
          {t("overview.why")}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--atlas-ink)]">
          {nextStep.why}
        </p>
      </div>
    </Card>
  );
}
