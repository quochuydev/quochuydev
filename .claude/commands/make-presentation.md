# Make Technical Presentation

Create or update a Slidev presentation on the given topic.

## Topic

$ARGUMENTS

## Instructions

### Phase 0: Check for Existing Presentation

- Search for existing presentation in `./presentation/slides/` matching the topic
- If found: Read the file and proceed to **Update Mode**
- If not found: Proceed to **Create Mode** (Phase 1)

### Update Mode

When updating an existing presentation:

1. Read the current presentation file
2. Ask user what changes they want (add slides, modify content, restructure, etc.)
3. Make the requested changes while preserving existing structure
4. Skip to Phase 5 (Review)

---

### Create Mode

### Phase 1: Research

- Use WebSearch to research the topic thoroughly
- Focus on: core concepts, best practices, common pitfalls, real-world examples
- Gather technical details, statistics, and authoritative sources

### Phase 2: Clarify with User (MANDATORY)

After research, you MUST ask the user using AskUserQuestion tool:

**Question 1: Presentation Angle**
Propose 3-4 different angles/approaches for the presentation. Include a recommendation.

Example options:

- "Beginner-friendly introduction (Recommended)" - Focus on fundamentals
- "Deep technical dive" - Focus on internals and advanced concepts
- "Hands-on workshop style" - Heavy on demos and exercises
- "Problem-solution format" - Start with pain points, show solutions

**Question 2: Number of Slides**
Ask how many slides they want:

- "Short (8-12 slides)" - 15-20 min presentation
- "Medium (15-20 slides) (Recommended)" - 30-40 min presentation
- "Long (25-35 slides)" - 45-60 min presentation

**Question 3: Color Theme**
Research the topic's brand colors and suggest matching themes:

- Option 1: Topic's official brand colors (Recommended) - e.g., Binance → yellow/black, n8n → pink/white, Stripe → purple/white
- Option 2: Neutral dark theme - Dark background with light text
- Option 3: Neutral light theme - Light background with dark text

Always research and suggest the actual brand colors for the topic being presented.

### Phase 3: Propose Slide Structure

After getting answers, propose a detailed slide structure:

```
Slide 1: Title - [topic name]
Slide 2: Agenda - Overview of topics
Slide 3: Introduction - Why this matters
Slide 4-6: Core Concepts - [list specific concepts]
Slide 7-9: Deep Dive - [list technical details]
Slide 10-12: Demo/Examples - [list demos]
Slide 13-14: Best Practices - Do's and Don'ts
Slide 15: Summary - Key takeaways
Slide 16: Q&A
```

**Wait for user confirmation:**

- User says "ok" or "looks good" → Proceed to create slides
- User says "update slide X" or gives feedback → Revise structure and show again

### Phase 4: Create/Update Presentation

Only after user approves the structure:

1. **Create or update the Slidev file** at: `./presentation/slides/[topic-slug].md`

2. **Use these Slidev features:**

   - `---` to separate slides
   - Frontmatter for slide configuration (layout must be in frontmatter, NOT as markdown heading)
   - Code blocks with syntax highlighting
   - Slide layouts: prefer `default` or `center` for single-column layouts
   - `<v-click>` for progressive reveals (see v-click rules below)
   - Tables for comparisons

   **V-click rules:**

   - Content must animate top-to-bottom - no static content between animated items
   - Use `<v-clicks>` wrapper for lists - animates all items consistently
   - Either animate ALL content or NONE - never partial (some animated, some static)
   - If a slide has a list, wrap entire list in `<v-clicks>`, not individual `<v-click>` tags

3. **Content guidelines:**

   - Clear, concise bullet points (not paragraphs)
   - Practical code examples
   - Text-based diagrams (ASCII art) instead of Mermaid - use regular text, NOT code blocks
   - Real-world scenarios
   - **Slide length:** Keep each slide focused on ONE main concept
   - **Line limit:** Each slide should have 8-12 lines of content maximum (not counting headings and v-click tags)
   - **Long content:** If content exceeds 8-12 lines, split into multiple slides instead of cramming
   - **Layout:** Use straight, single-column layout - content flows top-to-bottom naturally

4. **Create demo files** at `./presentation/demo/[topic-slug]/` if needed

### Phase 5: Review

After creating:

- Summarize what was created
- List each slide with its purpose
- Suggest demo setup if applicable

## Example Frontmatter

```yaml
---
theme: seriph
background: https://cover.sli.dev
title: [Topic Title]
info: |
  Technical presentation about [topic]
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---
```

## Important

- **Create Mode:** NEVER skip Phase 2 (clarification) - always ask before creating new presentations
- **Create Mode:** NEVER create slides without user approving the structure first
- **Update Mode:** Ask what changes the user wants before modifying existing presentations
- Use text/ASCII diagrams, NOT Mermaid
- English should be simple, easy for read and understand (level ~B1/B2)
