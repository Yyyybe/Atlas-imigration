import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { AppShell } from "@/app/components/AppShell";
import { formatLongDate, greetingFor } from "@/app/lib/datetime";
import { fixtureOverview } from "@/app/lib/overview-view-model";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas Immigration",
  description: "A calm guide for your immigration journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const overview = fixtureOverview();

  return (
    <html lang="en">
      <body className={`${sourceSans.className} antialiased`}>
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
      </body>
    </html>
  );
}
