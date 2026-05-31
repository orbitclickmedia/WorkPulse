'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import LandingPage from '@/features/landing/LandingPage'
import AppShell from '@/components/layout/AppShell'
import SignInForm from '@/components/auth/SignInForm'

export default function AuthGate() {
  const { firebaseEnabled, loading, user } = useAuth()
  const [demoMode, setDemoMode] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-text-muted">Loading WorkPulse…</p>
        </div>
      </div>
    )
  }

  if (user || demoMode) {
    return <AppShell demoMode={demoMode && !user} />
  }

  if (showSignIn) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[15px] font-bold text-white mb-4">
            W
          </div>
          <h1 className="text-[22px] font-semibold text-text-primary mb-1">Sign in to WorkPulse</h1>
          <p className="text-[13px] text-text-muted mb-8 text-center max-w-sm">
            {firebaseEnabled
              ? 'Use your organization account to access standups, blockers, and team data.'
              : 'Configure Firebase env vars for live auth, or continue in demo mode.'}
          </p>
          <SignInForm onDemoEnter={() => setDemoMode(true)} />
          {!firebaseEnabled && (
            <button
              type="button"
              onClick={() => setDemoMode(true)}
              className="mt-4 text-[12px] text-text-muted hover:text-text-primary"
            >
              Skip — enter demo without sign-in
            </button>
          )}
        </div>
        <div className="pb-8 text-center">
          <button
            type="button"
            onClick={() => setShowSignIn(false)}
            className="text-[12px] text-text-muted hover:text-text-primary"
          >
            ← Back to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <LandingPage
      onEnter={() => setShowSignIn(true)}
      onDemo={() => setDemoMode(true)}
    />
  )
}
