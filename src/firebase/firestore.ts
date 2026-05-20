/**
 * Firestore Service Layer
 * All database interactions go through this file.
 * Multi-tenant: every query is scoped to an organizationId.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from './config'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Base path for all org-scoped collections */
const orgPath = (orgId: string) => `organizations/${orgId}`
const col = (orgId: string, name: string) => collection(db, orgPath(orgId), name)

function ts() {
  return serverTimestamp()
}

// ─── Organizations ───────────────────────────────────────────────────────────

export async function getOrganization(orgId: string) {
  const snap = await getDoc(doc(db, 'organizations', orgId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createOrganization(orgId: string, data: Record<string, unknown>) {
  await setDoc(doc(db, 'organizations', orgId), {
    ...data,
    createdAt: ts(),
    updatedAt: ts(),
  })
}

export async function updateOrganization(orgId: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, 'organizations', orgId), { ...data, updatedAt: ts() })
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUser(orgId: string, userId: string) {
  const snap = await getDoc(doc(col(orgId, 'users'), userId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function upsertUser(orgId: string, userId: string, data: Record<string, unknown>) {
  await setDoc(doc(col(orgId, 'users'), userId), {
    ...data,
    updatedAt: ts(),
  }, { merge: true })
}

export async function listUsers(orgId: string, teamId?: string) {
  const constraints: QueryConstraint[] = [orderBy('name')]
  if (teamId) constraints.unshift(where('teamId', '==', teamId))
  const snap = await getDocs(query(col(orgId, 'users'), ...constraints))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export async function listTeams(orgId: string) {
  const snap = await getDocs(query(col(orgId, 'teams'), orderBy('name')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createTeam(orgId: string, data: Record<string, unknown>) {
  return await addDoc(col(orgId, 'teams'), { ...data, createdAt: ts() })
}

export async function updateTeam(orgId: string, teamId: string, data: Record<string, unknown>) {
  await updateDoc(doc(col(orgId, 'teams'), teamId), { ...data, updatedAt: ts() })
}

// ─── Daily Updates ────────────────────────────────────────────────────────────

export async function submitStandup(orgId: string, userId: string, data: {
  accomplished: string
  tomorrow: string
  blockers: string
  priority: string
  hoursWorked: number
  date: string
}) {
  const id = `${userId}_${data.date}`
  await setDoc(doc(col(orgId, 'daily_updates'), id), {
    ...data,
    userId,
    submitted: true,
    submittedAt: ts(),
    updatedAt: ts(),
  }, { merge: true })
}

export async function getStandupByDate(orgId: string, userId: string, date: string) {
  const id = `${userId}_${date}`
  const snap = await getDoc(doc(col(orgId, 'daily_updates'), id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function listStandupsByDate(orgId: string, date: string, limit_n = 50) {
  const snap = await getDocs(
    query(col(orgId, 'daily_updates'), where('date', '==', date), limit(limit_n))
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function listStandupsByUser(orgId: string, userId: string, days = 30) {
  const snap = await getDocs(
    query(
      col(orgId, 'daily_updates'),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(days)
    )
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ─── Blockers ─────────────────────────────────────────────────────────────────

export async function createBlocker(orgId: string, data: Record<string, unknown>) {
  return await addDoc(col(orgId, 'blockers'), { ...data, resolved: false, createdAt: ts() })
}

export async function resolveBlocker(orgId: string, blockerId: string) {
  await updateDoc(doc(col(orgId, 'blockers'), blockerId), {
    resolved: true,
    resolvedAt: ts(),
  })
}

export async function listBlockers(orgId: string, resolved = false) {
  const snap = await getDocs(
    query(col(orgId, 'blockers'), where('resolved', '==', resolved), orderBy('createdAt', 'desc'))
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export function subscribeBlockers(
  orgId: string,
  callback: (blockers: Record<string, unknown>[]) => void
): Unsubscribe {
  return onSnapshot(
    query(col(orgId, 'blockers'), where('resolved', '==', false), orderBy('createdAt', 'desc')),
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function listNotifications(orgId: string, userId: string, limit_n = 20) {
  const snap = await getDocs(
    query(
      col(orgId, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limit_n)
    )
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function markNotificationRead(orgId: string, notifId: string) {
  await updateDoc(doc(col(orgId, 'notifications'), notifId), { read: true })
}

export function subscribeNotifications(
  orgId: string,
  userId: string,
  callback: (notifications: Record<string, unknown>[]) => void
): Unsubscribe {
  return onSnapshot(
    query(
      col(orgId, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(20)
    ),
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export async function getAnalyticsSummary(orgId: string, period: string) {
  const snap = await getDoc(doc(col(orgId, 'analytics'), period))
  return snap.exists() ? snap.data() : null
}

export async function upsertAnalytics(orgId: string, period: string, data: Record<string, unknown>) {
  await setDoc(doc(col(orgId, 'analytics'), period), { ...data, updatedAt: ts() }, { merge: true })
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export async function saveReport(orgId: string, data: Record<string, unknown>) {
  return await addDoc(col(orgId, 'reports'), { ...data, generatedAt: ts() })
}

export async function listReports(orgId: string, limit_n = 20) {
  const snap = await getDocs(
    query(col(orgId, 'reports'), orderBy('generatedAt', 'desc'), limit(limit_n))
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
