import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  Layers3,
  ListChecks,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const outcomes = [
  "Turn rough stakeholder notes into structured BA documentation",
  "Generate user stories, acceptance criteria, BRD/FRD content, and traceability views",
  "Use built-in BA learning tools when you need a concept, example, or next step",
];

const workflow = [
  {
    title: "Capture the business need",
    description: "Start with messy input from a meeting, email, process gap, or stakeholder request.",
    icon: FileText,
  },
  {
    title: "Generate a BA package",
    description: "Choose the domain, project style, and document depth, then create structured outputs.",
    icon: Sparkles,
  },
  {
    title: "Review and refine",
    description: "Check coverage, regenerate weak sections, and keep history by workspace.",
    icon: ListChecks,
  },
];

const tools = [
  {
    title: "Requirements Studio",
    description: "The full workspace for generating and refining stakeholder-ready requirements.",
    href: "/dashboard",
    icon: BrainCircuit,
  },
  {
    title: "Concept Map",
    description: "A visual map of BA concepts across the SDLC, roles, artifacts, testing, and support.",
    href: "/concept-map",
    icon: Network,
  },
  {
    title: "Requirement Autopsy",
    description: "A worked logistics example that turns one vague requirement into a complete BA trail.",
    href: "/requirement-autopsy",
    icon: FileSearch,
  },
  {
    title: "Situation Guide",
    description: "Practical answers for common BA moments: unclear stakeholders, vague stories, priority conflict, and more.",
    href: "/situation-guide",
    icon: BookOpenText,
  },
];

const features = [
  {
    title: "AI Requirements Generator",
    description:
      "Paste any business requirement and get structured User Stories, Acceptance Criteria, BRD, FRD, Test Scenarios and more — in under 10 seconds. Domain-aware and coverage-checked.",
    href: "/dashboard",
    link: "Try it free →",
    icon: Zap,
  },
  {
    title: "BA Knowledge Hub",
    description:
      "56 Business Analysis concepts across 8 SDLC phases. Interactive concept map, worked examples, practical situation guide, and requirement autopsy — all free, no login needed.",
    href: "/concept-map",
    link: "Explore the Hub →",
    icon: BookOpenText,
  },
  {
    title: "Smart Workspaces",
    description:
      "Organise requirements by project. Save every generated document with full history. Export to Word or PDF. Track coverage gaps across your entire requirement set.",
    href: "/dashboard",
    link: "See how it works →",
    icon: Layers3,
  },
];

const freeFeatures = [
  "Full BA Knowledge Hub",
  "Interactive Concept Map",
  "Situation Guide & Requirement Autopsy",
  "5 AI generations per month",
  "Quick User Story mode",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited AI generations",
  "All 10 document types",
  "Gap & Coverage Checker",
  "Export as Word / PDF",
  "Workspaces & full history",
  "Priority support",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
              <Image src="/ba-knowledge-hub-logo.png" alt="BA Knowledge Hub logo" width={44} height={44} className="size-11 object-cover" priority />
            </span>
            <span className="text-lg font-semibold text-slate-950">BA Copilot</span>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 md:flex">
            <a href="#workflow" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">
              Workflow
            </a>
            <a href="#tools" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">
              Tools
            </a>
            <a href="#quality" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">
              Quality
            </a>
          </nav>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
            Open Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image src="/ba-knowledge-hub-logo.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.08]" priority />
          <div className="absolute inset-0 bg-slate-950/88" />
        </div>
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-cyan-50">
              <ShieldCheck className="size-4 text-cyan-200" />
              AI workspace for business analysts
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-normal text-white sm:text-6xl lg:text-7xl">BA Copilot</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Transform raw business input into clear requirements, acceptance criteria, traceability, and BA-ready learning artifacts in one focused studio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-200">
                Launch BA Copilot
                <ArrowRight className="size-4" />
              </Link>
              <a href="#tools" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Explore Tools
                <Layers3 className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded-lg border border-white/15 bg-white p-4 text-slate-950 shadow-2xl shadow-cyan-950/30">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Requirements Preview</p>
                    <h2 className="mt-1 text-xl font-semibold">Shipment delay alert</h2>
                  </div>
                  <BadgeCheck className="size-6 text-emerald-600" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="rounded-md border border-slate-200 bg-white p-3">
                    <p className="font-semibold text-slate-900">User Story</p>
                    <p className="mt-1 leading-6 text-slate-600">As an operations coordinator, I want delay alerts so I can act before customers contact support.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-slate-200 bg-white p-3">
                      <p className="font-semibold text-slate-900">Acceptance Criteria</p>
                      <p className="mt-1 leading-6 text-slate-600">Given / When / Then checks for delay threshold, recipient, and notification timing.</p>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-white p-3">
                      <p className="font-semibold text-slate-900">Traceability</p>
                      <p className="mt-1 leading-6 text-slate-600">Links business need, story, AC, test scenario, and UAT sign-off.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">Preview only. Open the dashboard to generate complete BA documentation.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Everything a BA needs to move from request to clarity.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex size-11 items-center justify-center rounded-md bg-cyan-50 text-cyan-700">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  <Link href={feature.href} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-900">
                    {feature.link}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#f7fafc]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Start free, upgrade when your workflow grows.</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">FREE</p>
              <h3 className="mt-3 text-4xl font-semibold text-slate-950">₹0 <span className="text-base font-medium text-slate-500">/ forever</span></h3>
              <ul className="mt-6 space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700">
                Get Started Free →
              </Link>
            </article>

            <article className="relative rounded-lg border border-cyan-500 bg-cyan-50 p-6 shadow-sm">
              <span className="absolute right-5 top-5 rounded-md bg-cyan-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">Most Popular</span>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-800">PRO</p>
              <h3 className="mt-3 text-4xl font-semibold text-slate-950">₹599 <span className="text-base font-medium text-slate-500">/ month</span></h3>
              <ul className="mt-6 space-y-3">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" disabled className="mt-7 inline-flex cursor-not-allowed items-center justify-center rounded-md bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-600">
                Coming Soon
              </button>
              <p className="mt-4 text-sm leading-6 text-slate-600">Sign up free today and we will notify you when Pro launches.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          {outcomes.map((outcome) => (
            <div key={outcome} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-6 text-slate-700">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Workflow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">From raw request to review-ready requirements.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {workflow.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <Icon className="size-6 text-blue-700" />
                  <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="tools" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Knowledge Hub</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Built-in tools for daily BA work.</h2>
            </div>
            <Link href="/dashboard" className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Start in Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.title} href={tool.href} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                        {tool.title}
                        <ArrowRight className="size-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">{tool.description}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Quality</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Designed for useful output, not generic text.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              BA Copilot keeps the workflow grounded in document types, domains, project styles, traceability, and concrete examples so the output is easier to review and improve.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["BRD and FRD structure", "User stories and acceptance criteria", "Coverage and traceability review", "Workspace history for reuse"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mb-3 size-5 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">Generate your first requirement document in 30 seconds.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">Free. No credit card. No setup. Just paste a requirement and see what happens.</p>
          </div>
          <Link href="/dashboard" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-200">
            Start Generating Free →
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold">BA Copilot</p>
              <p className="mt-1 text-sm text-slate-400">Your GenAI Co-Pilot for Business Analysis</p>
            </div>
            <p className="text-sm text-slate-400">© 2025 BA Copilot. All rights reserved.</p>
          </div>
          <div className="flex gap-2 text-sm text-slate-400">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="transition hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
