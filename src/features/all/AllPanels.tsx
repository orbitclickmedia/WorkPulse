'use client'

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

export default function AllPanels() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">Combined view</p>
            <h1 className="text-[28px] font-bold text-text-primary">All WorkPulse panels in one place</h1>
          </div>
        </div>
        <p className="text-[13px] text-text-secondary max-w-3xl leading-relaxed">
          Use this combined workspace to review your dashboard, standup summaries, AI copilot, analytics, team health, and operational reports without switching panels.
        </p>
      </section>

      <section className="space-y-8">
        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Dashboard</h2>
          <Dashboard />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Daily Standup</h2>
          <StandupPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">AI Copilot</h2>
          <CopilotPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">AI Insights</h2>
          <InsightsPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Analytics</h2>
          <AnalyticsPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Teams</h2>
          <TeamsPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Blockers</h2>
          <BlockersPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Notifications</h2>
          <NotificationsPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Reports</h2>
          <ReportsPanel />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6">
          <h2 className="text-[18px] font-semibold text-text-primary mb-4">Settings</h2>
          <SettingsPanel />
        </div>
      </section>
    </div>
  )
}
