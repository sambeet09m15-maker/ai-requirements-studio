import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "BA Copilot — Your GenAI Co-Pilot for Business Analysis",
  description:
    "BA Copilot — Your GenAI co-pilot for Business Analysis. Learn BA skills and auto-generate user stories, requirements, acceptance criteria, use cases, and documentation in one AI-powered hub.",
  alternates: { canonical: "https://www.bacopilot.ai" },
};

export default function Page() {
  return <HomePageClient />;
}
