import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "./home-v2.css";

export const metadata: Metadata = {
  title: "Kepler Dev — Operational Software & Product Studio",
  description:
    "Kepler Dev engineers connected mobile applications, operational dashboards, and backend platforms for operations-driven businesses across the UK and GCC.",
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
