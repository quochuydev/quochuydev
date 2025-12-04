# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Blog Application
```sh
# Navigate to blog directory and start development server
cd blog && pnpm dev

# Build for production (runs TypeScript check + Vite build)
cd blog && pnpm build

# Lint code
cd blog && pnpm lint

# Preview production build locally
cd blog && pnpm preview

# Deploy to GitHub Pages
cd blog && pnpm release
```

### Prototype Backend
```sh
# Navigate to prototypes backend and activate Python virtual environment
cd prototypes/backend
source venv/bin/activate

# Run Django development server
python manage.py runserver
```

## Project Structure

This is a monorepo containing multiple projects:

- **blog/** - Main React TypeScript blog application (primary focus)
- **prototypes/** - Backend prototypes and experimental features
  - **prototypes/backend/** - Django/Python backend
  - **prototypes/architecture.md** - System architecture diagrams
- **brainstorming/** - Design artifacts and brainstorming materials
- **docs/** - Documentation
- **guidelines/** - Development guidelines

## Blog Application Architecture

### Technology Stack
- **Frontend:** React 19.2 with TypeScript 5.9
- **Build Tool:** Vite 7.2 with file-based routing (`vite-plugin-pages`)
- **Styling:** Tailwind CSS 4.1 with typography plugin
- **Content:** MDX (Markdown + JSX) with frontmatter metadata
- **Routing:** React Router DOM 7.9 + automatic page generation from files
- **Search:** Flexsearch for client-side content search
- **Diagrams:** Mermaid for flowcharts and diagrams
- **Authentication:** Zitadel OIDC (configuration available in `.env.example`)

### Key Architectural Patterns

**File-Based Routing**
- Pages are automatically generated from `/blog/src/pages/` directory
- Both `.tsx` and `.mdx` files become routes
- MDX files support frontmatter metadata for title, excerpt, tags, category, date

**Content Management**
- Centralized content metadata in `/blog/src/lib/content.ts`
- Manual registration of pages with metadata (title, path, excerpt, tags, category)
- Helper functions: `getAllTags()`, `getAllCategories()`, `getPagesByTag()`, `getPagesByCategory()`

**Component Organization**
- `/blog/src/components/` - Reusable UI components (layout, theme, search, MDX rendering)
- `/blog/src/components/ui/` - Headless UI primitives (buttons, badges, inputs)
- `/blog/src/lib/` - Utility functions and content metadata
- `/blog/src/contexts/` - React Context for state management
- `/blog/src/assets/` - Static assets

**Vite Configuration** (`/blog/vite.config.ts`)
```typescript
// Key plugins:
- @mdx-js/rollup: Compiles MDX with GFM and frontmatter support
- vite-plugin-pages: Generates routes from src/pages/*.{tsx,mdx}
- @vitejs/plugin-react: React Fast Refresh

// Path alias:
'@' → './src'
```

### Adding New Content

When adding new blog posts or pages:

1. Create MDX file in `/blog/src/pages/` with frontmatter:
```mdx
---
title: "Post Title"
date: "2025-01-01"
excerpt: "Brief description"
---
```

2. Register in `/blog/src/lib/content.ts`:
```typescript
{
  title: 'Post Title',
  path: '/post-url',
  excerpt: 'Brief description',
  tags: ['tag1', 'tag2'],
  category: 'Category Name',
  date: '2025-01-01'
}
```

### Content Categories
- E-commerce (WooCommerce integrations)
- Authentication (OIDC, security)
- AI & Tools
- DevOps
- Project Management
- Software Design
- Real-time Apps
- Games

## Deployment

The blog is deployed to GitHub Pages via the `release` script:
- Runs production build
- Deploys `dist/` directory to `gh-pages` branch
- Uses `base: '/'` in Vite config

## Environment Variables

Authentication is configured via environment variables (see `/blog/.env.example`):
- `VITE_OIDC_CLIENT_ID` - Zitadel OIDC client ID
