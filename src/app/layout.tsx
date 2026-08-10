import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer, Header } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-display" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keplerdev.uk"),
  title: { default: "Kepler Dev — Connected product engineering", template: "%s | Kepler Dev" },
  description: "Kepler Dev is a founder-led product engineering studio for teams replacing fragmented operations with one connected product.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Kepler Dev", title: "Kepler Dev — Connected product engineering", description: "Replace fragmented operations with one connected product." },
};

const themeScript = `try{var t=localStorage.getItem('kepler-theme')||'system';var d=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.dataset.theme=d;document.documentElement.style.colorScheme=d}catch(e){}`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "Kepler Dev", url: "https://www.keplerdev.uk", description: "Founder-led product engineering for connected operational products." },
    { "@type": "Person", name: "Mahmoud", url: "https://www.keplerdev.uk/mahmoud", worksFor: { "@type": "Organization", name: "Kepler Dev" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></head><body className={`${geist.variable} ${newsreader.variable} ${mono.variable}`}><ThemeProvider><a className="skip-link" href="#main-content">Skip to main content</a><Header /><main id="main-content">{children}</main><Footer /></ThemeProvider><Analytics /></body></html>;
}
