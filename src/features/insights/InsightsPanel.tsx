'use client'

import { Card, CardHeader, CardBody, Badge, ProgressBar } from '@/components/ui'
import { AI_INSIGHTS, DEPT_METRICS } from '@/data/mock'
import { getInsightColors } from '@/lib/utils'

const INSIGHT_ICONS: Record<string, string> = {
  alert: '🚨',
  warning: '⚠️',
  success: '✅',
  info: '💡',
}

export default function InsightsPanel() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-text-primary">AI Insights</h2>
          <p className="text-[11px] text-text-muted mt-0.5">
            Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {AI_INSIGHTS.length} insights today
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">🔄 Regenerate</button>
          <button className="btn-primary">📤 Export Report</button>
        </div>
      </div>

      {/* Insight cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {AI_INSIGHTS.slice(0, 4).map((insight) => {
          const colors = getInsightColors(insight.type)
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border ${colors.bg} ${colors.border} relative overflow-hidden`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${colors.accent}`}>
                {INSIGHT_ICONS[insight.type]} {insight.type}
              </div>
              <div className="text-[13px] font-semibold text-text-primary mb-1.5">{insight.title}</div>
              <p className="text-[11.5px] text-text-secondary leading-relaxed">{insight.description}</p>
              {insight.metric && (
                <div className={`text-[22px] font-bold mt-2 ${colors.accent}`}>{insight.metric}</div>
              )}
              {insight.actionable && (
                <button className={`mt-3 text-[11px] font-medium px-2.5 py-1 rounded-md border ${colors.border} ${colors.accent} hover:opacity-80 transition-opacity cursor-pointer`}>
                  Take action →
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Lower row */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader><span className="section-title">Team Health Scores</span></CardHeader>
          <CardBody className="py-3">
            <div className="space-y-3">
              {DEPT_METRICS.map((dept) => (
                <div key={dept.name} className="flex items-center gap-3">
                  <span className="text-[12px] text-text-secondary w-24 flex-shrink-0">{dept.name}</span>
                  <div className="flex-1"><ProgressBar value={dept.rate} color={dept.color} /></div>
                  <span className="text-[12px] font-semibold w-8 text-right" style={{ color: dept.color }}>{dept.rate}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><span className="section-title">Predictive Risks</span></CardHeader>
          <CardBody className="py-2">
            {[
              { icon: '🔥', title: 'Burnout — Sravya R.', desc: 'Workload 68% above average', risk: 74, variant: 'red' as const },
              { icon: '📉', title: 'Engagement drop — Marketing', desc: '3-week declining trend', risk: 52, variant: 'amber' as const },
              { icon: '🚧', title: 'Recurring blocker pattern', desc: 'API issues repeating bi-weekly', risk: 41, variant: 'amber' as const },
            ].map((r) => (
              <div key={r.title} className="flex items-center gap-3 py-2.5 border-b border-border-subtle last:border-0">
                <span className="text-lg">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-text-primary">{r.title}</div>
                  <div className="text-[11px] text-text-muted">{r.desc}</div>
                </div>
                <Badge variant={r.variant}>{r.risk}% risk</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* All Insights */}
      {AI_INSIGHTS.length > 4 && (
        <Card>
          <CardHeader><span className="section-title">All Insights</span></CardHeader>
          <div className="divide-y divide-border-subtle">
            {AI_INSIGHTS.slice(4).map((insight) => {
              const colors = getInsightColors(insight.type)
              return (
                <div key={insight.id} className="flex items-start gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors">
                  <span className="text-base mt-0.5">{INSIGHT_ICONS[insight.type]}</span>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-medium text-text-primary">{insight.title}</div>
                    <div className="text-[11.5px] text-text-secondary mt-0.5">{insight.description}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
                    {insight.type}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
