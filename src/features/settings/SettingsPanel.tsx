'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody, Toggle, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

type SettingsTab = 'workspace' | 'notifications' | 'ai' | 'security' | 'integrations' | 'audit'

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: 'workspace', label: 'Workspace', icon: '🏢' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'ai', label: 'AI Settings', icon: '🤖' },
  { id: 'security', label: 'Security', icon: '🛡️' },
  { id: 'integrations', label: 'Integrations', icon: '🔌' },
  { id: 'audit', label: 'Audit Log', icon: '📋' },
]

function SettingRow({
  label,
  desc,
  children,
}: {
  label: string
  desc?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border-subtle last:border-0">
      <div>
        <div className="text-[13px] font-medium text-text-primary">{label}</div>
        {desc && <div className="text-[11px] text-text-muted mt-0.5">{desc}</div>}
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  )
}

function WorkspaceTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Organization</span></CardHeader>
        <CardBody>
          <SettingRow label="Organization Name" desc="Visible to all members">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-secondary">Ekluvya Design Studio</span>
              <button className="btn-secondary text-[11px] px-2 py-1">Edit</button>
            </div>
          </SettingRow>
          <SettingRow label="Organization Slug" desc="Used in URLs and API">
            <div className="flex items-center gap-2">
              <code className="text-[11px] text-text-muted bg-bg-tertiary px-2 py-1 rounded font-mono">ekluvya</code>
              <button className="btn-secondary text-[11px] px-2 py-1">Edit</button>
            </div>
          </SettingRow>
          <SettingRow label="Organization Logo" desc="Appears in reports and exports">
            <button className="btn-secondary text-[11px] px-2 py-1">Upload Logo</button>
          </SettingRow>
          <SettingRow label="Plan" desc="Current billing plan">
            <div className="flex items-center gap-2">
              <Badge variant="blue">Pro</Badge>
              <button className="btn-primary text-[11px] px-2 py-1">Upgrade</button>
            </div>
          </SettingRow>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Standup Settings</span></CardHeader>
        <CardBody>
          <SettingRow label="Daily Reminder Time" desc="Sent to all members who haven't submitted">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-secondary">9:00 AM IST</span>
              <button className="btn-secondary text-[11px] px-2 py-1">Edit</button>
            </div>
          </SettingRow>
          <SettingRow label="Standup Window" desc="How long members can submit before it's marked late">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-secondary">Until 2:00 PM</span>
              <button className="btn-secondary text-[11px] px-2 py-1">Edit</button>
            </div>
          </SettingRow>
          <SettingRow label="Timezone" desc="Organization timezone">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-secondary">Asia/Kolkata (IST +5:30)</span>
              <button className="btn-secondary text-[11px] px-2 py-1">Edit</button>
            </div>
          </SettingRow>
          <SettingRow label="Weekend Standups" desc="Require submissions on Saturday and Sunday">
            <Toggle value={false} onChange={() => {}} />
          </SettingRow>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Members & Roles</span></CardHeader>
        <CardBody>
          <SettingRow label="Total Members" desc="Across all departments">
            <span className="text-[13px] font-semibold text-text-primary">47</span>
          </SettingRow>
          <SettingRow label="Invite New Members" desc="Send email invites">
            <button className="btn-primary text-[11px] px-3 py-1.5">+ Invite</button>
          </SettingRow>
          <SettingRow label="Default Role" desc="Role assigned to new invitees">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-secondary">Employee</span>
              <button className="btn-secondary text-[11px] px-2 py-1">Change</button>
            </div>
          </SettingRow>
        </CardBody>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    missedStandup: true,
    blockerEscalation: true,
    aiDigest: true,
    slack: false,
    teams: false,
    emailReports: true,
    burnoutAlert: true,
    weeklyDigest: true,
  })

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Standup Alerts</span></CardHeader>
        <CardBody>
          <SettingRow label="Missed standup alerts" desc="Notify managers when team members miss submission">
            <Toggle value={settings.missedStandup} onChange={() => toggle('missedStandup')} />
          </SettingRow>
          <SettingRow label="Late submission alerts" desc="Notify when submitted after the window">
            <Toggle value={true} onChange={() => {}} />
          </SettingRow>
          <SettingRow label="Streak broken alert" desc="Alert when a member breaks a streak of 7+ days">
            <Toggle value={true} onChange={() => {}} />
          </SettingRow>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Blocker & Risk Alerts</span></CardHeader>
        <CardBody>
          <SettingRow label="Blocker escalations" desc="Alert on critical blockers unresolved for 4h+">
            <Toggle value={settings.blockerEscalation} onChange={() => toggle('blockerEscalation')} />
          </SettingRow>
          <SettingRow label="Burnout risk detection" desc="AI alerts on overwork patterns">
            <Toggle value={settings.burnoutAlert} onChange={() => toggle('burnoutAlert')} />
          </SettingRow>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Reports & Digests</span></CardHeader>
        <CardBody>
          <SettingRow label="AI daily digest" desc="Morning AI summary delivered by email">
            <Toggle value={settings.aiDigest} onChange={() => toggle('aiDigest')} />
          </SettingRow>
          <SettingRow label="Weekly digest email" desc="Every Monday at 8:00 AM">
            <Toggle value={settings.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
          </SettingRow>
          <SettingRow label="Email reports" desc="Receive scheduled reports via email">
            <Toggle value={settings.emailReports} onChange={() => toggle('emailReports')} />
          </SettingRow>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Integrations</span></CardHeader>
        <CardBody>
          <SettingRow label="Slack notifications" desc="Push to #standup and #alerts channels">
            <Toggle value={settings.slack} onChange={() => toggle('slack')} />
          </SettingRow>
          <SettingRow label="Microsoft Teams" desc="Post updates to Teams channels">
            <Toggle value={settings.teams} onChange={() => toggle('teams')} />
          </SettingRow>
        </CardBody>
      </Card>
    </div>
  )
}

function AITab() {
  const [settings, setSettings] = useState({
    writing: true,
    burnout: true,
    autoInsights: true,
    blocker: true,
    copilot: true,
    streaming: true,
  })
  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">AI Features</span></CardHeader>
        <CardBody>
          <SettingRow label="AI writing enhancement" desc="Improve standup clarity and completeness with AI">
            <Toggle value={settings.writing} onChange={() => toggle('writing')} />
          </SettingRow>
          <SettingRow label="AI blocker categorization" desc="Auto-tag and categorize blockers using AI">
            <Toggle value={settings.blocker} onChange={() => toggle('blocker')} />
          </SettingRow>
          <SettingRow label="Burnout detection" desc="AI monitors workload patterns for risk signals">
            <Toggle value={settings.burnout} onChange={() => toggle('burnout')} />
          </SettingRow>
          <SettingRow label="Auto-generated insights" desc="Generate daily org-wide insights automatically">
            <Toggle value={settings.autoInsights} onChange={() => toggle('autoInsights')} />
          </SettingRow>
          <SettingRow label="AI Copilot" desc="Enable the AI chat assistant for all admins">
            <Toggle value={settings.copilot} onChange={() => toggle('copilot')} />
          </SettingRow>
          <SettingRow label="Streaming responses" desc="Stream AI responses in real-time">
            <Toggle value={settings.streaming} onChange={() => toggle('streaming')} />
          </SettingRow>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">AI Model</span></CardHeader>
        <CardBody>
          <SettingRow label="Model" desc="AI model used for analysis and generation">
            <div className="flex items-center gap-2">
              <Badge variant="purple">Claude claude-sonnet-4-20250514</Badge>
            </div>
          </SettingRow>
          <SettingRow label="Context window" desc="Data included in each AI request">
            <span className="text-[12px] text-text-secondary">Last 30 days</span>
          </SettingRow>
          <SettingRow label="AI usage this month" desc="API calls consumed">
            <span className="text-[13px] font-semibold text-text-primary">1,247 calls</span>
          </SettingRow>
        </CardBody>
      </Card>
    </div>
  )
}

function SecurityTab() {
  const [settings, setSettings] = useState({
    twofa: true,
    auditLog: true,
    sso: true,
    sessionTimeout: true,
    ipRestrict: false,
  })
  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Authentication</span></CardHeader>
        <CardBody>
          <SettingRow label="Require 2FA" desc="Enforce two-factor authentication for all members">
            <Toggle value={settings.twofa} onChange={() => toggle('twofa')} />
          </SettingRow>
          <SettingRow label="Google SSO" desc="Allow sign-in with Google Workspace">
            <Toggle value={settings.sso} onChange={() => toggle('sso')} />
          </SettingRow>
          <SettingRow label="Session timeout" desc="Auto-logout after 8 hours of inactivity">
            <Toggle value={settings.sessionTimeout} onChange={() => toggle('sessionTimeout')} />
          </SettingRow>
          <SettingRow label="IP restrictions" desc="Limit access to specific IP ranges">
            <Toggle value={settings.ipRestrict} onChange={() => toggle('ipRestrict')} />
          </SettingRow>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><span className="text-[13px] font-semibold text-text-primary">Data & Privacy</span></CardHeader>
        <CardBody>
          <SettingRow label="Audit logging" desc="Track all admin actions and data changes">
            <Toggle value={settings.auditLog} onChange={() => toggle('auditLog')} />
          </SettingRow>
          <SettingRow label="Data retention" desc="Standup data kept for">
            <span className="text-[12px] text-text-secondary">2 years</span>
          </SettingRow>
          <SettingRow label="Export your data" desc="Download all organization data as JSON">
            <button className="btn-secondary text-[11px] px-2 py-1">Export</button>
          </SettingRow>
          <SettingRow label="Delete organization" desc="Permanently delete all data — irreversible">
            <button className="text-[11px] font-medium text-red-400 border border-red-500/30 bg-red-500/5 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
              Delete Org
            </button>
          </SettingRow>
        </CardBody>
      </Card>
    </div>
  )
}

function IntegrationsTab() {
  const integrations = [
    { name: 'Slack', desc: 'Post standups and alerts to Slack channels', icon: '💬', connected: false, color: 'bg-purple-500/10' },
    { name: 'Microsoft Teams', desc: 'Send notifications to Teams channels', icon: '🟦', connected: false, color: 'bg-blue-500/10' },
    { name: 'Jira', desc: 'Link blockers to Jira tickets automatically', icon: '🔵', connected: true, color: 'bg-blue-500/10' },
    { name: 'GitHub', desc: 'Connect PRs and commits to standup entries', icon: '⚫', connected: false, color: 'bg-bg-elevated' },
    { name: 'Google Calendar', desc: 'Sync standup reminders with calendar', icon: '📅', connected: true, color: 'bg-green-500/10' },
    { name: 'Notion', desc: 'Export standups and reports to Notion', icon: '📓', connected: false, color: 'bg-bg-elevated' },
    { name: 'Linear', desc: 'Link tasks and blockers to Linear issues', icon: '⬡', connected: false, color: 'bg-purple-500/10' },
    { name: 'Zapier', desc: 'Connect WorkPulse to 5000+ apps', icon: '⚡', connected: false, color: 'bg-amber-500/10' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {integrations.map((intg) => (
        <div
          key={intg.name}
          className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-xl hover:border-border-default transition-colors"
        >
          <div className={`w-10 h-10 ${intg.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
            {intg.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-text-primary">{intg.name}</div>
            <div className="text-[11px] text-text-muted">{intg.desc}</div>
          </div>
          {intg.connected ? (
            <Badge variant="green">Connected</Badge>
          ) : (
            <button className="btn-secondary text-[11px] px-2 py-1 flex-shrink-0">Connect</button>
          )}
        </div>
      ))}
    </div>
  )
}

function AuditTab() {
  const logs = [
    { action: 'Blocker escalated', user: 'Pavan Kumar', detail: 'API rate limit blocker marked critical', time: '9:14 AM', type: 'blocker' },
    { action: 'Member invited', user: 'Pavan Kumar', detail: 'meera.joshi@ekluvya.io invited to Design team', time: '8:55 AM', type: 'member' },
    { action: 'Report generated', user: 'System (AI)', detail: 'Weekly Executive Summary — May 11–17', time: '7:00 AM', type: 'report' },
    { action: 'Settings changed', user: 'Pavan Kumar', detail: 'Standup reminder changed to 9:00 AM IST', time: 'Yesterday 6:00 PM', type: 'settings' },
    { action: 'Team created', user: 'Pavan Kumar', detail: 'New team "Operations" created with 8 members', time: 'Yesterday 3:30 PM', type: 'team' },
    { action: 'Role changed', user: 'Pavan Kumar', detail: 'Arjun Mehta promoted to Team Leader', time: 'Yesterday 11:00 AM', type: 'member' },
    { action: 'Integration connected', user: 'Pavan Kumar', detail: 'Google Calendar integration enabled', time: 'May 15, 2026', type: 'integration' },
    { action: 'Export generated', user: 'Pavan Kumar', detail: 'Department Comparison Report exported as PDF', time: 'May 14, 2026', type: 'report' },
  ]

  const typeColors: Record<string, string> = {
    blocker: 'text-red-400',
    member: 'text-blue-400',
    report: 'text-purple-400',
    settings: 'text-amber-400',
    team: 'text-teal-400',
    integration: 'text-green-400',
  }

  return (
    <div className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="section-title">Audit Log</span>
        <button className="btn-secondary text-[11px] px-2 py-1">Export CSV</button>
      </div>
      <div className="divide-y divide-border-subtle">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors">
            <div className={`text-[11px] font-semibold mt-0.5 w-32 flex-shrink-0 ${typeColors[log.type] ?? 'text-text-muted'}`}>
              {log.action}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-medium text-text-primary">{log.user}</span>
              <span className="text-[11.5px] text-text-secondary ml-2">— {log.detail}</span>
            </div>
            <span className="text-[10px] text-text-muted flex-shrink-0">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TAB_CONTENT: Record<SettingsTab, React.ReactNode> = {
  workspace: <WorkspaceTab />,
  notifications: <NotificationsTab />,
  ai: <AITab />,
  security: <SecurityTab />,
  integrations: <IntegrationsTab />,
  audit: <AuditTab />,
}

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('workspace')

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[15px] font-semibold text-text-primary">Settings</h2>
        <p className="text-[11px] text-text-muted mt-0.5">Manage your workspace, team, AI, and security preferences</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-bg-tertiary p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 cursor-pointer',
              activeTab === tab.id
                ? 'bg-bg-secondary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  )
}
