# Repo

https://github.com/quochuydev/cc-plan-mode

# Title

How I Built a Plan-Based Development Workflow for Claude Code

# Tags

claudeai, productivity, opensource, devtools, automation

# Body

Ever started a feature, gotten halfway through, then realized you forgot a critical dependency? Or had Claude Code build something, only to realize the tasks were done in the wrong order? I got tired of managing complex features in my head, so I built a plugin that brings structured planning directly into Claude Code.

## The Problem

When building features with AI assistance:

- You explain the feature, Claude starts coding, but forgets earlier context
- Multi-step tasks get jumbled—tests written before the code they test
- You lose track of what's done vs. what's pending
- Dependencies between tasks aren't respected (middleware before routes, etc.)
- Context switching kills momentum—you forget where you left off

## The Solution: Plan-Mode

What if you could define your entire feature as a dependency graph, and have Claude execute it step-by-step?

```
You:    /plan JWT Authentication
Claude: Creates .claude/plans/jwt-authentication.md with 6 tasks
You:    /plan-execute jwt-authentication
Claude: Executes next available task respecting dependencies
```

That's it. Structured planning meets AI execution.

## How It Works

1. **Create a plan** - `/plan <feature>` generates a YAML-based plan with tasks and dependencies
2. **Track progress** - `/plan` shows all plans with completion metrics
3. **Execute systematically** - `/plan-execute <name>` runs the next available task
4. **Manual control** - `/plan-update <name> [id] [status]` lets you adjust as needed

Plans live in your repo at `.claude/plans/`, versioned with your code.

## Get Started in 30 Seconds

```bash
/plugin marketplace add quochuydev/cc-plan-mode
/plugin install plan-mode@cc-plan-mode
```

This adds:
- `/plan` command - View and create structured plans
- `/plan-execute` command - Run tasks sequentially with dependency awareness
- `/plan-update` command - Manually adjust task status

## Commands

| Command | Purpose | Example |
| ------- | ------- | ------- |
| `/plan` | List all plans with progress | Shows completion % per plan |
| `/plan <desc>` | Create new plan | `/plan user authentication` |
| `/plan-execute <name>` | Execute next task | `/plan-execute auth-system` |
| `/plan-update <name> [id] [status]` | Update task status | `/plan-update auth-system 3 completed` |

## Plan Format

Plans use YAML frontmatter for clean structure:

```yaml
---
name: jwt-authentication
overview: Add JWT-based authentication to the API
todos:
  - id: 1
    content: Install jsonwebtoken and bcrypt dependencies
    status: pending
  - id: 2
    content: Create User model with password hashing
    status: pending
    dependencies: [1]
  - id: 3
    content: Implement auth middleware
    status: pending
    dependencies: [2]
---
```

## Why This Works

1. **Dependency awareness** - Tasks execute in the right order, always
2. **Persistent state** - Plans survive across sessions, stored in your repo
3. **Clear visibility** - See exactly what's done, what's next, what's blocked
4. **AI-native execution** - Claude understands context from the plan file

## Try It

If you're building multi-step features with Claude Code and want more structure:

```bash
/plugin marketplace add quochuydev/cc-plan-mode
/plugin install plan-mode@cc-plan-mode
```

Then run `/plan my-feature` and watch it break down your feature into manageable, ordered tasks.

---

> **GitHub**: [quochuydev/cc-plan-mode](https://github.com/quochuydev/cc-plan-mode)

---

How do you currently manage complex, multi-step features when working with AI assistants? I'd love to hear what workflows have worked for your team.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Plan list output | After "How It Works" | Terminal showing `/plan` command with multiple plans and completion percentages |
| Plan YAML file | After "Plan Format" | VS Code showing a `.claude/plans/feature.md` file with YAML frontmatter |
| Execute in action | After "Commands" table | Terminal showing `/plan-execute` running a task with Claude's response |
| Folder structure | After installation | VS Code sidebar showing `.claude/plans/` directory with plan files |
