import Link from 'next/link'
import type { Metadata } from 'next'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/licenses',
    title: `Open source licenses | ${SITE_CONFIG.name}`,
    description: 'Acknowledgements for frameworks and libraries used to deliver this publication.',
  })
}

const licenses = [
  { name: 'Next.js', description: 'MIT License — application framework and routing.' },
  { name: 'React', description: 'MIT License — UI rendering.' },
  { name: 'Tailwind CSS', description: 'MIT License — utility-first styling system.' },
  { name: 'Radix UI', description: 'MIT License — accessible primitives for dialogs, menus, and forms.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Licenses"
      description="Open source notices for the core stack powering this article site. Thank you to the maintainers who make reliable publishing tooling possible."
      actions={
        <Button asChild className="rounded-md border-0 bg-white px-5 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-100">
          <Link href="/">
            Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white shadow-sm">
        {licenses.map((license) => (
          <div key={license.name} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <h3 className="text-sm font-bold text-slate-900">{license.name}</h3>
            <p className="text-sm text-slate-600 sm:max-w-xl sm:text-right">{license.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
