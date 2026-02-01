import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Finmax Trafo & Metal | Transformer Tank Manufacturing Partner",
    template: "%s | Finmax Trafo & Metal",
  },
  description:
    "Manufacturer-to-Manufacturer production partner for transformer tanks, corrugated walls and heavy metal fabrication.",
  icons: {
    icon: [{ url: "/media/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/media/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/media/favicon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = h.get("x-locale") ?? "tr";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070a0f] text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
