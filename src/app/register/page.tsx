import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { ArticleRegisterForm } from '@/components/auth/article-register-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-slate-50 text-slate-950',
      panel: 'border border-slate-200 bg-white shadow-sm',
      side: 'border border-slate-200 bg-white shadow-sm',
      muted: 'text-slate-600',
      highlight: 'rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700',
      icon: Building2,
      title: 'Create your account',
      body: 'Join to save articles, manage preferences, and access reader features in this browser.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-slate-50 text-slate-900',
      panel: 'border border-slate-200 bg-white shadow-sm',
      side: 'border border-slate-200 bg-[#0047AB] text-white shadow-sm',
      muted: 'text-slate-200',
      highlight: 'rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white backdrop-blur-sm',
      icon: FileText,
      title: 'Create your reader account',
      body: 'Register to sync saved articles and profile details locally—same visual language as the homepage and article index.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      highlight: 'rounded-md border border-white/15 bg-white/8 px-4 py-3 text-sm leading-relaxed text-slate-100',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-slate-50 text-slate-900',
    panel: 'border border-slate-200 bg-white shadow-sm',
    side: 'border border-slate-200 bg-slate-100 shadow-sm',
    muted: 'text-slate-600',
    highlight: 'rounded-md border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700',
    icon: Bookmark,
    title: 'Create your account',
    body: 'Sign up to personalize your experience; data stays in this browser for the demo.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-md p-8 lg:p-10 ${config.side}`}>
            <Icon className="h-8 w-8 opacity-90" />
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{config.title}</h1>
            <p className={`mt-5 text-sm leading-7 sm:text-base sm:leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-3">
              {['Corporate blue UI consistent with articles & contact', 'Local session for demo sign-up—no backend change', 'Save reading lists and preferences from one account'].map((item) => (
                <div key={item} className={config.highlight}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-md p-8 lg:p-10 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">New account</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Create account</h2>
            <ArticleRegisterForm className="mt-6" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
