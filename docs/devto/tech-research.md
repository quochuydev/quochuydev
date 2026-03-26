# Repo

https://github.com/quochuydev/tech-research

# Title

How I Built a Zero-Dependency Technical Research Blog with Just HTML, CSS, and Markdown

# Tags

opensource, productivity, markdown, github, webdev

# Body

Ever find yourself drowning in bookmarks, scattered notes, and half-finished documentation about technologies you're researching? I did too—until I built something simpler.

## The Problem

- Technical notes scattered across Notion, Google Docs, and random markdown files
- No central place to organize research on new technologies and platforms
- Setting up a blog feels like overkill—why do I need a database for markdown?
- Want to share knowledge but don't want to maintain complex infrastructure
- Diagrams and code examples should just work without plugins

## The Solution: Tech Research

A static blog that turns a folder of markdown files into a searchable knowledge base—deployed free on GitHub Pages with zero dependencies.

```bash
# Add an article, run the script, push. Done.
echo "# My Research" > researching/new-topic.md
./update-manifest.sh
git push
```

Your research is live in seconds, not hours.

## How It Works

1. **Write in Markdown** - Create `.md` files in the `researching/` directory with GitHub-flavored syntax
2. **Run the Manifest Script** - `./update-manifest.sh` scans your articles and builds the index
3. **Push to GitHub** - GitHub Actions automatically deploys to GitHub Pages
4. **Browse and Search** - The SPA loads your manifest and renders articles on demand

No build step. No Node.js. No framework churn.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/tech-research.git
cd tech-research
python -m http.server 8000  # or: npx serve .
```

This gives you:
- `index.html` - The single-page application that renders everything
- `researching/` - Drop your markdown articles here
- `update-manifest.sh` - Regenerates the article index
- `manifest.json` - Searchable registry of all your content

## Topics You Can Research

| Category | Examples | Use Case |
| -------- | -------- | -------- |
| Blockchain | Bitcoin, Solana, BSC | Crypto research and earning ideas |
| AI Tools | Claude Code, Moondream | Evaluating AI platforms |
| DevOps | Dokploy, OAuth2-proxy, Zitadel | Self-hosting infrastructure |
| Architecture | C4 Model, ADRs | System design documentation |
| Automation | n8n, LiveKit | Workflow and real-time tools |

## Why This Works

1. **Zero Dependencies** - Pure HTML/CSS/JS means nothing breaks when packages update
2. **Mermaid Diagrams Built-in** - Architecture diagrams render without extra tooling
3. **GitHub Pages = Free Hosting** - Push and forget, GitHub handles SSL and CDN
4. **Markdown First** - Write naturally, let the SPA handle rendering
5. **Version Controlled Knowledge** - Your research history lives in git commits

## Try It

Fork the repo and start documenting your own tech research:

```bash
git clone https://github.com/quochuydev/tech-research.git
cd tech-research
# Create your first article
echo "---
title: My First Research
category: Learning
---

# Topic Overview

Your research goes here..." > researching/my-topic-overview.md
./update-manifest.sh
```

Open `index.html` in your browser—your article is already there.

---

> **GitHub**: [quochuydev/tech-research](https://github.com/quochuydev/tech-research)

---

What's the most disorganized part of your technical learning process? I'd love to hear what topics you'd document first.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Blog Homepage | After "The Solution" section | Screenshot of the tech-research blog homepage showing the article list and clean design |
| Markdown Article | After "How It Works" | Screenshot of a rendered article with code highlighting and structure visible |
| Mermaid Diagram | After "Why This Works" | Screenshot of an article containing a Mermaid architecture diagram |
| Folder Structure | After "Get Started" | Terminal screenshot showing the repository structure with `tree` command |

# Banana AI banner prompt

Minimalist illustration of a glowing markdown document transforming into a web browser window, with floating icons representing different tech topics (blockchain symbol, gear for DevOps, brain for AI). Clean purple and teal gradient background. Modern developer aesthetic with subtle grid lines. No text, focus on the concept of knowledge transformation from simple files to polished documentation.
