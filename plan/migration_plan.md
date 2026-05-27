# Migration Plan Index

This workspace uses atomic, per-version migration plans. Only the v17→v18 migration is active.

## Migration Sequence
1. [v17→v18 Migration Plan](migration_v17_to_v18.md)

## Instructions
- Each migration plan is executed and validated independently.
- After each migration, a git checkpoint is created and pushed.
- Do NOT attempt multi-version jumps in a single run.
- Only proceed to the next version after explicit instruction.
