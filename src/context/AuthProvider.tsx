'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { User } from 'firebase/auth'
import { firebaseEnabled } from '@/firebase/config'
import {
  onAuthChange,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  logout as firebaseLogout,
} from '@/firebase/auth'
import { ensureOrganization, getUser } from '@/firebase/firestore'
import { getOrgId } from '@/lib/firebase-env'
import type { Role } from '@/types'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: Role
  photoURL?: string | null
}

type AuthContextValue = {
  firebaseEnabled: boolean
  loading: boolean
  user: User | null
  profile: UserProfile | null
  orgId: string
  signInGoogle: () => Promise<void>
  signInEmail: (email: string, password: string) => Promise<void>
  signUpEmail: (email: string, password: string, displayName: string) => Promise<void>
  signOut: () => Promise<void>
  authError: string | null
  clearAuthError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const orgId = getOrgId()
  const [loading, setLoading] = useState(firebaseEnabled)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)

  const loadProfile = useCallback(
    async (firebaseUser: User) => {
      const data = (await getUser(orgId, firebaseUser.uid)) as Record<string, unknown> | null
      setProfile({
        id: firebaseUser.uid,
        name: String(data?.name ?? firebaseUser.displayName ?? 'User'),
        email: String(data?.email ?? firebaseUser.email ?? ''),
        role: (data?.role as Role) ?? 'employee',
        photoURL: firebaseUser.photoURL,
      })
    },
    [orgId]
  )

  useEffect(() => {
    if (!firebaseEnabled) {
      setLoading(false)
      return
    }

    const unsub = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        try {
          await ensureOrganization(orgId, 'WorkPulse')
          await loadProfile(firebaseUser)
        } catch {
          setProfile({
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? 'User',
            email: firebaseUser.email ?? '',
            role: 'employee',
            photoURL: firebaseUser.photoURL,
          })
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return unsub
  }, [loadProfile, orgId])

  const signInGoogle = useCallback(async () => {
    setAuthError(null)
    try {
      await signInWithGoogle(orgId)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Google sign-in failed')
      throw e
    }
  }, [orgId])

  const signInEmail = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    try {
      const u = await signInWithEmail(email, password)
      await ensureOrganization(orgId, 'WorkPulse')
      await loadProfile(u)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Sign-in failed')
      throw e
    }
  }, [loadProfile, orgId])

  const signUpEmail = useCallback(
    async (email: string, password: string, displayName: string) => {
      setAuthError(null)
      try {
        await ensureOrganization(orgId, 'WorkPulse')
        const u = await signUpWithEmail(orgId, email, password, displayName)
        await loadProfile(u)
      } catch (e) {
        setAuthError(e instanceof Error ? e.message : 'Sign-up failed')
        throw e
      }
    },
    [loadProfile, orgId]
  )

  const signOut = useCallback(async () => {
    await firebaseLogout()
    setUser(null)
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({
      firebaseEnabled,
      loading,
      user,
      profile,
      orgId,
      signInGoogle,
      signInEmail,
      signUpEmail,
      signOut,
      authError,
      clearAuthError: () => setAuthError(null),
    }),
    [
      loading,
      user,
      profile,
      orgId,
      signInGoogle,
      signInEmail,
      signUpEmail,
      signOut,
      authError,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
