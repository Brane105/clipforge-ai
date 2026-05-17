# ClipForge AI

AI-powered YouTube title and thumbnail idea generator for creators.

## Tech

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- Mock generator for zero-cost validation
- Optional YouTube Data API v3 trends
- Vercel-ready

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Optional Trends Setup

The app works without keys by using mock data. To enable YouTube trends, create `.env.local`:

```env
YOUTUBE_API_KEY=your_youtube_data_api_key
YOUTUBE_REGION=US
```

Then restart the dev server.

The generator is mock-only for this zero-cost MVP. YouTube Data API v3 powers optional trending ideas through `/api/trends`. If the key is missing, the app falls back to mock trends.

## Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Keep the default Next.js settings.
4. Deploy.

No database, auth, billing, Supabase, Clerk, or Stripe are required for this MVP.
