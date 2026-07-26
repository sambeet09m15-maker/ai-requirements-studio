import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { RatingBadge } from "@/components/RatingBadge";
import { APP_NAME, APP_TAGLINE, APP_URL } from "@/lib/brand";
import { getRatingsSummary } from "@/lib/redis";

// Forces this page to render per-request rather than at build time. Without
// this, RatingBadge's Redis read would run once during `next build` and get
// frozen into static HTML — the opposite of the live, never-fabricated
// number this badge is required to show.
export const dynamic = "force-dynamic";

const HOMEPAGE_DESCRIPTION =
  "Free AI tool for business analysts: practice user stories, acceptance criteria, BRD, FRD and more with instant feedback, plus a BA concept map and skill guides.";

export const metadata: Metadata = {
  // No title override here — inherits the root layout's default title
  // ("BA Copilot — Your GenAI Copilot for Business Analysis") so the
  // homepage doesn't get the "%s | BA Copilot" template appended twice.
  description: HOMEPAGE_DESCRIPTION,
  alternates: { canonical: APP_URL },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: HOMEPAGE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${APP_NAME} — Free Learning Tool for Business Analysts` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: HOMEPAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  // Structured data must reflect what's actually visible on the page — the
  // same rule this app already follows for the rating badge itself (see
  // RatingBadge.tsx / lib/limits.ts MIN_RATINGS_TO_SHOW). aggregateRating is
  // only included once there's a credible sample size; otherwise Google
  // guidelines treat an aggregateRating claim with no real backing data as
  // markup abuse, so it's omitted rather than fabricated.
  const ratings = await getRatingsSummary();

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    url: APP_URL,
    description: HOMEPAGE_DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(ratings.showBadge
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: ratings.average,
            reviewCount: ratings.count,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <HomePageClient ratingBadge={<RatingBadge />} />
    </>
  );
}
