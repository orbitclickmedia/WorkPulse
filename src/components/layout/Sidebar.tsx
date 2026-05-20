'use client'

import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Panel } from '@/store'

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

const NAV_WORKSPACE: NavItem[] = [
  { id: 'teams', label: 'Teams', icon: '👥' },
  { id: 'blockers', label: 'Blockers', icon: '🚧', badge: 3, badgeVariant: 'red' },
  { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5, badgeVariant: 'red' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
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

export default function Sidebar() {
  return (
    <nav className="w-[220px] flex-shrink-0 bg-bg-secondary border-r border-border-subtle flex flex-col h-full z-20">
      {/* Logo */}
      <div className="h-[52px] flex items-center px-4 gap-2.5 border-b border-border-subtle flex-shrink-0">
        <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">
          W
        </div>
        <span className="text-[14px] font-semibold tracking-tight">WorkPulse</span>
        <span className="ml-auto text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded px-1.5 py-0.5">
          Pro
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0">
        <NavGroup label="Main" items={NAV_ITEMS} />
        <NavGroup label="Analytics" items={NAV_ANALYTICS} />
        <NavGroup label="Workspace" items={NAV_WORKSPACE} />
      </div>

      {/* User */}
      <div className="px-2 py-2 border-t border-border-subtle flex-shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            PK
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-text-primary truncate">Pavan Kumar</div>
            <div className="text-[10px] text-text-muted">Admin · Ekluvya</div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto flex-shrink-0" />
        </div>
      </div>
    </nav>
  )
}

// Re-export Panel type for use in AppShell
declare module '@/store' {
  type Panel = 'all' | 'dashboard' | 'standup' | 'copilot' | 'insights' | 'analytics' | 'teams' | 'blockers' | 'notifications' | 'reports' | 'settings'
}
