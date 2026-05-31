'use client'

import { useAppStore } from '@/store'
import { useAuth } from '@/context/AuthProvider'
import { useBlockers } from '@/hooks/useBlockers'
import { cn } from '@/lib/utils'
import type { Panel } from '@/store'
import { CURRENT_USER } from '@/data/mock'

type NavItem = {
  id: string
  label: string
  icon: string
  badge?: string | number
  badgeVariant?: 'red' | 'blue'
}

const NAV_ITEMS: NavItem[] = [
  { id: 'all', label: 'All Panels', icon: '✚' },
  { id: 'dashboard', label: 'Dashboard', icon: '▣' },
  { id: 'standup', label: 'Daily Standup', icon: '📝', badge: '!', badgeVariant: 'red' },
  { id: 'copilot', label: 'AI Copilot', icon: '🤖', badge: 'New', badgeVariant: 'blue' },
  { id: 'insights', label: 'AI Insights', icon: '💡' },
]

const NAV_ANALYTICS: NavItem[] = [
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'reports', label: 'Reports', icon: '📄' },
]

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { activePanel, setActivePanel } = useAppStore()

  return (
    <div>
      <div className="label-muted px-2 pt-4 pb-1">{label}</div>
      {items.map((item) => {
        const isActive = activePanel === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id as Panel)}
            className={cn(
              'nav-item-base w-full text-left mb-0.5',
              isActive ? 'nav-item-active' : 'nav-item-inactive'
            )}
          >
            {isActive && (
              <span className="absolute left-0 top-[20%] h-[60%] w-0.5 bg-blue-500 rounded-r" />
            )}
            <span className="text-[15px] w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                  item.badgeVariant === 'blue'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-red-500 text-white'
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function Sidebar({ demoMode = false }: { demoMode?: boolean }) {
  const { profile, signOut } = useAuth()
  const { blockers } = useBlockers()

  const displayName = profile?.name ?? CURRENT_USER.name
  const displayRole = profile?.role ?? CURRENT_USER.role
  const initials =
    profile?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? CURRENT_USER.avatarInitials

  const workspaceItems: NavItem[] = [
    { id: 'teams', label: 'Teams', icon: '👥' },
    {
      id: 'blockers',
      label: 'Blockers',
      icon: '🚧',
      badge: blockers.length > 0 ? blockers.length : undefined,
      badgeVariant: 'red',
    },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5, badgeVariant: 'red' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="w-[220px] flex-shrink-0 bg-bg-secondary border-r border-border-subtle flex flex-col h-full z-20">
      <div className="h-[52px] flex items-center px-4 gap-2.5 border-b border-border-subtle flex-shrink-0">
        <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">
          W
        </div>
        <span className="text-[14px] font-semibold tracking-tight">WorkPulse</span>
        <span className="ml-auto text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded px-1.5 py-0.5">
          Pro
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0">
        <NavGroup label="Main" items={NAV_ITEMS} />
        <NavGroup label="Analytics" items={NAV_ANALYTICS} />
        <NavGroup label="Workspace" items={workspaceItems} />
      </div>

      <div className="px-2 py-2 border-t border-border-subtle flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            if (!demoMode) signOut()
          }}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-bg-tertiary transition-colors text-left"
          title={demoMode ? 'Demo mode' : 'Sign out'}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium text-text-primary truncate">{displayName}</div>
            <div className="text-[10px] text-text-muted capitalize">
              {displayRole}
              {demoMode ? ' · Demo' : ' · Ekluvya'}
            </div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
        </button>
      </div>
    </nav>
  )
}
