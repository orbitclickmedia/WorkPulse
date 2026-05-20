'use client'

import { KPICard, Card, CardHeader, CardBody, Badge, ProgressBar, FeedItem } from '@/components/ui'
import { KPI_DATA, DEPT_METRICS, ACTIVITY_FEED, WEEKLY_TREND } from '@/data/mock'
import TrendChart from '@/components/charts/TrendChart'
import { USERS, STANDUP_ENTRIES } from '@/data/mock'
import { formatRelativeTime } from '@/lib/utils'

const STATUS_MAP: Record<string, { label: string; variant: 'green' | 'amber' | 'red' }> = {
  u1: { label: '✓ Submitted', variant: 'green' },
  u2: { label: '✓ Submitted', variant: 'green' },
  u3: { label: '✓ Submitted', variant: 'green' },
  u4: { label: '⏳ Pending', variant: 'amber' },
  u5: { label: '✗ Missed', variant: 'red' },
  u6: { label: '✓ Submitted', variant: 'green' },
}

export default function Dashboard() {
  return (
    <div className="space-y-3">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {KPI_DATA.map((kpi, i) => (
          <KPICard key={kpi.label} data={kpi} delay={i * 60} />
        ))}
      </div>

      {/* Row 2: Trend Chart + Team Status */}
      <div className="grid grid-cols-[1fr_280px] gap-3">
        <Card>
          <CardHeader>
            <span className="section-title">Productivity Trend</span>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="teal">+12% this week</Badge>
            </div>
          </CardHeader>
          <div className="p-4">
            <TrendChart data={WEEKLY_TREND} />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <span className="section-title">Team Status Today</span>
          </CardHeader>
          <div className="py-1">
            {USERS.slice(0, 6).map((user) => {
              const status = STATUS_MAP[user.id]
              return (
                <div key={user.id} className="flex items-center gap-2 px-3 py-2 hover:bg-bg-tertiary transition-colors">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-[9px] font-semibold text-white`}>
                    {user.avatarInitials}
                  </div>
                  <span className="flex-1 text-[12.5px] font-medium text-text-primary truncate">{user.name}</span>
                  {status && <Badge variant={status.variant}>{status.label}</Badge>}
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Row 3: Activity + Department Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <span className="section-title">Activity Feed</span>
            <button className="ml-auto text-[11px] text-blue-400 hover:underline">View all</button>
          </CardHeader>
          <CardBody className="py-0 px-4">
            {ACTIVITY_FEED.map((item) => (
              <FeedItem
                key={item.id}
                text={
                  <span dangerouslySetInnerHTML={{
                    __html: item.text.replace(
                      /^([^—]+)/,
                      (m) => `<strong class="text-text-primary">${m}</strong>`
                    )
                  }} />
                }
                time={item.time}
                color={item.color}
              />
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <span className="section-title">Department Comparison</span>
          </CardHeader>
          <CardBody className="py-3">
            <div className="space-y-3">
              {DEPT_METRICS.map((dept) => (
                <div key={dept.name} className="flex items-center gap-3">
                  <span className="text-[12px] text-text-secondary w-24 flex-shrink-0">{dept.name}</span>
                  <div className="flex-1">
                    <ProgressBar value={dept.rate} color={dept.color} />
                  </div>
                  <span className="text-[12px] font-semibold text-text-primary w-8 text-right">{dept.rate}%</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
