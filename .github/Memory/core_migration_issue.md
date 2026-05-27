# Core Migration Issue — Angular v18 → v19 (schema & standalone conversion)

**Date:** 2026-05-27

**Summary (one line):** Upgrading to Angular 19 required a change in CLI workspace schema (replace `browserTarget` with `buildTarget`) and surfaced common standalone-component migration patterns; these caused a schema validation failure that blocked `ng serve` and related CLI commands.

Detailed analysis

- Core problem: Angular CLI v19 rejects `angular.json` entries using the legacy `browserTarget` key — the new schema requires `buildTarget` for `serve` and `extract-i18n` options. This produced the error: "Data path \"\" must have required property 'buildTarget'" and prevented the dev server from starting.

- Root cause: Dependencies were upgraded to Angular 19 but workspace configuration (`angular.json`) retained legacy property names. Migration automation did not update workspace keys.

- Fix applied in this run: updated `angular.json` to replace `browserTarget` → `buildTarget` for `serve` and `extract-i18n`.
  - Commit (angular.json fix): `fe51579` (pushed to `origin/main`).
  - Validation: `ng serve` compiled successfully and served at http://localhost:4300/.

- Related migration patterns observed and their implications:
  - Standalone components (`standalone: true`) must be *imported* in test modules (use `imports: [MyComponent]`) — declaring them in `declarations` causes TestBed errors.
  - Standalone components must include static imports for `CommonModule` and/or `FormsModule` both at top-of-file and in `@Component({ imports: [...] })` to be statically analyzable (avoid NG1010).
  - Duplicate top-level imports introduced by earlier patches cause TypeScript duplicate-identifier errors.
  - Large CSS/component styles triggered bundle-budget warnings — worthy of follow-up optimization.

- Recommended agent/skill updates (append-only, non-destructive):
  - Assessment agent: scan `angular.json` for legacy keys (e.g., `browserTarget`) and flag them as pre-flight issues with suggested `buildTarget` replacement.
  - Implementation agent: provide an idempotent patch to rename `browserTarget` → `buildTarget` and run a quick build validation; if validation fails, open a PR for manual review instead of auto-applying further changes.
  - Unit-testing agent: detect specs that declare standalone components and convert `declarations: [Comp]` → `imports: [Comp]`; run targeted specs as a first triage step.
  - Documentation/skills: include this file as a canonical migration pitfall entry and add examples demonstrating the fixes.

- Action log & references:
  - Migration commit (major edits): `0640263c485538269a0aebb7aefb31e2a866f9dd`.
  - Angular config fix: `fe51579` (this run).
  - Reports: see `report/migration_report.md`, `report/implementation_log.md`, and the audit entries in `report/vulnerability_report.*`.

- Non-destructive policy reminder: do NOT delete or remove existing lines in agent/skill/memory files; record findings by appending notes or creating new artifacts and commit them with clear messages.
