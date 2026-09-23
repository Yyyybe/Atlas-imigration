import { AppShell } from "@/app/components/AppShell";
import { fixtureOverview } from "@/app/lib/overview-view-model";

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
      origin={overview.corridor.origin}
      destination={overview.corridor.destination}
      goal={overview.corridor.goal}
    >
      {children}
    </AppShell>
  );
}
