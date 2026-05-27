# Core Migration Issue — Angular v18 → v19 (for Agents)

**Date:** 2026-05-27

Agent guidance (append-only):

- Symptom: Running `npm run start` after upgrading dependencies produced:

  "Error: Schema validation failed with the following errors:\n  Data path \"\" must have required property 'buildTarget'."

- Immediate cause: `angular.json` used legacy `browserTarget` properties for `serve` and `extract-i18n` that are no longer valid under the Angular 19 CLI schema.

- Agent responsibilities (recommended updates):
  - `assessment` agent: add detection for legacy workspace keys and emit a high-priority pre-flight remediation suggestion.
  - `implementation` agent: implement a safe patch (rename `browserTarget` → `buildTarget`) and run `ng build --configuration development` to validate; on failure, revert and create a PR/issue for manual review.
  - `unittesting` agent: detect specs that declare standalone components and auto-convert to `imports` pattern, then run the target specs first.
  - `documentation` agent: when a config-key migration is applied, append an audit note and reference the migration commit hash to the migration report.

- Non-destructive policy: Agents must append notes/flags and avoid deleting or overwriting unrelated historical lines. Any auto-patch must be idempotent and reversible.

Applied in this workspace: `angular.json` was updated to use `buildTarget` for `serve` and `extract-i18n` (commit `fe51579`). Verify by running `ng serve` locally.
