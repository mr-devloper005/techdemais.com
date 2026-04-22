import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/terms",
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: `Rules for using ${SITE_CONFIG.name}, including acceptable use of comments and saved reading features.`,
  });
}

const sections = [
  {
    title: "Acceptable use",
    body: "Do not attempt to disrupt the service, scrape content in ways that degrade performance for others, or publish unlawful material through comments or submissions.",
  },
  {
    title: "Content & intellectual property",
    body: "Articles and media remain the property of their respective authors or licensors. You receive a limited license to read and share links for personal, non-commercial use.",
  },
  {
    title: "Accounts",
    body: "Demo accounts may rely on local browser storage. You are responsible for securing the devices where you stay signed in.",
  },
  {
    title: "Changes",
    body: "We may update these terms to reflect new features or legal requirements. Continued use after changes constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`The agreement between you and ${SITE_CONFIG.name} when you browse articles, search the archive, or use lightweight account features.`}
      actions={
        <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
          <Link href="/articles">
            Continue reading
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last updated</p>
        <p className="mt-1 text-sm text-slate-700">April 16, 2026</p>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
