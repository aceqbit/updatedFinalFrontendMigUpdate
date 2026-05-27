---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
name: Angular Migration Assessment
description: >
  Analyzes an Angular project to assess its readiness for the v16 -> v17 migration.
  Identifies legacy patterns, dependency issues, and configuration problems that could block the upgrade.
  Generates a detailed assessment report as the foundation for the planning phase.

scope:
  - Angular v16 -> v17 only

tasks:
  - task: Analyze `package.json` for outdated `@angular/*` packages and third-party dependencies.
    instructions:
      - Read `package.json`.
      - Compare installed versions against the required versions for the v16 -> v17 step.
      - Flag any dependencies that are known to be incompatible with target Angular versions.
    files:
      - `package.json`

  - task: Audit `angular.json` and `tsconfig.json` for legacy configurations.
    instructions:
      - Scan `angular.json` for outdated builder options and project settings.
      - Check `tsconfig.json` for `moduleResolution` and other settings that need to be updated for modern Angular.
    files:
      - `angular.json`
      - `tsconfig.json`

  - task: Scan core application files for deprecated APIs and patterns.
    instructions:
      - Analyze `main.ts`, `app.module.ts`, and key component files.
      - Identify usage of deprecated APIs that must be handled during the v16 -> v17 migration.
      - Look for patterns that need to be refactored (e.g., non-standalone components).
    files:
      - `src/main.ts`
      - `src/app/app.module.ts`
      - `src/app/app.component.ts`

  - task: Generate the Assessment Report.
    instructions:
      - Consolidate all findings into a structured Markdown report.
      - The report must include a checklist of all identified issues.
      - Save the report to `report/assessment_report.md`.
    output: `report/assessment_report.md`
  - task: Run security and Node compatibility checks.
    instructions:
      - Run `npm audit --json` and include a short, human-readable summary in the assessment report.
      - Inspect `package.json` for `engines.node` and compare with the local Node runtime; record mismatches and suggested non-invasive workarounds.
    output: `report/assessment_report.md`
