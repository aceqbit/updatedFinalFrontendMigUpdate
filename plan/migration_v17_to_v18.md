# Migration Plan: Angular 17 → 18

## Scope
Active migration target: Angular 17 → 18 only.

This plan is atomic and independent. It preserves the historical v16 → v17 completion record and does not depend on any later version jump.

## Success Criteria
- `package.json` aligns Angular packages and compatible tooling for Angular 18.
- `ng build` succeeds.
- `ng test --watch=false` succeeds.
- All component specs remain present and runnable.
- The migration ends with `git status`, `git add -A`, `git commit`, `git push origin HEAD`, and a stable tag push for the target version.

## Validation Gates
1. Clean install and dependency alignment.
2. Build verification with `ng build`.
3. Single-run unit test verification with `ng test --watch=false`.
4. Git checkpoint creation and remote push.

## Rollback Triggers
- Build failure that cannot be resolved quickly and locally.
- Peer dependency conflict that survives the recommended install path.
- Test regression in a changed component or supporting module.

If a rollback is required, return to the last known stable checkpoint and document the blocker before retrying.

## Phase 1: Baseline and Dependency Review
- Confirm the current Angular 17 state and identify Angular 18 compatibility work.
- Review `package.json`, `angular.json`, `tsconfig.json`, and the root application bootstrap files.
- Confirm every component has a matching spec file before any implementation work starts.

## Phase 2: Dependency and Tooling Update
- Update Angular packages and compatible tooling for the 17 → 18 jump.
- Prefer the repository's standard install/update path and resolve prompts automatically.
- Reinstall dependencies after package changes.

## Phase 3: Per-Component Review Checklist
Review each component for Angular 18 readiness, runtime risk, and spec coverage.

- [ ] [app.component.ts](src/app/app.component.ts)
- [ ] [advanced-form-stepper.component.ts](src/app/components/advanced-form-stepper/advanced-form-stepper.component.ts)
- [ ] [async-autocomplete-lab.component.ts](src/app/components/async-autocomplete-lab/async-autocomplete-lab.component.ts)
- [ ] [autocomplete-complex.component.ts](src/app/components/autocomplete-complex/autocomplete-complex.component.ts)
- [ ] [calendar.component.ts](src/app/components/calendar/calendar.component.ts)
- [ ] [chips-input-lab.component.ts](src/app/components/chips-input-lab/chips-input-lab.component.ts)
- [ ] [context-menu-overlays-lab.component.ts](src/app/components/context-menu-overlays-lab/context-menu-overlays-lab.component.ts)
- [ ] [dashboard-widgets.component.ts](src/app/components/dashboard-widgets/dashboard-widgets.component.ts)
- [ ] [data-grid.component.ts](src/app/components/data-grid/data-grid.component.ts)
- [ ] [date-range-picker.component.ts](src/app/components/date-range-picker/date-range-picker.component.ts)
- [ ] [event-scheduler.component.ts](src/app/components/event-scheduler/event-scheduler.component.ts)
- [ ] [file-dropzone-lab.component.ts](src/app/components/file-dropzone-lab/file-dropzone-lab.component.ts)
- [ ] [file-explorer.component.ts](src/app/components/file-explorer/file-explorer.component.ts)
- [ ] [layout-manager.component.ts](src/app/components/layout-manager/layout-manager.component.ts)
- [ ] [notification-hub.component.ts](src/app/components/notification-hub/notification-hub.component.ts)
- [ ] [resource-monitor.component.ts](src/app/components/resource-monitor/resource-monitor.component.ts)
- [ ] [settings-panel.component.ts](src/app/components/settings-panel/settings-panel.component.ts)
- [ ] [sticky-notes.component.ts](src/app/components/sticky-notes/sticky-notes.component.ts)
- [ ] [tree-view-large.component.ts](src/app/components/tree-view-large/tree-view-large.component.ts)
- [ ] [workflow-designer.component.ts](src/app/components/workflow-designer/workflow-designer.component.ts)

## Phase 4: Build and Test
- Run `ng build` after dependency changes and any targeted fixes.
- Run `ng test --watch=false` after build stability is confirmed.
- Keep the focus on the smallest changed area if a failure appears in multiple modules.

## Phase 5: Git Checkpoint
- Run `git status`.
- Commit the validated change set.
- Push the checkpoint and stable tag.

## Notes
- Historical v16 → v17 migration notes remain in the repository for reference only.
- This plan is the only active plan for the current migration scope.# Migration Plan: Angular 17 → 18 (Atomic)

Scope
- This plan is atomic for the single version jump from Angular 17 to Angular 18. Execute and validate fully before any subsequent version changes.

Preconditions
- Working tree clean and committed; create branch `migration/v17-to-v18`.
- Confirm CI is green on main and note Node/npm versions used by CI.

Step-by-step (short)
1. Create checkpoint branch:
   - `git checkout -b migration/v17-to-v18`
   - `git add -A && git commit -m "chore(migration): prepare v17→v18 checkpoint"`
2. Update CLI & core packages:
   - `ng update @angular/cli @angular/core` (follow prompts)
   - `npm install`
3. Run static checks:
   - `npm run build` and `npm run test`
   - `npm run lint` / `tsc`
4. Fix known migration-risk patterns:
   - Flag timers/polling (`setInterval`, `setTimeout`) and ensure explicit change detection (`ChangeDetectorRef.markForCheck()` or `NgZone.run()`) where needed.
   - Update third-party libraries to compatible releases and address peer-deps.
5. Re-run validation:
   - `ng build --configuration production` and `npm test`
6. Manual runtime verification:
   - Exercise high-risk pages (data-grid, workflow-designer, dashboard widgets).
7. Git checkpoint and finalize:
   - If validations pass: `git add -A && git commit -m "chore(migration): complete Angular v17→v18"`
   - Push branch and create tag: `git push origin migration/v17-to-v18 && git tag v18-stable && git push origin v18-stable`

Validation gates (required)
- Gate 1: `ng build` (no compile errors)
- Gate 2: `ng test` (unit tests for affected modules pass)
- Gate 3: Local runtime smoke test (no console runtime errors for high-risk modules)

Acceptance criteria
- Build and unit tests pass on CI and locally.
- No unhandled runtime errors in high-risk areas during manual smoke tests.
- Git tag `v18-stable` created and pushed.

Estimated effort
- 1–4 hours for small-to-medium apps; may increase if automated tests fail and manual fixes are required.

Notes
- Follow the atomic per-version approach: complete v17→v18 fully, commit/push, then proceed to the next version plan.
- Prioritize quick validation gates to avoid long-running speculative refactors.
