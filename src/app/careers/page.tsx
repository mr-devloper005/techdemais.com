import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/careers",
    title: `Careers | ${SITE_CONFIG.name}`,
    description: "Join the editorial and product team building a calmer, article-first technology publication.",
    openGraphTitle: `Careers | ${SITE_CONFIG.name}`,
    openGraphDescription: "Open roles, culture, and how we hire.",
  });
}

const roles = [
  { title: "Staff Technology Reporter", location: "Remote (US/EU overlap)", type: "Full-time", level: "Senior" },
  { title: "Managing Editor", location: "Hybrid — Lisbon", type: "Full-time", level: "Lead" },
  { title: "Product Designer, Reading", location: "Remote", type: "Full-time", level: "Mid" },
];

const benefits = [
  "Editorial independence with a modern design system",
  "Competitive compensation and annual learning budget",
  "Async-friendly workflows with weekly editorial syncs",
  "Hardware stipend and home-office support",
];

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Join us"
      title="Careers"
      description={`Help readers navigate complex technology with clarity. ${SITE_CONFIG.name} hires editors, reporters, and designers who care about typography as much as truth.`}
      actions={
        null
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-md border border-slate-200 bg-slate-50 text-slate-800">{role.level}</Badge>
                <Badge variant="outline" className="rounded-md border-slate-200 text-slate-700">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-3 text-lg font-bold text-slate-900">{role.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{role.location}</p>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">Why {SITE_CONFIG.name}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            We are a small, senior team shipping fewer stories with higher craft. You will work directly with design and engineering to keep the reading experience cohesive.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded-md border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
