---
description: Research a GitHub repo and write a dev.to style blog post about it
---

# Write Blog from GitHub Repo

Generate a blog post about: **$ARGUMENTS**

## Instructions

### 1. Research Phase

Research the GitHub repository thoroughly:

- **Fetch README**: Use WebFetch to read the repository's README.md
  - URL pattern: `https://raw.githubusercontent.com/{owner}/{repo}/main/README.md` (try `master` if `main` fails)
- **Explore the repo**: Use WebFetch on the GitHub repo page to understand:
  - What problem does it solve?
  - Key features and commands
  - Installation/setup process
  - Target audience (developers, PMs, etc.)
- **Check for docs**: Look for documentation sites or additional docs
- **Understand the value proposition**: Why would someone use this?

### 2. Blog Structure

Create a markdown file in `blogs/<repo-name>.md` with this exact format:

```markdown
# Repo

<GitHub URL>

# Title

<Catchy, engaging title - write as if sharing your own creation>
Example: "How I Built X That Does Y"

# Tags

<4-5 lowercase tags, comma-separated>
Examples: claudeai, productivity, devops, opensource, ai, automation, typescript, react

# Body

<Engaging opening hook - 1-2 sentences that relate to a common pain point>

## The Problem

<Describe the pain point this repo solves in 3-5 bullet points>
- Pain point 1
- Pain point 2
- Pain point 3

## The Solution: <Short Name>

<Brief explanation of how the repo solves the problem>

```
<Code example showing the core workflow - 2-4 lines max>
```

<One-liner explaining the benefit>

## How It Works

<Numbered list of 3-4 key steps>
1. **Step 1** - Brief explanation
2. **Step 2** - Brief explanation
3. **Step 3** - Brief explanation

<Short benefit statement>

## Get Started in 30 Seconds

```bash
<Installation command>
```

This scaffolds/creates:
- Item 1 - What it does
- Item 2 - What it does
- Item 3 - What it does

## <Commands/Features/API>

| <Column1> | <Column2> | <Column3> |
| --------- | --------- | --------- |
| Item 1    | Detail    | Description |
| Item 2    | Detail    | Description |

## Why This Works

<3-4 numbered points explaining the key benefits>
1. **Benefit 1** - Explanation
2. **Benefit 2** - Explanation
3. **Benefit 3** - Explanation

## Try It

<Call to action with the installation command again>

```bash
<Install command>
```

<Suggestion for first thing to try>

---

> **GitHub**: [<repo-path>](<full-github-url>)
>
> **Docs**: [<docs-url>](<docs-url>) (if available)

---

<Engaging closing question to encourage comments>

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| <Image 1> | <Location> | <Description of what to screenshot> |
| <Image 2> | <Location> | <Description of what to screenshot> |
| <Image 3> | <Location> | <Description of what to screenshot> |
| <Image 4> | <Location> | <Description of what to screenshot> |
```

### 3. Writing Style Guidelines

- **First person voice**: Write as if YOU built it ("I built", "I got tired of")
- **Conversational tone**: Like explaining to a colleague
- **Problem-first**: Lead with the pain, then the solution
- **Scannable**: Use headers, bullet points, tables
- **Concrete examples**: Show real commands and code
- **No fluff**: Every sentence should add value
- **Engaging hooks**: Start with a relatable scenario
- **Clear CTAs**: Make it easy to try the tool

### 4. Tag Selection

Choose 4-5 tags from categories like:
- **AI tools**: claudeai, openai, ai, llm, gpt
- **Workflow**: productivity, automation, devops, cicd
- **Languages**: javascript, typescript, python, go, rust
- **Platforms**: opensource, github, npm, docker
- **Topics**: webdev, backend, frontend, devtools

### 5. Image Suggestions

Suggest 3-4 screenshots that would enhance the post:
- Usually include: architecture/flow diagram, code example, terminal output, folder structure
- Be specific about what to capture and where it fits in the narrative

## Output

Save the blog to `blogs/<repo-name>.md` using the repository name (e.g., `workflow.md` for `quochuydev/workflow`).

## Example Reference

See `blogs/workflow.md` for the target format and style.

Now research **$ARGUMENTS** and write the blog post.
