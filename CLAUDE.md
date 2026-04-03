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

- **docs/** - Documentation

## Adding New Content

When adding new blog posts or pages:

1. Create MDX file in `/blog/src/pages/` with frontmatter:

```mdx
---
title: 'Post Title'
date: '2025-01-01'
excerpt: 'Brief description'
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
