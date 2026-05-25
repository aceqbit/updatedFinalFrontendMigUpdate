# Migration Plan: Angular 16 to 21

This plan outlines the steps to migrate the Angular application from version 16 to 21.

## Phase 1: Migration from Angular 16 to 17

- **Dependencies:**
    - Update `@angular/core`, `@angular/common`, `@angular/compiler`, `@angular/forms`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/router` to version 17.
    - Update `@angular/cli` to version 17.
    - Update `@angular-devkit/build-angular` to version 17.
- **Manual Step Reference:**
    - Angular 17 update guide: [https://update.angular.io/?v=16.0-17.0](https://update.angular.io/?v=16.0-17.0)
- **Estimated Effort:** 2 hours
- **Validation Criteria:**
    - `ng build` completes successfully.
    - `ng test` completes successfully.
    - Application runs without errors.

## Phase 2: Migration from Angular 17 to 18

- **Dependencies:**
    - Update all `@angular/*` packages to version 18.
- **Manual Step Reference:**
    - Angular 18 update guide: [https://update.angular.io/?v=17.0-18.0](https://update.angular.io/?v=17.0-18.0)
- **Estimated Effort:** 1 hour
- **Validation Criteria:**
    - `ng build` completes successfully.
    - `ng test` completes successfully.
    - Application runs without errors.

## Phase 3: Migration from Angular 18 to 19

- **Dependencies:**
    - Update all `@angular/*` packages to version 19.
- **Manual Step Reference:**
    - Angular 19 update guide.
- **Estimated Effort:** 1 hour
- **Validation Criteria:**
    - `ng build` completes successfully.
    - `ng test` completes successfully.
    - Application runs without errors.

## Phase 4: Migration from Angular 19 to 20

- **Dependencies:**
    - Update all `@angular/*` packages to version 20.
- **Manual Step Reference:**
    - Angular 20 update guide.
- **Estimated Effort:** 1 hour
- **Validation Criteria:**
    - `ng build` completes successfully.
    - `ng test` completes successfully.
    - Application runs without errors.

## Phase 5: Migration from Angular 20 to 21

- **Dependencies:**
    - Update all `@angular/*` packages to version 21.
    - Update TypeScript to version 5.9.3.
- **Manual Step Reference:**
    - Angular 21 update guide.
- **Estimated Effort:** 2 hours
- **Validation Criteria:**
    - `ng build` completes successfully.
    - `ng test` completes successfully.
    - Application runs without errors.
- **v21 Final Transition Roadmap:**
    1.  Align all `@angular/*` packages to the exact version.
    2.  Upgrade TypeScript to 5.9.3.
    3.  Remove `node_modules` and `package-lock.json`.
    4.  Run `npm install`.
    5.  Run `ng build`.
