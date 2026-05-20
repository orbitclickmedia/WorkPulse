# WorkPulse — Delivery Package

**Version:** 1.0.0  
**Product:** AI-first enterprise operational intelligence platform (demo-ready)

---

## What you receive

| Item | Description |
|------|-------------|
| **Full application** | Landing page + 11 modules (dashboard, standup, copilot, insights, analytics, teams, blockers, notifications, reports, settings) |
| **Demo data** | Realistic org data (47 members, 5 departments) — works **without** Firebase or API keys |
| **AI UX** | Copilot and standup AI use **simulated responses** in demo; connect Claude for live AI |
| **Production build** | Optimized Next.js standalone server |

---

## Run the demo (2 minutes)

### Option A — Pre-built package (recommended for clients)

1. Unzip `workpulse-v1.0.0-mac-linux.zip`
2. Open the folder `workpulse-v1.0.0`
3. **macOS:** Double-click `START.command`  
   **Windows/Linux:** In Terminal:
   ```bash
   ./START.sh
   ```
4. Open **http://localhost:3000**
5. Click **Get Started** on the landing page to enter the app

### Option B — From source (developers)

```bash
npm install
npm run build
npm run start:prod
# → http://localhost:3000
```

### Option C — Create a fresh delivery zip

```bash
npm install
npm run package:delivery
# Output: delivery/workpulse-v1.0.0/ and delivery/workpulse-v1.0.0-mac-linux.zip
```

---

## Requirements

- **Node.js 18+** (only for running the server)
- Modern browser (Chrome, Safari, Firefox, Edge)
- **No** database or cloud account needed for demo

---

## Demo vs production

| Feature | Demo (out of the box) | Production (your keys) |
|---------|------------------------|-------------------------|
| Dashboard, analytics, teams | Mock data | Firebase Firestore |
| Sign-in | UI only | Firebase Auth |
| AI Copilot | Canned + smart mock replies | `ANTHROPIC_API_KEY` on Vercel |
| Standup “AI Enhance” | Simulated animation | Claude API |

To go live: deploy to [Vercel](https://vercel.com) and set env vars from `.env.example` (see README.md).

---

## Handoff checklist

- [ ] Unzip and run `START.sh` / `START.command`
- [ ] Landing page loads
- [ ] Enter app → browse all sidebar modules
- [ ] Test Copilot with suggested prompts
- [ ] Submit a standup (demo flow)

---

## Support files

- `README.md` — full technical documentation
- `.env.example` — production environment template
- `firestore.rules` — Firebase security rules (when you connect backend)

---

© 2026 WorkPulse · Demo delivery package
