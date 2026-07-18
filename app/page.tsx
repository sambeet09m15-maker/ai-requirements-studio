import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { APP_NAME, APP_TAGLINE, APP_URL } from "@/lib/brand";

export const metadata: Metadata = {
  // No title override here — inherits the root layout's default title
  // ("BA Copilot — Your GenAI Copilot for Business Analysis") so the
  // homepage doesn't get the "%s | BA Copilot" template appended twice.
  description:
    `${APP_NAME} — ${APP_TAGLINE}. Learn BA skills and auto-generate user stories, requirements, acceptance criteria, use cases, and documentation in one AI-powered hub.`,
  alternates: { canonical: APP_URL },
};

export default function Page() {
  return <HomePageClient />;
}
