# Migration Plan Index (v19→v20 Only)

This master index lists the atomic migration plan for the current active version jump: **Angular 19 → 20**.

## Migration Plans
- [migration_v19_to_v20.md](migration_v19_to_v20.md): Complete, atomic plan for migrating from Angular 19 to Angular 20. No other version jumps are in scope.

## Execution Policy
- Only the v19→v20 migration is permitted. All agents, plans, and reports must reference this single version jump.
- Each plan is atomic and independent. No cross-version dependencies.
- After successful migration, run `git status`, commit, and push to main. Do NOT create or push tags.
- If migration fails, rollback to the previous commit checkpoint.

## Next Step
- Upon successful completion of v19→v20, update this index to reflect the next migration phase (if any).