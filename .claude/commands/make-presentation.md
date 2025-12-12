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
   - Frontmatter for slide configuration
   - Code blocks with syntax highlighting
   - Slide layouts: `cover`, `two-cols`, `section`
   - `<v-click>` for progressive reveals
   - Tables for comparisons

3. **Content guidelines:**
   - Clear, concise bullet points (not paragraphs)
   - Practical code examples
   - Text-based diagrams (ASCII art) instead of Mermaid
   - Real-world scenarios
   - **Slide length:** Keep each slide focused on ONE main concept
   - **Long content:** Use `<v-click>` for progressive reveals instead of splitting slides
   - **Rule of thumb:** If content has multiple sections, wrap each section in `<v-click>` tags so audience sees content incrementally

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
