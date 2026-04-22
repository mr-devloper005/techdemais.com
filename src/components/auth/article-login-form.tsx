'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type ArticleLoginFormProps = {
  submitClassName?: string
  className?: string
}

export function ArticleLoginForm({ submitClassName, className }: ArticleLoginFormProps) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed || !password) {
      setError('Enter your email and password.')
      return
    }
    await login(trimmed, password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className={cn('grid gap-4', className)}>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@company.com"
          className="h-11 rounded-md border-slate-200 bg-white"
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
          className="h-11 rounded-md border-slate-200 bg-white"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={cn('h-11 rounded-md bg-[#0047AB] font-semibold text-white shadow-sm hover:bg-[#003a8f]', submitClassName)}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          'Login'
        )}
      </Button>
      <p className="text-center text-xs text-slate-500">
        Demo sign-in: any email and password are accepted; your session is stored in this browser.
      </p>
      <p className="text-center text-sm text-slate-600">
        No account?{' '}
        <Link href="/register" className="font-semibold text-[#0047AB] hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}
