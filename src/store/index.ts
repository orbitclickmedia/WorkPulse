import { create } from 'zustand'
import type { ChatMessage, Notification, StandupEntry } from '@/types'
import { NOTIFICATIONS } from '@/data/mock'

export type Panel = 'all' | 'dashboard' | 'standup' | 'copilot' | 'insights' | 'analytics' | 'teams' | 'blockers' | 'notifications' | 'reports' | 'settings'

interface AppStore {
  activePanel: Panel
  setActivePanel: (panel: Panel) => void

  timeRange: 'weekly' | 'monthly'
  setTimeRange: (range: 'weekly' | 'monthly') => void

  notifications: Notification[]
  markAllRead: () => void
  markRead: (id: string) => void

  chatMessages: ChatMessage[]
  addChatMessage: (msg: ChatMessage) => void
  clearChat: () => void

  standupDraft: Partial<StandupEntry>
  updateStandupDraft: (patch: Partial<StandupEntry>) => void
  submitStandup: () => void
  standupSubmitted: boolean
}

export const useAppStore = create<AppStore>((set) => ({
  activePanel: 'all',
  setActivePanel: (panel) => set({ activePanel: panel }),

  timeRange: 'weekly',
  setTimeRange: (range) => set({ timeRange: range }),

  notifications: NOTIFICATIONS,
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),

  chatMessages: [
    {
      id: 'init1',
      role: 'assistant',
      content: "👋 Hello Pavan! I'm your WorkPulse Copilot, powered by Claude AI. I have full context of your organization — 47 team members, 5 departments, and today's updates.\n\nWhat would you like to explore?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 'init2',
      role: 'assistant',
      content: "**Here's today's quick snapshot:**\n\n• 94.2% submission rate (↑ 3.1%)\n• 7 active blockers — 2 critical\n• Marketing team at risk (74% rate)\n• Sravya R. burnout risk flagged",
      timestamp: new Date().toISOString(),
    },
  ],
  addChatMessage: (msg) =>
    set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  clearChat: () => set({ chatMessages: [] }),

  standupDraft: {
    accomplished: '',
    tomorrow: '',
    blockers: '',
    priority: 'medium',
    hoursWorked: 8,
  },
  updateStandupDraft: (patch) =>
    set((s) => ({ standupDraft: { ...s.standupDraft, ...patch } })),
  submitStandup: () => set({ standupSubmitted: true }),
  standupSubmitted: false,
}))
