import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hr ago`
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}

export function getSeverityColor(severity: string): { bg: string; text: string; border: string } {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
    case 'high': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' }
    case 'medium': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' }
    case 'low': return { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' }
    default: return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' }
  }
}

export function getInsightColors(type: string): { bg: string; border: string; accent: string; badge: string } {
  switch (type) {
    case 'alert': return { bg: 'bg-red-500/5', border: 'border-red-500/20', accent: 'text-red-400', badge: 'bg-red-500/10 text-red-400' }
    case 'warning': return { bg: 'bg-amber-500/5', border: 'border-amber-500/20', accent: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400' }
    case 'success': return { bg: 'bg-green-500/5', border: 'border-green-500/20', accent: 'text-green-400', badge: 'bg-green-500/10 text-green-400' }
    case 'info': return { bg: 'bg-blue-500/5', border: 'border-blue-500/20', accent: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400' }
    default: return { bg: 'bg-slate-500/5', border: 'border-slate-500/20', accent: 'text-slate-400', badge: 'bg-slate-500/10 text-slate-400' }
  }
}

export function generateHeatmapData(weeks: number): number[][] {
  const days = 7
  return Array.from({ length: days }, (_, dayIdx) =>
    Array.from({ length: weeks }, () => {
      if (dayIdx >= 5) return Math.random() < 0.3 ? Math.floor(Math.random() * 2) : 0
      const r = Math.random()
      if (r < 0.1) return 0
      if (r < 0.3) return 1
      if (r < 0.55) return 2
      if (r < 0.8) return 3
      return 4
    })
  )
}
