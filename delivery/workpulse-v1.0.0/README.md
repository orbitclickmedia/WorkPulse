# WorkPulse — AI-First Enterprise Operational Intelligence Platform

> A premium, production-ready SaaS platform combining async standups, AI insights, productivity tracking, blocker management, and team intelligence — built with Next.js 15, Firebase, and Claude AI.

![WorkPulse](https://img.shields.io/badge/WorkPulse-Pro-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase)
![Claude AI](https://img.shields.io/badge/Claude-AI-purple?style=flat-square)

---

## Features

### 11 Core Modules
| Module | Description |
|--------|-------------|
| **Dashboard** | Animated KPI cards, productivity trends, team status, activity feed, dept comparison |
| **Daily Standup** | AI-enhanced async standups with auto-save, streak tracking, AI analysis |
| **AI Copilot** | Claude-powered chat — ask anything about your team, get instant insights |
| **AI Insights** | Auto-generated alerts, burnout detection, predictive risk scores |
| **Analytics** | Submission heatmaps, blocker charts, contributor rankings |
| **Teams** | Dept management, health scores, member tracking, leader assignment |
| **Blockers** | Severity system (critical/high/medium/low), escalation, resolution tracking |
| **Notifications** | Realtime alerts, unread indicators, missed standup alerts |
| **Reports** | PDF/XLSX/CSV exports, scheduled reports, AI-generated summaries |
| **Settings** | Workspace, notifications, AI, security, integrations, audit log |
| **Landing Page** | World-class SaaS marketing page with pricing, testimonials, FAQ |

### Tech Stack
- **Frontend**: Next.js 15 · React 18 · TypeScript · Tailwind CSS
- **Charts**: Recharts (area, bar, line charts)
- **State**: Zustand
- **Backend**: Firebase Auth · Firestore · Cloud Functions · Storage
- **AI**: Claude claude-sonnet-4-20250514 (Anthropic)
- **Deployment**: Vercel (bom1 region — Mumbai)

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourorg/workpulse.git
cd workpulse
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Fill in your Firebase and Anthropic API keys
```

### 3. Set up Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Google + Email/Password)
3. Enable **Firestore** in production mode
4. Copy config values to `.env.local`
5. Deploy security rules:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,firestore:indexes
```

### 4. Get Anthropic API key

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add to `.env.local` as `ANTHROPIC_API_KEY`

### 5. Run development server

```bash
npm run dev
# Open http://localhost:3000
```

---

## Project Structure

```
workpulse/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/ai/route.ts    # Claude AI proxy endpoint
│   │   ├── layout.tsx         # Root layout (DM Sans font, metadata)
│   │   ├── page.tsx           # Entry — routes between landing & app
│   │   └── globals.css        # Design system CSS variables
│   │
│   ├── components/
│   │   ├── layout/            # AppShell, Sidebar, Topbar
│   │   ├── charts/            # Recharts wrappers (Area, Bar, Line)
│   │   └── ui/                # Card, Badge, KPICard, Toggle, Avatar...
│   │
│   ├── features/              # One folder per module
│   │   ├── landing/           # SaaS marketing landing page
│   │   ├── dashboard/         # KPIs, trend, activity, dept comparison
│   │   ├── standup/           # Form, AI analysis, streak tracker
│   │   ├── copilot/           # Claude AI chat interface
│   │   ├── insights/          # AI-generated insight cards
│   │   ├── analytics/         # Heatmap, charts, leaderboard
│   │   ├── teams/             # Team cards, member table
│   │   ├── blockers/          # Severity list, stats
│   │   ├── notifications/     # Unread alerts
│   │   ├── reports/           # Export catalog
│   │   └── settings/          # 6 tabs: workspace/notifs/AI/security/integrations/audit
│   │
│   ├── firebase/
│   │   ├── config.ts          # Firebase app initialization
│   │   ├── auth.ts            # Auth service (Google, email, RBAC)
│   │   └── firestore.ts       # Full Firestore CRUD service layer
│   │
│   ├── store/index.ts         # Zustand global state
│   ├── hooks/index.ts         # Custom React hooks
│   ├── lib/
│   │   ├── utils.ts           # cn(), formatRelativeTime(), color helpers
│   │   └── ai.ts             # Claude AI service (enhance, analyze, chat)
│   ├── data/mock.ts           # Rich realistic mock data
│   └── types/index.ts         # All TypeScript types
│
├── firestore.rules            # Multi-tenant security rules
├── firestore.indexes.json     # Composite indexes
├── firebase.json              # Firebase project config
├── vercel.json                # Vercel deployment config
├── tailwind.config.js         # Custom design tokens
└── .env.example               # Environment template
```

---

## Architecture

### Multi-Tenant Firestore Schema

```
organizations/{orgId}/
  ├── users/{userId}
  ├── teams/{teamId}
  ├── departments/{deptId}
  ├── daily_updates/{userId_date}
  ├── blockers/{blockerId}
  ├── notifications/{notifId}
  ├── analytics/{period}
  └── reports/{reportId}
```

Every query is organization-scoped — complete tenant isolation.

### RBAC Roles

| Role | Permissions |
|------|------------|
| `admin` | Full access — settings, members, all data |
| `hr` | Read all, manage users, view reports |
| `manager` | Read team data, manage blockers, generate reports |
| `team_leader` | Read own team, submit standups, manage blockers |
| `employee` | Submit own standup, view own data |

### AI Integration (Claude claude-sonnet-4-20250514)

All AI calls route through `/api/ai` (edge runtime) to keep the API key server-side:

- **Standup Enhancement** — Improves clarity and completeness
- **Blocker Analysis** — Auto-categorizes severity and suggests actions  
- **Burnout Detection** — Analyzes workload patterns for risk signals
- **Weekly Summary** — Executive-level team digest
- **AI Copilot** — Contextual org-aware chat assistant
- **Insight Generation** — Daily automated operational insights

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set these environment variables in Vercel dashboard:
- All `NEXT_PUBLIC_FIREBASE_*` values
- `ANTHROPIC_API_KEY`

### Environment Variables Required

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `ANTHROPIC_API_KEY` | Claude AI key (server-side only) |

---

## Design System

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0a0b0f` | App background |
| `bg-secondary` | `#0f1117` | Cards, sidebar |
| `bg-tertiary` | `#141720` | Inputs, hover states |
| `brand-blue` | `#3b82f6` | Primary actions |
| `brand-teal` | `#14b8a6` | Success indicators |
| `brand-amber` | `#f59e0b` | Warnings, blockers |
| `brand-purple` | `#8b5cf6` | AI features |

### Typography
- **Primary**: DM Sans (headings, body)
- **Monospace**: DM Mono (code, URLs)

---

## Development

```bash
npm run dev        # Start dev server at :3000
npm run build      # Production build
npm run lint       # ESLint
```

---

## License

MIT © 2026 WorkPulse Inc.

---

Built with ❤️ by the WorkPulse team · Powered by [Claude AI](https://anthropic.com) · Deployed on [Vercel](https://vercel.com)
