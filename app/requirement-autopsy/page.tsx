import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ScanSearch } from "lucide-react";
import { RequirementAutopsy } from "@/components/RequirementAutopsy";
import { BrandLogo } from "@/components/BrandLogo";
import { APP_URL } from "@/lib/brand";

export const metadata = {
  title: "Requirement Autopsy — BA Worked Example for Logistics & Supply Chain",
  description:
    "See a complete Business Analysis worked example: one real logistics requirement broken down through every BA technique — Gap Analysis, MoSCoW, INVEST, User Story, Acceptance Criteria, RACI, and UAT.",
  alternates: { canonical: `${APP_URL}/requirement-autopsy` },
};

export default function RequirementAutopsyPage() {
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
              <ScanSearch className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">Requirement Autopsy</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">A complete worked example — one real requirement, every BA technique applied, from vague first draft to UAT sign-off.</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Domain: Logistics &amp; Supply Chain — chosen because it provides concrete, realistic examples that apply across industries.</p>
            </div>
          </div>
        </section>

        <RequirementAutopsy />
      </div>
    </main>
  );
}
