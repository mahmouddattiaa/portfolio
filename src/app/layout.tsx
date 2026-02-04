import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmoud Attia | Full-Stack Developer",
  description: "Specializing in High-Performance Web, Mobile, and Distributed Systems. Architecting scalable solutions in Egypt & Beyond.",
  openGraph: {
    title: "Mahmoud Attia | Full-Stack Developer",
    description: "Specializing in High-Performance Web, Mobile, and Distributed Systems.",
    url: "https://your-portfolio-url.com", // TODO: Update with actual URL
    siteName: "Mahmoud Attia Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Add an OG image to public/ later
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
