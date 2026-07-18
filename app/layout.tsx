import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { APP_NAME, APP_TAGLINE, APP_URL } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    `Practice business analysis skills with instant AI feedback. ${APP_NAME} is a free learning tool for BA students and professionals — practice writing User Stories, Acceptance Criteria, BRD, FRD, Test Scenarios and more, with a free BA Knowledge Hub of 50+ concepts.`,
  keywords: [
    "business analyst practice",
    "learn business analysis",
    "BA interview preparation",
    "AI requirements generator",
    "user story generator",
    "acceptance criteria generator",
    "BRD template",
    "FRD template",
    "business analysis training",
    "free BA tool",
    "requirements document generator",
    "BA knowledge hub",
    "SDLC business analyst",
    "agile business analyst",
    "Gherkin acceptance criteria",
    "MoSCoW prioritization",
    APP_NAME,
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description:
      "Practice business analysis skills with instant AI feedback. Learn BA concepts and practice writing user stories, requirements, acceptance criteria, use cases, and documentation in one free AI-powered hub.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Free Learning Tool for Business Analysts`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: "Practice business analysis skills with instant AI feedback. Free BA Knowledge Hub included.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="min-h-full bg-background" suppressHydrationWarning>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
