import { Card } from "@/app/components/Card";
import type { OverviewAlert } from "@/app/lib/overview-view-model";

type AlertListProps = {
  alerts: OverviewAlert[];
};

export function AlertList({ alerts }: AlertListProps) {
  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <Card
          as="article"
          key={alert.id}
          className={
            alert.tone === "warning"
              ? "border border-[var(--atlas-sand-line)] bg-[var(--atlas-sand)] shadow-none"
              : "border border-[var(--atlas-sky-line)] bg-[var(--atlas-sky)] shadow-none"
          }
        >
          <p className="text-sm font-semibold text-[var(--atlas-navy)]">
            {alert.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--atlas-ink)]">
            {alert.body}
          </p>
        </Card>
      ))}
    </div>
  );
}
