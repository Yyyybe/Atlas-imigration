import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { LocaleProvider } from "@/app/i18n/LocaleProvider";
import "./globals.css";
import "./landing.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atlas Immigration",
    template: "%s · Atlas Immigration",
  },
  description:
    "A calm, clear guide for every step of your immigration journey.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.className} antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
