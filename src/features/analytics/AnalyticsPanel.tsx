'use client'

import { useMemo } from 'react'
import { Card, CardHeader, CardBody, Badge, KPICard } from '@/components/ui'
import { WEEKLY_TREND, BLOCKER_FREQUENCY, TOP_CONTRIBUTORS, KPI_DATA } from '@/data/mock'
import { BlockerBarChart, MultiLineChart } from '@/components/charts/TrendChart'
import { generateHeatmapData } from '@/lib/utils'
import { cn } from '@/lib/utils'

const HEATMAP_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const HEATMAP_WEEKS = 12

const CELL_COLORS = [
  'bg-bg-elevated',
  'bg-blue-500/20',
  'bg-blue-500/40',
  'bg-blue-500/65',
  'bg-blue-500',
]

export default function AnalyticsPanel() {
  const heatmap = useMemo(() => generateHeatmapData(HEATMAP_WEEKS), [])

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Avg Completion Rate', value: '94.2%', delta: '↑ 3.1%', deltaType: 'up' as const, icon: '📅', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
          { label: 'Longest Streak', value: '21', delta: 'Arjun Mehta', deltaType: 'neutral' as const, icon: '🏆', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
          { label: 'Avg Hours/Day', value: '7.8h', delta: '↑ 0.3h this week', deltaType: 'up' as const, icon: '⏱', iconBg: 'bg-teal-500/10', iconColor: 'text-teal-400' },
          { label: 'Blockers Resolved', value: '23', delta: '+8 this week', deltaType: 'up' as const, icon: '🚧', iconBg: 'bg-green-500/10', iconColor: 'text-green-400' },
        ].map((k, i) => <KPICard key={k.label} data={k} delay={i * 50} />)}
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <span className="section-title">Submission Heatmap</span>
          <span className="ml-auto text-[11px] text-text-muted">Last {HEATMAP_WEEKS} weeks</span>
        </CardHeader>
        <CardBody>
          <div className="space-y-1.5">
            {HEATMAP_DAYS.map((day, dayIdx) => (
              <div key={`${day}-${dayIdx}`} className="flex items-center gap-1.5">
                <span className="text-[10px] text-text-muted w-4 flex-shrink-0">{day}</span>
                <div className="flex gap-1.5">
                  {heatmap[dayIdx].map((level, wIdx) => (
                    <div
                      key={wIdx}
                      className={cn('w-3.5 h-3.5 rounded-[3px] transition-transform hover:scale-125 hover:z-10 relative', CELL_COLORS[level])}
                      title={`Level ${level}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] text-text-muted">Less</span>
            {CELL_COLORS.map((c, i) => (
              <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />
            ))}
            <span className="text-[10px] text-text-muted">More</span>
          </div>
        </CardBody>
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader><span className="section-title">Rate vs Hours Trend</span></CardHeader>
          <div className="px-4 pb-4 pt-2">
            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500" /><span className="text-[11px] text-text-muted">Submission Rate %</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-teal-500" /><span className="text-[11px] text-text-muted">Hours Worked</span></div>
            </div>
            <MultiLineChart data={WEEKLY_TREND} />
          </div>
        </Card>
        <Card>
          <CardHeader><span className="section-title">Blocker Frequency by Category</span></CardHeader>
          <div className="px-4 pb-4 pt-2">
            <BlockerBarChart data={BLOCKER_FREQUENCY} />
          </div>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <span className="section-title">Top Contributors</span>
          <Badge variant="blue" className="ml-auto">This week</Badge>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border-subtle">
                {['#', 'Member', 'Submission Rate', 'Streak', 'Status'].map((h) => (
                  <th key={h} className="text-left text-[11px] text-text-muted font-medium px-4 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_CONTRIBUTORS.map((c) => (
                <tr key={c.rank} className="border-b border-border-subtle last:border-0 hover:bg-bg-tertiary transition-colors">
                  <td className="px-4 py-2.5 text-amber-400">{c.medal || c.rank}</td>
                  <td className="px-4 py-2.5 font-medium text-text-primary">{c.name}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={c.rate >= 95 ? 'green' : c.rate >= 85 ? 'teal' : 'amber'}>
                      {c.rate}%
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    {c.streak > 0 ? `🔥 ${c.streak}` : c.streak}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={c.rate >= 90 ? 'green' : 'amber'}>
                      {c.rate >= 90 ? 'On track' : 'Monitor'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
