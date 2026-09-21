import { AlertList } from "@/app/features/dashboard/AlertList";
import { DeadlinesCard } from "@/app/features/dashboard/DeadlinesCard";
import { NextStepCard } from "@/app/features/dashboard/NextStepCard";
import { ProgressCard } from "@/app/features/dashboard/ProgressCard";
import { loadOverview } from "@/app/lib/overview-view-model";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const overview = await loadOverview();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
      <div className="flex flex-col gap-4">
        <ProgressCard progress={overview.progress} />
        <NextStepCard nextStep={overview.nextStep} source={overview.nextStepSource} />
      </div>
      <div className="flex flex-col gap-4">
        <AlertList alerts={overview.alerts} />
        <DeadlinesCard deadlines={overview.deadlines} />
      </div>
    </div>
  );
}
