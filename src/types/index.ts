export type Role = 'admin' | 'manager' | 'team_leader' | 'hr' | 'employee'

export type Priority = 'low' | 'medium' | 'high'

export type BlockerSeverity = 'low' | 'medium' | 'high' | 'critical'

export type InsightType = 'warning' | 'success' | 'alert' | 'info'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarInitials: string
  avatarColor: string
  teamId: string
  department: string
  streak: number
  submissionRate: number
}

export interface Team {
  id: string
  name: string
  icon: string
  leaderId: string
  leaderName: string
  department: string
  memberCount: number
  completionRate: number
  healthScore: number
  activeBlockers: number
  color: string
  members: string[]
}

export interface StandupEntry {
  id: string
  userId: string
  userName: string
  date: string
  accomplished: string
  tomorrow: string
  blockers: string
  priority: Priority
  hoursWorked: number
  submitted: boolean
  submittedAt?: string
}

export interface Blocker {
  id: string
  title: string
  description: string
  severity: BlockerSeverity
  teamId: string
  teamName: string
  reportedBy: string
  reportedAt: string
  resolved: boolean
  resolvedAt?: string
  tags: string[]
  hoursUnresolved: number
}

export interface AIInsight {
  id: string
  type: InsightType
  title: string
  description: string
  metric?: string
  actionable: boolean
  generatedAt: string
}

export interface Notification {
  id: string
  title: string
  body: string
  icon: string
  read: boolean
  createdAt: string
  type: 'blocker' | 'standup' | 'ai' | 'team' | 'system'
}

export interface KPIData {
  label: string
  value: string
  delta: string
  deltaType: 'up' | 'down' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
}

export interface DeptMetric {
  name: string
  rate: number
  color: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
