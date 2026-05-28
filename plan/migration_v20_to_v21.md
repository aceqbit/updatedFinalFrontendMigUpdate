# Angular 20 → 21 Migration Plan (Atomic)

## Executive Summary
Scope: Single-version migration from Angular 20 → Angular 21. This atomic plan contains phased tasks, validation gates, rollback guidance, and the mandatory commit-only checkpoint procedure.

Primary outputs produced by this plan:
- `report/assessment_report.md` (assessment input)
- `report/implementation_log.md` (implementation agent log)
- `report/test_report.md` (unit testing results)
- `report/css_report.md` (style modernization)
- `docs/documentation.md` (final docs)
- Authoritative checkpoint commit on `main`: `chore(migration): complete Angular v21`

## Preconditions (must be verified before implementation)
- Working Git copy on `main` with no uncommitted changes (or stash/commit locally).
- Backup: create a lightweight local branch for diagnostics only (optional), but do NOT treat it as a checkpoint.
- CI/Runner: If available, have a CI runner to validate build/test steps in parallel.

## Phase 0 — Assessment (MUST)
Objective: Produce `report/assessment_report.md` and a complete project inventory.
Tasks:
- Run the Assessment Agent to scan `package.json`, `angular.json`, `tsconfig.json`, and `src/` for:
  - `@angular/*` version parity
  - TypeScript version compatibility (target TypeScript `~5.9.3`)
  - `moduleResolution` (recommend `bundler` if required)
  - `main.ts` bootstrap shape (`bootstrapModule` vs `bootstrapApplication`)
  - Zone/Change Detection risks: locate `setInterval`, `setTimeout`, async callbacks that mutate state and check for `ChangeDetectorRef.markForCheck()` or `NgZone.run()` usage.
- Produce `report/assessment_report.md` with a per-component inventory and a `Zone/Change Detection Risks` section containing file paths and line references for each risk.

Validation Gate: `report/assessment_report.md` exists and lists all components found under `src/app`.

## Phase 1 — Prep & Clean (S)
Objective: Ensure a deterministic workspace and lock necessary versions.
Tasks:
- Run `npx rimraf node_modules package-lock.json` (Windows-safe) and `npm cache clean --force`.
- Run `npm install` to get clean installs.
- Snapshot `package.json` and `package-lock.json` for later diff in `report/implementation_log.md`.

Commands (automation):
- `npx rimraf node_modules package-lock.json`
- `npm cache clean --force`
- `npm install --legacy-peer-deps --force`

Validation Gate: `npm install` completes without unexplained failures; if peer-dep errors persist, record and proceed per Implementation Agent rules.

## Phase 2 — Core Angular & Tooling Update (M)
Objective: Align all `@angular/*` packages and TypeScript to required Angular 21-compatible versions.
Tasks:
- Update Angular core packages:
  - `npx ng update @angular/core@21 @angular/cli@21 --force`
  - Verify `package.json` lists `@angular/*`@21 and update others (`@angular/router`, `@angular/common`, etc.).
- Update TypeScript to `~5.9.3`:
  - `npm install --save-dev typescript@~5.9.3 --legacy-peer-deps --force`
- Update `tsconfig.json` as required (e.g., `moduleResolution: "bundler"` if needed by project).

Validation Gate: `ng build` (local partial build) succeeds for core modules.

## Phase 3 — Third-Party Dependencies (M-L)
Objective: Update third-party libraries and resolve peer dependencies.
Tasks:
- For each third-party library flagged in `report/assessment_report.md`, find compatible versions and update them.
- For peer dependency blockers, use `npm install --legacy-peer-deps --force` as a fallback and document which packages required force flags.
- Re-run targeted builds for features that depend on updated libraries (e.g., Angular Material components, date pickers).

Validation Gate: Application compiles; critical feature smoke tests pass.

## Phase 4 — Code Fixes (L)
Objective: Fix breaking API changes, DI/subpath issues, and zone/change-detection defects.
Tasks:
- Replace deprecated API usages flagged by `ng update` or the Assessment Agent.
- Bootstrapping changes: adapt `main.ts` to `bootstrapApplication` or `bootstrapModule` correctly per project architecture.
- Zone & Change Detection fixes (P0):
  - For each flagged component using timers or async callbacks, apply either:
    - Inject `ChangeDetectorRef` and call `markForCheck()` after mutations, or
    - Wrap mutations in `this.ngZone.run(() => { ... })`.
  - Add focused unit tests that mock timers to verify template updates.
- Structural templates and `@for/@if` control flow: replace function-call-based iterables with cached properties and use `trackBy` for performance and stability.

Validation Gate: `ng build --configuration=production` completes; per-component smoke checks for flagged components pass.

## Phase 5 — CSS Modernization (M)
Objective: Migrate legacy Sass, fix shadow-piercing selectors, and ensure assets paths remain valid.
Tasks:
- Convert `node-sass` usages to `dart-sass` where needed.
- Replace `/deep/` and `>>>` with `::ng-deep` or CSS variables where appropriate.
- Validate critical UI components visually (Calendar, Scheduler, Data Grid, Sticky Notes).

Validation Gate: Visual smoke tests for critical components; `report/css_report.md` generated.

## Phase 6 — Testing & QA (M)
Objective: Run targeted specs for changed areas then full suite; capture `report/test_report.md`.
Tasks:
- Run focused specs for refactored components first:
  - `ng test --include=path/to/changed.spec.ts --watch=false`
- If focused specs pass, run full suite: `ng test --watch=false`.
- Collect coverage and map failing specs to components.

Validation Gate: All critical specs pass; failing tests are documented and triaged.

## Phase 7 — Final Validation & Checkpoint (S)
Objective: Perform final build, tests, and create authoritative checkpoint commit on `main`.
Tasks:
- Final commands (automation):
  1. `npm install`
  2. `ng build --configuration=production`
  3. `ng test -- --watch=false` (or targeted specs strategy)
  4. `git status`
  5. `git add -A`
  6. `git commit -m "chore(migration): complete Angular v21"`
  7. `git push origin HEAD`
- Record the short commit hash as `git_checkpoint_commit` in `report/implementation_log.md` and `report/migration_report.md`.

Validation Gate: Build and tests passed; push succeeded.

## Rollback Strategy
- Preferred non-destructive rollback: `git revert <checkpoint-commit>` to undo the migration commit if needed.
- Emergency "Nuke and Pave" (last resort):
  1. `git stash` (if needed) or ensure working tree is saved
  2. `git reset --hard <previous-good-commit>`
  3. `npx rimraf node_modules package-lock.json dist`
  4. `npm install`
- Document any rollback in `report/implementation_log.md` with the reason and commands used.

## Acceptance Criteria
- `ng build --configuration=production` completes without errors.
- Key runtime flows and flagged components render and behave correctly.
- Unit tests for changed areas pass; overall suite has no new critical failures.
- `git_checkpoint_commit` recorded in reports and pushed to `origin`.

## Outputs & Artifacts
- plan/migration_v20_to_v21.md (this document)
- report/assessment_report.md
- report/implementation_log.md
- report/test_report.md
- report/css_report.md
- docs/documentation.md
- report/migration_report.md

## Notes & Constraints
- All agent behaviors (automatic prompt selections, append-only updates, commit-only checkpoint policy) must be respected.
- Avoid creating tags as migration checkpoints. Use commit messages and the short hash only.

---

Approved by: Planning Agent
Generated: automated (after analyzing agents)
