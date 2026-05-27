# Angular Migration Plan (v16 → v17)

## Overview
This plan covers the atomic migration from Angular v16 to v17 for this workspace. All steps are strictly limited to this version jump. No cross-version dependencies are included.

## Migration Phases
1. **Assessment**
   - Analyze `package.json`, `angular.json`, `tsconfig.json` for legacy patterns and outdated dependencies.
   - Scan core files (`main.ts`, `app.module.ts`, key components) for deprecated APIs.
   - Output: `report/assessment_report.md` checklist.

2. **Planning**
   - Decompose assessment findings into a phased roadmap.
   - Group issues into: Core Updates, Dependency Fixes, Refactoring.
   - Assign risk levels and validation gates for each phase.

3. **Implementation**
   - Update all `@angular/*` dependencies to v17 using `ng update`.
   - Apply required code/config refactors for v17 compatibility.
   - Run `ng build` after each major change.
   - If build fails, attempt fixes or rollback.

4. **Validation**
   - Ensure build and tests pass (`ng build`, `ng test`).
   - Document any remaining migration warnings as explicit follow-ups.

5. **Checkpoint**
   - Run `git status`, commit, and push after successful migration.
   - Tag: `v17-stable`.

## Rollback Procedure
- If any high-risk step fails, revert to previous commit/tag.
- Document rollback trigger and recovery steps in `report/migration_report.md`.

## Success Criteria
- All Angular packages at v17.
- Build and tests pass with no critical migration warnings.
- All code/config changes documented in `docs/documentation.md`.
- Git checkpoint created and pushed.

## Validation Gates
- `ng build` must succeed.
- `ng test` must pass all tests.
- Manual verification of migrated features/components.

## File Changes
- Only files modified for v16→v17 are listed in `report/migration_report.md`.

## Next Version Statement
Upon success, proceed to `plan/migration_v17_to_v18.md` (not in scope for this run).
