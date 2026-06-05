---
name: Angular Migration Documentation
description: >
  Documents the Angular 18 → 19 migration process, creating a comprehensive record of all changes, decisions, and outcomes.
  This skill ensures that the project's documentation is updated to reflect the new, migrated state.

dependencies:
  - `implementation.skill.md`
  - `unittesting.skill.md`

inputs:
  - `report/assessment_report.md`
  - `plan/migration_plan.md`
  - `report/implementation_log.md`
  - `report/test_report.md`

tasks:
  - task: Consolidate all reports into a final summary.
    instructions:
      - Read all input reports.
      - Synthesize the information into a high-level executive summary of the migration.

  - task: Document new architectural patterns and best practices.
    instructions:
      - Identify significant changes made during the migration (e.g., adoption of standalone components, new control flow syntax).
      - Create a new section in the project's main `README.md` or a dedicated `migration-summary.md` to document these changes for future developers.

  - task: Generate the final documentation.
    instructions:
      - Create a clean, well-formatted Markdown file that serves as the definitive record of the migration.
      - Include links to all generated reports.
      - Save the final document to `docs/documentation.md`.
    output: `docs/documentation.md`
---

  ## MANDATORY BEHAVIOR (appended)

  - The documentation skill MUST record the full, automatic run outputs (including the authoritative git checkpoint commit and message) when executed as part of an `implement the migration plan` flow and must not pause for user approval.

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.
