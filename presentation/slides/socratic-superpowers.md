---
theme: seriph
background: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920
title: Socratic Method & Superpowers
info: |
  How ancient questioning techniques power modern AI coding workflows
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
themeConfig:
  primary: '#DA7756'
---

# Socratic Method & Superpowers

How ancient questioning techniques power modern AI coding workflows

<div class="pt-12">
  <span class="px-2 py-1 rounded text-sm" style="background: #DA7756; color: white;">
    AI-Assisted Development
  </span>
</div>

---

# Agenda

<v-clicks>

- **The Problem** — Why AI coding often fails
- **Socratic Method** — 2,500 year old questioning technique
- **Superpowers** — Skills library for Claude Code
- **The Connection** — How brainstorming applies Socratic dialogue
- **Example** — Real workflow in action

</v-clicks>

---
layout: center
---

# The Problem

<v-clicks>

## "Jump to Code" Syndrome

When AI starts coding before understanding the problem

```
User: "I need an email validator"

AI: *immediately writes 50 lines of regex*

Result: Wrong solution, wasted effort
```

**Missing:** Requirements, edge cases, user context

</v-clicks>

---

# What is Socratic Method?

<v-clicks>

**Origin:** Greek philosopher Socrates (470-399 BCE)

**Core idea:** Guide discovery through questions, not answers

Socrates called himself a "midwife" — helping others birth their own understanding

</v-clicks>

<v-clicks>

| Principle | Meaning |
|-----------|---------|
| **Elenchus** | Cross-examine beliefs |
| **Aporia** | Recognize contradictions |
| **Humility** | "I know that I know nothing" |
| **Dialogue** | Joint pursuit of truth |

</v-clicks>

---

# 6 Types of Socratic Questions

<v-clicks>

1. **Clarification** — "Can you explain further?"

2. **Probing assumptions** — "What are you assuming here?"

3. **Probing evidence** — "What supports that claim?"

4. **Alternative viewpoints** — "Are there other perspectives?"

5. **Implications** — "If that's true, then what?"

6. **Meta questions** — "Why is this question important?"

</v-clicks>

---

# What is Superpowers?

<v-clicks>

**A skills library for Claude Code** by Jesse Vincent

20+ battle-tested skills for professional AI coding

</v-clicks>

<v-clicks>

```
Main Workflow:

  /brainstorm     →  Socratic design refinement
       ↓
  /write-plan     →  Detailed implementation tasks
       ↓
  /execute-plan   →  Batch execution with checkpoints
```

**Key principle:** Think before coding. Always.

</v-clicks>

---

# The Brainstorming Skill

<v-clicks>

**Purpose:** Transform rough ideas into complete designs

**How it works:**

1. Understand project context (autonomous research)

2. Ask **one question at a time** — don't overwhelm

3. Explore **2-3 alternatives** before deciding

4. Present design in small chunks (200-300 words)

5. Validate each part before continuing

**Output:** Design document ready for implementation

</v-clicks>

---

# Socratic ↔ Superpowers Mapping

<v-clicks>

| Socratic Method | Superpowers Brainstorming |
|-----------------|---------------------------|
| Clarifying questions | "What are you trying to build?" |
| Probing assumptions | "What cases need handling?" |
| Explore alternatives | "Here are 2-3 approaches..." |
| Incremental validation | Present design section by section |
| Aporia → Understanding | User discovers real requirements |

**Result:** User "owns" the solution because they contributed to it

</v-clicks>

---

# Example: Email Validator

<v-clicks>

```
User: "I need an email validator"

Claude (using brainstorming skill):

├── "What types of emails do you need to validate?"
│   └── Standard? Subdomains? Internationalized?
│
├── "Do you need to support '+' addressing?"
│   └── e.g., user+tag@example.com
│
├── "How strict should validation be?"
│   └── RFC 5321 compliance vs practical?
│
└── "Output format?"
    └── Boolean, error message, or parsed parts?

→ Result: Detailed design with identified edge cases
```

</v-clicks>

---
layout: center
---

# Key Takeaways

<v-clicks>

**1.** Socratic method = Guide through questions, not answers

**2.** Superpowers = Professional skills for AI coding

**3.** Brainstorming skill applies Socratic dialogue

**4.** Think before coding — always

</v-clicks>

<div v-click class="pt-8">

**Resources:**

- [Superpowers GitHub](https://github.com/obra/superpowers)
- [Socratic Method - Wikipedia](https://en.wikipedia.org/wiki/Socratic_method)

</div>
