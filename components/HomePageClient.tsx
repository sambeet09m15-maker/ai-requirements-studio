"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { BrandLogo } from "@/components/BrandLogo";
import { LiveDemo } from "@/components/LiveDemo";
import { APP_NAME } from "@/lib/brand";
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  Layers3,
  ListChecks,
  Network,
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

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      nodes = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.4,
      }));
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#030712");
      grad.addColorStop(0.55, "#040d20");
      grad.addColorStop(1, "#030712");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(13,148,136,${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grd.addColorStop(0, "rgba(13,148,136,0.6)");
        grd.addColorStop(1, "rgba(13,148,136,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(13,148,136,0.85)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

export function HomePageClient() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(3,7,18,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <BrandLogo size="md" theme="dark" mark={{ src: "/logo.svg", height: 36 }} />

          <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
            <a href="#features" style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white">
              Features
            </a>
            <a href="#workflow" style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white">
              Workflow
            </a>
            <a href="#tools" style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white">
              Tools
            </a>
            <a href="#pricing" style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2" style={{ minHeight: "36px" }}>
            {!isLoaded ? null : isSignedIn ? (
              <>
                <Link href="/dashboard" style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-white">
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button style={{ color: "rgba(255,255,255,0.7)" }} className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-white">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    style={{ background: "#0d9488", color: "white" }}
                    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-90"
                  >
                    Try Free →
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <ParticleBackground />
        <div className="relative z-10 mx-auto grid min-h-[640px] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(13,148,136,0.1)',
              border: '1px solid rgba(13,148,136,0.3)',
              borderRadius: '20px', padding: '4px 12px', marginBottom: '18px'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0d9488' }} />
              <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 500 }}>
                AI-Powered · Built for Business Analysts
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              marginBottom: '14px',
            }}>
              One sentence in.<br />
              <span style={{ color: '#0d9488' }}>Complete BA documentation</span> out.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              marginBottom: '24px',
              maxWidth: '380px',
            }}>
              User Stories, Acceptance Criteria, BRD, FRD, Risks and Test Scenarios -
              generated in under 10 seconds. Quality-scored. Dependency-tracked.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
              <a href="/dashboard" style={{
                background: '#0d9488', color: 'white', fontSize: '14px', fontWeight: 600,
                padding: '11px 22px', borderRadius: '8px', textDecoration: 'none',
                display: 'inline-block'
              }}>Generate Free →</a>
              <a href="/concept-map" style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.75)', fontSize: '14px',
                padding: '11px 22px', borderRadius: '8px', textDecoration: 'none',
                display: 'inline-block'
              }}>Explore Knowledge Hub</a>
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'flex', gap: '24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: '18px',
            }}>
              {[
                { num: '10s', label: 'to generate full doc' },
                { num: '10', label: 'document types' },
                { num: '56', label: 'BA concepts mapped' },
                { num: 'Free', label: 'to start today' },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0d9488' }}>{s.num}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <LiveDemo />
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

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">Generate your first requirement document in 10 seconds.</h2>
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
              <BrandLogo size="sm" theme="dark" href={null} mark={{ src: "/logo.svg", height: 26 }} className="opacity-90" />
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>
                sambeet09m15@gmail.com
              </p>
            </div>
            <p className="text-sm text-slate-400">© 2025 {APP_NAME}. All rights reserved.</p>
          </div>
          <div className="flex gap-2 text-sm text-slate-400">
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Privacy Policy</a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
            <a href="/terms" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Terms of Service</a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
            <a href="/refund" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Refund Policy</a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}> · </span>
            <a
              href={`mailto:sambeet09m15@gmail.com?subject=Refund Request - ${APP_NAME}&body=Hi, I would like to request a refund. My registered email is:`}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}
            >
              Request Refund or Cancellation
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
