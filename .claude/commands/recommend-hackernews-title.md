---
description: Generate a Hacker News submission title for a topic or repo
---

# Generate HN Submission Title

Generate a Hacker News submission title for: **$ARGUMENTS**

## Instructions

1. **Research** the topic/repo briefly to understand what it does
2. **Generate 3-5 title options** following HN conventions

## HN Title Guidelines

**Good titles are:**
- Descriptive and accurate
- Specific about what the content covers
- Free of superlatives and hype
- 80 characters or less (HN truncates longer titles)

**Use prefixes when appropriate:**
- `Show HN:` - For projects you built
- `Ask HN:` - For questions to the community
- `Tell HN:` - For announcements/stories
- No prefix - For sharing others' content

**Good examples:**
- "Show HN: A static site generator in 500 lines of Go"
- "Parsing 1GB of JSON per second"
- "Why we moved from Kubernetes to bare metal"
- "Show HN: I built a task dependency system for Claude Code"

**Avoid:**
- Clickbait: "You won't believe..."
- Superlatives: "The ultimate guide to..."
- Hype: "Revolutionary", "game-changing", "10x"
- Questions designed to provoke clicks

## Output

Return **only** the suggested titles, formatted as:

```
Suggested HN titles:

1. <title option 1>
2. <title option 2>
3. <title option 3>
```

Do NOT write any files. Just output the titles.
