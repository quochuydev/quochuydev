# Repo

https://github.com/quochuydev/what-is

# Title

I Built a SaaS Boilerplate So You Never Start From Scratch Again

# Tags

saas, nextjs, typescript, opensource, webdev

# Body

Every time I started a new SaaS project, I spent the first two weeks wiring up the same things: authentication, payments, API keys, docs. I got tired of rebuilding infrastructure instead of building the actual product.

## The Problem

If you've ever launched a SaaS, you know the drill:

- Setting up authentication with OAuth providers takes days of configuration and edge-case handling
- Integrating payment processing means wrestling with webhooks, credit systems, and billing dashboards
- Building API key management with usage tracking and audit logs from scratch is tedious
- Writing documentation infrastructure and blog systems before writing a single line of product code
- Handling SEO, legal pages, and landing page scaffolding every. single. time.

## The Solution: what-is

**what-is** is a production-ready SaaS boilerplate built on Next.js 16, React 19, and TypeScript. Clone it, swap in your business logic, and ship.

```bash
git clone https://github.com/quochuydev/what-is.git
cd what-is/web && npm install && npm run dev
```

You get auth, payments, API keys, docs, blog, and a landing page — all wired up and ready to customize.

## How It Works

1. **Clone and configure** — Set up your environment variables for Clerk (auth), PayPal (payments), and your database (Neon PostgreSQL)
2. **Replace the service logic** — The default app is an AI-powered definition lookup. Swap the `/api` endpoint and playground with your own product logic
3. **Customize pricing** — Edit credit packages in `src/lib/paypal.ts` to match your pricing model
4. **Deploy to Vercel** — Follow the included 7-step deployment guide and you're live

From clone to production in under an hour instead of under a month.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/what-is.git
cd what-is/web
npm install
cp .env.example .env
npm run db:push
npm run dev
```

This scaffolds a full SaaS application with:

- **Authentication** — Google OAuth via Clerk with database sync
- **Payments** — PayPal checkout with a credit-based billing system
- **API key management** — Generate, revoke, and track usage
- **Documentation** — MDX-powered docs via Fumadocs
- **Blog** — Category-filtered blog with individual post pages
- **Dashboard** — API keys, usage analytics, and billing in one place

## What's Included

| Feature | Implementation | Details |
| ------- | -------------- | ------- |
| Auth | Clerk + Google OAuth | Database-synced user accounts |
| Payments | PayPal checkout | Credit packages: $1/1cr, $5/6cr, $20/30cr |
| API Keys | Custom system | Generate, revoke, audit logs |
| Docs | Fumadocs + MDX | Full documentation site |
| Blog | MDX + categories | Filterable, SEO-optimized |
| Dashboard | Protected routes | API keys, usage stats, billing |
| Landing Page | Pre-built | Hero, features, stats sections |
| Legal | Templates | Privacy policy, terms of service |
| SEO | Built-in | OpenGraph, structured data, sitemap |

## The Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 / React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Auth | Clerk |
| Payments | PayPal |
| LLM | OpenAI-compatible APIs (DeepSeek, Groq, OpenAI) |

## Why This Works

1. **Skip the boilerplate tax** — Authentication, payments, and API management are solved problems. Stop re-solving them and focus on what makes your product unique.
2. **Modern stack, no compromises** — Next.js 16, React 19, TypeScript, and Tailwind v4 mean you're building on the latest foundations, not fighting legacy patterns.
3. **PayPal-friendly** — Unlike Stripe-dependent boilerplates, this works with PayPal personal accounts — perfect for indie hackers and solo founders who want to start accepting payments immediately.
4. **MIT licensed** — Fork it, modify it, ship it commercially. No strings attached.

## Try It

```bash
git clone https://github.com/quochuydev/what-is.git
cd what-is/web && npm install && cp .env.example .env && npm run dev
```

Start by visiting `http://localhost:3000/playground` to see the default AI definition service in action. Then replace it with your own logic and you've got a SaaS.

---

> **GitHub**: [quochuydev/what-is](https://github.com/quochuydev/what-is)
>
> **Live Demo**: [what-is.cappuai.com](https://what-is.cappuai.com)

---

What's the first feature you'd build on top of this boilerplate? Drop it in the comments — I'm curious what people would ship with it.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Landing page | After "The Solution" section | Screenshot of the homepage at what-is.cappuai.com showing the hero section and features |
| Dashboard | After "What's Included" table | Screenshot of the user dashboard showing API keys and usage stats |
| Playground | After "Try It" section | Screenshot of the playground page showing the AI definition lookup in action |
| Folder structure | After "How It Works" section | Terminal screenshot showing the project directory tree structure |

# Banana AI banner prompt

A clean, modern tech illustration of a rocket launching from a laptop screen, surrounded by floating icons representing SaaS building blocks: a lock (auth), a credit card (payments), a key (API), a document (docs), and a megaphone (blog). Use a gradient background from deep indigo to electric blue. Minimal, flat design style with subtle shadows. No text. Developer tool aesthetic with a sense of speed and efficiency.
