'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts'

const tooltipStyle = {
  backgroundColor: '#141720',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#94a3b8',
}

export default function TrendChart({ data }: { data: { day: string; rate: number; hours?: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis domain={[60, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
          cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
          formatter={(v: number) => [`${v}%`, 'Rate']}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#rateGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#3b82f6', stroke: '#0f1117', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function BlockerBarChart({ data }: { data: { category: string; count: number }[] }) {
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#14b8a6']
  const withColor = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }))

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={withColor} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="category" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9', fontWeight: 600 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {withColor.map((entry, index) => (
            <rect key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function MultiLineChart({ data }: { data: { day: string; rate: number; hours: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 12]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#f1f5f9', fontWeight: 600 }} />
        <Line yAxisId="left" type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={false} name="Rate %" />
        <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#14b8a6" strokeWidth={2} dot={false} name="Hours" />
      </LineChart>
    </ResponsiveContainer>
  )
}
