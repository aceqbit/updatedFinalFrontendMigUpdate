## Active Migration (v16 → v17)

This documentation focuses on the active, atomic migration from Angular v16 to v17. Historical multi-version notes are retained below and marked as historical.

**Summary (v16 → v17)**
- **Total number of components present:** 20
- **Total number of components migrated (documented):** 20
- **Total number of components pending documentation:** 0
- **Migration completion percentage:** 100%
- **Spec files present:** 20

**What changed**
- Updated `@angular/*` dependencies to v17 in `package.json`.
- Aligned `zone.js` to `~0.14.0` to satisfy Angular 17 peer dependencies.
- Updated `typescript` to `~5.3.0`.
- Fixed unit tests: replaced `imports: [Component]` with `declarations: [Component]`, added `FormsModule` to specs that use `ngModel`, and added `CUSTOM_ELEMENTS_SCHEMA` where needed.

**Validation**
- `ng build`: Success
- `ng test`: All specs passed locally (21 of 21)

**Checkpoint**
- Created and pushed migration branch: `migration/v16-to-v17-local-20260527` (remote). The original remote branch/tag had conflicting history; a new branch was created to publish the migration snapshot.

**Notes & Recommendations**
- Resolve remote branch/tag divergence in the main repository if required (review and merge the migration branch, then optionally update `v17-stable` tag).
- Run CI on the remote branch to validate environment-specific issues (browsers, headless runners).

---

## Historical Multi-Version Notes (retained)

The sections below are historical notes retained from previous plan drafts. They describe multi-version migration guidance but are not the active workflow in this workspace.

# Migration Documentation: Angular 16 to 21

This document records the steps and changes made during prior multi-version migration experiments (v16→v21). These entries are preserved for audit and reference only.

## Historical Summary
The historical process recorded multi-version migration steps and is not the active plan for this run.

## Lessons Learned (Historical)
- The incremental migration approach was effective in isolating issues at each step.
- The `ng update` command automates many migration tasks but requires a clean working tree.
- Unit tests should be run early and often; test harness changes between major Angular versions can require test updates.

---

## Active Migration (v20 → v21) — Completed

This section documents the completed Angular v20 → v21 migration.

- **Start date:** 2026-05-28
- **Completion date:** 2026-05-28
- **Status:** completed

- **Total number of components present:** 19
- **Total number of components migrated:** 19
- **Migration completion percentage:** 100%

**Validation**
- `ng build --configuration=production`: Success (with non-blocking warnings)
- `ng test --watch=false`: All specs passed (21 of 21)

**Checkpoint**
- Authoritative commit: `chore(migration): complete Angular v21` — recorded in [report/migration_report.md](report/migration_report.md)

See `report/migration_report.md` for a full migration summary and links to per-agent reports.
