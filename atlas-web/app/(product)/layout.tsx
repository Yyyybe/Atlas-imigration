import { AppShell } from "@/app/components/AppShell";
import { formatLongDate, greetingFor } from "@/app/lib/datetime";
import { fixtureOverview } from "@/app/lib/overview-view-model";

export const dynamic = "force-dynamic";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const overview = fixtureOverview();

  return (
    <AppShell
      userName={overview.user.fullName}
      plan={overview.user.plan}
      documentsAttention={overview.documentsAttention}
      dateLabel={formatLongDate()}
      greeting={`${greetingFor()}, ${overview.user.firstName}`}
      origin={overview.corridor.origin}
      destination={overview.corridor.destination}
      goal={overview.corridor.goal}
    >
      {children}
    </AppShell>
  );
}
