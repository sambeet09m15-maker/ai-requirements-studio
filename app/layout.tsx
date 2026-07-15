import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bacopilot.ai"),
  title: {
    default: "BA Copilot — AI-Powered Business Analyst Tool | Free User Stories & Requirements",
    template: "%s | BA Copilot",
  },
  description:
    "BA Copilot is a free AI-powered tool for Business Analysts. Auto-generate User Stories, Acceptance Criteria, BRD, FRD, Functional Requirements, Test Scenarios and more in seconds. Includes a free BA Knowledge Hub with 50+ concepts.",
  keywords: [
    "business analyst tool",
    "AI requirements generator",
    "user story generator",
    "acceptance criteria generator",
    "BRD template",
    "FRD template",
    "business analysis tool India",
    "free BA tool",
    "requirements document generator",
    "BA knowledge hub",
    "SDLC business analyst",
    "agile business analyst",
    "Gherkin acceptance criteria",
    "MoSCoW prioritization",
    "BA Copilot",
  ],
  authors: [{ name: "BA Copilot" }],
  creator: "BA Copilot",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.bacopilot.ai",
    siteName: "BA Copilot",
    title: "BA Copilot — Your GenAI Co-Pilot for Business Analysis",
    description:
      "Learn BA skills and auto-generate user stories, requirements, acceptance criteria, use cases, and documentation in one AI-powered hub.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BA Copilot — AI-Powered Business Analyst Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BA Copilot — Your GenAI Co-Pilot for Business Analysis",
    description: "Auto-generate User Stories, Acceptance Criteria, BRD, FRD and more in seconds. Free BA Knowledge Hub included.",
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
    canonical: "https://www.bacopilot.ai",
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
        <body className="min-h-full bg-background" suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  );
}
