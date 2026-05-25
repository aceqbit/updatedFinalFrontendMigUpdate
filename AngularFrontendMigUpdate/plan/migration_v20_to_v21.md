# Migration Plan: Angular v20 → v21 (Atomic)

## Purpose
This per-version plan focuses on a single atomic jump from Angular 20 to Angular 21. Follow the phases below and validate at each gate.

## Phases

1. Pre-flight (Inventory & Backup)
   - Run assessment to populate project inventory and export `report/assessment_report.md`.
   - Create a migration branch and a working checkpoint tag (pre-migration snapshot).

2. Core Angular Alignment
   - Align all `@angular/*` packages to the target v21 versions.
   - Upgrade `@angular/cli` and `@angular-devkit/build-angular` as required.
   - Upgrade TypeScript to the required v21-compatible release.
   - Run `npm install` (clean workspace: remove `node_modules` and lockfiles if necessary).

3. Third-Party Library Updates
   - Update and verify critical third-party libraries.
   - Address peer dependency conflicts (document any `--force` or `--legacy-peer-deps` usage).

4. Zone & Change Detection Fixes (P0)
   - For each component flagged by assessment, fix polling/timer/async mutation patterns:
     - Option A: `ChangeDetectorRef.markForCheck()` after mutation, or
     - Option B: wrap in `NgZone.run()` to run updates inside Angular's zone.
   - Verify each fix with a targeted `ng build` and small visual check.

5. CSS Modernization
   - Apply CSS agent recommendations: tokenization, gradient consolidation, responsive/sizing rules, and asset path fixes.
   - Run a visual smoke validation for major UI surfaces.

6. Testing & Validation
   - Run `ng build` (production) and `ng test -- --watch=false`.
   - Run targeted spec suites for modified components.
   - Generate `report/test_report.md` with pass/fail and coverage deltas.

7. Final Checkpoint & Push
   - Commit and push migration changes.
   - Create and push tag `v21-stable`.
   - Generate final `report/migration_report.md` and `docs/documentation.md` entries.

## Validation Gates
- Gate 1: `ng build` (no blocking errors)
- Gate 2: `ng test` (critical specs passing)
- Gate 3: Visual smoke checks for high-risk components

## Outputs
- `plan/migration_v20_to_v21.md` (this file)
- `report/assessment_report.md`, `report/implementation_log.md`, `report/css_report.md`, `report/test_report.md`, `report/migration_report.md`
- Git tag: `v21-stable` on success

## Success Criteria
- Build success, targeted tests pass for modified components, no unaddressed zone/change-detection defects, and visual parity for core flows.

## Rollback
- If unrecoverable failure occurs, revert to `v20-stable` tag and re-evaluate the failing step.

---

## Active Automation Policy (APPEND ONLY)
- **Active Scope:** This plan is the authoritative, atomic plan for migrating this repository from Angular v20 → v21 only. When `implement the migration plan` is invoked, the automation MUST execute the full pipeline start-to-finish for the v20→v21 jump.
- **Autonomous Execution Steps:** The automated run MUST perform, in sequence, without human prompts:
   1. Run the `Assessment Agent` to generate `report/assessment_report.md` and a full project inventory.
   2. Run the `Planning Agent` to produce `plan/migration_v20_to_v21.md` (this file) and any per-component checklists.
   3. Run the `Implementation Agent` to apply changes, accepting and persisting file modifications.
   4. Run `npm install` (clean workspace if needed), `ng build` (production), and `ng test -- --watch=false`.
   5. If all gates pass, run `git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v21"`, `git push origin HEAD`, `git tag v21-stable`, `git push origin v21-stable`.
   6. Generate final reports: `report/implementation_log.md`, `report/test_report.md`, `report/css_report.md`, and `report/migration_report.md`.
- **No User Intervention:** The automation MUST resolve optional CLI prompts automatically by choosing the recommended/default option. It MUST NOT pause for interactive user input at any step.
- **Stop Condition:** The automated run must stop only after the migration to `v21` is fully completed and the `v21-stable` tag has been pushed to the remote. If a fatal, unrecoverable error occurs that cannot be resolved by the automated recovery steps, the agent must record the blocker and the next recovery move and then halt.

## Progress Update (to be recorded)
- **Progress update:** package files updated and timer-based components fixed to trigger change detection.
- **Next actions (options):**
   - Option A (recommended): Run `npm install`, `ng build`, and `ng test -- --watch=false`, then create the git checkpoint `v21-stable`.
   - Option B: Produce `plan/migration_v20_to_v21.md` per-component checklist and iterate component-by-component.

> NOTE: This progress update and these options must be recorded in the implementation memory and appended to `report/implementation_log.md` automatically when `implement the migration plan` is invoked.
