'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody, Badge, StatRow } from '@/components/ui'
import { BLOCKERS } from '@/data/mock'
import { getSeverityColor } from '@/lib/utils'
import type { BlockerSeverity } from '@/types'

const SEV_LABELS: Record<BlockerSeverity, string> = {
  critical: '🔴 Critical',
  high: '🟡 High',
  medium: '🔵 Medium',
  low: '🟢 Low',
}

const SEV_BADGE: Record<BlockerSeverity, 'red' | 'amber' | 'blue' | 'teal'> = {
  critical: 'red',
  high: 'amber',
  medium: 'blue',
  low: 'teal',
}

export default function BlockersPanel() {
  const [filter, setFilter] = useState<'all' | BlockerSeverity>('all')

  const filtered = filter === 'all' ? BLOCKERS : BLOCKERS.filter((b) => b.severity === filter)
  const counts = {
    critical: BLOCKERS.filter((b) => b.severity === 'critical').length,
    high: BLOCKERS.filter((b) => b.severity === 'high').length,
    medium: BLOCKERS.filter((b) => b.severity === 'medium').length,
    low: BLOCKERS.filter((b) => b.severity === 'low').length,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-text-primary">Blocker Management</h2>
          <p className="text-[11px] text-text-muted mt-0.5">{BLOCKERS.length} active · {counts.critical} critical</p>
        </div>
        <div className="flex gap-2">
          <select
            className="bg-bg-tertiary border border-border-default text-text-secondary text-[12px] px-3 py-1.5 rounded-lg outline-none"
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="btn-primary">+ Report Blocker</button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-4">
        {/* List */}
        <div className="space-y-2">
          {filtered.map((blocker) => {
            const colors = getSeverityColor(blocker.severity)
            return (
              <div
                key={blocker.id}
                className="flex gap-3 p-3 bg-bg-tertiary border border-border-subtle rounded-xl hover:border-border-default transition-colors"
              >
                {/* Severity stripe */}
                <div className={`w-1 rounded-full flex-shrink-0 ${colors.text === 'text-red-400' ? 'bg-red-500' : colors.text === 'text-amber-400' ? 'bg-amber-500' : colors.text === 'text-blue-400' ? 'bg-blue-500' : 'bg-teal-500'}`} />

                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-semibold text-text-primary mb-0.5">{blocker.title}</div>
                  <div className="text-[11px] text-text-muted mb-2">
                    {blocker.teamName} · {blocker.reportedBy} · {blocker.hoursUnresolved}h unresolved
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant={SEV_BADGE[blocker.severity]}>{SEV_LABELS[blocker.severity]}</Badge>
                    {blocker.tags.map((tag) => (
                      <Badge key={tag} variant="gray">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button className="btn-secondary text-[11px] px-2 py-1">Assign</button>
                  {blocker.severity === 'critical' && (
                    <button className="btn-primary text-[11px] px-2 py-1">Escalate</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <Card>
            <CardHeader><span className="section-title">Severity Breakdown</span></CardHeader>
            <CardBody className="py-2">
              {(Object.keys(counts) as BlockerSeverity[]).map((sev) => (
                <div key={sev} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                  <span className="text-[12px] text-text-secondary">{SEV_LABELS[sev]}</span>
                  <span className={`text-[14px] font-bold ${getSeverityColor(sev).text}`}>{counts[sev]}</span>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><span className="section-title">Resolution Stats</span></CardHeader>
            <CardBody className="text-center py-4">
              <div className="text-[28px] font-bold text-blue-400">4.2h</div>
              <div className="text-[11px] text-text-secondary mt-1">avg resolution time this week</div>
              <div className="text-[11px] text-green-400 mt-2">↓ 1.1h vs last week</div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><span className="section-title">By Department</span></CardHeader>
            <CardBody className="py-2">
              <StatRow label="Engineering" value={<Badge variant="red">3</Badge>} />
              <StatRow label="Design" value={<Badge variant="amber">2</Badge>} />
              <StatRow label="Marketing" value={<Badge variant="amber">1</Badge>} />
              <StatRow label="Product" value={<Badge variant="green">0</Badge>} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
