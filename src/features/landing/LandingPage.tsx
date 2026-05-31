'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    icon: '⚡',
    title: 'AI-Powered Standups',
    desc: 'Intelligent async standups with AI summarization, writing enhancement, and blocker detection — no more meaningless meetings.',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/20',
  },
  {
    icon: '🧠',
    title: 'Operational Intelligence',
    desc: 'Real-time insights on team health, burnout risk, productivity trends, and recurring blockers powered by your AI copilot.',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
  },
  {
    icon: '📊',
    title: 'Enterprise Analytics',
    desc: 'Submission heatmaps, department comparisons, streak systems, and executive-grade reports with PDF/Excel exports.',
    color: 'from-teal-500/20 to-teal-500/5',
    border: 'border-teal-500/20',
  },
  {
    icon: '🛡️',
    title: 'Multi-Tenant Security',
    desc: 'Full organization isolation with RBAC, audit logging, Firestore security rules, and SOC-2 ready infrastructure.',
    color: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/20',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    desc: 'Realtime alerts for missed standups, blocker escalations, and critical team events — with Slack & Teams integration.',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
  },
  {
    icon: '🤝',
    title: 'Collaboration Layer',
    desc: 'Threaded comments, @mentions, reactions, approvals, and read receipts woven into every workflow touchpoint.',
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/20',
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'VP Engineering @ NexusAI',
    avatar: 'PS',
    gradient: 'from-blue-500 to-purple-500',
    text: "WorkPulse transformed how our 80-person engineering org operates. The AI copilot saves me 2 hours of reporting every week. It's the Linear of team operations.",
  },
  {
    name: 'Rahul Menon',
    role: 'CTO @ VertexCo',
    avatar: 'RM',
    gradient: 'from-teal-500 to-blue-500',
    text: "We went from chaotic daily standups to a fully async, AI-enhanced workflow in one week. Blocker resolution time dropped by 40%. Genuinely remarkable product.",
  },
  {
    name: 'Ananya Iyer',
    role: 'Head of Product @ PrismAI',
    avatar: 'AI',
    gradient: 'from-purple-500 to-pink-500',
    text: "The burnout detection alone justified our subscription. We caught a critical situation with a senior engineer before it became a resignation. WorkPulse is a must-have.",
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$0',
    period: 'free forever',
    desc: 'Perfect for small teams getting started',
    features: ['Up to 5 members', 'Basic standups', '7-day history', 'Email notifications'],
    cta: 'Start Free',
    variant: 'secondary' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per member / month',
    desc: 'For growing teams that want AI superpowers',
    features: ['Unlimited members', 'AI Copilot', 'AI Insights', 'Analytics & Heatmaps', 'PDF/Excel Reports', 'Slack & Teams Integration', '2-year history'],
    cta: 'Start Pro Trial',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    desc: 'For large orgs with advanced needs',
    features: ['Everything in Pro', 'SSO / SAML', 'Custom AI models', 'Dedicated support', 'SLA guarantee', 'Security audit', 'Custom integrations'],
    cta: 'Contact Sales',
    variant: 'secondary' as const,
    popular: false,
  },
]

const FAQS = [
  { q: 'How does AI enhancement work?', a: 'WorkPulse uses Claude AI to analyze standup entries, improve writing clarity, categorize blockers, detect burnout risk patterns, and generate operational insights — all automatically in the background.' },
  { q: 'Is our data secure?', a: 'Yes. Every organization is fully isolated using multi-tenant Firestore architecture. We use end-to-end encryption, RBAC, and audit logging. Enterprise plans include SOC-2 compliance reports.' },
  { q: 'Can we integrate with our existing tools?', a: 'WorkPulse integrates with Slack, Microsoft Teams, Jira, GitHub, Google Calendar, Linear, Notion, and Zapier — with more integrations shipping monthly.' },
  { q: 'How is this different from Jira or Monday?', a: 'WorkPulse focuses on daily operational rhythm and team health — not project management. It\'s a real-time pulse on how your people are doing, not just what tasks are tracked.' },
  { q: 'Can I migrate from another standup tool?', a: 'Yes. We support CSV imports from Geekbot, Standuply, and other tools. Our onboarding team can assist enterprise customers with data migration.' },
]

const STATS = [
  { value: '500+', label: 'Companies' },
  { value: '47K+', label: 'Team Members' },
  { value: '2.1M+', label: 'Standups Submitted' },
  { value: '94.2%', label: 'Avg Submission Rate' },
]

export default function LandingPage({
  onEnter,
  onDemo,
}: {
  onEnter: () => void
  onDemo?: () => void
}) {
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className="bg-bg-primary text-text-primary font-sans overflow-y-auto"
      style={{ height: '100vh' }}
    >
      {/* NAV */}
      <nav
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrollY > 20
            ? 'bg-bg-primary/90 backdrop-blur-xl border-border-subtle'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[14px] font-bold text-white">
              W
            </div>
            <span className="text-[15px] font-semibold tracking-tight">WorkPulse</span>
          </div>

          <div className="hidden md:flex items-center gap-6 ml-6">
            {['Features', 'Analytics', 'Security', 'Pricing', 'Docs'].map((item) => (
              <button key={item} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                {item}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button onClick={onEnter} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
              Sign In
            </button>
            <button
              onClick={onEnter}
              className="btn-primary px-4 py-2 text-[13px] rounded-lg"
            >
              Get Started →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          AI-First Enterprise Operational Intelligence
        </div>

        {/* Headline */}
        <h1 className="text-[54px] font-bold leading-[1.1] tracking-[-2px] mb-6 max-w-3xl mx-auto">
          Operational intelligence
          <br />
          for{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            modern teams
          </span>
        </h1>

        <p className="text-[16px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
          WorkPulse unifies async standups, AI insights, productivity tracking, and team health monitoring — giving every leader crystal-clear operational visibility.
        </p>

        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            onClick={onEnter}
            className="px-7 py-3 bg-blue-500 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-600 transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Start Free Trial →
          </button>
          <button
            onClick={onDemo ?? onEnter}
            className="px-7 py-3 bg-transparent text-text-primary text-[14px] font-medium rounded-xl border border-border-default hover:bg-bg-secondary transition-all duration-150 cursor-pointer"
          >
            View Live Demo
          </button>
        </div>

        {/* Dashboard preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl blur-2xl" />
          <div className="relative bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border-subtle">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-bg-elevated rounded-md px-3 py-1 text-[11px] text-text-muted font-mono text-center">
                  app.workpulse.io — Dashboard
                </div>
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="p-5 grid grid-cols-4 gap-3 bg-bg-primary">
              {[
                { label: 'Submission Rate', val: '94.2%', delta: '↑ 3.1%', color: 'text-teal-400' },
                { label: 'Active Blockers', val: '7', delta: '2 critical', color: 'text-amber-400' },
                { label: 'Team Health', val: '87/100', delta: '↑ 4pts', color: 'text-green-400' },
                { label: 'AI Insights', val: '12', delta: '3 require action', color: 'text-purple-400' },
              ].map((card) => (
                <div key={card.label} className="bg-bg-secondary border border-border-subtle rounded-xl p-3">
                  <div className="text-[10px] text-text-muted mb-2">{card.label}</div>
                  <div className={`text-[20px] font-bold ${card.color}`}>{card.val}</div>
                  <div className="text-[10px] text-text-muted mt-1">{card.delta}</div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 grid grid-cols-3 gap-3 bg-bg-primary">
              <div className="col-span-2 bg-bg-secondary border border-border-subtle rounded-xl p-3">
                <div className="text-[11px] font-semibold text-text-primary mb-2">Productivity Trend</div>
                <div className="flex items-end gap-1 h-16">
                  {[60, 75, 65, 85, 78, 90, 88].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-sm relative overflow-hidden group hover:bg-blue-500/40 transition-colors">
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-sm transition-all" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-bg-secondary border border-border-subtle rounded-xl p-3">
                <div className="text-[11px] font-semibold text-text-primary mb-2">Team Status</div>
                {[
                  { name: 'Arjun M.', ok: true },
                  { name: 'Sravya R.', ok: true },
                  { name: 'Kiran P.', ok: null },
                  { name: 'Divya N.', ok: false },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-1">
                    <span className="text-[10px] text-text-secondary">{m.name}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                      m.ok === true ? 'bg-green-500/10 text-green-400' :
                      m.ok === false ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {m.ok === true ? '✓' : m.ok === false ? '✗' : '…'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border-subtle py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[32px] font-bold text-text-primary tracking-tight">{stat.value}</div>
              <div className="text-[12px] text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-4">
            Features
          </div>
          <h2 className="text-[36px] font-bold tracking-tight mb-4">
            Everything your team needs
          </h2>
          <p className="text-[14px] text-text-secondary max-w-md mx-auto leading-relaxed">
            A complete operational intelligence platform — not another tool to add to your stack.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className={cn(
                'p-5 rounded-2xl border bg-gradient-to-b transition-transform hover:-translate-y-0.5 duration-150',
                feat.border, feat.color
              )}
            >
              <div className="text-2xl mb-3">{feat.icon}</div>
              <div className="text-[14px] font-semibold text-text-primary mb-2">{feat.title}</div>
              <p className="text-[12px] text-text-secondary leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-bg-secondary border border-blue-500/20 rounded-3xl p-10 grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-blue-400 uppercase tracking-widest mb-4">
              🤖 AI Copilot
            </div>
            <h2 className="text-[32px] font-bold tracking-tight mb-4 leading-tight">
              Ask anything about<br />your team
            </h2>
            <p className="text-[13px] text-text-secondary leading-relaxed mb-6">
              WorkPulse Copilot has full context of your organization — standups, blockers, health scores, and trends. Ask it anything and get instant operational intelligence.
            </p>
            <div className="space-y-2">
              {[
                '"Summarize this week for Engineering"',
                '"Who\'s at risk of burning out?"',
                '"What blockers keep recurring?"',
                '"Compare Q1 vs Q2 productivity"',
              ].map((q) => (
                <div key={q} className="flex items-center gap-2 text-[12px] text-text-secondary">
                  <span className="text-blue-400">→</span> {q}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border-subtle flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">W</div>
              <span className="text-[12px] font-medium">WorkPulse Copilot</span>
              <span className="ml-auto text-[10px] text-green-400 font-semibold">● Live</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">W</div>
                <div className="bg-bg-tertiary border border-border-subtle rounded-xl rounded-bl-sm px-3 py-2 text-[11px] text-text-secondary max-w-[80%] leading-relaxed">
                  <strong className="text-text-primary">This week's summary:</strong><br />
                  • 94.2% submission rate (↑3.1%)<br />
                  • 2 critical blockers need attention<br />
                  • Sravya R. has burnout risk at 74%
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-blue-500 rounded-xl rounded-br-sm px-3 py-2 text-[11px] text-white max-w-[80%]">
                  Who should I check in with today?
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">P</div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">W</div>
                <div className="bg-bg-tertiary border border-border-subtle rounded-xl rounded-bl-sm px-3 py-2 text-[11px] text-text-secondary max-w-[80%] leading-relaxed">
                  Priority: <strong className="text-red-400">Sravya R.</strong> (overwork) and <strong className="text-amber-400">Divya N.</strong> (2 missed standups). Consider a quick 1:1.
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-border-subtle">
              <div className="bg-bg-tertiary border border-border-default rounded-lg px-3 py-2 text-[11px] text-text-muted">
                Ask anything about your team…
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold tracking-tight mb-3">Loved by leading teams</h2>
          <p className="text-[13px] text-text-secondary">Join 500+ companies using WorkPulse to unlock operational clarity</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-bg-secondary border border-border-subtle rounded-2xl p-6">
              <p className="text-[13px] text-text-secondary leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-[12px] font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-text-primary">{t.name}</div>
                  <div className="text-[11px] text-text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold tracking-tight mb-3">Simple, transparent pricing</h2>
          <p className="text-[13px] text-text-secondary">No hidden fees. Cancel anytime. Enterprise plans include custom contracts.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl p-6 border relative',
                plan.popular
                  ? 'bg-gradient-to-b from-blue-500/10 to-bg-secondary border-blue-500/30'
                  : 'bg-bg-secondary border-border-subtle'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <div className="text-[13px] font-semibold text-text-primary mb-1">{plan.name}</div>
                <div className="text-[28px] font-bold tracking-tight">{plan.price}</div>
                <div className="text-[11px] text-text-muted">{plan.period}</div>
                <div className="text-[12px] text-text-secondary mt-2">{plan.desc}</div>
              </div>
              <div className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[12px] text-text-secondary">
                    <span className="text-green-400 flex-shrink-0">✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={onEnter}
                className={cn(
                  'w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer',
                  plan.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-[28px] font-bold tracking-tight text-center mb-10">Frequently asked questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-bg-tertiary transition-colors"
              >
                <span className="text-[13px] font-medium text-text-primary">{faq.q}</span>
                <span className={cn('text-text-muted transition-transform duration-200 flex-shrink-0 ml-4', openFaq === i && 'rotate-180')}>▾</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-[12.5px] text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-bg-secondary border border-blue-500/20 rounded-3xl p-14 text-center">
          <h2 className="text-[36px] font-bold tracking-tight mb-4">
            Ready to transform your team operations?
          </h2>
          <p className="text-[14px] text-text-secondary max-w-md mx-auto leading-relaxed mb-8">
            Join 500+ companies already using WorkPulse. Start your free trial — no credit card required.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onEnter}
              className="px-8 py-3.5 bg-blue-500 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-600 transition-all duration-150 cursor-pointer active:scale-[0.98]"
            >
              Start Free Trial →
            </button>
            <button className="px-8 py-3.5 bg-transparent text-text-primary text-[14px] font-medium rounded-xl border border-border-default hover:bg-bg-secondary transition-all cursor-pointer">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border-subtle py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[12px] font-bold text-white">W</div>
                <span className="text-[14px] font-semibold">WorkPulse</span>
              </div>
              <p className="text-[12px] text-text-muted leading-relaxed max-w-xs">
                AI-first operational intelligence for modern enterprise teams. Built by operators, for operators.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Analytics', 'AI Copilot', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR', 'SOC-2'] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-semibold text-text-primary uppercase tracking-wider mb-3">{col.title}</div>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <div key={link} className="text-[12px] text-text-muted hover:text-text-secondary transition-colors cursor-pointer">{link}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border-subtle pt-6 flex items-center justify-between">
            <span className="text-[11px] text-text-muted">© 2026 WorkPulse Inc. All rights reserved.</span>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
                <span key={s} className="text-[11px] text-text-muted hover:text-text-secondary transition-colors cursor-pointer">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
