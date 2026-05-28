# Migration Plan: Angular 19 → 20

## Purpose
This atomic plan describes the exact steps to migrate the workspace from Angular 19 to Angular 20.

## Scope
- Single-version migration: v19 → v20 only.
- Do not modify other version plans.

## Phases
1. Pre-migration: backup workspace state and record current dependency versions.
2. Dependency update: align all `@angular/*` packages to v20 and update TypeScript if required.
3. Code migration: apply required code changes and lint fixes for v20 compatibility.
4. Build & test: run `ng build --configuration production` and `ng test --watch=false`.
5. Fixes: triage test/build failures starting with the smallest changed areas.
6. Finalize: create git checkpoint commit and push to `origin main`.

## Validation Gates
- Gate 1: `npm install` completes without unresolved peer dependency errors.
- Gate 2: `ng build --configuration production` completes with exit code 0.
- Gate 3: `ng test --watch=false` completes with zero failing tests (or documented, triaged failures).

## Rollback Procedure
- If any gate fails and cannot be resolved in 3 retries, revert to the pre-migration commit.
- Use `git checkout -- .` to discard working-tree changes and `git reset --hard <pre-migration-commit>` if necessary.

## Automated Options
- If Angular prompts appear (schematics, migrations), select the recommended/default option automatically.

## Git Checkpoint Message
- Use a conventional commit: `chore(migration): complete Angular v20`

## Files Likely To Be Edited
- `package.json`
- `tsconfig.json` / `tsconfig.app.json`
- Source files under `src/app` where deprecated APIs or changed typings exist

## Success Criteria
- All validation gates pass.
- A checkpoint commit is created and pushed to `origin main` with the message above.

## Notes
- This plan is intentionally conservative: fix the smallest units first, run focused tests, then widen the scope.
# Migration Plan: Angular 19 → 20

**Scope:** This plan covers ONLY the migration from Angular 19 to Angular 20. No other version jumps are included.

## Phase Breakdown
1. **Pre-Migration Cleanup**
   - Remove `node_modules` and `package-lock.json`.
   - Run `npm cache clean --force`.
   - Reinstall dependencies with `npm install --force --legacy-peer-deps`.
2. **Core Angular Update**
   - Run `ng update @angular/core@20 @angular/cli@20 --force`.
   - Ensure all `@angular/*` packages are aligned to v20 in `package.json`.
3. **TypeScript & Third-Party Updates**
   - Upgrade TypeScript to the version required by Angular 20.
   - Update third-party dependencies for compatibility.
   - Address peer dependency warnings.
4. **Configuration & Code Refactor**
   - Update `tsconfig.json` (`moduleResolution: "bundler"` if required).
   - Refactor bootstrapping in `main.ts` if needed.
   - Ensure all polling/timer/callback-based components use `ChangeDetectorRef.markForCheck()` or `NgZone.run()` after mutations.
   - Migrate CSS for builder compatibility and modern standards.
5. **Validation Gates**
   - Run `ng build` and ensure a successful build.
   - Run `ng test --watch=false` and ensure all tests pass.
   - Validate visual-critical components and styles.
6. **Git Checkpoint**
   - Run `git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v20"`, and `git push origin main`.
   - Record the commit hash and message as the migration checkpoint.

## Rollback Triggers & Procedures
- If any validation gate fails, halt migration and rollback to the previous commit checkpoint.
- For critical failures, create a `migration-failure/` branch for diagnostics.

## Success Criteria
- All validation gates pass (build, test, style, runtime checks).
- Migration checkpoint is committed and pushed to main.

## File Changes
- Only files modified for v19→v20 are included in this plan.

## Next Version Statement
- Upon success, update the master index for the next migration phase (if any).