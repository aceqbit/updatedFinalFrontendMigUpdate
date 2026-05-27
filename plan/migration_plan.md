# Migration Plan Index

This index lists the single, atomic migration plan for this workspace. The implementation agent MUST execute the referenced plan in full and perform the canonical checkpoint (commit + push to `main`) on success.

- `plan/migration_v18_to_v19.md` — Angular 18 → 19 migration plan (atomic). See the file for phases, validation gates, rollback procedures, and outputs.
