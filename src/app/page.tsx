import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "./home-v2.css";

export const metadata: Metadata = {
  title: "Custom App, MVP & Operations Studio | Kepler Dev",
  description:
    "Cairo software studio shipping fixed-scope MVPs in 2-5 weeks and bilingual operations platforms from $300 blueprints, backed by 10K+ app downloads.",
  alternates: {
    canonical: "https://www.keplerdev.uk/",
    languages: {
      en: "https://www.keplerdev.uk/",
      ar: "https://www.keplerdev.uk/ar",
      "x-default": "https://www.keplerdev.uk/",
    },
  },
};

export default function EnglishHomePage() {
  return <HomePage copy={getHomeCopy("en")} />;
}
