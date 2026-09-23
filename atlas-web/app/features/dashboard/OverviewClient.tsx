"use client";

import { AlertList } from "@/app/features/dashboard/AlertList";
import { DeadlinesCard } from "@/app/features/dashboard/DeadlinesCard";
import { NextStepCard } from "@/app/features/dashboard/NextStepCard";
import { ProgressCard } from "@/app/features/dashboard/ProgressCard";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { OverviewModel } from "@/app/lib/overview-view-model";

const NEXT_STEP_TITLES: Record<string, { en: string; pt: string }> = {
  "Solicitar emissão do passaporte.": {
    en: "Request a passport.",
    pt: "Solicitar emissão do passaporte.",
  },
  "Renovar o passaporte.": {
    en: "Renew your passport.",
    pt: "Renovar o passaporte.",
  },
  "Providenciar o certificado de antecedentes criminais.": {
    en: "Obtain your criminal record certificate.",
    pt: "Providenciar o certificado de antecedentes criminais.",
  },
  "Providenciar a Apostila de Haia dos antecedentes criminais.": {
    en: "Obtain a Hague Apostille for the criminal record certificate.",
    pt: "Providenciar a Apostila de Haia dos antecedentes criminais.",
  },
  "Verificar o tipo de visto necessário.": {
    en: "Confirm the required visa category.",
    pt: "Verificar o tipo de visto necessário.",
  },
};

function localizeLiveText(value: string, locale: "en" | "pt") {
  const titles = NEXT_STEP_TITLES[value];
  if (titles) return titles[locale];

  const known: Record<string, { en: string; pt: string }> = {
    "Part of identity documents": {
      en: "Part of identity documents",
      pt: "Parte dos documentos de identidade",
    },
    "Part of background checks": {
      en: "Part of background checks",
      pt: "Parte das verificações de antecedentes",
    },
    "Part of document legalization": {
      en: "Part of document legalization",
      pt: "Parte da legalização de documentos",
    },
    "Part of visa pathway": {
      en: "Part of visa pathway",
      pt: "Parte do processo de visto",
    },
    "About 30 minutes to request": {
      en: "About 30 minutes to request",
      pt: "Cerca de 30 minutos para solicitar",
    },
    "About 20 minutes to request": {
      en: "About 20 minutes to request",
      pt: "Cerca de 20 minutos para solicitar",
    },
    "About 15 minutes to review": {
      en: "About 15 minutes to review",
      pt: "Cerca de 15 minutos para revisar",
    },
    "2–6 weeks to receive": {
      en: "2–6 weeks to receive",
      pt: "2–6 semanas para receber",
    },
    "5–15 business days to receive": {
      en: "5–15 business days to receive",
      pt: "5–15 dias úteis para receber",
    },
    "3–10 business days to receive": {
      en: "3–10 business days to receive",
      pt: "3–10 dias úteis para receber",
    },
    "Depends on the visa category": {
      en: "Depends on the visa category",
      pt: "Depende da categoria do visto",
    },
  };
  return known[value]?.[locale] ?? value;
}

export function OverviewClient({ overview }: { overview: OverviewModel }) {
  const { locale, t } = useLocale();
  const dateLocale = locale === "pt" ? "pt-BR" : "en-GB";
  const certificateDate = overview.alerts.find(
    (alert) => alert.id === "criminal-record",
  )?.isoDate;

  const localized: OverviewModel = {
    ...overview,
    progress: {
      ...overview.progress,
      headline: t("model.progress.headline"),
      body: t("model.progress.body"),
    },
    nextStep:
      overview.nextStepSource === "fixture"
        ? {
            ...overview.nextStep,
            title: t("model.next.title"),
            context: t("model.next.context"),
            requestTime: t("model.next.request"),
            waitTime: t("model.next.wait"),
            why: t("model.next.why"),
          }
        : {
            ...overview.nextStep,
            title: localizeLiveText(overview.nextStep.title, locale),
            context: localizeLiveText(overview.nextStep.context, locale),
            requestTime: localizeLiveText(overview.nextStep.requestTime, locale),
            waitTime: localizeLiveText(overview.nextStep.waitTime, locale),
          },
    alerts: overview.alerts.map((alert) =>
      alert.id === "criminal-record"
        ? {
            ...alert,
            title: `${t("model.alert.certificate")}${
              certificateDate
                ? ` · ${new Intl.DateTimeFormat(dateLocale, {
                    day: "numeric",
                    month: "short",
                  }).format(new Date(certificateDate))}`
                : ""
            }`,
            body: t("model.alert.certificateBody"),
          }
        : {
            ...alert,
            title: t("model.alert.checklist"),
            body: t("model.alert.checklistBody"),
          },
    ),
    deadlines: overview.deadlines.map((deadline) =>
      deadline.id === "submission"
        ? {
            ...deadline,
            title: t("model.deadline.submission"),
            category: t("model.deadline.submissionCategory"),
          }
        : {
            ...deadline,
            title: t("model.deadline.appointment"),
            category: t("model.deadline.appointmentCategory"),
          },
    ),
  };

  return (
    <div className="space-y-4">
      <section
        aria-label={t("overview.noticeLabel")}
        className="rounded-[1.25rem] border border-[var(--atlas-sky-line)] bg-[var(--atlas-sky)] px-4 py-3 text-sm leading-6 text-[var(--atlas-sky-ink)]"
      >
        <span className="font-semibold">{t("overview.noticeLead")}</span>{" "}
        {t("overview.noticeBody")}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
        <div className="flex flex-col gap-4">
          <ProgressCard progress={localized.progress} />
          <NextStepCard
            nextStep={localized.nextStep}
            source={localized.nextStepSource}
          />
        </div>
        <div className="flex flex-col gap-4">
          <AlertList alerts={localized.alerts} />
          <DeadlinesCard deadlines={localized.deadlines} />
        </div>
      </div>
    </div>
  );
}
