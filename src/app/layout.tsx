import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Sans_Arabic, Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./refinement.css";
import "./global-atelier.css";
import "./global-atelier-home.css";
import { Footer, Header } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-atelier-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-atelier-body",
  display: "swap",
});
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atelier-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keplerdev.uk"),
  title: {
    default: "Kepler Dev — Thoughtful digital products",
    template: "%s | Kepler Dev",
  },
  description:
    "Kepler Dev is an independent digital product studio in Cairo, partnering with ambitious teams across the GCC and worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kepler Dev",
    title: "Kepler Dev — Thoughtful digital products",
    description:
      "Thoughtful digital products, made to move your business forward.",
  },
};

const themeScript = `try{var t=localStorage.getItem('kepler-theme')||'system';var d=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.dataset.theme=d;document.documentElement.style.colorScheme=d}catch(e){}`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kepler Dev",
      url: "https://www.keplerdev.uk",
      description:
        "Founder-led product engineering for connected operational products.",
    },
    {
      "@type": "Person",
      name: "Mahmoud",
      url: "https://www.keplerdev.uk/mahmoud",
      worksFor: { "@type": "Organization", name: "Kepler Dev" },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-kepler-locale") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}
      >
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
