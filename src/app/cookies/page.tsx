import Link from 'next/link'
import type { Metadata } from 'next'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/cookies',
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: 'How cookies and similar technologies support authentication and preferences on this site.',
  })
}

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for security, session continuity, and basic navigation. These cannot be disabled without breaking core functionality.',
  },
  {
    title: 'Preference storage',
    body: 'We may store lightweight preferences (such as theme or reading filters) in your browser so the article experience feels consistent between visits.',
  },
  {
    title: 'Analytics',
    body: 'If enabled, aggregated analytics help us understand which sections are most useful. We avoid fingerprinting and cross-site tracking.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Transparency about the small pieces of data we store to keep reading fast, signed-in sessions stable, and the UI coherent."
      actions={
        <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
          <Link href="/articles">
            Return to articles
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
  )
}
