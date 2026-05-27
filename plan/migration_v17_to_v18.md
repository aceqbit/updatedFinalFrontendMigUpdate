# Angular Migration Plan: v17 → v18

## Scope
This plan covers ONLY the migration from Angular v17 to v18 for this workspace. All steps are atomic and must be completed before any further migration is considered.

## Phases

### 1. Pre-Migration Assessment
- [ ] Review `package.json` for all `@angular/*` dependencies and ensure they are at v17.
- [ ] Audit `angular.json`, `tsconfig.json`, and core files for legacy patterns.
- [ ] Document any migration-related build warnings for explicit cleanup.

### 2. Dependency & CLI Update
- [ ] Run `npx ng update @angular/core@18 @angular/cli@18 --force`.
- [ ] If peer dependency errors occur, retry with `npm install --legacy-peer-deps`.
- [ ] Clean workspace if errors persist: `npx rimraf node_modules package-lock.json`, `npm cache clean --force`, `npm install`.

### 3. Code Refactor & Feature Adoption
- [ ] Refactor code for v18 compatibility (Signals, `@if/@for`, `inject()` if applicable).
- [ ] Update bootstrapping in `main.ts` if required by v18.
- [ ] Apply minimal CSS refactors for builder compatibility.

### 4. Validation Gates
- [ ] Run `npx ng build` and ensure a successful build.
- [ ] Run `npx ng test --watch=false --browsers=ChromeHeadless` and ensure all tests pass.
- [ ] Document and fix any migration-related build/test warnings or errors.

### 5. Checkpoint & Finish
- [ ] Run `git status`, `git add -A`, `git commit -m "chore: migrate Angular v17→v18"`, `git push origin HEAD`.
- [ ] Tag the checkpoint: `git tag v18-stable`, `git push origin v18-stable`.

## Rollback Procedure
- If any validation gate fails and cannot be resolved, revert to the previous stable checkpoint (v17-stable).

## Success Criteria
- All Angular packages and CLI are at v18.
- Build and tests pass with no unresolved migration warnings.
- Checkpoint committed and pushed with tag `v18-stable`.

## Next Steps
- Upon completion, proceed to the next migration plan only if explicitly requested.
