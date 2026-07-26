import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Network } from "lucide-react";
import { ConceptMap } from "@/components/ConceptMap";
import { BrandLogo } from "@/components/BrandLogo";
import { APP_NAME, APP_URL } from "@/lib/brand";

const TITLE = "BA Concept Map — Interactive SDLC and Business Analysis Concepts";
const DESCRIPTION =
  "Interactive Business Analysis concept map covering 56 BA concepts across 8 SDLC phases, from planning to production support. Click any node to learn more.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${APP_URL}/concept-map` },
  openGraph: {
    type: "website",
    url: `${APP_URL}/concept-map`,
    siteName: APP_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function ConceptMapPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 sm:px-7 lg:px-9">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
                <Image src="/ba-knowledge-hub-logo.png" alt="BA Knowledge Hub logo" width={44} height={44} className="size-11 object-cover" priority />
              </span>
              <BrandLogo size="md" theme="light" href={null} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              <ArrowLeft className="size-4" />
              Back to Studio
            </Link>
          </div>
        </header>

        <section className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
              <Network className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">BA Concept Map</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">See how every Business Analysis concept connects to the others. Click any node to learn more.</p>
            </div>
          </div>
        </section>

        <ConceptMap />
      </div>
    </main>
  );
}
