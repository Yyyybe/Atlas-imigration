"use client";

import { Card } from "@/app/components/Card";
import { useLocale } from "@/app/i18n/LocaleProvider";

type PlaceholderPageProps = {
  page: "deadlines" | "documents" | "guides" | "journey";
};

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  const { t } = useLocale();
  const title = t(`placeholder.${page}.title` as "placeholder.deadlines.title");
  const body = t(`placeholder.${page}.body` as "placeholder.deadlines.body");

  return (
    <Card>
      <h2 className="text-2xl font-semibold text-[var(--atlas-navy)]">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--atlas-muted)]">
        {body}
      </p>
    </Card>
  );
}
