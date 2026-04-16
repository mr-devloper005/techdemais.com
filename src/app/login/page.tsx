import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { ArticleLoginForm } from '@/components/auth/article-login-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-slate-50 text-slate-950',
      panel: 'border border-slate-200 bg-white shadow-sm',
      side: 'border border-slate-200 bg-white shadow-sm',
      muted: 'text-slate-600',
      highlight: 'rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700',
      icon: Building2,
      title: 'Access your workspace',
      body: 'Sign in to manage your profile, saved items, and publishing tools in one place.',
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
      title: 'Welcome back to the editorial desk',
      body: 'Continue reading, saving articles, and managing your account with the same calm layout as the rest of the site.',
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
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
    }
  }
  return {
    shell: 'bg-slate-50 text-slate-900',
    panel: 'border border-slate-200 bg-white shadow-sm',
    side: 'border border-slate-200 bg-slate-100 shadow-sm',
    muted: 'text-slate-600',
    highlight: 'rounded-md border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700',
    icon: Bookmark,
    title: 'Sign in to continue',
    body: 'Access saved items, preferences, and your profile from a single account.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-md p-8 lg:p-10 ${config.side}`}>
            <Icon className="h-8 w-8 opacity-90" />
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{config.title}</h1>
            <p className={`mt-5 text-sm leading-7 sm:text-base sm:leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-3">
              {['Editorial layout matched to article reading', 'Secure session stored locally in your browser', 'Fast access to saved reading and settings'].map((item) => (
                <div key={item} className={config.highlight}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-md p-8 lg:p-10 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Account</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Login</h2>
            <ArticleLoginForm className="mt-6" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <Link href="/forgot-password" className="font-medium text-[#0047AB] hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#0047AB] hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
