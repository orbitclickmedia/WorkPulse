'use client'

import { Card, CardHeader, Badge } from '@/components/ui'

const REPORTS = [
  { id: 'r1', title: 'Weekly Executive Summary', desc: 'May 11–17, 2026 · AI Generated', icon: '📊', iconBg: 'bg-blue-500/10', exports: ['PDF', 'XLSX'] },
  { id: 'r2', title: 'Department Comparison Report', desc: 'May 2026 · 5 departments', icon: '👥', iconBg: 'bg-teal-500/10', exports: ['PDF'] },
  { id: 'r3', title: 'Blocker Analysis Report', desc: 'April–May 2026 · Trend analysis', icon: '🚧', iconBg: 'bg-amber-500/10', exports: ['PDF', 'CSV'] },
  { id: 'r4', title: 'AI Insights Monthly Digest', desc: 'May 2026 · 47 insights generated', icon: '🤖', iconBg: 'bg-purple-500/10', exports: ['PDF'] },
  { id: 'r5', title: 'Employee Consistency Report', desc: 'Q2 2026 · Individual analytics', icon: '👤', iconBg: 'bg-green-500/10', exports: ['PDF', 'XLSX', 'CSV'] },
  { id: 'r6', title: 'Burnout Risk Assessment', desc: 'May 2026 · AI-generated', icon: '🔥', iconBg: 'bg-red-500/10', exports: ['PDF'] },
]

export default function ReportsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-text-primary">Reports</h2>
          <p className="text-[11px] text-text-muted mt-0.5">AI-generated · Schedule · Export</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">📅 Schedule</button>
          <button className="btn-primary">+ Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-4">
        <div className="space-y-2">
          {REPORTS.map((report) => (
            <div
              key={report.id}
              className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-xl hover:border-border-default transition-colors"
            >
              <div className={`w-10 h-10 ${report.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                {report.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-text-primary">{report.title}</div>
                <div className="text-[11px] text-text-muted">{report.desc}</div>
              </div>
              <div className="flex gap-1.5">
                {report.exports.map((fmt) => (
                  <button key={fmt} className="btn-secondary text-[11px] px-2 py-1">{fmt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Card>
            <CardHeader><span className="section-title">Scheduled Reports</span></CardHeader>
            <div className="divide-y divide-border-subtle">
              {[
                { name: 'Daily Digest', status: 'green' as const, label: 'Active' },
                { name: 'Weekly Summary', status: 'green' as const, label: 'Active' },
                { name: 'Monthly Executive', status: 'green' as const, label: 'Active' },
                { name: 'Blocker Report', status: 'amber' as const, label: 'Paused' },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[12px] text-text-secondary">{r.name}</span>
                  <Badge variant={r.status}>{r.label}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader><span className="section-title">Export Formats</span></CardHeader>
            <div className="p-3 flex flex-wrap gap-2">
              <Badge variant="blue">PDF</Badge>
              <Badge variant="green">XLSX</Badge>
              <Badge variant="gray">CSV</Badge>
              <Badge variant="purple">Branded</Badge>
              <Badge variant="teal">With Charts</Badge>
            </div>
          </Card>

          <Card>
            <CardHeader><span className="section-title">Stats This Month</span></CardHeader>
            <div className="px-4 py-2 divide-y divide-border-subtle">
              {[
                { label: 'Reports generated', value: '24' },
                { label: 'PDF exports', value: '18' },
                { label: 'XLSX exports', value: '6' },
                { label: 'Scheduled sends', value: '31' },
              ].map((s) => (
                <div key={s.label} className="flex justify-between py-2">
                  <span className="text-[12px] text-text-secondary">{s.label}</span>
                  <span className="text-[12px] font-semibold text-text-primary">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
