import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Syne } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.keplerdev.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mahmoud Attia | Mobile & Backend Developer | AI Integration Specialist",
  description:
    "Mobile and backend developer specializing in Telegram bots, AI integrations, and Flutter/React Native apps. Available on Upwork for automation and AI projects. Cairo, Egypt.",
  keywords: [
    "Telegram bot developer",
    "Flutter developer",
    "React Native developer",
    "AI integration specialist",
    "Python automation",
    "Backend developer Cairo",
    "Upwork freelancer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mahmoud Attia | Mobile & Backend Developer | AI Integration Specialist",
    description:
      "Telegram bots, AI integrations, and mobile apps built for real business workflows.",
    url: siteUrl,
    siteName: "Mahmoud Attia",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Attia | Mobile & Backend Developer",
    description:
      "Available for bots, AI integrations, and mobile app builds.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
