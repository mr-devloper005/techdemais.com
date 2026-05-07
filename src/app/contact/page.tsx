import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-slate-50 text-slate-950',
      panel: 'border border-slate-200 bg-white shadow-sm',
      soft: 'border border-slate-200 bg-white shadow-sm',
      muted: 'text-slate-600',
      action: 'rounded-md bg-[#0047AB] px-6 font-semibold text-white shadow-sm hover:bg-[#003a8f]',
      field: 'h-11 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
      textarea: 'min-h-[180px] rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-slate-50 text-slate-900',
      panel: 'border border-slate-200 bg-white shadow-sm',
      soft: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'rounded-md bg-[#0047AB] px-6 font-semibold text-white shadow-sm hover:bg-[#003a8f]',
      field: 'h-11 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
      textarea: 'min-h-[180px] rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'rounded-md bg-[#8df0c8] px-6 font-semibold text-[#07111f] hover:bg-[#77dfb8]',
      field: 'h-11 rounded-md border border-white/15 bg-white/8 px-4 text-sm text-white placeholder:text-slate-400',
      textarea: 'min-h-[180px] rounded-md border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-400',
    }
  }
  return {
    shell: 'bg-slate-50 text-slate-900',
    panel: 'border border-slate-200 bg-white shadow-sm',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    action: 'rounded-md bg-[#0047AB] px-6 font-semibold text-white shadow-sm hover:bg-[#003a8f]',
    field: 'h-11 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
    textarea: 'min-h-[180px] rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#0047AB] focus-visible:ring-[#0047AB]/25',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Reach the editorial desk</h1>
            <p className={`mt-5 max-w-2xl text-base leading-8 ${tone.muted}`}>
              Share pitches, corrections, partnerships, or reader support requests. The same blue-and-white system as the rest of the site keeps this page calm and scannable.
            </p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-md p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#0047AB]" />
                  <h2 className="mt-3 text-lg font-semibold text-slate-900">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-md p-7 lg:p-8 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Message</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Send a note</h2>
            <form className="mt-6 grid gap-4">
              <input className={tone.field} placeholder="Your name" />
              <input className={tone.field} placeholder="Email address" type="email" />
              <input className={tone.field} placeholder="Subject" />
              <textarea className={tone.textarea} placeholder="Share the full context so we can respond with the right next step." />
              <div className="flex gap-3">
                <button type="submit" className={`inline-flex h-11 flex-1 items-center justify-center sm:w-auto ${tone.action}`}>
                  Send message
                </button>
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  className={`inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 font-semibold text-[#0047AB] shadow-sm hover:bg-slate-50`}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email us
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
