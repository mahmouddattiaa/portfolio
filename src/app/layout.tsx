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
import { offers, publicCaseStudies } from "@/lib/content";

const siteUrl = "https://www.keplerdev.uk";
const organizationId = `${siteUrl}/#organization`;

const softwareRecords = publicCaseStudies.map((study) => ({
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/work/${study.slug}#software`,
  name: study.publicTitle || study.title,
  description: study.solution,
  author: { "@id": organizationId },
  mainEntityOfPage: `${siteUrl}/work/${study.slug}`,
}));

const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kepler Dev — Operational Software & Product Studio",
    template: "%s",
  },
  description:
    "Kepler Dev engineers connected mobile applications, operational dashboards, and backend platforms for operations-driven businesses across the UK and GCC.",
  openGraph: {
    type: "website",
    siteName: "Kepler Dev",
    title: "Kepler Dev — Operational Software & Product Studio",
    description:
      "Contract-first engineering studio delivering connected mobile applications, operational dashboards, and backend platforms across the UK and GCC.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kepler Dev — Independent Digital Product and Software Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kepler Dev — Operational Software & Product Studio",
    description:
      "Contract-first engineering studio delivering connected mobile applications, operational dashboards, and backend platforms across the UK and GCC.",
    images: ["/opengraph-image"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  if (requestHeaders.get("x-kepler-locale") !== "ar") return defaultMetadata;
  const title = "استوديو كبلر ديف — هندسة البرمجيات والأنظمة التشغيلية";
  const description =
    "كبلر ديف استوديو هندسي يطور تطبيقات الجوال ومنصات الإدارة التشغيلية المتصلة وشبكات نقاط البيع في المملكة العربية السعودية والخليج وفق معايير الحوكمة الدقيقة.";
  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}

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

const themeScript = `try{var t=localStorage.getItem('kepler-theme');var d=t==='dark'?'dark':'light';document.documentElement.dataset.theme=d;document.documentElement.style.colorScheme=d}catch(e){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light'}`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Kepler Dev",
      url: siteUrl,
      description:
        "Independent digital product and software engineering studio delivering connected operational products across the GCC, the United Kingdom, and international markets.",
      email: "hello@keplerdev.uk",
      knowsAbout: [
        "Connected mobile applications",
        "Operational dashboards",
        "Backend platforms",
        "Arabic-first RTL products",
        "Offline-first software",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#professional-service`,
      name: "Kepler Dev",
      url: siteUrl,
      description:
        "Product engineering services for operations-driven businesses across the UK and GCC.",
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Qatar" },
        { "@type": "Country", name: "Kuwait" },
        { "@type": "Country", name: "Egypt" },
      ],
      mentions: softwareRecords,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Kepler Dev",
      publisher: { "@id": organizationId },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#engineering-services`,
      name: "Kepler Dev product engineering engagements",
      provider: { "@id": organizationId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Productized engineering engagements",
        itemListElement: offers.map((offer) => {
          const slug = offer.slug;
          return {
            "@type": "Service",
            "@id": `${siteUrl}/#service-${slug}`,
            name: offer.name,
            serviceType: offer.name,
            description: `${offer.bestFit} ${offer.outcome} ${offer.boundary}`,
            provider: { "@id": organizationId },
          };
        }),
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/work/glitre-loyalty-platform#software`,
      name: "Glitre Loyalty Platform",
      description:
        publicCaseStudies.find((study) => study.slug === "glitre-loyalty-platform")?.solution ??
        "A multi-surface fuel loyalty platform.",
      author: { "@id": organizationId },
      mainEntityOfPage: `${siteUrl}/work/glitre-loyalty-platform`,
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-kepler-locale") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}
      >
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            {locale === "ar" ? "تخطّ إلى المحتوى الرئيسي" : "Skip to main content"}
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </ThemeProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
