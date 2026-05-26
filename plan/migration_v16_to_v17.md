# Migration Plan — Angular v16 → v17

Scope
- Target: migrate this repository from Angular 16 to Angular 17 only.
- Goal: produce a working, tested production build and create a git checkpoint tag `v17-stable`.

Prerequisites
- Ensure working branch is clean and up-to-date: `git fetch && git checkout main && git pull`.
- Confirm there is a `v16-stable` tag or create a checkpoint before changes: `git tag v16-stable`.
- Install dependencies: `npm ci` (or `npm install` if lockfile changes required).

Phases & Steps
1) Assessment
  - Run: `npm ci` then `npx ng version` to capture current state and record results.
  - Note failing tests/builds in the report template.

2) Dependency upgrade
  - Run Angular CLI update: `npx ng update @angular/core@17 @angular/cli@17`
  - Review and apply migration schematics output; follow any code-mod suggestions.

3) Compile & Fix
  - Run: `npx ng build --configuration production`.
  - Resolve TypeScript/compile errors and address migration-related deprecations.

4) Tests
  - Run unit tests: `npm test -- --watch=false` or `npx ng test --watch=false`.
  - If many tests fail, run targeted specs for modified modules first, then expand.

5) Validation
  - Smoke the app locally using `npx ng serve` and verify critical flows.
  - Run any available end-to-end checks if present.

6) Git checkpoint
  - Commit: `git add -A && git commit -m "chore(migration): Angular v16 → v17"`
  - Push: `git push origin HEAD`
  - Tag: `git tag v17-stable && git push origin v17-stable`

Rollback procedure
- If migration fails or causes regressions beyond quick fixes:
  - `git reset --hard v16-stable`
  - Restore any lockfile backup and re-run `npm ci`.

Files Likely Affected
- `package.json`, lockfile (`package-lock.json`/`pnpm-lock.yaml`)
- `tsconfig.json`, `tsconfig.app.json`
- `src/polyfills.ts`, `src/main.ts`, `src/app/**`
- Third-party packages and integration points (check `npm outdated`).

Success Criteria
- Production build completes: `npx ng build --configuration production` returns exit code 0.
- Unit tests pass or documented, triaged test failures exist with clear remediation steps.
- `v17-stable` tag is pushed to the remote repository.

Risks & Mitigations
- Third-party incompatibilities: mitigate by upgrading or pinning compatible versions.
- Widespread test failures: mitigate by running targeted tests first and fixing locally-scoped issues.

Estimated Time
- Small repo: 30–90 minutes. Medium/large repo: several hours depending on third-party updates and test fixes.

Notes
- This plan is atomic and focused strictly on the v16→v17 migration per the repo's per-version policy.
- If polling/interval-based components are present, ensure change detection is triggered after async updates (e.g., use `ChangeDetectorRef.markForCheck()`).
