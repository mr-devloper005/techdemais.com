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

type ArticleRegisterFormProps = {
  submitClassName?: string
  className?: string
}

export function ArticleRegisterForm({ submitClassName, className }: ArticleRegisterFormProps) {
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail || !password) {
      setError('Enter your name, email, and password.')
      return
    }
    await signup(trimmedName, trimmedEmail, password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className={cn('grid gap-4', className)}>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="grid gap-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Your name"
          className="h-11 rounded-md border-slate-200 bg-white"
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
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
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
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
            Creating account…
          </>
        ) : (
          'Create account'
        )}
      </Button>
      <p className="text-center text-xs text-slate-500">
        Demo registration: any values work; your profile is stored locally in this browser.
      </p>
      <p className="text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link href="/login" className="font-semibold text-[#0047AB] hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}
