/**
 * AI Service
 * Integrates Claude API for:
 * - Standup AI enhancement
 * - Weekly summaries
 * - Blocker analysis
 * - Burnout detection
 * - AI Copilot responses
 * - Insight generation
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StandupData {
  accomplished: string
  tomorrow: string
  blockers: string
  hoursWorked: number
  priority: string
}

export interface OrgContext {
  memberCount: number
  submissionRate: number
  activeBlockers: number
  teamCount: number
  departments: string[]
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

// ─── API Call ─────────────────────────────────────────────────────────────────

async function callClaude(messages: AIMessage[], system?: string): Promise<string> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`AI API error: ${err}`)
  }

  const data = await response.json()
  return data.content ?? ''
}

// ─── Standup Enhancement ──────────────────────────────────────────────────────

export async function enhanceStandup(standup: StandupData): Promise<StandupData> {
  const system = `You are an expert technical writing assistant for a team operations platform.
Your job is to improve daily standup entries for clarity, completeness, and actionability.
Keep the person's voice. Return JSON only — no markdown, no preamble.`

  const prompt = `Improve this standup entry. Keep the same meaning, improve clarity:

ACCOMPLISHED: ${standup.accomplished}
TOMORROW: ${standup.tomorrow}
BLOCKERS: ${standup.blockers}
PRIORITY: ${standup.priority}
HOURS: ${standup.hoursWorked}

Return JSON: { "accomplished": "...", "tomorrow": "...", "blockers": "...", "priority": "...", "hoursWorked": ${standup.hoursWorked} }`

  try {
    const raw = await callClaude([{ role: 'user', content: prompt }], system)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return standup // fallback to original
  }
}

// ─── AI Blocker Analysis ──────────────────────────────────────────────────────

export async function analyzeBlocker(blockerText: string): Promise<{
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  suggestion: string
}> {
  const system = `You are an operations intelligence AI. Analyze blockers and categorize them. Return JSON only.`

  const prompt = `Analyze this blocker and return JSON:
BLOCKER: "${blockerText}"

Return: { "severity": "low|medium|high|critical", "category": "string", "suggestion": "one sentence action" }`

  try {
    const raw = await callClaude([{ role: 'user', content: prompt }], system)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return { severity: 'medium', category: 'General', suggestion: 'Review and escalate if needed.' }
  }
}

// ─── Weekly Summary ───────────────────────────────────────────────────────────

export async function generateWeeklySummary(context: {
  orgContext: OrgContext
  standupCount: number
  blockerCount: number
  topPerformers: string[]
  atRiskMembers: string[]
  dateRange: string
}): Promise<string> {
  const system = `You are a senior operations analyst writing executive-level team intelligence summaries.
Be concise, data-driven, and actionable. Use markdown formatting.`

  const prompt = `Generate a weekly executive summary:

Organization: ${context.orgContext.memberCount} members, ${context.orgContext.teamCount} teams
Period: ${context.dateRange}
Submission rate: ${context.orgContext.submissionRate}%
Standups submitted: ${context.standupCount}
Active blockers: ${context.blockerCount}
Top performers: ${context.topPerformers.join(', ')}
At-risk members: ${context.atRiskMembers.join(', ')}

Write a 3-5 sentence executive summary with key highlights, risks, and one recommendation.`

  return await callClaude([{ role: 'user', content: prompt }], system)
}

// ─── AI Copilot Chat ──────────────────────────────────────────────────────────

export async function copilotChat(
  messages: AIMessage[],
  orgContext: OrgContext
): Promise<string> {
  const system = `You are WorkPulse Copilot, an AI-powered team operations assistant.

Current organization context:
- ${orgContext.memberCount} team members across ${orgContext.teamCount} teams
- Departments: ${orgContext.departments.join(', ')}
- Today's submission rate: ${orgContext.submissionRate}%
- Active blockers: ${orgContext.activeBlockers}

You have deep knowledge of standup data, team health, blockers, and trends.
Be concise, direct, and use bullet points for lists. Use markdown formatting.
When unsure, say so and offer to generate a detailed report.`

  return await callClaude(messages, system)
}

// ─── Burnout Detection ────────────────────────────────────────────────────────

export async function detectBurnoutRisk(memberData: {
  name: string
  hoursThisWeek: number
  avgHoursLastMonth: number
  missedStandups: number
  blockerCount: number
}): Promise<{ risk: number; signals: string[]; recommendation: string }> {
  const system = `You are an organizational psychologist and burnout detection AI. Return JSON only.`

  const prompt = `Assess burnout risk for this team member:
Name: ${memberData.name}
Hours this week: ${memberData.hoursThisWeek}h
Average hours last month: ${memberData.avgHoursLastMonth}h
Missed standups this week: ${memberData.missedStandups}
Active blockers reported: ${memberData.blockerCount}

Return JSON: { "risk": 0-100, "signals": ["...", "..."], "recommendation": "..." }`

  try {
    const raw = await callClaude([{ role: 'user', content: prompt }], system)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    const risk = Math.min(100, Math.round(
      ((memberData.hoursThisWeek - memberData.avgHoursLastMonth) / memberData.avgHoursLastMonth) * 100 +
      memberData.missedStandups * 15
    ))
    return { risk, signals: ['High hours detected'], recommendation: 'Consider a 1:1 check-in.' }
  }
}

// ─── Insights Generation ──────────────────────────────────────────────────────

export async function generateInsights(orgContext: OrgContext & {
  recentBlockers: string[]
  lowPerformingTeams: string[]
  submissionTrend: 'up' | 'down' | 'stable'
}): Promise<Array<{
  type: 'alert' | 'warning' | 'success' | 'info'
  title: string
  description: string
  metric?: string
}>> {
  const system = `You are a team intelligence AI. Generate actionable insights from org data. Return JSON array only.`

  const prompt = `Generate 4-6 operational insights for this organization:
Members: ${orgContext.memberCount}
Submission rate: ${orgContext.submissionRate}% (trend: ${orgContext.submissionTrend})
Active blockers: ${orgContext.activeBlockers}
Recent blockers: ${orgContext.recentBlockers.join(', ')}
Low-performing teams: ${orgContext.lowPerformingTeams.join(', ')}

Return JSON array: [{ "type": "alert|warning|success|info", "title": "...", "description": "...", "metric": "optional" }]`

  try {
    const raw = await callClaude([{ role: 'user', content: prompt }], system)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return []
  }
}
