# Migration Plan: Angular 17 → 18 (Focused)

This repository uses per-version, atomic migration plans. The active, focused plan for the immediate work is the Angular 17 → 18 plan linked below.

- Master index: this file (entry point for version plans)
- Historical completed plan: [plan/migration_v16_to_v17.md](plan/migration_v16_to_v17.md)
- Active version-specific plan: [plan/migration_v17_to_v18.md](plan/migration_v17_to_v18.md)

Guiding principles:

- Run one version migration at a time (atomic, checkpointed).
- Create a git checkpoint before making changes and push after validation.
- Use `ng update` where available and prefer small, verifiable steps.
- Resolve optional prompts automatically using the recommended/default choice.
- End every successful run with `git status`, `git add -A`, `git commit`, `git push`, and the stable tag push for the target version.
- Flag polling/timer code and async callbacks for explicit change-detection fixes.

See [plan/migration_v17_to_v18.md](plan/migration_v17_to_v18.md) for the full step-by-step checklist, validation gates, rollback instructions, and per-component review list.

---

# Planned Migration: Angular v20 → v21 (Draft)

- Plan file: [plan/migration_v20_to_v21.md](plan/migration_v20_to_v21.md)
- Purpose: Atomic, single-version jump from Angular 20 to Angular 21.
- Validation gates: build, tests, and visual smoke checks as described in the plan file.

This entry is a draft index record for the v20→v21 plan. The plan file itself contains the phased steps, validation gates, and rollback guidance required for an autonomous implementation.
