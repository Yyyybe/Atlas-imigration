import { Card } from "@/app/components/Card";

type PlaceholderPageProps = {
  title: string;
  body: string;
};

export function PlaceholderPage({ title, body }: PlaceholderPageProps) {
  return (
    <Card>
      <h2 className="text-2xl font-semibold text-[var(--atlas-navy)]">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--atlas-muted)]">
        {body}
      </p>
    </Card>
  );
}
