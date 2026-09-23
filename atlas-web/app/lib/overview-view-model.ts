import { getCoreHealth, getNextStep } from "@/app/lib/api";

export type AlertTone = "warning" | "info";

export type OverviewAlert = {
  id: string;
  tone: AlertTone;
  title: string;
  body: string;
  isoDate?: string;
};

export type OverviewDeadline = {
  id: string;
  isoDate: string;
  month: string;
  day: string;
  title: string;
  category: string;
  remaining: string;
};

export type OverviewModel = {
  dataMode: "demo";
  user: {
    firstName: string;
    fullName: string;
    plan: string;
  };
  corridor: {
    origin: string;
    destination: string;
    goal: string;
  };
  coreOnline: boolean;
  nextStepSource: "api" | "fixture";
  progress: {
    percent: number;
    headline: string;
    body: string;
    stagesDone: number;
    stagesTotal: number;
    started: string;
    estimatedPermit: string;
    startedIso: string;
    estimatedPermitIso: string;
  };
  nextStep: {
    title: string;
    context: string;
    requestTime: string;
    waitTime: string;
    daysLeft: number;
    why: string;
  };
  alerts: OverviewAlert[];
  deadlines: OverviewDeadline[];
  documentsAttention: number;
};

const DEMO_EXPLORER = {
  id: "explorer-joao",
  full_name: "João Almeida",
  nationality: "Brasil",
  current_country: "Brasil",
  destination_country: "Espanha",
  has_passport: true,
  passport_valid: true,
  has_criminal_record_certificate: true,
  criminal_record_apostilled: true,
  has_visa: false,
};

const STEP_COPY: Record<
  string,
  Pick<OverviewModel["nextStep"], "context" | "requestTime" | "waitTime" | "why">
> = {
  "Solicitar emissão do passaporte.": {
    context: "Part of identity documents",
    requestTime: "About 30 minutes to request",
    waitTime: "2–6 weeks to receive",
    why: "A valid passport is required before any residence or visa filing can proceed.",
  },
  "Renovar o passaporte.": {
    context: "Part of identity documents",
    requestTime: "About 30 minutes to request",
    waitTime: "2–6 weeks to receive",
    why: "Consulates typically require a passport that remains valid through the permit process.",
  },
  "Providenciar o certificado de antecedentes criminais.": {
    context: "Part of background checks",
    requestTime: "About 20 minutes to request",
    waitTime: "5–15 business days to receive",
    why: "Atlas Core returned this task for the Portugal journey. Confirm the certificate's validity period and issuing authority against the current official source before filing.",
  },
  "Providenciar a Apostila de Haia dos antecedentes criminais.": {
    context: "Part of document legalization",
    requestTime: "About 20 minutes to request",
    waitTime: "3–10 business days to receive",
    why: "Atlas Core returned this legalization task for the Portugal journey. Confirm the current apostille requirement against the official destination authority before filing.",
  },
  "Verificar o tipo de visto necessário.": {
    context: "Part of visa pathway",
    requestTime: "About 15 minutes to review",
    waitTime: "Depends on the visa category",
    why: "The right visa category determines which documents, fees, and appointments come next.",
  },
};

const FIXTURE_NEXT_STEP: OverviewModel["nextStep"] = {
  title: "Apostille your birth certificate",
  context: "Part of Document legalization",
  requestTime: "About 20 minutes to request",
  waitTime: "3–10 business days to receive",
  daysLeft: 12,
  why: "This sample shows how Atlas will explain why a task matters. Final guidance must be supported by a current official source before the user files a document.",
};

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function monthYear(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function shortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function demoDeadline(
  now: Date,
  id: string,
  daysFromNow: number,
  title: string,
  category: string,
): OverviewDeadline {
  const date = addDays(now, daysFromNow);

  return {
    id,
    isoDate: date.toISOString(),
    month: date
      .toLocaleDateString("en-GB", { month: "short" })
      .toUpperCase(),
    day: String(date.getDate()),
    title,
    category,
    remaining: `${daysFromNow}d`,
  };
}

export function fixtureOverview(now = new Date()): OverviewModel {
  const certificateExpiry = addDays(now, 14);

  return {
    dataMode: "demo",
    user: {
      firstName: "João",
      fullName: "João Almeida",
      plan: "Preview workspace",
    },
    corridor: {
      origin: "Brazil",
      destination: "Barcelona, Spain",
      goal: "Residence permit",
    },
    coreOnline: false,
    nextStepSource: "fixture",
    progress: {
      percent: 68,
      headline: "You’re past the halfway mark",
      body: "The hardest stages — collecting records and choosing a pathway — are behind you. Legalization and the consulate appointment are next, so you are still on track.",
      stagesDone: 4,
      stagesTotal: 6,
      started: monthYear(addMonths(now, -6)),
      estimatedPermit: monthYear(addMonths(now, 3)),
      startedIso: addMonths(now, -6).toISOString(),
      estimatedPermitIso: addMonths(now, 3).toISOString(),
    },
    nextStep: FIXTURE_NEXT_STEP,
    alerts: [
      {
        id: "criminal-record",
        tone: "warning",
        title: `Sample certificate expiry · ${shortDate(certificateExpiry)}`,
        body: "This is demonstration data. In the real journey, Atlas should show the official validity rule, its source, and the action required before a document expires.",
        isoDate: certificateExpiry.toISOString(),
      },
      {
        id: "visa-fee",
        tone: "info",
        title: "Review your consulate checklist",
        body: "This sample alert demonstrates where Atlas will surface verified fee, payment-method, and appointment changes from official sources.",
      },
    ],
    deadlines: [
      demoDeadline(
        now,
        "submission",
        12,
        "File apostilled birth certificate",
        "Submission",
      ),
      demoDeadline(
        now,
        "appointment",
        18,
        "Consulate biometrics appointment",
        "Appointment",
      ),
    ],
    documentsAttention: 2,
  };
}

export async function loadOverview(): Promise<OverviewModel> {
  const overview = fixtureOverview();
  const coreOnline = await getCoreHealth();
  overview.coreOnline = coreOnline;

  if (!coreOnline) {
    return overview;
  }

  const live = await getNextStep(DEMO_EXPLORER);

  if (!live?.next_step) {
    return overview;
  }

  const copy = STEP_COPY[live.next_step];
  overview.nextStepSource = "api";
  overview.nextStep = {
    title: live.next_step,
    context: copy?.context ?? "From your Atlas Core profile",
    requestTime: copy?.requestTime ?? "Time depends on the issuing office",
    waitTime: copy?.waitTime ?? "Waiting time varies",
    daysLeft: overview.nextStep.daysLeft,
    why:
      copy?.why ??
      "This is the next action Atlas Core returned for the current profile. Complete it before moving on to later documents.",
  };

  return overview;
}
