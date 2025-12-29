# Atomic Habits Web App - Design Document

## Overview

A habit tracking web application based on James Clear's "Atomic Habits" methodology. Public product where anyone can sign up to build better habits through daily tracking, streaks, and behavioral techniques.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Database | PostgreSQL + Prisma |
| Auth | Better Auth |
| Styling | Tailwind CSS + shadcn/ui |
| Hosting | Railway |

## Core Concept

**Core loop:**
1. User signs up, creates their first habit
2. Each day, they check in (did it / didn't do it)
3. Streaks build, calendar fills with "green squares" (like GitHub contributions)
4. Over time, they add habit stacks, intentions, and identity statements

**Key principle:** The app should make checking in *frictionless*. Open app → see today's habits → tap to complete → done in 10 seconds.

## Features

### MVP (v1)
- **Habit Tracker** - Create habits, daily check-in, streak counter, calendar heatmap
- **Basic Dashboard** - Today's habits, current streaks, weekly summary

### Post-MVP (v2+)
- Habit Stacking ("After X, I will Y" relationships)
- Implementation Intentions (time + location planning)
- Two-Minute Rule (tiny version suggestions)
- Identity Board ("I am a person who...")
- Analytics (trends, best days, completion rates)

## Architecture

```
atomic/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth pages (login, signup)
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── page.tsx        # Dashboard (today's habits)
│   │   │   ├── habits/         # Habit management
│   │   │   ├── calendar/       # Calendar heatmap view
│   │   │   └── settings/       # User preferences
│   │   ├── api/                # API routes
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   └── habits/             # Habit-specific components
│   ├── lib/
│   │   ├── auth.ts             # Better Auth config
│   │   ├── db.ts               # Prisma client
│   │   └── utils.ts            # Helpers
│   └── server/
│       └── actions/            # Server Actions (habit CRUD)
├── prisma/
│   └── schema.prisma           # Database schema
└── package.json
```

**Data flow:**
- **Server Actions** for mutations (create habit, check-in)
- **React Server Components** for data fetching (dashboard, calendar)
- **Client Components** only where needed (interactive check-in buttons)

## Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())

  habits        Habit[]
  checkIns      CheckIn[]
  identities    Identity[]   // v2
}

model Habit {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  name          String              // "Read for 10 minutes"
  description   String?
  cue           String?             // "After morning coffee"
  tinyVersion   String?             // "Read one page" (Two-Minute Rule)
  frequency     String    @default("daily")  // daily, weekdays, custom

  createdAt     DateTime  @default(now())
  archived      Boolean   @default(false)

  checkIns      CheckIn[]
  stackedAfter  Habit?    @relation("HabitStack", fields: [stackedAfterId], references: [id])
  stackedAfterId String?
  stackedHabits Habit[]   @relation("HabitStack")
}

model CheckIn {
  id            String    @id @default(cuid())
  habitId       String
  habit         Habit     @relation(fields: [habitId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  date          DateTime  @db.Date  // Just the date, no time
  completed     Boolean   @default(true)
  note          String?

  @@unique([habitId, date])  // One check-in per habit per day
}

model Identity {  // v2 feature
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  statement     String    // "I am a person who reads every day"
  votes         Int       @default(0)  // Increments with related habit completions
}
```

**Key decisions:**
- `CheckIn` uses date-only (no time) with unique constraint - prevents duplicate check-ins
- `stackedAfterId` enables habit stacking relationships (v2)
- `tinyVersion` stores Two-Minute Rule alternative
- `Identity` tracks "votes" as habits complete

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page (marketing, sign up CTA) |
| `/login` | Better Auth login |
| `/signup` | Better Auth registration |
| `/dashboard` | Today's habits with check-in buttons |
| `/habits` | Manage habits (create, edit, archive) |
| `/habits/new` | Create new habit form |
| `/calendar` | Heatmap view (GitHub-style) |
| `/settings` | Profile, preferences, export data |

## Dashboard UI

```
┌─────────────────────────────────────┐
│  Good morning, User        [avatar] │
│  3 of 5 habits completed today      │
├─────────────────────────────────────┤
│  ☑ Read for 10 minutes    🔥 12     │
│  ☐ Exercise               🔥 5      │
│  ☑ Write in journal       🔥 8      │
│  ☐ Meditate               🔥 3      │
│  ☑ Review code            🔥 21     │
├─────────────────────────────────────┤
│  [+ Add Habit]                      │
└─────────────────────────────────────┘
```

**Key interactions:**
- Tap habit row → toggles check-in (instant, optimistic UI)
- 🔥 number = current streak
- Long press or swipe → edit/archive options
- Calendar shows heatmap of all completions

**Mobile-first:** Dashboard designed for phone use (quick morning/evening check-ins)

## Authentication

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: { clientId: "...", clientSecret: "..." },
  },
});
```

## Deployment

```
┌─────────────────────────────────────┐
│            Railway                  │
│  ┌───────────┐    ┌──────────────┐  │
│  │  Next.js  │───▶│  PostgreSQL  │  │
│  │   App     │    │   Database   │  │
│  └───────────┘    └──────────────┘  │
└─────────────────────────────────────┘
```

- Single Railway project with two services
- Auto-deploy from GitHub `main` branch
- Environment variables for secrets

**Environment variables:**
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=random-secret
GOOGLE_CLIENT_ID=...      # optional
GOOGLE_CLIENT_SECRET=...  # optional
```

**Estimated cost:** Free tier covers hobby usage. ~$5-10/month if traffic grows.

## References

- [Atomic Habits by James Clear](https://jamesclear.com/atomic-habits)
- [Better Auth Documentation](https://www.better-auth.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Railway](https://railway.app/)
