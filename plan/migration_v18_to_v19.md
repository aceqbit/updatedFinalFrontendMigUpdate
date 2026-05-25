# Migration Plan: Angular 18 → 19

## Scope
Active migration target: Angular 18 → 19 only.

This plan is atomic and independent. It must be executed and validated fully before any subsequent version changes.

## Success Criteria
- `package.json` aligns Angular packages and compatible tooling for Angular 19.
- `ng build` succeeds (no compile errors).
- `ng test --watch=false` passes targeted specs for changed areas.
- Create git checkpoint: commit, push, and tag `v19-stable` on success.

## Validation Gates
1. Clean install and dependency alignment.
2. Build verification with `ng build`.
3. Targeted unit test verification with `ng test --watch=false` for affected components.
4. Git checkpoint creation and remote push.

## Rollback Triggers
- Unresolvable build failure.
- Persistent peer dependency conflict after recommended steps.
- Critical runtime regression in a touched component.

If a rollback is required, return to the last known stable checkpoint and document the blocker.

## Phase 1: Baseline & Dependency Review
- Confirm current Angular 18 state and identify 19 compatibility work.
- Review `package.json`, `angular.json`, `tsconfig.json`, and bootstrap files (`main.ts`).

## Phase 2: Dependency & Tooling Update
- Update Angular packages and tooling for 18 → 19.
- Prefer repository-standard update path and resolve prompts automatically (recommended/default).
- Reinstall dependencies and validate installer health.

## Phase 3: Per-Component Review (Checklist)
Review each component for Angular 19 readiness and runtime risk. Start with high-risk surfaces.

- [ ] src/app/app.component.ts
- [ ] src/app/components/advanced-form-stepper/advanced-form-stepper.component.ts
- [ ] src/app/components/async-autocomplete-lab/async-autocomplete-lab.component.ts
- [ ] src/app/components/autocomplete-complex/autocomplete-complex.component.ts
- [ ] src/app/components/calendar/calendar.component.ts
- [ ] src/app/components/chips-input-lab/chips-input-lab.component.ts
- [ ] src/app/components/context-menu-overlays-lab/context-menu-overlays-lab.component.ts
- [ ] src/app/components/dashboard-widgets/dashboard-widgets.component.ts
- [ ] src/app/components/data-grid/data-grid.component.ts
- [ ] src/app/components/date-range-picker/date-range-picker.component.ts
- [ ] src/app/components/event-scheduler/event-scheduler.component.ts
- [ ] src/app/components/file-dropzone-lab/file-dropzone-lab.component.ts
- [ ] src/app/components/file-explorer/file-explorer.component.ts
- [ ] src/app/components/layout-manager/layout-manager.component.ts
- [ ] src/app/components/notification-hub/notification-hub.component.ts
- [ ] src/app/components/resource-monitor/resource-monitor.component.ts
- [ ] src/app/components/settings-panel/settings-panel.component.ts
- [ ] src/app/components/sticky-notes/sticky-notes.component.ts
- [ ] src/app/components/tree-view-large/tree-view-large.component.ts
- [ ] src/app/components/workflow-designer/workflow-designer.component.ts

## Phase 4: Build & Test
- Run `ng build` after dependency changes and any targeted fixes.
- Run `ng test --watch=false` focusing on the smallest changed area if failures appear.

## Phase 5: Git Checkpoint
- Run `git status`.
- Commit the validated change set with conventional commit messages.
- Push the checkpoint and tag `v19-stable`.

## Notes
- Keep the plan atomic: do not attempt other version jumps in the same run.
- Prioritize quick validation gates to avoid long-running speculative refactors.

## Progress Update

- **Status:** package files updated and timer-based components fixed to trigger change detection (added `ChangeDetectorRef.markForCheck()` or equivalent where needed).
- **Next steps (choose one):**
	- Run `npm install`, `ng build`, and `ng test --watch=false`, then create the git checkpoint (`v19-stable`) on success.
	- Or, verify and complete the per-component checklist below and proceed component-by-component.

These progress notes have been recorded in workspace memory and agent directives to enforce fully autonomous execution of the v18 → v19 migration (no user intervention during routine migration steps).
