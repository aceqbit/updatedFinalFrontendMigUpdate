## Implementation Commands (executable)

The implementation agent will execute the following commands, in order, as the concrete steps for this migration. Run them from the repository root.

1. Create migration branch:

```
git checkout -b migration/v19-to-20
```

2. Run Angular update schematic (uses npx to ensure CLI v20 is used):

```
npx @angular/cli@20 update @angular/core@20 @angular/cli@20 --force
```

3. Install updated dependencies:

```
npm install
```

4. Build the project (validation gate):

```
npx ng build --configuration=production
```

5. Run tests (non-watch mode):

```
npx ng test --watch=false
```

6. Commit and push checkpoint, create stable tag:

```
git add -A
git commit -m "chore: migrate Angular v19→v20"
git push origin HEAD
git tag v20-stable
git push origin v20-stable
```

If any step fails, the agent will record the failure in `report/implementation_log.md`, attempt automated remediation where safe, and if still failing, document the blocker and the next recovery move.
## Per-Component Checklist (from assessment inventory)
For each component identified in `src/app/components`, perform the following tasks and mark them complete in the implementation log:

...

### Active Automation Directive
...
## Angular 19 → 20 Migration Plan (Concise)

Scope: Atomic, single-version migration from Angular v19 to v20 for this repository.

Goal: Upgrade core Angular packages, align tooling (TypeScript, builders), fix breaking API changes, address zone/change-detection issues, and validate with build + tests.

Phases (high-level):
1. Pre-flight (S)
   - Backup current state (create `migration/v19-to-20` branch).
   - Run inventory: components_count (19), modules, third-party libs.
   - Record current `package.json` and `angular.json`.
   - Validation gate: `npm ci` completes.

2. Core Package Alignment (M)
   - Run `ng update @angular/core@20 @angular/cli@20 --force` (document flags used).
   - Update TypeScript to required version.
   - Validation gate: `ng build` succeeds (no migration-related errors).

3. Third-Party & Peer Fixes (M)
   - Update critical third-party libraries listed in assessment.
   - Validation gate: local smoke tests for critical flows.

4. Zone & Change Detection Fixes (S-M)
   - Fix components flagged by assessment (use `ChangeDetectorRef.markForCheck()` or `NgZone.run()` as appropriate).
   - Validation gate: relevant components visually update in dev server.

5. CSS & Theming (S)
   - Apply tokenization, Sass migration fixes, and asset path corrections.
   - Validation gate: visual sanity check for key pages and `ng build` passes.

6. Unit & Integration Tests (M)
   - Run targeted specs for changed components; widen scope if green.
   - Validation gate: failing tests triaged and fixed or explicitly accepted in plan.

7. Finalize & Checkpoint (S)
   - Commit and push changes, create tag `v20-stable`.
   - Generate final reports: `report/implementation_log.md`, `report/migration_report.md`.

Rollback:
- Use atomic commits and `git revert` for failed steps. If corruption occurs, reset to `v19-stable` and re-evaluate.

Success Criteria:
- `ng build` succeeds with no migration-related errors.
- Critical tests pass; visual validation for top-level flows is green.
- All flagged zone/change-detection defects fixed.
- Tag `v20-stable` created and pushed.

Files/Artifacts:
- plan/migration_v19_to_v20.md (this file)
- report/assessment_v19_to_v20.md
- report/implementation_log.md
- report/migration_report.md

## Per-Component Checklist (from assessment inventory)
For each component identified in `src/app/components`, perform the following tasks and mark them complete in the implementation log:

- advanced-form-stepper
   - Zone/change-detection fix applied (ChangeDetectorRef.markForCheck or NgZone.run):
   - Compile & lint: `ng build` local pass:
   - Targeted tests: pass:
   - Visual validation: pass:
   - Commit & push (checkpoint):

- async-autocomplete-lab
   - Zone/change-detection fix applied (ChangeDetectorRef.markForCheck or NgZone.run):
   - Compile & lint: `ng build` local pass:
   - Targeted tests: pass:
   - Visual validation: pass:
   - Commit & push (checkpoint):

- autocomplete-complex
- calendar
- chips-input-lab
- context-menu-overlays-lab
- dashboard-widgets
- data-grid
- date-range-picker
- event-scheduler
- file-dropzone-lab
- file-explorer
- layout-manager
- notification-hub
- resource-monitor
- settings-panel
- sticky-notes
- tree-view-large
- workflow-designer

For each of the components listed above, follow the same set of checklist tasks (Zone/change-detection, Compile, Tests, Visual validation, Commit & push). Record the status for each component in `report/implementation_log.md`. The implementation agent must iterate through this checklist and only mark the overall migration as complete when every component's checklist is satisfied and the `v20-stable` checkpoint has been created and pushed.

### Active Automation Directive
- The active migration execution for this plan is v19→v20 only. When the user issues `implement the migration plan`, the system MUST assess, plan, and execute this plan end-to-end autonomously: run `npm install`, perform package updates, run `ng build`, run `ng test --watch=false`, apply component fixes, and create the git checkpoint (`git add -A`, `git commit`, `git push origin HEAD`, `git tag v20-stable`, `git push origin v20-stable`) without requiring user prompts. The agent must accept and persist file changes and must not remove or alter existing plan, agent, skill, or memory lines; append-only updates are required.
