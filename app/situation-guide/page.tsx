import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { SituationGuide } from "@/components/SituationGuide";
import { BrandLogo } from "@/components/BrandLogo";
import { APP_URL } from "@/lib/brand";

export const metadata = {
  title: "BA Situation Guide — What To Do When You Are Stuck",
  description:
    "Real Business Analyst questions answered with practical step-by-step guidance. 11 situations covering requirements, stakeholders, Agile ceremonies, and documentation. Your BA guide for mid-project problems.",
  alternates: { canonical: `${APP_URL}/situation-guide` },
};

export default function SituationGuidePage() {
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
              <CircleHelp className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">BA Situation Guide</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">What to do when you are stuck. Real questions, practical answers, relevant concepts &mdash; one place.</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">These are the situations every BA faces. Each answer tells you what to do right now, not just what the theory says.</p>
            </div>
          </div>
        </section>

        <SituationGuide />
      </div>
    </main>
  );
}
