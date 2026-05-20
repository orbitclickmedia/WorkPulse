'use client'

import { Card, Badge, ProgressBar } from '@/components/ui'
import { TEAMS } from '@/data/mock'
import { cn } from '@/lib/utils'

export default function TeamsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-text-primary">Teams</h2>
          <p className="text-[11px] text-text-muted mt-0.5">5 departments · 47 members total</p>
        </div>
        <button className="btn-primary">+ Create Team</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {TEAMS.map((team) => {
          const rateVariant =
            team.completionRate >= 90 ? 'green' :
            team.completionRate >= 80 ? 'teal' :
            team.completionRate >= 70 ? 'amber' : 'red'

          return (
            <div
              key={team.id}
              className="bg-bg-secondary border border-border-subtle rounded-xl p-4 hover:border-border-default transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${team.color}18` }}
                >
                  {team.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-text-primary">{team.name}</div>
                  <div className="text-[11px] text-text-muted truncate">{team.memberCount} members · {team.leaderName}</div>
                </div>
                <Badge variant={rateVariant}>{team.completionRate}%</Badge>
              </div>

              <ProgressBar value={team.completionRate} color={team.color} className="mb-3" />

              <div className="flex items-center justify-between">
                <div className="flex">
                  {['AB', 'CD', 'EF'].map((init, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-bg-elevated border-2 border-bg-secondary flex items-center justify-center text-[9px] font-medium text-text-muted"
                      style={{ marginLeft: i === 0 ? 0 : -8 }}
                    >
                      {init}
                    </div>
                  ))}
                  {team.memberCount > 3 && (
                    <div
                      className="w-6 h-6 rounded-full bg-bg-elevated border-2 border-bg-secondary flex items-center justify-center text-[9px] text-text-muted"
                      style={{ marginLeft: -8 }}
                    >
                      +{team.memberCount - 3}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {team.activeBlockers === 0 ? (
                    <span className="text-[11px] text-teal-400">✓ No blockers</span>
                  ) : (
                    <span className={cn(
                      'text-[11px]',
                      team.activeBlockers >= 2 ? 'text-red-400' : 'text-amber-400'
                    )}>
                      {team.activeBlockers === 1 ? '1 blocker' : `${team.activeBlockers} blockers`}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border-subtle grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[14px] font-semibold text-text-primary">{team.completionRate}%</div>
                  <div className="text-[10px] text-text-muted">Rate</div>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-text-primary">{team.healthScore}</div>
                  <div className="text-[10px] text-text-muted">Health</div>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-text-primary">{team.activeBlockers}</div>
                  <div className="text-[10px] text-text-muted">Blockers</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Members Table */}
      <div className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border-subtle">
          <span className="section-title">All Members</span>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border-subtle">
              {['Member', 'Department', 'Role', 'Submission Rate', 'Streak', 'Status'].map((h) => (
                <th key={h} className="text-left text-[11px] text-text-muted font-medium px-4 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Arjun Mehta', dept: 'Engineering', role: 'Team Lead', rate: 98, streak: 21, submitted: true },
              { name: 'Pavan Kumar', dept: 'Design', role: 'Admin', rate: 96, streak: 14, submitted: true },
              { name: 'Sravya Reddy', dept: 'Engineering', role: 'Engineer', rate: 94, streak: 12, submitted: true },
              { name: 'Meera Joshi', dept: 'Product', role: 'Team Lead', rate: 97, streak: 18, submitted: true },
              { name: 'Kiran Patel', dept: 'Engineering', role: 'Engineer', rate: 81, streak: 5, submitted: false },
              { name: 'Ravi Verma', dept: 'Engineering', role: 'Engineer', rate: 89, streak: 8, submitted: true },
              { name: 'Divya Nair', dept: 'Design', role: 'Designer', rate: 72, streak: 0, submitted: false },
              { name: 'Raj Tiwari', dept: 'Marketing', role: 'Team Lead', rate: 71, streak: 3, submitted: false },
            ].map((m) => (
              <tr key={m.name} className="border-b border-border-subtle last:border-0 hover:bg-bg-tertiary transition-colors">
                <td className="px-4 py-2.5 font-medium text-text-primary">{m.name}</td>
                <td className="px-4 py-2.5 text-text-secondary">{m.dept}</td>
                <td className="px-4 py-2.5 text-text-muted">{m.role}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={m.rate >= 95 ? 'green' : m.rate >= 85 ? 'teal' : 'amber'}>{m.rate}%</Badge>
                </td>
                <td className="px-4 py-2.5 text-text-secondary">{m.streak > 0 ? `🔥 ${m.streak}` : '-'}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={m.submitted ? 'green' : 'red'}>{m.submitted ? '✓ Submitted' : '✗ Missed'}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
