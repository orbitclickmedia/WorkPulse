'use client'

import { useAppStore } from '@/store'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Dashboard from '@/features/dashboard/Dashboard'
import StandupPanel from '@/features/standup/StandupPanel'
import CopilotPanel from '@/features/copilot/CopilotPanel'
import InsightsPanel from '@/features/insights/InsightsPanel'
import AnalyticsPanel from '@/features/analytics/AnalyticsPanel'
import TeamsPanel from '@/features/teams/TeamsPanel'
import BlockersPanel from '@/features/blockers/BlockersPanel'
import NotificationsPanel from '@/features/notifications/NotificationsPanel'
import ReportsPanel from '@/features/reports/ReportsPanel'
import SettingsPanel from '@/features/settings/SettingsPanel'
import AllPanels from '@/features/all/AllPanels'

export default function AppShell() {
  const { activePanel } = useAppStore()

  const panels: Record<string, React.ReactNode> = {
    all: <AllPanels />,
    dashboard: <Dashboard />,
    standup: <StandupPanel />,
    copilot: <CopilotPanel />,
    insights: <InsightsPanel />,
    analytics: <AnalyticsPanel />,
    teams: <TeamsPanel />,
    blockers: <BlockersPanel />,
    notifications: <NotificationsPanel />,
    reports: <ReportsPanel />,
    settings: <SettingsPanel />,
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-primary">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="animate-fade-in">
            {panels[activePanel] ?? <Dashboard />}
          </div>
        </main>
      </div>
    </div>
  )
}
