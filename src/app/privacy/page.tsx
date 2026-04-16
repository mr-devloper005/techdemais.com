import Link from 'next/link'
import type { Metadata } from 'next'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/privacy',
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: 'How we collect, use, and protect information when you read and interact with our article publication.',
  })
}

const sections = [
  {
    title: 'What we collect',
    body: 'Basic account details if you sign in locally, reading preferences stored in your browser, and standard server logs required to operate the site securely.',
  },
  {
    title: 'How we use information',
    body: 'To keep sessions reliable, improve article recommendations, and detect abuse. We do not sell personal data to third parties.',
  },
  {
    title: 'Your controls',
    body: 'You can clear locally stored preferences at any time, export a copy of saved items where available, and request deletion of account-associated data.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions related to this publication, reach the team through the Press page so requests route to the right owner.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="Plain-language summary of how information is handled on this article-focused experience."
      actions={
        <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
          <Link href="/articles">
            Back to reading
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
