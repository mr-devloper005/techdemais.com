import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, PenLine, Rss } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/blog",
    title: `Editorial blog | ${SITE_CONFIG.name}`,
    description: "Notes from the desk: how we commission, edit, and ship technology coverage.",
    openGraphTitle: `Editorial blog | ${SITE_CONFIG.name}`,
    openGraphDescription: "Process, standards, and updates from the publication team.",
  });
}

const notes = [
  {
    title: "How we commission long reads",
    body: "We start with a one-page brief: thesis, audience, reporting plan, and art needs. Writers get two structured edit passes before copy hits production.",
  },
  {
    title: "Designing for deep reading",
    body: "Our article template prioritizes legible line length, restrained chrome, and progressive disclosure for sidebars so the narrative stays centered.",
  },
  {
    title: "What we mean by “technology”",
    body: "We cover products, platforms, and policy when they change how software is built, bought, or regulated—not every consumer gadget headline.",
  },
];

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Desk notes"
      title="Editorial blog"
      description="Short updates on how we work. For full stories and analysis, the Articles index is always the source of truth."
      actions={
        <>
          <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
            <Link href="/articles">
              Open articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-md border-white/40 bg-transparent text-white hover:bg-white/10">
            <Link href="/search">Search</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {notes.map((item) => (
            <article key={item.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-[#0047AB]">
                <PenLine className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">From the editors</span>
              </div>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.body}</p>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-md border border-slate-200 bg-[#0047AB] p-6 text-white shadow-sm">
          <div className="flex items-center gap-2 text-white/90">
            <Rss className="h-5 w-5" />
            <p className="text-sm font-semibold">Reading list</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/85">
            Prefer feeds in your inbox? Use Search to save queries, or bookmark the Articles page—both stay aligned with the same blue editorial shell.
          </p>
          <Button asChild variant="secondary" className="mt-5 w-full rounded-md font-semibold">
            <Link href="/articles">Browse latest</Link>
          </Button>
        </aside>
      </div>
    </PageShell>
  );
}
