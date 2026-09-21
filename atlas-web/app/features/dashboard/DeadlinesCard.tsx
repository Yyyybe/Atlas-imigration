import Link from "next/link";
import { Card } from "@/app/components/Card";
import type { OverviewDeadline } from "@/app/lib/overview-view-model";

type DeadlinesCardProps = {
  deadlines: OverviewDeadline[];
};

export function DeadlinesCard({ deadlines }: DeadlinesCardProps) {
  return (
    <Card aria-labelledby="deadlines-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="deadlines-heading"
          className="text-lg font-semibold text-[var(--atlas-navy)]"
        >
          Upcoming deadlines
        </h2>
        <Link
          href="/deadlines"
          className="text-sm font-semibold text-[var(--atlas-navy)] underline-offset-4 hover:underline"
        >
          Calendar
        </Link>
      </div>
      <ul className="space-y-3">
        {deadlines.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-[1.15rem] bg-[var(--atlas-mist)] px-3 py-3"
          >
            <time dateTime={item.isoDate} className="w-12 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--atlas-muted)]">
                {item.month}
              </p>
              <p className="text-lg font-semibold text-[var(--atlas-navy)]">
                {item.day}
              </p>
            </time>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--atlas-navy)]">
                {item.title}
              </p>
              <p className="text-xs text-[var(--atlas-muted)]">{item.category}</p>
            </div>
            <span className="text-sm font-semibold text-[var(--atlas-muted)]">
              {item.remaining}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
