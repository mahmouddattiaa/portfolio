import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "../home-v2.css";

export const metadata: Metadata = {
  title: "استوديو كبلر ديف — هندسة البرمجيات والأنظمة التشغيلية",
  description:
    "كبلر ديف استوديو هندسي يطور تطبيقات الجوال ومنصات الإدارة التشغيلية المتصلة وشبكات نقاط البيع في المملكة العربية السعودية والخليج وفق معايير الحوكمة الدقيقة.",
  alternates: {
    canonical: "https://www.keplerdev.uk/ar",
    languages: {
      en: "https://www.keplerdev.uk/",
      ar: "https://www.keplerdev.uk/ar",
      "x-default": "https://www.keplerdev.uk/",
    },
  },
};

export default function ArabicHomePage() {
  return <HomePage copy={getHomeCopy("ar")} />;
}
