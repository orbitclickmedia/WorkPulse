# Firebase setup for WorkPulse

## 1. Create project

1. [Firebase Console](https://console.firebase.google.com) → Create project
2. Enable **Authentication** → Google + Email/Password
3. Enable **Firestore** → production mode, region `asia-south1` (recommended)

## 2. Web app config

Project settings → Your apps → Web → copy config into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ORG_ID=ekluvya
```

Add the same vars on **Vercel** → Environment Variables → redeploy.

## 3. Link CLI & deploy rules

```bash
cd "/Users/pavangeesala/Downloads/workpulse 2"
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes
```

## 4. Authorized domains

Authentication → Settings → Authorized domains → add:

- `localhost`
- `work-pulse-liard.vercel.app` (your Vercel URL)

## 5. Seed blockers (optional)

In Firestore, create collection:

`organizations/{NEXT_PUBLIC_ORG_ID}/blockers`

Add documents using fields from `scripts/seed-blockers.example.json` (`resolved: false`).

## 6. Test locally

```bash
npm run dev
```

- **Get Started** → Google or email sign-in
- **Daily Standup** → Submit (writes to `daily_updates`)
- **Blockers** → reads live from Firestore when signed in

**View Live Demo** on the landing page skips auth (mock data).

## Wired features

| Feature | Firebase |
|---------|----------|
| Auth gate | Google + email |
| Standup submit | `daily_updates` |
| Blockers panel | realtime `blockers` subscription |
| Other modules | still mock data |
