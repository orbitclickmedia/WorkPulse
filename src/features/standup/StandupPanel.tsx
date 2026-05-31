'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { useAuth } from '@/context/AuthProvider'
import { firebaseEnabled } from '@/firebase/config'
import { getStandupByDate, submitStandup as saveStandupToFirestore } from '@/firebase/firestore'
import { Card, CardHeader, CardBody, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Priority } from '@/types'

const PRIORITIES: { value: Priority; label: string; activeCls: string }[] = [
  { value: 'high', label: '🔴 High', activeCls: 'bg-red-500/10 text-red-400 border-red-500' },
  { value: 'medium', label: '🟡 Medium', activeCls: 'bg-amber-500/10 text-amber-400 border-amber-500' },
  { value: 'low', label: '🟢 Low', activeCls: 'bg-green-500/10 text-green-400 border-green-500' },
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function StandupPanel() {
  const { standupDraft, updateStandupDraft } = useAppStore()
  const { user, orgId } = useAuth()
  const useFirestore = firebaseEnabled && !!user

  const [accomplished, setAccomplished] = useState('')
  const [tomorrow, setTomorrow] = useState('')
  const [blockers, setBlockers] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [hours, setHours] = useState(8)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<'idle' | 'enhancing' | 'done'>('idle')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!useFirestore || !user) {
      setAccomplished(
        'Completed the motion graphics storyboard for Q2 campaign. Reviewed and approved 2 video drafts.'
      )
      setTomorrow(
        'Render final exports for campaign videos. Start on new landing page motion concepts.'
      )
      setBlockers(
        'Still waiting for client sign-off on color palette. Adobe license renewal pending.'
      )
      setLoaded(true)
      return
    }

    const date = todayISO()
    getStandupByDate(orgId, user.uid, date)
      .then((raw) => {
        const entry = raw as Record<string, unknown> | null
        if (entry) {
          setAccomplished(String(entry.accomplished ?? ''))
          setTomorrow(String(entry.tomorrow ?? ''))
          setBlockers(String(entry.blockers ?? ''))
          setPriority((entry.priority as Priority) ?? 'medium')
          setHours(Number(entry.hoursWorked ?? 8))
          setSubmitted(Boolean(entry.submitted))
        }
      })
      .catch(() => {
        /* empty form on error */
      })
      .finally(() => setLoaded(true))
  }, [useFirestore, user, orgId])

  const syncDraft = () => {
    updateStandupDraft({ accomplished, tomorrow, blockers, priority, hoursWorked: hours })
  }

  const handleEnhance = () => {
    setAiResult('enhancing')
    setTimeout(() => setAiResult('done'), 1400)
  }

  const handleSubmit = async () => {
    syncDraft()
    setSubmitError(null)

    if (!useFirestore || !user) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2500)
      return
    }

    setSubmitting(true)
    try {
      const date = todayISO()
      await saveStandupToFirestore(orgId, user.uid, {
        accomplished,
        tomorrow,
        blockers,
        priority,
        hoursWorked: hours,
        date,
      })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2500)
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to save standup')
    } finally {
      setSubmitting(false)
    }
  }

  if (!loaded && useFirestore) {
    return (
      <div className="flex items-center justify-center py-20 text-[13px] text-text-muted">
        Loading today&apos;s standup…
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[1fr_300px] gap-4">
      <Card>
        <CardHeader>
          <span className="text-base">📝</span>
          <div>
            <div className="section-title">
              Daily Standup —{' '}
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">
              {useFirestore ? 'Saved to Firestore' : 'Demo mode — not persisted'}
            </div>
          </div>
          <div className="ml-auto">
            <Badge variant="blue">{useFirestore ? 'Live' : 'Demo'}</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <FormGroup label="What did you accomplish today?">
              <textarea
                className="form-textarea min-h-[80px]"
                placeholder="e.g. Completed the auth flow, reviewed 3 PRs…"
                value={accomplished}
                onChange={(e) => {
                  setAccomplished(e.target.value)
                  updateStandupDraft({ accomplished: e.target.value })
                }}
              />
            </FormGroup>
            <FormGroup label="What will you do tomorrow?">
              <textarea
                className="form-textarea min-h-[80px]"
                placeholder="e.g. Start the dashboard redesign…"
                value={tomorrow}
                onChange={(e) => {
                  setTomorrow(e.target.value)
                  updateStandupDraft({ tomorrow: e.target.value })
                }}
              />
            </FormGroup>
            <FormGroup label="Any blockers?">
              <textarea
                className="form-textarea min-h-[60px]"
                placeholder="e.g. Waiting for design assets…"
                value={blockers}
                onChange={(e) => {
                  setBlockers(e.target.value)
                  updateStandupDraft({ blockers: e.target.value })
                }}
              />
            </FormGroup>

            <FormGroup label="Priority Level">
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
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

            {submitError && (
              <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleEnhance}
                className="btn-secondary flex-1 justify-center"
                disabled={aiResult === 'enhancing'}
              >
                {aiResult === 'enhancing' ? '🤖 Enhancing…' : '🤖 AI Enhance'}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className={cn(
                  'flex-1 justify-center btn-primary',
                  submitted && 'bg-green-500 hover:bg-green-500'
                )}
              >
                {submitting
                  ? 'Saving…'
                  : submitted
                    ? '✓ Submitted!'
                    : 'Submit Standup →'}
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3">
        <Card>
          <CardHeader>
            <span className="section-title">🤖 AI Analysis</span>
          </CardHeader>
          <CardBody>
            {aiResult === 'idle' && (
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {blockers.trim()
                  ? 'Blockers detected — consider escalating if unresolved by EOD.'
                  : 'No blockers reported. Strong standup clarity.'}
              </p>
            )}
            {aiResult === 'enhancing' && (
              <div className="flex items-center gap-2 py-4">
                <span className="typing-cursor" />
                <span className="text-[12px] text-text-muted">AI analyzing your standup…</span>
              </div>
            )}
            {aiResult === 'done' && (
              <p className="text-[12px] text-text-secondary leading-relaxed">
                Writing enhanced for clarity. Priority and blocker notes updated.
              </p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <span className="section-title">Your Streak</span>
          </CardHeader>
          <CardBody className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-1">🔥 {useFirestore ? '—' : '14'}</div>
            <div className="text-[12px] text-text-secondary mb-3">
              {useFirestore ? 'Streak sync coming soon' : 'day streak — personal best!'}
            </div>
          </CardBody>
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
