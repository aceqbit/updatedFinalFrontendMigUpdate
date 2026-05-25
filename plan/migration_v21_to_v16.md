# Migration Downgrade Plan: Angular v21 to v16

This document outlines the plan to revert the Angular application from version 21 back to version 16. This process is a reverse-engineering of the original upgrade migration.

## Guiding Principles
- This is a destructive operation. Each step must be followed precisely.
- We will reverse the migration plans, starting from v21 and going down to v16.
- After each major version downgrade, we will attempt to install dependencies and validate the state, though success is not guaranteed until the final v16 state is achieved.

## Downgrade Phases

### Phase 1: Revert from v21 to v20
1.  **Dependencies:** Downgrade `@angular/*` packages from `~21.2.14` to `~20.0.0` in `package.json`.
2.  **TypeScript:** Downgrade `typescript` from `^5.9.0` to the version compatible with Angular 20.
3.  **Bootstrap API:** Revert the `main.ts` file to use the bootstrap method from Angular 20, removing the new v21 bootstrap API.
4.  **Install Dependencies:** Run `npm install`.

### Phase 2: Revert from v20 to v19
1.  **Dependencies:** Downgrade `@angular/*` packages from `~20.0.0` to `~19.0.0` in `package.json`.
2.  **Control Flow:** Revert the new control flow syntax (`@if`, `@for`) in HTML templates back to `*ngIf`, `*ngFor`.
3.  **TSConfig:** Revert `moduleResolution: "bundler"` in `tsconfig.json` if it was a v20 change.
4.  **Install Dependencies:** Run `npm install`.

### Phase 3: Revert from v19 to v18
1.  **Dependencies:** Downgrade `@angular/*` packages from `~19.0.0` to `~18.0.0` in `package.json`.
2.  **Install Dependencies:** Run `npm install`.

### Phase 4: Revert from v18 to v17
1.  **Dependencies:** Downgrade `@angular/*` packages from `~18.0.0` to `~17.0.0` in `package.json`.
2.  **Install Dependencies:** Run `npm install`.

### Phase 5: Revert from v17 to v16
1.  **Dependencies:** Downgrade `@angular/*` packages from `~17.0.0` to `~16.0.0` in `package.json`.
2.  **Builder:** Revert the `application` builder in `angular.json` back to the `browser` builder used in v16.
3.  **Install Dependencies:** Run `npm install`.

## Final Validation
- After all phases are complete, run `ng build` and `ng test` to ensure the application is in a stable v16 state.
- The final `package.json` should reflect Angular 16 dependencies.
