import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/team",
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Meet the editors, reporters, and producers behind ${SITE_CONFIG.name}.`,
    openGraphTitle: `Team | ${SITE_CONFIG.name}`,
    openGraphDescription: "Editorial roster and roles across the publication.",
  });
}

export default function TeamPage() {
  return (
    <PageShell
      eyebrow="People"
      title="Editorial team"
      description="A compact, senior-led group focused on commissioning, editing, and shipping high-signal technology stories."
      actions={
        <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
          <Link href="/articles">
            Read our work
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Badge className="rounded-md border border-slate-200 bg-slate-50 text-slate-800">How we collaborate</Badge>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          Editors pair with domain specialists for each vertical—cloud, security, AI, and developer experience—so every article has both narrative clarity and technical depth.
          We work async-first with tight review windows so writers can iterate without losing momentum.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <div key={member.id} className="flex flex-col rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border border-slate-200">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#0047AB]">{member.role}</p>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{member.bio}</p>
            <p className="mt-4 text-xs text-slate-400">{member.location}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
