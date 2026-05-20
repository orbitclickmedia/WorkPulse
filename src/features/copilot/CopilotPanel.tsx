'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/store'
import { Card, CardHeader, Badge, StatRow } from '@/components/ui'
import { AI_CHAT_RESPONSES } from '@/data/mock'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const SUGGESTIONS = [
  { label: 'Summarize this week', key: 'summarize this week' },
  { label: 'Who missed today?', key: 'who missed updates today' },
  { label: 'High-risk teams', key: 'show high-risk teams' },
  { label: 'Recurring blockers', key: 'recurring blockers' },
  { label: 'Productivity insights', key: 'productivity insights' },
]

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'
  const formatted = msg.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
    .replace(/•/g, '•')

  return (
    <div className={cn('flex gap-2.5 items-start', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0',
        isUser ? 'bg-gradient-to-br from-orange-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'
      )}>
        {isUser ? 'P' : 'W'}
      </div>
      <div
        className={cn(
          'max-w-[80%] px-3 py-2.5 rounded-xl text-[12.5px] leading-relaxed markdown-content',
          isUser
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-bg-tertiary border border-border-subtle text-text-secondary rounded-bl-sm'
        )}
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    </div>
  )
}

export default function CopilotPanel() {
  const { chatMessages, addChatMessage } = useAppStore()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }
    addChatMessage(userMsg)
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const key = text.toLowerCase()
      const reply =
        AI_CHAT_RESPONSES[key] ??
        `I've analyzed your query: *"${text}"*.\n\nBased on current org data — 47 members, 94.2% submission rate, 7 active blockers — **no anomalies** match this pattern in the last 30 days.\n\nWould you like me to run a deeper analysis or generate a custom report?`

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      }
      addChatMessage(aiMsg)
      setIsTyping(false)
    }, 900)
  }

  return (
    <div className="grid grid-cols-[1fr_260px] gap-4 h-[calc(100vh-120px)]">
      {/* Chat */}
      <Card className="flex flex-col overflow-hidden">
        <CardHeader>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm">🤖</div>
          <div>
            <div className="section-title">WorkPulse Copilot</div>
            <div className="text-[11px] text-text-muted">Powered by Claude AI</div>
          </div>
          <div className="ml-auto"><Badge variant="green">● Live</Badge></div>
        </CardHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isTyping && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white">W</div>
              <div className="bg-bg-tertiary border border-border-subtle px-3 py-2.5 rounded-xl rounded-bl-sm flex items-center gap-1">
                <span className="typing-cursor text-[12px] text-text-muted" />
                <span className="text-[12px] text-text-muted">Analyzing…</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestion chips */}
        <div className="px-4 py-2 border-t border-border-subtle flex gap-2 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => sendMessage(s.label)}
              className="text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 hover:bg-blue-500/20 transition-colors cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border-subtle flex gap-2">
          <textarea
            className="flex-1 bg-bg-tertiary border border-border-default rounded-lg px-3 py-2 text-text-primary text-[13px] outline-none resize-none placeholder:text-text-muted focus:border-blue-500 transition-colors font-sans min-h-[36px] max-h-[100px]"
            placeholder="Ask anything about your team…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            rows={1}
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors flex-shrink-0 cursor-pointer"
          >
            →
          </button>
        </div>
      </Card>

      {/* Sidebar */}
      <div className="space-y-3">
        <Card>
          <CardHeader><span className="section-title">Quick Stats</span></CardHeader>
          <div className="px-4 py-2">
            <StatRow label="Team members" value="47" />
            <StatRow label="Avg hours/day" value="7.8h" />
            <StatRow label="Blockers resolved" value="23" />
            <StatRow label="AI queries today" value="34" />
            <StatRow label="Submission rate" value="94.2%" />
          </div>
        </Card>

        <Card>
          <CardHeader><span className="section-title">Suggested Actions</span></CardHeader>
          <div className="p-3 space-y-2">
            <ActionCard variant="red" emoji="🚨" title="Critical" desc="Escalate deploy blocker — 6hr unresolved" />
            <ActionCard variant="amber" emoji="⚠" title="Warning" desc="Check in with Marketing — 3 consecutive misses" />
            <ActionCard variant="blue" emoji="💡" title="Insight" desc="Product team's 96% rate — share best practices" />
          </div>
        </Card>
      </div>
    </div>
  )
}

function ActionCard({ variant, emoji, title, desc }: {
  variant: 'red' | 'amber' | 'blue'
  emoji: string; title: string; desc: string
}) {
  const styles = {
    red: 'bg-red-500/5 border-red-500/20 text-red-400',
    amber: 'bg-amber-500/5 border-amber-500/20 text-amber-400',
    blue: 'bg-blue-500/5 border-blue-500/20 text-blue-400',
  }
  return (
    <div className={cn('p-2.5 rounded-lg border', styles[variant])}>
      <p className="text-[11px] font-semibold">{emoji} {title}</p>
      <p className="text-[11px] text-text-secondary mt-1">{desc}</p>
    </div>
  )
}
