import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "../home-v2.css";

export const metadata: Metadata = {
  title: "كيبلر ديف — هندسة التطبيقات والأنظمة التشغيلية للمؤسسين والشركات",
  description:
    "ستوديو هندسي من القاهرة يطوّر تطبيقات الجوال، والمنتجات الرقمية الأولى (MVP)، وأنظمة نقاط البيع Sunmi، ولوحات التحكم العربية في السعودية ومصر والخليج والمملكة المتحدة.",
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
