# Presentations

Technical presentations built with [Slidev](https://sli.dev/).

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server for a presentation
pnpm dev slides/presentation_name

# Example
pnpm dev slides/database-index.md

# Build for production
pnpm build slides/database-index.md
```

## Available Presentations

| Presentation               | Topic                       | Demo             |
| -------------------------- | --------------------------- | ---------------- |
| `slides/database-index.md` | Database Indexing Deep Dive | 1M movie records |

## Claude Commands

Use these commands with Claude Code:

| Command                        | Description                            |
| ------------------------------ | -------------------------------------- |
| `/create-presentation <topic>` | Research and create a new presentation |

## Deployment

### GitHub Pages (Recommended)

```bash
pnpm deploy:gh-pages
```

### Netlify

```bash
pnpm deploy:netlify
```

### Vercel

```bash
pnpm deploy:vercel
```

## Project Structure

```
presentation/
├── slides/              # Presentation markdown files
│   └── database-index.md
├── demo/                # Demo code and scripts
│   └── database-index/
├── components/          # Custom Vue components
├── .claude/commands/    # Claude Code commands
└── package.json
```

## Free Hosting Options

| Platform     | URL Pattern               | Limits    |
| ------------ | ------------------------- | --------- |
| GitHub Pages | `<user>.github.io/<repo>` | Unlimited |
| Netlify      | `<project>.netlify.app`   | 100GB/mo  |
| Vercel       | `<project>.vercel.app`    | 100GB/mo  |
