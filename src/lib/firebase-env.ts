/** Returns true when Firebase client env vars are set to a real project. */
export function isFirebaseConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? ''
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
  if (!projectId || !apiKey) return false
  if (/your-project|placeholder|example/i.test(projectId)) return false
  return true
}

export function getOrgId(): string {
  return process.env.NEXT_PUBLIC_ORG_ID ?? 'demo-org'
}
