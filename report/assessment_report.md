# Assessment Report — Angular 20 → 21 Migration

Date: 2026-05-28

## Summary
- Current Angular packages: @angular/* @^20.0.0 (see package.json)
- Components discovered under `src/app/components`: 19
- Timer/async usage detected in components: 3 (dashboard-widgets, resource-monitor, file-dropzone-lab)

## Versions (from package.json)
- @angular/core: ^20.0.0
- @angular/cli: ^20.0.0
- typescript: ~5.9.0

## Component Inventory (selected)
- Total component files found: 19
  - src/app/components/calendar/calendar.component.ts
  - src/app/components/workflow-designer/workflow-designer.component.ts
  - src/app/components/advanced-form-stepper/advanced-form-stepper.component.ts
  - src/app/components/file-dropzone-lab/file-dropzone-lab.component.ts
  - src/app/components/event-scheduler/event-scheduler.component.ts
  - src/app/components/async-autocomplete-lab/async-autocomplete-lab.component.ts
  - src/app/components/dashboard-widgets/dashboard-widgets.component.ts
  - src/app/components/context-menu-overlays-lab/context-menu-overlays-lab.component.ts
  - src/app/components/data-grid/data-grid.component.ts
  - src/app/components/date-range-picker/date-range-picker.component.ts
  - src/app/components/tree-view-large/tree-view-large.component.ts
  - src/app/components/file-explorer/file-explorer.component.ts
  - src/app/components/resource-monitor/resource-monitor.component.ts
  - src/app/components/autocomplete-complex/autocomplete-complex.component.ts
  - src/app/components/sticky-notes/sticky-notes.component.ts
  - src/app/components/notification-hub/notification-hub.component.ts
  - src/app/components/layout-manager/layout-manager.component.ts
  - src/app/components/settings-panel/settings-panel.component.ts
  - src/app/components/chips-input-lab/chips-input-lab.component.ts

## Zone / Change Detection Risks
The following files use timers or external callbacks that mutate component state. Each was inspected for explicit `ChangeDetectorRef.markForCheck()` usage.

- src/app/components/dashboard-widgets/dashboard-widgets.component.ts — uses `setInterval`; calls `cdr.markForCheck()` (handled).
- src/app/components/resource-monitor/resource-monitor.component.ts — uses `setInterval`; calls `cdr.markForCheck()` (handled).
- src/app/components/file-dropzone-lab/file-dropzone-lab.component.ts — uses `setInterval` for upload simulation; calls `cdr.markForCheck()` (handled).

## Blockers / Notes
- No immediate critical blockers discovered in assessment: Angular packages are at v20; code uses `ChangeDetectorRef.markForCheck()` where timers exist.
- TypeScript is `~5.9.0`; plan recommends `~5.9.3` for Angular 21; upgrade expected to be trivial.

## Next Steps
- Proceed to Phase 1 (clean install) and Phase 2 (ng update to Angular 21). Document diffs and capture implementation logs in `report/implementation_log.md`.
