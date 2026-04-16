'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarShell />
      <header className="border-b border-slate-200 bg-[#0047AB]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">{eyebrow}</p>
          ) : null}
          <div className="mt-1 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className={eyebrow ? '' : 'mt-0'}>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">{title}</h1>
              {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">{description}</p> : null}
            </div>
            {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">{children}</main>
      <Footer />
    </div>
  )
}
