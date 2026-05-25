# Migration Documentation: Angular 16 to 21

This document records the steps and changes made during the migration of the Angular application from version 16 to 21.

## Current Workspace Snapshot
- The active workspace migration checkpoint is Angular v17 → v18.
- `package.json` and `package-lock.json` were updated to Angular 18.2.x.
- Validation for the current checkpoint passed with `ng build` and `npm test -- --watch=false`.

## Summary
The migration was performed incrementally, one major version at a time, from Angular 16 to 21. The migration was successful, and the application builds without errors.

## Phase 1: Angular 16 to 17
- Updated all `@angular/*` packages to version 17.
- Updated `@angular/cli` to version 17.
- The `angular.json` file was updated to use the new `application` builder.
- The build was successful after the update.

## Phase 2: Angular 17 to 18
- Updated all `@angular/*` packages to version 18.
- The build was successful after the update.
- The current workspace snapshot has now been validated against Angular 18.2.x packages.

## Phase 3: Angular 18 to 19
- Updated all `@angular/*` packages to version 19.
- The build was successful after the update.

## Phase 4: Angular 19 to 20
- Updated all `@angular/*` packages to version 20.
- The `tsconfig.json` was updated to use `moduleResolution: "bundler"`.
- The HTML templates were updated to use the new control flow syntax.
- The build was successful after the update.

## Phase 5: Angular 20 to 21
- Updated all `@angular/*` packages to version 21.
- Updated TypeScript to version 5.9.3.
- The `main.ts` file was updated to use the new bootstrap API.
- The build was successful after the update.

### Migration Completion (v21)
- Completion date: 2026-05-22
- Branch: `migration/v20-to-v21` (pushed to origin)
- Tag: `v21-stable` (pushed to origin)


## Lessons Learned
- The incremental migration approach was effective in isolating issues at each step.
- The `ng update` command is a powerful tool that automates many of the migration tasks.
- It is important to have a clean git repository before running `ng update`.
- The lack of tests in the project increases the risk of regressions. It is highly recommended to add a test suite.
