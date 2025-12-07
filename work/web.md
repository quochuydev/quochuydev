<!--
File: eventstorming-site-layout.md
Purpose: Web layout design (Markdown) intended as an input spec for an AI code generator.
Notes: Includes page routes, components, data models, sample JSON payloads, accessibility & SEO notes.
Source: core definitions, styles, and resources taken from the official EventStorming site. :contentReference[oaicite:0]{index=0}
-->

# EventStorming — Web Layout Design (AI → Code Input)

> Summary: This document describes a full single-site layout for an EventStorming information & resources site.
> Use it as the canonical input for an AI model that will generate Next.js + Tailwind code (or equivalent).
> Key content, labels and resource references follow the official EventStorming site.

---

## Goals (what the generated site must achieve)

1. Present clear, skimmable explanation of _what EventStorming is_.
2. Show the different **styles** (Improve / Envision / Explore / Design) with short descriptions and icons.
3. Surface **services** (facilitation, training, process modelling) in an actionable way.
4. Provide a **Resources** area with Starter Kit download and book/presentation links.
5. List **Upcoming Workshops** with dates, location, and booking links.
6. SEO & accessibility friendly markup, lightweight, responsive, with simple CMS-friendly JSON data.

---

## High-level Routes

- `/` — Home / Overview (Hero, Styles, Services, Resources teaser, Workshops teaser, Subscribe CTA)
- `/#styles` — Styles detail (full explanations for Improve / Envision / Explore / Design)
- `/#services` — Detailed Services (onsite/remote, training, facilitation)
- `/#resources` — Resources index (Starter Kit, Books, Presentations, Articles)
- `/#workshops` — Upcoming workshops list + filters (online, location, date)
- `/#book` — Book / Contact / Organization info (static)
- `/api/workshops` — JSON API returning workshops (serverless function)

---

## Page: Home (`/`)

### Sections (top → bottom)

1. **Header**
   - Logo (left), nav links (Styles / Services / Resources / Workshops / Book), "Contact" CTA (right)
   - Sticky on scroll, accessible skip link: `#main`
2. **Hero**
   - Title: "The smartest approach to collaboration beyond silo boundaries"
   - Subtitle: "EventStorming is a flexible workshop format for collaborative exploration of complex business domains."
     - Attribution: source reference (footer or data-source meta).
   - Secondary CTA: "Explore Styles" (`/#styles`)
   - Visual: large illustrative image (SVG or optimized JPG) and a small 'play' link to a featured presentation video
3. **Styles Grid (4 cards)**
   - Card items: Improve, Envision, Explore, Design
   - Each card shows icon, heading, 2–3 bullet lines from site text.
   - CTA: "See details" → `/#styles` etc.
4. **Services Preview**
   - 3 columns: Strategic Facilitation, Process Modelling Facilitation, EventStorming Training
   - Short blurb + "Learn more" button → `/#services`.
5. **Resources Preview**
   - Starter Kit callout (with download button), link to book, featured presentations list.
6. **Upcoming Workshops Teaser**
   - Compact list with 3 upcoming items (date, title, location), "All workshops" → `/#workshops`.
7. **Subscribe CTA**
   - Small form: email input (validate), GDPR checkbox, subscribe button (integrate with Mailchimp or serverless)
8. **Footer**
   - Contact email, address, social links, copyright, privacy/cookie links.

---

## Component Inventory (reusable UI pieces)

- `Header` — props: `{ logoUrl, navItems: [{ label, href }], contactHref }`
- `Hero` — props: `{ title, subtitle, primaryCta: {label, href}, secondaryCta, illustration }`
- `CardGrid` — generic grid used for Styles & Services — props: `{ items: [{ id, title, icon, excerpt, href }] }`
- `ResourceList` — props: `{ resources: [{ type, title, description, href, assetType }] }`
- `WorkshopItem` — props: `{ title, date, location, url, tags, type }`
- `SubscribeForm` — props: `{ actionUrl, mailProvider }`
- `Footer` — props: `{ contact, social, links }`
- `DownloadButton` — props: `{ fileId, label }` (implements analytics tracking)
- `SEOHead` — props: `{ title, description, openGraph }`

---

## Data Models (JSON schema examples)

### Site metadata (`/data/site.json`)

```json
{
  "title": "EventStorming",
  "tagline": "The smartest approach to collaboration beyond silo boundaries",
  "email": "",
  "address": ""
}
```
