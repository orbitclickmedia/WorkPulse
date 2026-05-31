'use client'

import { useEffect, useState } from 'react'
import { BLOCKERS } from '@/data/mock'
import { subscribeBlockers } from '@/firebase/firestore'
import { firebaseEnabled } from '@/firebase/config'
import { mapBlockerDoc } from '@/lib/map-firestore'
import { useAuth } from '@/context/AuthProvider'
import type { Blocker } from '@/types'

export function useBlockers() {
  const { orgId, user, firebaseEnabled: authFirebase } = useAuth()
  const useLive = firebaseEnabled && authFirebase && !!user
  const [blockers, setBlockers] = useState<Blocker[]>(useLive ? [] : BLOCKERS)
  const [loading, setLoading] = useState(useLive)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!useLive) {
      setBlockers(BLOCKERS)
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = subscribeBlockers(
      orgId,
      (rows) => {
        setBlockers(rows.map((r) => mapBlockerDoc(String(r.id), r as Record<string, unknown>)))
        setLoading(false)
        setError(null)
      }
    )

    return () => unsub()
  }, [useLive, orgId])

  return {
    blockers,
    loading,
    error,
    isLive: useLive,
  }
}
