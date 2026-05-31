'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { cn } from '@/lib/utils'

type Mode = 'signin' | 'signup'

export default function SignInForm({ onDemoEnter }: { onDemoEnter?: () => void }) {
  const { firebaseEnabled, signInGoogle, signInEmail, signUpEmail, authError, clearAuthError } =
    useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)

  if (!firebaseEnabled) {
    return (
      <div className="text-center space-y-4">
        <p className="text-[13px] text-text-secondary">
          Firebase is not configured. Use demo mode to explore the app without a backend.
        </p>
        {onDemoEnter && (
          <button type="button" onClick={onDemoEnter} className="btn-primary w-full justify-center">
            Enter Demo →
          </button>
        )}
      </div>
    )
  }

  const handleGoogle = async () => {
    setBusy(true)
    clearAuthError()
    try {
      await signInGoogle()
    } catch {
      /* authError set in context */
    } finally {
      setBusy(false)
    }
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    clearAuthError()
    try {
      if (mode === 'signup') {
        await signUpEmail(email, password, name || email.split('@')[0])
      } else {
        await signInEmail(email, password)
      }
    } catch {
      /* authError set in context */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border-default bg-bg-tertiary text-[13px] font-medium text-text-primary hover:bg-bg-secondary transition-colors disabled:opacity-60"
      >
        <span className="text-base">G</span>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-subtle" />
        <span className="text-[11px] text-text-muted">or email</span>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>

      <div className="flex gap-1 p-0.5 bg-bg-tertiary rounded-lg">
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              'flex-1 py-1.5 text-[12px] font-medium rounded-md transition-colors',
              mode === m ? 'bg-bg-secondary text-text-primary' : 'text-text-muted'
            )}
          >
            {m === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleEmail} className="space-y-3">
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input w-full"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input w-full"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input w-full"
          required
          minLength={6}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
        {authError && (
          <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {authError}
          </p>
        )}
        <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
          {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
