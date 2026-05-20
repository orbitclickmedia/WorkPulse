import type { User, Team, StandupEntry, Blocker, AIInsight, Notification, KPIData, DeptMetric } from '@/types'

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Pavan Kumar',
  email: 'pavan@ekluvya.io',
  role: 'admin',
  avatarInitials: 'PK',
  avatarColor: 'from-purple-500 to-pink-500',
  teamId: 't2',
  department: 'Design',
  streak: 14,
  submissionRate: 96,
}

export const USERS: User[] = [
  { id: 'u1', name: 'Pavan Kumar', email: 'pavan@ekluvya.io', role: 'admin', avatarInitials: 'PK', avatarColor: 'from-purple-500 to-pink-500', teamId: 't2', department: 'Design', streak: 14, submissionRate: 96 },
  { id: 'u2', name: 'Arjun Mehta', email: 'arjun@ekluvya.io', role: 'team_leader', avatarInitials: 'AM', avatarColor: 'from-indigo-500 to-purple-500', teamId: 't1', department: 'Engineering', streak: 21, submissionRate: 98 },
  { id: 'u3', name: 'Sravya Reddy', email: 'sravya@ekluvya.io', role: 'employee', avatarInitials: 'SR', avatarColor: 'from-orange-500 to-pink-500', teamId: 't1', department: 'Engineering', streak: 12, submissionRate: 94 },
  { id: 'u4', name: 'Kiran Patel', email: 'kiran@ekluvya.io', role: 'employee', avatarInitials: 'KP', avatarColor: 'from-teal-500 to-blue-500', teamId: 't1', department: 'Engineering', streak: 5, submissionRate: 81 },
  { id: 'u5', name: 'Divya Nair', email: 'divya@ekluvya.io', role: 'employee', avatarInitials: 'DN', avatarColor: 'from-green-500 to-teal-500', teamId: 't2', department: 'Design', streak: 0, submissionRate: 72 },
  { id: 'u6', name: 'Ravi Verma', email: 'ravi@ekluvya.io', role: 'employee', avatarInitials: 'RV', avatarColor: 'from-violet-500 to-pink-500', teamId: 't1', department: 'Engineering', streak: 8, submissionRate: 89 },
  { id: 'u7', name: 'Meera Joshi', email: 'meera@ekluvya.io', role: 'team_leader', avatarInitials: 'MJ', avatarColor: 'from-teal-400 to-blue-500', teamId: 't3', department: 'Product', streak: 18, submissionRate: 97 },
  { id: 'u8', name: 'Raj Tiwari', email: 'raj@ekluvya.io', role: 'team_leader', avatarInitials: 'RT', avatarColor: 'from-amber-500 to-red-500', teamId: 't4', department: 'Marketing', streak: 3, submissionRate: 71 },
]

export const TEAMS: Team[] = [
  { id: 't1', name: 'Engineering', icon: '💻', leaderId: 'u2', leaderName: 'Arjun Mehta', department: 'Engineering', memberCount: 12, completionRate: 91, healthScore: 91, activeBlockers: 2, color: '#3b82f6', members: ['u2','u3','u4','u6'] },
  { id: 't2', name: 'Design', icon: '🎨', leaderId: 'u1', leaderName: 'Pavan Kumar', department: 'Design', memberCount: 8, completionRate: 88, healthScore: 88, activeBlockers: 1, color: '#8b5cf6', members: ['u1','u5'] },
  { id: 't3', name: 'Product', icon: '📦', leaderId: 'u7', leaderName: 'Meera Joshi', department: 'Product', memberCount: 9, completionRate: 96, healthScore: 96, activeBlockers: 0, color: '#14b8a6', members: ['u7'] },
  { id: 't4', name: 'Marketing', icon: '📢', leaderId: 'u8', leaderName: 'Raj Tiwari', department: 'Marketing', memberCount: 10, completionRate: 74, healthScore: 62, activeBlockers: 2, color: '#f59e0b', members: ['u8'] },
  { id: 't5', name: 'Operations', icon: '⚙️', leaderId: 'u1', leaderName: 'Priya Singh', department: 'Operations', memberCount: 8, completionRate: 82, healthScore: 79, activeBlockers: 2, color: '#22c55e', members: [] },
]

export const STANDUP_ENTRIES: StandupEntry[] = [
  { id: 's1', userId: 'u1', userName: 'Pavan Kumar', date: '2026-05-17', accomplished: 'Completed the motion graphics storyboard for Q2 campaign. Reviewed and approved 2 video drafts. Fixed the timeline sync issue in the edit suite.', tomorrow: 'Render final exports for campaign videos. Start landing page motion concepts. Brief junior designer on animation guidelines.', blockers: 'Still waiting for client sign-off on color palette. Adobe license renewal pending.', priority: 'medium', hoursWorked: 8, submitted: true, submittedAt: '2026-05-17T09:12:00Z' },
  { id: 's2', userId: 'u2', userName: 'Arjun Mehta', date: '2026-05-17', accomplished: 'Completed auth flow integration, reviewed 3 PRs, fixed billing service bug, deployed hotfix to prod.', tomorrow: 'Start dashboard API refactor, sprint planning meeting, code review session.', blockers: 'API rate limit issue blocking pipeline. Needs DevOps attention immediately.', priority: 'high', hoursWorked: 9, submitted: true, submittedAt: '2026-05-17T08:45:00Z' },
  { id: 's3', userId: 'u3', userName: 'Sravya Reddy', date: '2026-05-17', accomplished: 'Implemented new notification system, wrote unit tests for auth module, updated API documentation.', tomorrow: 'Continue notification system, begin mobile responsive fixes.', blockers: 'None currently.', priority: 'medium', hoursWorked: 10, submitted: true, submittedAt: '2026-05-17T09:30:00Z' },
  { id: 's4', userId: 'u4', userName: 'Kiran Patel', date: '2026-05-17', accomplished: 'Working on database migration.', tomorrow: 'Continue migration.', blockers: 'Migration script failing on staging environment.', priority: 'high', hoursWorked: 7, submitted: false },
  { id: 's5', userId: 'u5', userName: 'Divya Nair', date: '2026-05-17', accomplished: '', tomorrow: '', blockers: '', priority: 'low', hoursWorked: 0, submitted: false },
]

export const BLOCKERS: Blocker[] = [
  { id: 'b1', title: 'API rate limit blocking production deploy pipeline', description: 'External API rate limits are preventing automated deployment pipeline from completing. All prod deploys blocked for 6+ hours.', severity: 'critical', teamId: 't1', teamName: 'Engineering', reportedBy: 'Arjun Mehta', reportedAt: '2026-05-17T03:00:00Z', resolved: false, tags: ['DevOps', 'Deploy', 'API'], hoursUnresolved: 6 },
  { id: 'b2', title: 'Client sign-off pending — blocking creative deliverables', description: 'Client has not approved color palette and brand assets. Blocking all Q2 campaign deliverables across the Design team.', severity: 'critical', teamId: 't2', teamName: 'Design', reportedBy: 'Pavan Kumar', reportedAt: '2026-05-15T10:00:00Z', resolved: false, tags: ['Client', 'Creative'], hoursUnresolved: 48 },
  { id: 'b3', title: 'Adobe CC license renewal pending — team at risk', description: 'Adobe Creative Cloud licenses expire in 24 hours. IT has not processed renewal. Entire Design team will be locked out.', severity: 'high', teamId: 't2', teamName: 'Design', reportedBy: 'Pavan Kumar', reportedAt: '2026-05-16T14:00:00Z', resolved: false, tags: ['Licensing', 'IT'], hoursUnresolved: 19 },
  { id: 'b4', title: 'Database migration script failing on staging', description: 'Foreign key constraint errors on staging DB. Migration cannot proceed until schema conflicts resolved.', severity: 'medium', teamId: 't1', teamName: 'Engineering', reportedBy: 'Kiran Patel', reportedAt: '2026-05-17T05:00:00Z', resolved: false, tags: ['Backend', 'Database'], hoursUnresolved: 4 },
  { id: 'b5', title: 'Figma variable syncing issue on design system', description: 'Variables not syncing across Figma libraries. Affects all design components.', severity: 'low', teamId: 't2', teamName: 'Design', reportedBy: 'Meera Joshi', reportedAt: '2026-05-17T07:00:00Z', resolved: false, tags: ['Design', 'Figma'], hoursUnresolved: 2 },
  { id: 'b6', title: 'Third-party analytics SDK causing memory leak', description: 'Analytics SDK v3.2.1 causing browser memory leak. Reverted to v3.1.9 but need permanent fix.', severity: 'medium', teamId: 't1', teamName: 'Engineering', reportedBy: 'Ravi Verma', reportedAt: '2026-05-16T16:00:00Z', resolved: false, tags: ['Frontend', 'Performance'], hoursUnresolved: 17 },
  { id: 'b7', title: 'Campaign copy approval loop — 3 rounds without sign-off', description: 'Marketing campaign copy has gone through 3 revision rounds. Stakeholders not aligned on messaging direction.', severity: 'high', teamId: 't4', teamName: 'Marketing', reportedBy: 'Raj Tiwari', reportedAt: '2026-05-16T11:00:00Z', resolved: false, tags: ['Content', 'Stakeholder'], hoursUnresolved: 22 },
]

export const AI_INSIGHTS: AIInsight[] = [
  { id: 'i1', type: 'alert', title: 'Deploy Pipeline Blocked', description: 'API rate limit issue has blocked production deploys for 6+ hours. Escalation required immediately — Engineering velocity at risk.', metric: 'Critical', actionable: true, generatedAt: '2026-05-17T09:00:00Z' },
  { id: 'i2', type: 'warning', title: 'Burnout Risk — Sravya Reddy', description: '52 hours logged this week. Workload is 68% above team average. Pattern consistent with burnout onset within 2 weeks.', metric: '74% risk', actionable: true, generatedAt: '2026-05-17T08:30:00Z' },
  { id: 'i3', type: 'success', title: 'Product Team Excellence Streak', description: 'Product department maintained 96% submission rate for 4 consecutive weeks — highest sustained performance in org history.', metric: '96%', actionable: false, generatedAt: '2026-05-17T08:00:00Z' },
  { id: 'i4', type: 'info', title: 'Marketing Engagement Drop', description: '74% submission rate, down from 91% last month. 3 team members missed 3+ consecutive standups. Trend requires intervention.', metric: '−17%', actionable: true, generatedAt: '2026-05-17T07:45:00Z' },
  { id: 'i5', type: 'warning', title: 'Recurring API Blocker Pattern', description: 'API-related blockers have occurred 4 times in 3 weeks. Infrastructure improvement or vendor SLA review recommended.', metric: '4× in 3wks', actionable: true, generatedAt: '2026-05-17T07:00:00Z' },
  { id: 'i6', type: 'success', title: 'Organization Submission Rate All-Time High', description: 'Week of May 11–17 achieved 94.2% submission rate — highest in 6 months. Strong leadership and consistent reminders cited.', metric: '94.2%', actionable: false, generatedAt: '2026-05-17T06:00:00Z' },
]

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Critical Blocker Escalated', body: 'API rate limit issue in Engineering has been escalated. 6 hours unresolved — requires immediate attention.', icon: '🚨', read: false, createdAt: '2026-05-17T09:00:00Z', type: 'blocker' },
  { id: 'n2', title: 'Missed Standup — Divya Nair', body: 'Divya Nair has not submitted today\'s standup. This is their 2nd miss this week.', icon: '⚠️', read: false, createdAt: '2026-05-17T08:00:00Z', type: 'standup' },
  { id: 'n3', title: 'Burnout Risk Detected', body: 'AI detected burnout risk for Sravya Reddy — 52h logged this week. Consider a check-in conversation.', icon: '🔥', read: false, createdAt: '2026-05-17T07:30:00Z', type: 'ai' },
  { id: 'n4', title: 'Weekly Report Ready', body: 'Your AI-generated weekly digest for May 11–17 is ready. 94.2% completion rate — best this quarter.', icon: '📊', read: false, createdAt: '2026-05-17T06:00:00Z', type: 'ai' },
  { id: 'n5', title: 'New Team Member', body: 'Meera Joshi has joined the Design team. Onboarding checklist sent to team lead.', icon: '👤', read: false, createdAt: '2026-05-16T16:30:00Z', type: 'team' },
  { id: 'n6', title: 'Blocker Resolved — Auth Service', body: 'The authentication service timeout blocker was resolved by Ravi Verma in 2.3 hours.', icon: '✅', read: true, createdAt: '2026-05-16T11:00:00Z', type: 'blocker' },
  { id: 'n7', title: 'Standup Reminder', body: '3 team members haven\'t submitted today\'s standup. Auto-reminder sent at 2:00 PM.', icon: '⏰', read: true, createdAt: '2026-05-16T14:00:00Z', type: 'standup' },
]

export const KPI_DATA: KPIData[] = [
  { label: 'Submission Rate', value: '94.2%', delta: '↑ 3.1% vs last week', deltaType: 'up', icon: '📈', iconBg: 'bg-teal-500/10', iconColor: 'text-teal-400' },
  { label: 'Active Blockers', value: '7', delta: '↑ 2 critical escalated', deltaType: 'down', icon: '🚧', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Team Health Score', value: '87', delta: '↑ 4pts this week', deltaType: 'up', icon: '❤️', iconBg: 'bg-green-500/10', iconColor: 'text-green-400' },
  { label: 'AI Insights Today', value: '12', delta: '3 require action', deltaType: 'neutral', icon: '🤖', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
]

export const DEPT_METRICS: DeptMetric[] = [
  { name: 'Engineering', rate: 91, color: '#3b82f6' },
  { name: 'Design', rate: 88, color: '#8b5cf6' },
  { name: 'Product', rate: 96, color: '#14b8a6' },
  { name: 'Marketing', rate: 74, color: '#f59e0b' },
  { name: 'Operations', rate: 82, color: '#22c55e' },
]

export const WEEKLY_TREND = [
  { day: 'Mon', rate: 88, hours: 7.5 },
  { day: 'Tue', rate: 92, hours: 8.1 },
  { day: 'Wed', rate: 87, hours: 7.8 },
  { day: 'Thu', rate: 95, hours: 8.4 },
  { day: 'Fri', rate: 91, hours: 7.9 },
  { day: 'Sat', rate: 72, hours: 4.2 },
  { day: 'Sun', rate: 58, hours: 2.1 },
]

export const BLOCKER_FREQUENCY = [
  { category: 'API Issues', count: 8 },
  { category: 'Client Delays', count: 5 },
  { category: 'Infrastructure', count: 4 },
  { category: 'Design Assets', count: 3 },
  { category: 'Access/Licenses', count: 2 },
]

export const ACTIVITY_FEED = [
  { id: 'a1', text: 'Arjun Mehta submitted today\'s standup — 3 tasks completed', time: '2 min ago', color: '#22c55e', type: 'standup' },
  { id: 'a2', text: 'Blocker escalated — API rate limit blocking deploy pipeline', time: '18 min ago', color: '#ef4444', type: 'blocker' },
  { id: 'a3', text: 'AI Copilot generated weekly digest for Engineering team', time: '1 hr ago', color: '#3b82f6', type: 'ai' },
  { id: 'a4', text: 'New member Meera Joshi joined Design team', time: '3 hr ago', color: '#8b5cf6', type: 'team' },
  { id: 'a5', text: 'Burnout alert — Sravya Reddy logged 52hr this week', time: 'Yesterday', color: '#f59e0b', type: 'alert' },
]

export const TOP_CONTRIBUTORS = [
  { rank: 1, name: 'Arjun Mehta', rate: 98, streak: 21, medal: '🥇' },
  { rank: 2, name: 'Pavan Kumar', rate: 96, streak: 14, medal: '🥈' },
  { rank: 3, name: 'Sravya Reddy', rate: 94, streak: 12, medal: '🥉' },
  { rank: 4, name: 'Ravi Verma', rate: 89, streak: 8, medal: '' },
  { rank: 5, name: 'Kiran Patel', rate: 81, streak: 5, medal: '' },
]

export const AI_CHAT_RESPONSES: Record<string, string> = {
  'summarize this week': `**This week's summary (May 11–17):**\n\n• **94.2% submission rate** — up 3.1% week-over-week\n• Engineering led with 91%, Product hit 96%, Marketing dropped to 74% ⚠️\n• **7 active blockers** — 2 critical, 2 high priority\n• 1 burnout risk detected: Sravya Reddy (52h this week)\n• 12 AI insights generated, 3 require immediate action\n\nOverall: **Strong week** with 2 areas needing attention.`,
  'who missed updates today': `**Missed standups today (May 17):**\n\n🔴 **Divya Nair** (Design) — 2nd consecutive miss this week\n🟡 **Kiran Patel** (Engineering) — submission pending (late)\n\nRecommendation: Send direct reminder to Divya Nair and flag to Design team lead. Kiran's submission is still open — give until EOD.`,
  'show high-risk teams': `**High-risk teams this week:**\n\n🔴 **Marketing** — 74% rate (was 91% last month), 3 members missed 3+ standups, trending downward for 3 weeks\n\n🟡 **Operations** — 82% rate, slower decline over 2 weeks\n\nRecommendation: Schedule 1:1 with Marketing team lead Raj Tiwari. Review engagement and check for team-level blockers.`,
  'recurring blockers': `**Recurring Blocker Analysis (last 30 days):**\n\n• **API rate limits** — 4 occurrences in 3 weeks (infrastructure pattern)\n• **Client sign-off delays** — 3 times this month (process gap)\n• **License/access issues** — 5 times (IT coordination needed)\n\nRecommendation: Create SLAs for each blocker category. Automate IT license renewal alerts 30 days in advance.`,
  'productivity insights': `**Productivity Insights:**\n\n📈 Avg daily hours: **7.8h** (↑0.3h vs last week)\n🏆 Highest output day: **Thursday** (8.4h avg, 95% rate)\n⚠️ Lowest: **Weekend** (expected dropoff)\n\nTop performer: **Arjun Mehta** — 21-day streak, 98% rate\nAt risk: **Sravya Reddy** — overwork pattern flagged`,
}
