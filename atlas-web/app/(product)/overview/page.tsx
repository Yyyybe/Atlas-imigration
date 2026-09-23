import { OverviewClient } from "@/app/features/dashboard/OverviewClient";
import { loadOverview } from "@/app/lib/overview-view-model";

export default async function OverviewPage() {
  const overview = await loadOverview();

  return <OverviewClient overview={overview} />;
}
