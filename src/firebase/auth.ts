/**
 * Authentication Service
 * Wraps Firebase Auth — Google OAuth + Email/Password + session management
 */

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { auth, googleProvider } from './config'
import { upsertUser } from './firestore'

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export async function signInWithGoogle(orgId: string) {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user

  await upsertUser(orgId, user.uid, {
    name: user.displayName ?? 'Unknown',
    email: user.email,
    photoURL: user.photoURL,
    provider: 'google',
    lastLoginAt: new Date().toISOString(),
  })

  return user
}

// ─── Email / Password ─────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export async function signUpWithEmail(
  orgId: string,
  email: string,
  password: string,
  displayName: string
) {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(result.user, { displayName })

  await upsertUser(orgId, result.user.uid, {
    name: displayName,
    email,
    provider: 'email',
    createdAt: new Date().toISOString(),
  })

  return result.user
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email)
}

// ─── Session ──────────────────────────────────────────────────────────────────

export async function logout() {
  await signOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback)
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}

// ─── Role check ───────────────────────────────────────────────────────────────

export type Role = 'admin' | 'manager' | 'team_leader' | 'hr' | 'employee'

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Record<Role, number> = {
    admin: 5,
    hr: 4,
    manager: 3,
    team_leader: 2,
    employee: 1,
  }
  return hierarchy[userRole] >= hierarchy[requiredRole]
}
