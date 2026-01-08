---
description: Research a topic/repo and write a technical blog post optimized for Hacker News audience
---

# Write Hacker News Blog Post

Generate a technical blog post about: **$ARGUMENTS**

## Understanding the HN Audience

Hacker News readers are technical, skeptical, and value substance. They will:
- Call out marketing speak immediately
- Appreciate honest discussion of limitations
- Value technical depth over polish
- Respect humility and intellectual honesty
- Engage with novel ideas and genuine insights

## Instructions

### 1. Research Phase

Research thoroughly before writing:

- **If GitHub repo**: Fetch README via `https://raw.githubusercontent.com/{owner}/{repo}/main/README.md`
- **Explore deeply**: Understand the actual implementation, not just marketing copy
- **Find the technical story**: What problem does this solve? What's the approach?
- **Identify trade-offs**: What are the limitations? When shouldn't you use this?
- **Check existing discussions**: Has this been discussed on HN before? What was the reaction?

### 2. Blog Structure

Create a markdown file in `blogs/<topic-name>-hn.md` with this format:

```markdown
# Title

<Descriptive, accurate title - NO clickbait>
Bad: "This Tool Will 10x Your Productivity!"
Good: "Building a Static Site Generator in 500 Lines of Go"
Good: "Lessons from Running Postgres at Scale for 5 Years"

# Tags

<3-4 lowercase technical tags>
Examples: systems, databases, compilers, networking, security, devtools

# Body

<Opening that establishes context and why this matters>
Skip the hook - go straight to the substance. What is this and why is it interesting?

## Background

<Technical context the reader needs>
- What problem space is this in?
- What existing solutions exist?
- Why are they insufficient?

## The Approach

<Explain the technical approach clearly>

Key implementation details:

```
<Code that shows the core idea - not just usage, but HOW it works>
```

Explain what's happening here:
- Point 1: Why this design decision
- Point 2: What trade-off was made
- Point 3: How this differs from alternatives

## Technical Details

<Deep dive into the interesting technical aspects>

### <Subsection 1>
<Detailed explanation with code/diagrams>

### <Subsection 2>
<Benchmarks, measurements, or real-world data if available>

## Limitations and Trade-offs

<Be honest about what this doesn't do well>
- Limitation 1: When this is problematic and potential workarounds
- Limitation 2: What was sacrificed for the benefits
- Limitation 3: Known issues or rough edges

## Alternatives

| Approach | Pros | Cons | Best For |
| -------- | ---- | ---- | -------- |
| This solution | ... | ... | ... |
| Alternative A | ... | ... | ... |
| Alternative B | ... | ... | ... |

## Lessons Learned

<Genuine insights from building/using this>
1. Insight 1 - What surprised you
2. Insight 2 - What you'd do differently
3. Insight 3 - What the experience taught you

## Getting Started

```bash
<Installation/setup>
```

<Minimal example that actually demonstrates the value>

## Conclusion

<Brief summary - no sales pitch>
State what this is good for, acknowledge limitations, invite technical discussion.

---

**Source**: [link](url)
**Docs**: [link](url) (if applicable)

---

<Optional: One genuine question to spark technical discussion>
Example: "I'm curious how others handle X in similar systems."
```

### 3. Writing Style Guidelines

**DO:**
- Write in third person or neutral voice (not "I built this amazing thing")
- Lead with substance - what it is and why it matters technically
- Explain the WHY behind design decisions
- Include real numbers: benchmarks, LOC, memory usage, etc.
- Discuss trade-offs honestly - nothing is perfect
- Reference related work and prior art
- Use precise technical language
- Show, don't tell - code and data over adjectives

**DON'T:**
- Use marketing language ("revolutionary", "game-changing", "10x")
- Clickbait titles or hooks
- Hide limitations or pretend they don't exist
- Write "I" statements for promotional purposes
- Use emojis or excessive formatting
- Make claims without evidence
- Oversell or hype

### 4. Title Guidelines

Good HN titles are:
- Descriptive and accurate
- Specific about what the content covers
- Free of superlatives and hype

Examples:
- "A Deep Dive into SQLite's Query Optimizer"
- "Why We Moved from Kubernetes to Bare Metal"
- "Parsing 1GB of JSON Per Second"
- "The Architecture Behind Our Real-time Search"

Avoid:
- "You Won't Believe How This Tool..."
- "The Ultimate Guide to..."
- "Why X is the Future of Y"
- Questions designed to provoke clicks

### 5. Code Examples

Code should:
- Be complete enough to understand
- Include comments explaining non-obvious parts
- Show the interesting implementation, not just API usage
- Be properly formatted with language hints

### 6. What Makes HN Posts Succeed

- **Technical novelty**: Something genuinely new or interesting
- **Hard-won insights**: Lessons from real experience
- **Honest failure stories**: What went wrong and why
- **Deep dives**: Thorough exploration of a narrow topic
- **Show your work**: Methodology and data, not just conclusions

## Output

Save the blog to `blogs/<topic-name>-hn.md`.

## Checklist Before Finishing

- [ ] Title is descriptive, not clickbait
- [ ] Technical depth is sufficient for HN audience
- [ ] Limitations are honestly discussed
- [ ] Code examples explain HOW, not just WHAT
- [ ] No marketing language or hype
- [ ] Alternatives are acknowledged
- [ ] Claims are backed by evidence or data

Now research **$ARGUMENTS** and write the blog post.
