# Core Migration Issue — Angular v18 → v19 (for Skills)

**Date:** 2026-05-27

Purpose: Document the canonical migration pitfall and recommended automated actions for Skills.

- Core issue: Angular CLI v19 requires `buildTarget` in `serve` and `extract-i18n` where older projects used `browserTarget`. This mismatch causes a schema validation error and blocks CLI operations.

- Skills-level recommendations:
  - `assessment.skill`: add a check for legacy `angular.json` keys and flag `browserTarget` occurrences.
  - `implementation.skill`: include an idempotent transform step that can rename `browserTarget` → `buildTarget` (with validation and rollback behavior) during automated updates.
  - `unittesting.skill`: include a rule to convert test specs that `declare` standalone components into specs that `import` them.
  - `documentation.skill`: add examples (before/after snippets) showing `browserTarget` → `buildTarget` fixes and spec migration examples.

Notes: This is append-only guidance; do not remove existing skill content — instead reference this file from skill indexes and invocation flows.
