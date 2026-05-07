import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, BookOpen, LineChart, Shield } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/about",
    title: `About ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} is an article-first technology publication focused on clarity, depth, and responsible reporting.`,
    openGraphTitle: `About ${SITE_CONFIG.name}`,
    openGraphDescription: "Editorial standards, how we work, and how to read with us.",
  });
}

const pillars = [
  {
    title: "Editorial rigor",
    body: "Every story is edited for accuracy, context, and readability so busy readers can trust the headline and the details.",
    icon: Shield,
  },
  {
    title: "Technology focus",
    body: "We cover software, infrastructure, security, and the societal impact of innovation—without the noise of generic link feeds.",
    icon: LineChart,
  },
  {
    title: "Reading comfort",
    body: "Layouts use the same blue-and-slate system as the homepage: generous spacing, strong hierarchy, and accessible contrast.",
    icon: BookOpen,
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Publication"
      title={`About ${SITE_CONFIG.name}`}
      description="We are an independent editorial desk publishing long-form technology articles, explainers, and analysis for readers who value depth over hype."
      actions={
        <>
          <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
            <Link href="/articles">
              Read articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-md border-white/40 bg-transparent text-white hover:bg-white/10">
            <Link href="/search">Search archive</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <Badge className="rounded-md border border-slate-200 bg-slate-50 text-slate-800">Our story</Badge>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Built like a magazine, delivered on the open web.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {SITE_CONFIG.name} exists to slow the scroll: one primary lane—articles—with typography and pacing tuned for essays, guides, and reported pieces.
            We invest in cover-quality art direction on the homepage and calm, scannable interiors on every story.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Whether you are researching a stack decision or catching up on policy and product moves, the interface stays out of the way so the writing can lead.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-slate-100 bg-slate-50/80 p-4 text-center">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Publishing rhythm</dt>
              <dd className="mt-1 text-2xl font-bold text-[#0047AB]">Weekly</dd>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50/80 p-4 text-center">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Focus areas</dt>
              <dd className="mt-1 text-2xl font-bold text-[#0047AB]">Tech</dd>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50/80 p-4 text-center">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Audience</dt>
              <dd className="mt-1 text-2xl font-bold text-[#0047AB]">Builders</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-4">
          {pillars.map(({ title, body, icon: Icon }) => (
            <div key={title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0047AB]/10 text-[#0047AB]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
