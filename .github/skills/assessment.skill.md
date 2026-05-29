---
  - task: Autonomous Execution Extension
    instructions:
      - When `implement the migration plan` is invoked, this skill must run automatically, generate `report/assessment_report.md`, and export the project inventory for downstream agents. It must record the progress update: "package files updated and timer-based components fixed to trigger change detection".
name: Angular Migration Assessment
description: >
  Analyzes an Angular project to assess its readiness for the Angular 20 → 21 migration.
  This skill focuses on identifying legacy patterns, dependency issues, and configuration problems that could block the final jump.
  It generates a detailed assessment report that serves as the foundation for the planning phase.

tasks:
  - task: Analyze `package.json` for outdated `@angular/*` packages and third-party dependencies.
    instructions:
      - Read `package.json`.
      - Compare installed versions against the required versions for the Angular 20 → 21 jump.
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
      - Identify usage of deprecated APIs that will block the Angular 20 → 21 migration.
      - Look for patterns that need to be refactored (e.g., non-standalone components).
    files:
      - `src/main.ts`
      - `src/app/app.module.ts`
      - `src/app/app.component.ts`

  - task: Audit all component files for zone/change detection risks (Angular 21).
    instructions:
      - Recursively scan all `*.component.ts` files in `src/app/`.
      - Search for patterns: `setInterval()`, `setTimeout()`, direct event handlers, browser APIs with callbacks.
      - For each found pattern, check if the component:
        1. Calls `ChangeDetectorRef.markForCheck()` after mutations, OR
        2. Uses `NgZone.run()` to wrap mutations, OR
        3. Uses proper RxJS subscriptions with Angular's zone management
---
  - task: Autonomous Execution Extension
    instructions:
      - When `implement the migration plan` is invoked, this skill must run automatically, generate `report/assessment_report.md`, and export the project inventory for downstream agents. It must record the progress update: "package files updated and timer-based components fixed to trigger change detection".
name: Angular Migration Assessment
description: >
  Analyzes an Angular project to assess its readiness for the Angular 20 → 21 migration.
  This skill focuses on identifying legacy patterns, dependency issues, and configuration problems that could block the final jump.
  It generates a detailed assessment report that serves as the foundation for the planning phase.

tasks:
  - task: Analyze `package.json` for outdated `@angular/*` packages and third-party dependencies.
    instructions:
      - Read `package.json`.
      - Compare installed versions against the required versions for the Angular 20 → 21 jump.
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
      - Identify usage of deprecated APIs that will block the Angular 20 → 21 migration.
      - Look for patterns that need to be refactored (e.g., non-standalone components).
    files:
      - `src/main.ts`
      - `src/app/app.module.ts`
      - `src/app/app.component.ts`

  - task: Audit all component files for zone/change detection risks (Angular 21).
    instructions:
      - Recursively scan all `*.component.ts` files in `src/app/`.
      - Search for patterns: `setInterval()`, `setTimeout()`, direct event handlers, browser APIs with callbacks.
      - For each found pattern, check if the component:
        1. Calls `ChangeDetectorRef.markForCheck()` after mutations, OR
        2. Uses `NgZone.run()` to wrap mutations, OR
        3. Uses proper RxJS subscriptions with Angular's zone management
      - If NONE of these are present, flag as a **breaking change for Angular 21**.
      - Document findings in a "Zone/Change Detection Risks" section with file paths and line numbers.
      - Example: "dashboard-widgets.component.ts (line 45) uses setInterval() but does not call markForCheck() — CRITICAL FIX NEEDED"
    files:
      - `src/app/**/*.component.ts`

  - task: Richer Assessment Diagnostics & Actionable Report Polish
    instructions:
      - For every issue flagged in `report/assessment_report.md`, include the structured fields: File, Line, Severity, Remediation (one-liner fix).
      - Format each finding as a Markdown table row for easy parsing by the Planning Agent.
      - Insert the assessment metadata block at the top of the report.
      - Validate report completeness before handoff to Planning Agent.
      - For every issue flagged in `report/assessment_report.md`, include the following structured fields:
        1. **File:** exact file path relative to project root.
        2. **Line:** line number(s) where the issue was detected.
        3. **Severity:** P0 (migration-blocking) | P1 (high-impact) | P2 (medium/technical-debt).
        4. **Remediation:** one-liner fix or migration command (e.g., `ng update @angular/core@21 --force`, replace `bootstrapModule` → `bootstrapApplication`, inject `ChangeDetectorRef` and call `markForCheck()`).
      - Format each finding as a Markdown table row for easy parsing by the Planning Agent:
        ```
        | File | Line | Severity | Issue | Remediation |
        |------|------|----------|-------|-------------|
        ```
      - Insert the following structured header at the top of `report/assessment_report.md`:
        ```
        assessment_date: (ISO timestamp)
        migration_target: v20→v21
        total_components: (count from src/app scan)
        total_p0_issues: (count)
        total_p1_issues: (count)
        total_p2_issues: (count)
        assessment_gate_status: PENDING
        git_checkpoint_commit: (TBD — populate after final migration jump)
        ```
      - Update `assessment_gate_status` to PASS or FAIL after the completeness gate runs.
      - After generating `report/assessment_report.md`, confirm it contains ALL of:
        - [ ] Project Inventory section (components, modules, services — with counts)
        - [ ] Zone/Change Detection Risks section (file path + line references)
        - [ ] Dependency version table (all @angular/* packages + typescript)
        - [ ] Per-finding remediation table (file | line | severity | issue | remediation)
        - [ ] Assessment metadata block
        - [ ] `git_checkpoint_commit` field (even if value is "TBD")
      - Append result directly into `report/assessment_report.md`:
        - "ASSESSMENT GATE PASS: all required sections present." — OR —
        - "ASSESSMENT GATE FAIL: missing [section-name]. Generating now."

  - task: Generate the Assessment Report.
    instructions:
      - Consolidate all findings into a structured Markdown report.
      - The report must include a checklist of all identified issues.
      - Save the report to `report/assessment_report.md`.
    output: `report/assessment_report.md`
---
### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.