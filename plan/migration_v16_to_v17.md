# Migration Plan: Angular v16 → v17

## Target Version
Angular 16 → 17 (atomic, independent plan)

## Phase Breakdown
1. **Assessment**
   - Audit `package.json`, `angular.json`, `tsconfig.json` for v16 patterns.
   - Scan `main.ts`, `app.module.ts`, and all components for deprecated APIs.
2. **Core Updates**
   - Update all `@angular/*` and related dependencies to v17 using `ng update`.
   - Update CLI/devkit/build tools to v17.
3. **Refactoring**
   - Refactor code for v17 compatibility (standalone components, signals, etc. if required).
   - Update configuration files as needed.
4. **Validation Gates**
   - Run `ng build` and `ng test` after each major change.
   - Document and fix all migration warnings or assign explicit follow-ups.
5. **Rollback Triggers & Procedures**
   - If build/test fails, revert to previous commit/tag.
   - Document rollback in `report/migration_report.md`.
6. **Git Checkpoint Name**
   - `v17-stable`
7. **Success Criteria**
   - All Angular packages at v17.
   - Build/tests pass, no critical migration warnings.
   - All changes documented in `docs/documentation.md`.
8. **File Changes**
   - Only files modified for v16→v17 are listed in `report/migration_report.md`.
9. **Next Version Statement**
   - Upon success, proceed to `plan/migration_v17_to_v18.md` (not in scope).
