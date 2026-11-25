import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "../home-v2.css";

export const metadata: Metadata = {
  title: "شركة برمجة تطبيقات ولوحات تحكم عربية | Kepler Dev",
  description:
    "ستوديو هندسي من القاهرة لبناء تطبيقات الجوال، أنظمة نقاط بيع Sunmi، ولوحات التحكم العربية بأسعار تبدأ من $300 خلال 2-5 أسابيع للسعودية ومصر والخليج.",
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
