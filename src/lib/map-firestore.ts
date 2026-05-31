import type { Blocker, BlockerSeverity } from '@/types'

function toIso(value: unknown): string {
  if (!value) return new Date().toISOString()
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate().toISOString()
  }
  return new Date().toISOString()
}

function hoursSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime()
  return Math.max(0, Math.round(ms / 3_600_000))
}

export function mapBlockerDoc(id: string, data: Record<string, unknown>): Blocker {
  const reportedAt = toIso(data.createdAt ?? data.reportedAt)
  const severity = (data.severity as BlockerSeverity) ?? 'medium'

  return {
    id,
    title: String(data.title ?? 'Untitled blocker'),
    description: String(data.description ?? ''),
    severity,
    teamId: String(data.teamId ?? ''),
    teamName: String(data.teamName ?? 'General'),
    reportedBy: String(data.reportedBy ?? data.reportedByName ?? 'Unknown'),
    reportedAt,
    resolved: Boolean(data.resolved),
    resolvedAt: data.resolvedAt ? toIso(data.resolvedAt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    hoursUnresolved: hoursSince(reportedAt),
  }
}
