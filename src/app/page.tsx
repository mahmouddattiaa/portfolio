import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getHomeCopy } from "@/content/home";
import "./home-v2.css";

export const metadata: Metadata = {
  title: "Kepler Dev — Digital Product & Operational Software Studio",
  description:
    "Cairo software engineering studio designing and building connected mobile apps, Arabic-first RTL dashboards, and v1 MVPs for founders and businesses across the GCC and UK.",
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
