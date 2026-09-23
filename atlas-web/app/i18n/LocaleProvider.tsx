"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "pt";

const copy = {
  en: {
    "language.label": "Choose language",
    "header.how": "How it works",
    "header.trust": "Built for trust",
    "header.preview": "Dashboard preview",
    "header.nav": "Landing page navigation",
    "landing.home": "Atlas home",
    "hero.eyebrow": "Atlas Immigration",
    "hero.title.first": "Moving countries is complex.",
    "hero.title.second": "Knowing what comes next shouldn’t be.",
    "hero.intro":
      "Atlas turns scattered requirements, documents, and deadlines into one calm journey — built around your situation and your next meaningful step.",
    "hero.guide": "See how Atlas guides you",
    "hero.preview": "Open product preview",
    "hero.designed": "Designed for",
    "hero.designedValue": "Real journeys",
    "hero.built": "Built around",
    "hero.builtValue": "Verified guidance",
    "hero.answers": "Always answers",
    "hero.answersValue": "What comes next?",
    "hero.scroll": "Scroll to begin",
    "story.kicker": "How Atlas works",
    "story.title": "Complexity becomes a journey you can understand.",
    "story.1.eyebrow": "See the whole picture",
    "story.1.title": "A move is never just one form.",
    "story.1.body":
      "Passports, certificates, appointments, translations, fees, and deadlines all depend on one another. Atlas keeps those details inside one understandable journey.",
    "story.2.eyebrow": "Bring order to the details",
    "story.2.title": "Every document has a reason and a moment.",
    "story.2.body":
      "Instead of giving you a generic checklist, Atlas is designed to explain what matters now, what comes later, and why each requirement belongs in your path.",
    "story.3.eyebrow": "Keep moving with confidence",
    "story.3.title": "One clear next step, without the noise.",
    "story.3.body":
      "Your progress, current task, deadlines, and explanations stay visible. You can return after days or weeks and immediately understand where you are.",
    "story.passport.small": "Federative Republic",
    "story.passport.title": "Passport",
    "story.certificate.small": "Civil registry",
    "story.certificate.title": "Birth certificate",
    "story.permit.small": "Destination",
    "story.permit.title": "Residence permit",
    "story.next.label": "Your next step",
    "story.next.title": "Verify your document pathway",
    "story.next.meta": "Clear reason · official source · expected timing",
    "trust.kicker": "Built for trust",
    "trust.title": "Guidance should make life feel lighter.",
    "trust.body":
      "Immigration decisions carry real consequences. Atlas is being designed to communicate with restraint, transparency, and respect.",
    "trust.1.title": "Clarity before complexity",
    "trust.1.body":
      "The interface prioritizes what you need now, with deeper explanations available when you want them.",
    "trust.2.title": "Trust before automation",
    "trust.2.body":
      "Atlas is designed to connect important guidance to current official sources and show uncertainty honestly.",
    "trust.3.title": "Progress without pressure",
    "trust.3.body":
      "No fear, false urgency, or engagement tricks — only useful milestones, reminders, and next actions.",
    "final.title": "Your immigration journey, understood.",
    "final.body":
      "Explore the current product preview and see how Atlas keeps progress, tasks, deadlines, and explanations in one calm place.",
    "final.cta": "Explore the dashboard preview",
    "footer.tagline": "Guiding new beginnings with clarity and care.",
    "footer.preview": "Product preview · 2026",
    "nav.overview": "Overview",
    "nav.journey": "Journey",
    "nav.documents": "Documents",
    "nav.deadlines": "Deadlines",
    "nav.guides": "Guides",
    "nav.advisor": "Advisor",
    "nav.settings": "Settings",
    "nav.comingSoon": "Coming soon",
    "nav.primary": "Primary navigation",
    "nav.mobile": "Mobile navigation",
    "nav.open": "Open navigation",
    "nav.close": "Close navigation",
    "shell.notifications": "Notifications coming soon",
    "shell.advisorTitle": "Advisor support is not available in this preview",
    "shell.advisorButton": "Advisor coming soon",
    "shell.previewPlan": "Preview workspace",
    "shell.goal": "Residence permit",
    "shell.origin": "Brazil",
    "shell.destination": "Barcelona, Spain",
    "greeting.morning": "Good morning",
    "greeting.afternoon": "Good afternoon",
    "greeting.evening": "Good evening",
    "overview.noticeLabel": "Preview data notice",
    "overview.noticeLead": "Product preview.",
    "overview.noticeBody":
      "Progress, alerts, documents, and dates are sample data. When available, Atlas Core supplies only the next-step title.",
    "overview.upcoming": "Upcoming deadlines",
    "overview.calendar": "Calendar",
    "overview.nextStep": "Your next step",
    "overview.liveSource": "Live next step from Atlas Core",
    "overview.sampleTask": "Sample task",
    "overview.daysLeft": "days left",
    "overview.why": "Why this matters",
    "overview.complete": "complete",
    "overview.percentComplete": "percent complete",
    "overview.stage": "Stage",
    "overview.of": "of",
    "overview.stagesDone": "Stages done",
    "overview.started": "Started",
    "overview.estimated": "Estimated permit",
    "model.progress.headline": "You’re past the halfway mark",
    "model.progress.body":
      "The hardest stages — collecting records and choosing a pathway — are behind you. Legalization and the consulate appointment are next, so you are still on track.",
    "model.next.title": "Apostille your birth certificate",
    "model.next.context": "Part of document legalization",
    "model.next.request": "About 20 minutes to request",
    "model.next.wait": "3–10 business days to receive",
    "model.next.why":
      "This sample shows how Atlas will explain why a task matters. Final guidance must be supported by a current official source before the user files a document.",
    "model.alert.certificate": "Sample certificate expiry",
    "model.alert.certificateBody":
      "This is demonstration data. In the real journey, Atlas should show the official validity rule, its source, and the action required before a document expires.",
    "model.alert.checklist": "Review your consulate checklist",
    "model.alert.checklistBody":
      "This sample alert demonstrates where Atlas will surface verified fee, payment-method, and appointment changes from official sources.",
    "model.deadline.submission": "File apostilled birth certificate",
    "model.deadline.submissionCategory": "Submission",
    "model.deadline.appointment": "Consulate biometrics appointment",
    "model.deadline.appointmentCategory": "Appointment",
    "placeholder.deadlines.title": "Deadlines",
    "placeholder.deadlines.body":
      "A calendar of submissions and appointments will expand this view. The Overview already lists the next two dates so nothing urgent is hidden.",
    "placeholder.documents.title": "Documents",
    "placeholder.documents.body":
      "Required files, upload status, and apostille checks will appear here. Two items currently need attention, matching the badge in navigation.",
    "placeholder.guides.title": "Guides",
    "placeholder.guides.body":
      "Plain-language explainers and advisor contact will sit here. Atlas is not a chatbot: guidance stays attached to the current task.",
    "placeholder.journey.title": "Journey",
    "placeholder.journey.body":
      "Your staged path from diagnosis to permit will live here. Atlas still uses this shell so the Overview remains the place that answers “what should I do now?”",
  },
  pt: {
    "language.label": "Escolher idioma",
    "header.how": "Como funciona",
    "header.trust": "Feito para confiar",
    "header.preview": "Prévia do painel",
    "header.nav": "Navegação da página de apresentação",
    "landing.home": "Início do Atlas",
    "hero.eyebrow": "Atlas Immigration",
    "hero.title.first": "Mudar de país é complexo.",
    "hero.title.second": "Saber o próximo passo não deveria ser.",
    "hero.intro":
      "O Atlas transforma requisitos, documentos e prazos dispersos em uma jornada tranquila — organizada em torno da sua situação e do seu próximo passo relevante.",
    "hero.guide": "Veja como o Atlas orienta você",
    "hero.preview": "Abrir prévia do produto",
    "hero.designed": "Criado para",
    "hero.designedValue": "Jornadas reais",
    "hero.built": "Baseado em",
    "hero.builtValue": "Orientação verificada",
    "hero.answers": "Sempre responde",
    "hero.answersValue": "Qual é o próximo passo?",
    "hero.scroll": "Role para começar",
    "story.kicker": "Como o Atlas funciona",
    "story.title": "A complexidade vira uma jornada que você entende.",
    "story.1.eyebrow": "Veja o cenário completo",
    "story.1.title": "Uma mudança nunca é apenas um formulário.",
    "story.1.body":
      "Passaportes, certidões, agendamentos, traduções, taxas e prazos dependem uns dos outros. O Atlas mantém tudo dentro de uma jornada compreensível.",
    "story.2.eyebrow": "Organize cada detalhe",
    "story.2.title": "Todo documento tem um motivo e um momento.",
    "story.2.body":
      "Em vez de uma lista genérica, o Atlas explica o que importa agora, o que vem depois e por que cada requisito faz parte do seu caminho.",
    "story.3.eyebrow": "Avance com confiança",
    "story.3.title": "Um próximo passo claro, sem ruído.",
    "story.3.body":
      "Seu progresso, tarefa atual, prazos e explicações ficam sempre visíveis. Mesmo depois de dias ou semanas, você entende imediatamente onde está.",
    "story.passport.small": "República Federativa",
    "story.passport.title": "Passaporte",
    "story.certificate.small": "Registro civil",
    "story.certificate.title": "Certidão de nascimento",
    "story.permit.small": "Destino",
    "story.permit.title": "Autorização de residência",
    "story.next.label": "Seu próximo passo",
    "story.next.title": "Verifique o caminho dos documentos",
    "story.next.meta": "Motivo claro · fonte oficial · prazo esperado",
    "trust.kicker": "Feito para confiar",
    "trust.title": "A orientação deve deixar a vida mais leve.",
    "trust.body":
      "Decisões migratórias têm consequências reais. O Atlas foi pensado para comunicar com serenidade, transparência e respeito.",
    "trust.1.title": "Clareza antes da complexidade",
    "trust.1.body":
      "A interface prioriza o que você precisa agora e oferece explicações mais profundas quando desejar.",
    "trust.2.title": "Confiança antes da automação",
    "trust.2.body":
      "O Atlas conecta orientações importantes a fontes oficiais atuais e apresenta incertezas com honestidade.",
    "trust.3.title": "Progresso sem pressão",
    "trust.3.body":
      "Sem medo, falsa urgência ou truques de engajamento — apenas marcos, lembretes e próximas ações úteis.",
    "final.title": "Sua jornada migratória, compreendida.",
    "final.body":
      "Explore a prévia do produto e veja como o Atlas reúne progresso, tarefas, prazos e explicações em um só lugar.",
    "final.cta": "Explorar a prévia do painel",
    "footer.tagline": "Orientando novos começos com clareza e cuidado.",
    "footer.preview": "Prévia do produto · 2026",
    "nav.overview": "Visão geral",
    "nav.journey": "Jornada",
    "nav.documents": "Documentos",
    "nav.deadlines": "Prazos",
    "nav.guides": "Guias",
    "nav.advisor": "Consultor",
    "nav.settings": "Configurações",
    "nav.comingSoon": "Em breve",
    "nav.primary": "Navegação principal",
    "nav.mobile": "Navegação móvel",
    "nav.open": "Abrir navegação",
    "nav.close": "Fechar navegação",
    "shell.notifications": "Notificações em breve",
    "shell.advisorTitle": "O suporte de consultoria não está disponível nesta prévia",
    "shell.advisorButton": "Consultoria em breve",
    "shell.previewPlan": "Espaço de demonstração",
    "shell.goal": "Autorização de residência",
    "shell.origin": "Brasil",
    "shell.destination": "Barcelona, Espanha",
    "greeting.morning": "Bom dia",
    "greeting.afternoon": "Boa tarde",
    "greeting.evening": "Boa noite",
    "overview.noticeLabel": "Aviso sobre os dados da prévia",
    "overview.noticeLead": "Prévia do produto.",
    "overview.noticeBody":
      "O progresso, os alertas, os documentos e as datas são dados de demonstração. Quando disponível, o Atlas Core fornece apenas o título do próximo passo.",
    "overview.upcoming": "Próximos prazos",
    "overview.calendar": "Calendário",
    "overview.nextStep": "Seu próximo passo",
    "overview.liveSource": "Próximo passo ao vivo do Atlas Core",
    "overview.sampleTask": "Tarefa de demonstração",
    "overview.daysLeft": "dias restantes",
    "overview.why": "Por que isso importa",
    "overview.complete": "concluído",
    "overview.percentComplete": "por cento concluído",
    "overview.stage": "Etapa",
    "overview.of": "de",
    "overview.stagesDone": "Etapas concluídas",
    "overview.started": "Início",
    "overview.estimated": "Autorização estimada",
    "model.progress.headline": "Você já passou da metade",
    "model.progress.body":
      "As etapas mais exigentes — reunir registros e escolher o caminho — ficaram para trás. A legalização e o agendamento consular vêm agora, e você continua no rumo certo.",
    "model.next.title": "Apostile sua certidão de nascimento",
    "model.next.context": "Parte da legalização de documentos",
    "model.next.request": "Cerca de 20 minutos para solicitar",
    "model.next.wait": "3–10 dias úteis para receber",
    "model.next.why":
      "Esta demonstração mostra como o Atlas explica por que uma tarefa importa. A orientação final deve estar apoiada em uma fonte oficial atual antes do envio do documento.",
    "model.alert.certificate": "Validade simulada da certidão",
    "model.alert.certificateBody":
      "Este é um dado de demonstração. Na jornada real, o Atlas mostrará a regra oficial de validade, sua fonte e a ação necessária antes do vencimento.",
    "model.alert.checklist": "Revise a lista do consulado",
    "model.alert.checklistBody":
      "Este alerta demonstra onde o Atlas apresentará mudanças verificadas de taxas, formas de pagamento e agendamentos a partir de fontes oficiais.",
    "model.deadline.submission": "Enviar certidão de nascimento apostilada",
    "model.deadline.submissionCategory": "Envio",
    "model.deadline.appointment": "Agendamento biométrico no consulado",
    "model.deadline.appointmentCategory": "Agendamento",
    "placeholder.deadlines.title": "Prazos",
    "placeholder.deadlines.body":
      "Um calendário de envios e agendamentos ampliará esta visão. A Visão geral já mostra as duas próximas datas para que nada urgente fique oculto.",
    "placeholder.documents.title": "Documentos",
    "placeholder.documents.body":
      "Arquivos obrigatórios, status de envio e verificações de apostila aparecerão aqui. Dois itens precisam de atenção, como indica o selo na navegação.",
    "placeholder.guides.title": "Guias",
    "placeholder.guides.body":
      "Explicações em linguagem simples e o contato de consultoria ficarão aqui. O Atlas não é um chatbot: a orientação permanece ligada à tarefa atual.",
    "placeholder.journey.title": "Jornada",
    "placeholder.journey.body":
      "Seu caminho por etapas, do diagnóstico à autorização, ficará aqui. A Visão geral continua sendo o lugar que responde “o que devo fazer agora?”.",
  },
} as const;

export type TranslationKey = keyof (typeof copy)["en"];

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "atlas-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const preferred =
      stored === "pt" || stored === "en"
        ? stored
        : navigator.language.toLowerCase().startsWith("pt")
          ? "pt"
          : "en";

    setLocaleState(preferred);
    document.documentElement.lang = preferred === "pt" ? "pt-BR" : "en";
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => copy[locale][key],
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
