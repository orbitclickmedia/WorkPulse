'use client'

import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  standup: 'Daily Standup',
  copilot: 'AI Copilot',
  insights: 'AI Insights',
  analytics: 'Analytics',
  teams: 'Teams',
  blockers: 'Blocker Management',
  notifications: 'Notifications',
  reports: 'Reports',
  settings: 'Settings',
}

const PAGE_ACTIONS: Record<string, string> = {
  dashboard: '+ Submit Standup',
  standup: '+ New Entry',
  teams: '+ Create Team',
  blockers: '+ Report Blocker',
  reports: '+ Generate Report',
}

const SHOW_TABS = ['dashboard', 'analytics']

export default function Topbar() {
  const { activePanel, setActivePanel, timeRange, setTimeRange } = useAppStore()
  const unreadCount = useAppStore((s) => s.notifications.filter((n) => !n.read).length)

  const action = PAGE_ACTIONS[activePanel]

  return (
    <div className="h-[52px] bg-bg-secondary border-b border-border-subtle flex items-center px-5 gap-3 flex-shrink-0">
      <h1 className="text-[14px] font-semibold text-text-primary">
        {PAGE_TITLES[activePanel] ?? 'WorkPulse'}
      </h1>
      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-purple/15 text-brand-purple border border-brand-purple/25">
        Demo
      </span>
      <span className="text-[12px] text-text-muted ml-0.5">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </span>

      <div className="ml-auto flex items-center gap-2">
        {SHOW_TABS.includes(activePanel) && (
          <div className="flex gap-0.5 bg-bg-tertiary p-0.5 rounded-lg">
            {(['weekly', 'monthly'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-150 capitalize cursor-pointer',
                  timeRange === r
                    ? 'bg-bg-secondary text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {action && (
          <button
            className="btn-primary"
            onClick={() => {
              if (activePanel !== 'standup') setActivePanel('standup')
            }}
          >
            {action}
          </button>
        )}

        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary hover:border-border-subtle transition-all duration-150"
          onClick={() => setActivePanel('notifications')}
        >
          <span className="text-[15px]">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-bg-secondary" />
          )}
        </button>
      </div>
    </div>
  )
}
