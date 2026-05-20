'use client'

import { useState } from 'react'
import LandingPage from '@/features/landing/LandingPage'
import AppShell from '@/components/layout/AppShell'

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) return <AppShell />
  return <LandingPage onEnter={() => setShowApp(true)} />
}
