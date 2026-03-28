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

export const metadata: Metadata = {
  title: "Mahmoud Attia | Systems Engineer & Full-Stack Developer",
  description: "Building scalable web platforms, mobile apps, and distributed systems. Available for enterprise and startup engagements.",
  openGraph: {
    title: "Mahmoud Attia | Systems Engineer & Full-Stack Developer",
    description: "Building scalable web platforms, mobile apps, and distributed systems.",
    url: "https://your-portfolio-url.com",
    siteName: "Mahmoud Attia Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
