import { getCoreHealth, getNextStep } from "@/app/lib/api";

export type AlertTone = "warning" | "info";

export type OverviewAlert = {
  id: string;
  tone: AlertTone;
  title: string;
  body: string;
};

export type OverviewDeadline = {
  id: string;
  month: string;
  day: string;
  title: string;
  category: string;
  remaining: string;
};

export type OverviewModel = {
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
    why: "Spain uses a recent criminal-record certificate to assess residence applications.",
  },
  "Providenciar a Apostila de Haia dos antecedentes criminais.": {
    context: "Part of document legalization",
    requestTime: "About 20 minutes to request",
    waitTime: "3–10 business days to receive",
    why: "An apostille confirms the certificate is authentic so a Spanish office can accept it.",
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
  why: "Spain needs an apostille to confirm your Brazilian birth certificate is genuine. Without it, the consulate cannot accept the document — even if the certificate itself is valid.",
};

export function fixtureOverview(): OverviewModel {
  return {
    user: {
      firstName: "João",
      fullName: "João Almeida",
      plan: "Atlas Plus · €19/mo",
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
      started: "March 2026",
      estimatedPermit: "Early Dec 2026",
    },
    nextStep: FIXTURE_NEXT_STEP,
    alerts: [
      {
        id: "criminal-record",
        tone: "warning",
        title: "Criminal record certificate expires 2 Oct",
        body: "Why it matters: Spain usually wants a certificate issued in the last 90 days. If it lapses, you may need a new copy before your appointment — so you are fine if you apostille this week.",
      },
      {
        id: "visa-fee",
        tone: "info",
        title: "Consulate visa fee changed to €80",
        body: "Bring the updated amount in cash or card as listed on your appointment letter. Atlas already noted the change on your payment checklist.",
      },
    ],
    deadlines: [
      {
        id: "submission",
        month: "SEP",
        day: "20",
        title: "File apostilled birth certificate",
        category: "Submission",
        remaining: "12d",
      },
      {
        id: "appointment",
        month: "SEP",
        day: "26",
        title: "Consulate biometrics appointment",
        category: "Appointment",
        remaining: "18d",
      },
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
