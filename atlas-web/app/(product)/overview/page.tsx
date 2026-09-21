import { AlertList } from "@/app/features/dashboard/AlertList";
import { DeadlinesCard } from "@/app/features/dashboard/DeadlinesCard";
import { NextStepCard } from "@/app/features/dashboard/NextStepCard";
import { ProgressCard } from "@/app/features/dashboard/ProgressCard";
import { loadOverview } from "@/app/lib/overview-view-model";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const overview = await loadOverview();

  return (
    <div className="space-y-4">
      <section
        aria-label="Preview data notice"
        className="rounded-[1.25rem] border border-[var(--atlas-sky-line)] bg-[var(--atlas-sky)] px-4 py-3 text-sm leading-6 text-[var(--atlas-sky-ink)]"
      >
        <span className="font-semibold">Product preview.</span> Progress,
        alerts, documents, and dates are sample data. When available, Atlas
        Core supplies only the next-step title.
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
        <div className="flex flex-col gap-4">
          <ProgressCard progress={overview.progress} />
          <NextStepCard
            nextStep={overview.nextStep}
            source={overview.nextStepSource}
          />
        </div>
        <div className="flex flex-col gap-4">
          <AlertList alerts={overview.alerts} />
          <DeadlinesCard deadlines={overview.deadlines} />
        </div>
      </div>
    </div>
  );
}
