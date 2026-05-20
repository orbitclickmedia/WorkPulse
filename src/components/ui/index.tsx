import { cn } from '@/lib/utils'
import type { KPIData } from '@/types'

// Card
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('card', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 px-4 py-3 border-b border-border-subtle', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  )
}

// Badge
type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'teal' | 'purple' | 'gray'

export function Badge({ variant = 'gray', children, className }: {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('badge', `badge-${variant}`, className)}>
      {children}
    </span>
  )
}

// Progress Bar
export function ProgressBar({ value, color = '#3b82f6', className }: {
  value: number
  color?: string
  className?: string
}) {
  return (
    <div className={cn('progress-bar', className)}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, value)}%`, background: color }}
      />
    </div>
  )
}

// KPI Card
export function KPICard({ data, delay = 0 }: { data: KPIData; delay?: number }) {
  return (
    <div
      className="card card-hover p-4 relative overflow-hidden animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-base mb-2.5', data.iconBg, data.iconColor)}>
        {data.icon}
      </div>
      <div className="text-[22px] font-semibold tracking-tight leading-none mb-1">
        {data.value}
      </div>
      <div className="text-[11px] text-text-muted">{data.label}</div>
      <div className={cn(
        'text-[11px] font-medium mt-1.5 flex items-center gap-1',
        data.deltaType === 'up' ? 'text-green-400' : data.deltaType === 'down' ? 'text-red-400' : 'text-text-muted'
      )}>
        {data.delta}
      </div>
    </div>
  )
}

// Section Header
export function SectionHeader({ title, action, onAction }: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="section-title">{title}</span>
      {action && (
        <button onClick={onAction} className="text-[11px] text-blue-400 hover:underline cursor-pointer">
          {action}
        </button>
      )}
    </div>
  )
}

// Avatar
export function Avatar({
  initials,
  gradient = 'from-indigo-500 to-purple-500',
  size = 'md',
}: {
  initials: string
  gradient?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = { sm: 'w-6 h-6 text-[9px]', md: 'w-7 h-7 text-[11px]', lg: 'w-9 h-9 text-[13px]' }
  return (
    <div className={cn(
      'rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white flex-shrink-0',
      gradient, sizes[size]
    )}>
      {initials}
    </div>
  )
}

// Stat Row
export function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
      <span className="text-[12px] text-text-secondary">{label}</span>
      <span className="text-[13px] font-semibold text-text-primary">{value}</span>
    </div>
  )
}

// Toggle
export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'w-9 h-5 rounded-full relative transition-all duration-200 flex-shrink-0 border',
        value ? 'bg-blue-500 border-blue-500' : 'bg-bg-elevated border-border-default'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200',
          value ? 'left-[18px]' : 'left-0.5'
        )}
      />
    </button>
  )
}

// Feed Item
export function FeedItem({ icon, text, time, color }: {
  icon?: string
  text: React.ReactNode
  time: string
  color?: string
}) {
  return (
    <div className="flex gap-2.5 items-start py-2.5 border-b border-border-subtle last:border-0">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
        style={{ background: color ?? '#475569' }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-text-secondary leading-relaxed">{text}</p>
        <p className="text-[10px] text-text-muted mt-0.5">{time}</p>
      </div>
    </div>
  )
}

// Empty State
export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-[13px] font-medium text-text-primary mb-1">{title}</div>
      <div className="text-[12px] text-text-muted">{desc}</div>
    </div>
  )
}
