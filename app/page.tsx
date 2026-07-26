import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { RatingBadge } from "@/components/RatingBadge";
import { APP_NAME, APP_TAGLINE, APP_URL } from "@/lib/brand";

// Forces this page to render per-request rather than at build time. Without
// this, RatingBadge's Redis read would run once during `next build` and get
// frozen into static HTML — the opposite of the live, never-fabricated
// number this badge is required to show.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // No title override here — inherits the root layout's default title
  // ("BA Copilot — Your GenAI Copilot for Business Analysis") so the
  // homepage doesn't get the "%s | BA Copilot" template appended twice.
  description:
    `Practice business analysis skills with instant AI feedback. ${APP_NAME} — ${APP_TAGLINE}. Practice writing user stories, requirements, acceptance criteria, use cases, and documentation in one free AI-powered hub.`,
  alternates: { canonical: APP_URL },
};

export default function Page() {
  return <HomePageClient ratingBadge={<RatingBadge />} />;
}
