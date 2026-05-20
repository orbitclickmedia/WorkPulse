'use client'

import { useState } from 'react'
import { useAppStore } from '@/store'
import { Card, CardHeader, CardBody, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

type Priority = 'low' | 'medium' | 'high'

const PRIORITIES: { value: Priority; label: string; color: string; activeCls: string }[] = [
  { value: 'high', label: '🔴 High', color: '', activeCls: 'bg-red-500/10 text-red-400 border-red-500' },
  { value: 'medium', label: '🟡 Medium', color: '', activeCls: 'bg-amber-500/10 text-amber-400 border-amber-500' },
  { value: 'low', label: '🟢 Low', color: '', activeCls: 'bg-green-500/10 text-green-400 border-green-500' },
]

export default function StandupPanel() {
  const { standupDraft, updateStandupDraft } = useAppStore()
  const [priority, setPriority] = useState<Priority>('medium')
  const [hours, setHours] = useState(8)
  const [submitted, setSubmitted] = useState(false)
  const [aiEnhancing, setAiEnhancing] = useState(false)
  const [aiResult, setAiResult] = useState<'idle' | 'enhancing' | 'done'>('idle')

  const handleEnhance = () => {
    setAiResult('enhancing')
    setTimeout(() => setAiResult('done'), 1400)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <div className="grid grid-cols-[1fr_300px] gap-4">
      {/* Form */}
      <Card>
        <CardHeader>
          <span className="text-base">📝</span>
          <div>
            <div className="section-title">Daily Standup — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
            <div className="text-[11px] text-text-muted mt-0.5">Autosaving draft…</div>
          </div>
          <div className="ml-auto"><Badge variant="blue">AI Enhanced</Badge></div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <FormGroup label="What did you accomplish today?">
              <textarea
                className="form-textarea min-h-[80px]"
                placeholder="e.g. Completed the auth flow, reviewed 3 PRs, fixed the billing bug…"
                defaultValue="Completed the motion graphics storyboard for Q2 campaign. Reviewed and approved 2 video drafts. Fixed the timeline sync issue in the edit suite."
                onChange={(e) => updateStandupDraft({ accomplished: e.target.value })}
              />
            </FormGroup>
            <FormGroup label="What will you do tomorrow?">
              <textarea
                className="form-textarea min-h-[80px]"
                placeholder="e.g. Start the dashboard redesign, meet with product team…"
                defaultValue="Render final exports for campaign videos. Start on new landing page motion concepts. Brief junior designer on animation guidelines."
                onChange={(e) => updateStandupDraft({ tomorrow: e.target.value })}
              />
            </FormGroup>
            <FormGroup label="Any blockers?">
              <textarea
                className="form-textarea min-h-[60px]"
                placeholder="e.g. Waiting for design assets, blocked on API access…"
                defaultValue="Still waiting for client sign-off on color palette. Adobe license renewal pending — might affect the team tomorrow."
                onChange={(e) => updateStandupDraft({ blockers: e.target.value })}
              />
            </FormGroup>

            <FormGroup label="Priority Level">
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-150 cursor-pointer',
                      priority === p.value
                        ? p.activeCls
                        : 'border-border-default text-text-secondary bg-transparent hover:bg-bg-tertiary'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </FormGroup>

            <FormGroup label={`Hours Worked — ${hours}h`}>
              <input
                type="range"
                min={1}
                max={12}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </FormGroup>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleEnhance}
                className="btn-secondary flex-1 justify-center"
                disabled={aiResult === 'enhancing'}
              >
                {aiResult === 'enhancing' ? '🤖 Enhancing…' : '🤖 AI Enhance'}
              </button>
              <button
                onClick={handleSubmit}
                className={cn(
                  'flex-1 justify-center btn-primary',
                  submitted && 'bg-green-500 hover:bg-green-500'
                )}
              >
                {submitted ? '✓ Submitted!' : 'Submit Standup →'}
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sidebar */}
      <div className="space-y-3">
        {/* AI Analysis */}
        <Card>
          <CardHeader><span className="section-title">🤖 AI Analysis</span></CardHeader>
          <CardBody>
            {aiResult === 'idle' && (
              <>
                <div className="flex gap-2 mb-3">
                  <Badge variant="green">✓ No critical blockers</Badge>
                  <Badge variant="blue">High productivity</Badge>
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Your standup shows strong output with 3 completed tasks. The Adobe license blocker has medium risk — consider escalating to ensure team continuity.
                </p>
                <div className="mt-3 p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/20">
                  <p className="text-[11px] font-semibold text-amber-400">⚠ Suggestion</p>
                  <p className="text-[11px] text-text-secondary mt-1">Escalate Adobe license renewal to IT today to avoid blocking the team tomorrow.</p>
                </div>
              </>
            )}
            {aiResult === 'enhancing' && (
              <div className="flex items-center gap-2 py-4">
                <span className="typing-cursor" />
                <span className="text-[12px] text-text-muted">AI analyzing your standup…</span>
              </div>
            )}
            {aiResult === 'done' && (
              <>
                <div className="flex gap-2 mb-3">
                  <Badge variant="teal">✓ Enhanced</Badge>
                  <Badge variant="blue">Clarity improved</Badge>
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Strong standup with measurable outcomes. I improved clarity on deliverables and flagged the license risk as a priority action item.
                </p>
                <div className="mt-3 p-2.5 bg-green-500/5 rounded-lg border border-green-500/20">
                  <p className="text-[11px] font-semibold text-green-400">✓ AI Enhanced</p>
                  <p className="text-[11px] text-text-secondary mt-1">Writing enhanced · Blocker categorized · Priority set to Medium</p>
                </div>
              </>
            )}
          </CardBody>
        </Card>

        {/* Streak */}
        <Card>
          <CardHeader><span className="section-title">Your Streak</span></CardHeader>
          <CardBody className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-1">🔥 14</div>
            <div className="text-[12px] text-text-secondary mb-3">day streak — personal best!</div>
            <div className="flex gap-1 justify-center">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-5 h-5 rounded',
                    i < 7 ? 'bg-green-500/80' : 'bg-blue-500/20 border border-blue-500'
                  )}
                />
              ))}
            </div>
            <p className="text-[10px] text-text-muted mt-2">This week · 7/7 days</p>
          </CardBody>
        </Card>

        {/* Recent */}
        <Card>
          <CardHeader><span className="section-title">Recent Submissions</span></CardHeader>
          <div className="py-1">
            {[
              { day: 'Yesterday', variant: 'green' as const, label: 'Submitted' },
              { day: 'Friday, May 15', variant: 'green' as const, label: 'Submitted' },
              { day: 'Thursday, May 14', variant: 'amber' as const, label: 'Late' },
            ].map((r) => (
              <div key={r.day} className="flex items-center gap-2 px-3 py-2.5 hover:bg-bg-tertiary transition-colors">
                <span className="text-[12px] text-text-primary flex-1">{r.day}</span>
                <Badge variant={r.variant}>{r.label}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="label-muted">{label}</label>
      {children}
    </div>
  )
}
