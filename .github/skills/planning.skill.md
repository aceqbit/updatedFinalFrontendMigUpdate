---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
name: Angular Migration Planning
description: >
  Constructs a detailed, phased plan for the v16 -> v17 migration based on assessment findings.
  Breaks down the upgrade into sequential, manageable tasks with clear validation criteria.

scope:
  - Angular v16 -> v17 only

dependencies:
  - `assessment.skill.md`

inputs:
  - `report/assessment_report.md`

tasks:
  - task: Decompose assessment findings into a phased roadmap.
    instructions:
      - Parse `report/assessment_report.md` to extract all identified issues.
      - Group issues
       into logical phases (e.g., Core Updates, Dependency Fixes, Refactoring).
      - Create a strict, sequential plan for the v16 -> v17 migration only.

  - task: Define tasks, risks, and validation criteria for each phase.
    instructions:
      - For each task, specify the files to be modified and the actions to be taken.
      - Assign a risk level (Low, Medium, High) to each task.
      - Define clear validation criteria (e.g., "Build succeeds," "All tests pass").

  - task: Incorporate rollback procedures.
    instructions:
      - For each high-risk phase, define a clear rollback plan to revert changes if the migration step fails.
      - Specify the trigger conditions for a rollback.

  - task: Generate the Migration Plan.
    instructions:
      - Compile all phases, tasks, and metadata into a comprehensive `migration_plan.md`.
      - The plan must be ordered and easy to follow.
    output: `plan/migration_plan.md`
  - task: Produce file-level diffs and diagnostics for plan changes.
    instructions:
      - For every planned file modification, include a sample `git diff --patch` snippet in the migration plan.
      - Define where the implementation agent will store per-change patches (`report/patches`).
      - Define the diagnostic bundle format to be produced on failures.

  - task: Run security and Node-compatibility preflight checks.
    instructions:
      - Run `npm audit --json` and summarize critical/high vulnerabilities in the plan as P0/P1 items.
      - Inspect `package.json` `engines.node` and include a Node compatibility note and fallback guidance in the plan.
      - Recommend whether Node version enforcement is required or advisory for the migration.
