# Repo

https://github.com/quochuydev/workflow

# Title

How I Built a Documentation-Driven Development Workflow with Claude Code

# Tags

claudeai, productivity, devops, opensource

# Body

Ever had a PM write requirements in Slack, a developer interpret them differently, and QA test against something else entirely? I got tired of this chaos, so I built a workflow that makes documentation the single source of truth—and Claude Code does the heavy lifting.

## The Problem

In most teams:

- PM writes requirements somewhere (Notion, Jira, Google Docs)
- Developer reads it, makes assumptions, builds something
- QA tests against... what exactly?
- Bugs get filed, fingers get pointed

The documentation drifts from reality. Nobody knows what's correct anymore.

## The Solution: Docs as Code

What if the spec file **is** the source of truth, and AI reads it directly?

```
PM/BA: /write-spec user-export     → creates docs/user-export/spec.md
Dev:   /develop-feature user-export → Claude reads spec, builds feature
```

That's it. No telephone game. Claude reads the same spec the PM wrote.

## How It Works

1. **PM runs `/write-spec`** - Claude asks questions, generates structured spec
2. **Dev runs `/develop-feature`** - Claude reads the spec, builds with full context
3. **GitHub Actions notify** - Team stays in sync when specs change

No back-and-forth. No "what did you mean by X?"

## Get Started in 30 Seconds

```bash
npx create-ai-team
```

This scaffolds:

- `.claude/commands/` - The workflow commands
- `docs/example-feature/spec.md` - A template to follow
- `.github/workflows/` - Optional automation

## The Commands

| Command            | Who   | What                                |
| ------------------ | ----- | ----------------------------------- |
| `/write-spec`      | PM/BA | Create spec via guided conversation |
| `/develop-feature` | Dev   | Build feature from spec             |
| `/fix-issue`       | Dev   | Fix bugs with doc context           |
| `/trace-flow`      | Dev   | Understand code flow                |

## Why This Works

1. **Single source of truth** - The spec file is canonical
2. **AI reads context** - No copy-pasting requirements into prompts
3. **Structured format** - Mermaid diagrams, error codes, test cases
4. **Version controlled** - Specs live in git, changes are tracked

## Try It

If you're tired of requirements getting lost in translation, give it a shot:

```bash
npx create-ai-team
```

Then run `/write-spec my-feature` and see how it feels to have AI understand your full context.

---

> **GitHub**: [github.com/quochuydev/workflow](https://github.com/quochuydev/workflow)
>
> **Docs**: [quochuydev.github.io/workflow](https://quochuydev.github.io/workflow/)

---

What's your current workflow for keeping specs and code in sync? I'd love to hear how other teams handle this.

# Image capture for blog

| Image             | Where in Post              | What to Capture                                                |
| ----------------- | -------------------------- | -------------------------------------------------------------- |
| Flow diagram      | After "The Solution"       | The Mermaid flowchart from docs-site intro.md                  |
| Spec example      | After "Get Started"        | A real spec.md file in your editor                             |
| Command in action | After "The Commands" table | Terminal screenshot of /write-spec or /develop-feature running |
| Folder structure  | After scaffolding section  | VS Code sidebar showing .claude/commands/ and docs/            |

# Banana AI banner prompt

Minimalist illustration showing a glowing document/spec file in the center with three figures around it (PM, Developer, QA) all connected by lines to the same document. Represents single source of truth concept. Clean flat design, blue and teal color palette with white accents. Subtle code/markdown patterns in background. Modern SaaS aesthetic, no text.
