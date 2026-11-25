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
import { faqs, offers, publicCaseStudies } from "@/lib/content";
import { homeAr } from "@/content/home/ar";

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
    default: "Custom App, MVP & Operations Studio | Kepler Dev",
    template: "%s",
  },
  description:
    "Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads.",
  openGraph: {
    type: "website",
    siteName: "Kepler Dev",
    title: "Custom App, MVP & Operations Studio | Kepler Dev",
    description:
      "Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kepler Dev — Bilingual App & Operations Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom App, MVP & Operations Studio | Kepler Dev",
    description:
      "Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads.",
    images: ["/opengraph-image"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  if (requestHeaders.get("x-kepler-locale") !== "ar") return defaultMetadata;
  const title = "شركة برمجة تطبيقات ولوحات تحكم عربية | Kepler Dev";
  const description =
    "ستوديو هندسي من القاهرة لبناء تطبيقات الجوال، أنظمة نقاط بيع Sunmi، ولوحات التحكم العربية بأسعار تبدأ من $300 خلال 2-5 أسابيع للسعودية ومصر والخليج.";
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

const areaServedCountries = [
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Egypt" },
];

const verifiedSameAs = [
  "https://github.com/mahmouddattiaa",
  "https://www.linkedin.com/in/mahmoud-attia-b372b0352",
];

const offerPriceSpecs: Record<string, { minPrice: number; unitCode?: string }> = {
  blueprint: { minPrice: 300 },
  "launch-sprint": { minPrice: 1800 },
  "operations-platform": { minPrice: 4000 },
  "product-care": { minPrice: 250, unitCode: "MON" },
};

function buildStructuredData(locale: "en" | "ar") {
  const faqItems = locale === "ar" ? homeAr.faq.items : faqs;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Kepler Dev",
        legalName: "Mahmoud Attia, trading as Kepler Dev",
        url: siteUrl,
        description:
          "Contract-first bilingual (Arabic-first RTL and English) digital product and operational software engineering studio in Cairo serving founders and SMEs across Saudi Arabia, the GCC, Egypt, and the UK.",
        email: "hello@keplerdev.uk",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        areaServed: areaServedCountries,
        knowsAbout: [
          "Contract-First OpenAPI Architecture",
          "MVP Development for Founders",
          "Connected mobile applications",
          "Operational dashboards",
          "Backend platforms",
          "Arabic-first RTL web dashboards",
          "Offline-first software",
          "Flutter and React Native mobile apps",
          "Sunmi Android POS and Mada payments",
          "Idempotent financial ledgers and webhooks",
          "Bounded schema-validated AI systems",
        ],
        sameAs: verifiedSameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#professional-service`,
        name: "Kepler Dev",
        url: siteUrl,
        description:
          "Product engineering services for operations-driven businesses across the UK, Saudi Arabia, GCC, and Egypt.",
        provider: { "@id": organizationId },
        areaServed: areaServedCountries,
        sameAs: verifiedSameAs,
        mentions: softwareRecords.map((record) => ({ "@id": record["@id"] })),
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
        areaServed: areaServedCountries,
        inLanguage: ["en", "ar"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Productized engineering engagements",
          itemListElement: offers.map((offer) => ({
            "@id": `${siteUrl}/#service-${offer.slug}`,
          })),
        },
      },
      ...offers.map((offer) => ({
        "@type": "Service",
        "@id": `${siteUrl}/#service-${offer.slug}`,
        name: offer.name,
        serviceType: offer.name,
        description: `${offer.bestFit} ${offer.outcome} ${offer.boundary}`,
        provider: { "@id": organizationId },
        areaServed: areaServedCountries,
        offers: { "@id": `${siteUrl}/#offer-${offer.slug}` },
      })),
      ...offers.map((offer) => {
        const spec = offerPriceSpecs[offer.slug] ?? { minPrice: 300 };
        return {
          "@type": "Offer",
          "@id": `${siteUrl}/#offer-${offer.slug}`,
          name: `${offer.name} (${offer.duration})`,
          url: `${siteUrl}/services`,
          priceCurrency: "USD",
          itemOffered: { "@id": `${siteUrl}/#service-${offer.slug}` },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: spec.minPrice,
            priceCurrency: "USD",
            ...(spec.unitCode ? { unitCode: spec.unitCode } : {}),
          },
        };
      }),
      ...softwareRecords,
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        inLanguage: locale,
        mainEntity: faqItems.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-kepler-locale") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const jsonLd = JSON.stringify(buildStructuredData(locale)).replace(/</g, "\\u003c");
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
