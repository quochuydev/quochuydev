{{ ... }}
Sync Impact Report

- Version change: N/A → 1.0.0
- Modified principles: Added initial set
- Added sections: Core Principles (4), Technology Stack & Architecture Constraints, Development Workflow & Quality Gates, Governance
- Removed sections: Placeholder Principle 5 and generic placeholder sections
- Templates requiring updates:
  .specify/templates/plan-template.md (footer: version/path reference)
  .specify/templates/spec-template.md (reviewed: no edits needed)
  .specify/templates/tasks-template.md (reviewed: no edits needed)
- Follow-up TODOs: None
  -->

# Video Call App Constitution

{{ ... }}

- Avoid client-side waterfalls; prefer server components, streaming, and data prefetching; measure with Web Vitals in CI.
- Profiling MUST precede optimization; add tracing/metrics for hot paths; regressions block release.
  Rationale: Performance is a product feature that directly impacts engagement and UX.

## Development Workflow & Quality Gates

- PR checklist MUST verify: types pass (`tsc --noEmit`), lint passes, a11y checks pass, performance budgets not regressed.
- Code review: at least one reviewer approval; architectural changes require a brief ADR captured in `/docs/adr/`.
- Release gates: no high/critical security findings; performancebudgets met; error rates within SLOs; docs updated.

## Governance

- This Constitution supersedes other ad-hoc practices for this repository.
- Amendments: propose via PR including rationale, impact, and migration plan; require maintainer approval.
- Versioning Policy: Semantic Versioning for this document.
  - MINOR: add/expand principles or guidance.
  - PATCH: clarifications and non-semantic edits.
- Compliance Review: All PRs MUST include a Constitution Check section in the plan/spec and be verified during code review and CI gates.

**Version**: 1.0.0 | **Ratified**: 2025-09-25 | **Last Amended**: 2025-09-25
