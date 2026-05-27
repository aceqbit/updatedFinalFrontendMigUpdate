---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
name: Angular Migration Implementation
description: >
  Executes the v17 -> v18 migration plan by applying code and configuration changes step-by-step.
  Handles all file modifications, dependency updates, and build validations for the active migration target.

scope:
  - Angular v17 -> v18 only

dependencies:
  - `planning.skill.md`

inputs:
  - `plan/migration_plan.md`

tasks:
  - task: Execute tasks for the current migration phase.
    instructions:
      - Read the next task from `plan/migration_plan.md`.
      - Apply the specified code or configuration changes to the relevant files.
      - Use tools to perform automated refactoring where possible.

  - task: Update dependencies.
    instructions:
      - Run `ng update` or `npm install` to update Angular and third-party packages as defined in the v17 -> v18 plan.
      - Use `--force` or `--legacy-peer-deps` only when explicitly instructed by the plan.

  - task: Validate each step.
    instructions:
      - After every significant change, run `ng build` to ensure the project still compiles.
      - If a build fails, attempt to fix the issue or trigger the rollback procedure.

  - task: Log all actions.
    instructions:
      - Maintain a detailed log of every command run and file modified.
      - Record the output of all build and test commands.
      - Save the log to `report/implementation_log.md`.
    output: `report/implementation_log.md`
---

  ### Append-Only: Vulnerability & Node Guidance
  - Implementation tasks should include non-blocking vulnerability checks and a conservative remediation plan. Avoid `--force` updates without an explicit plan step authorizing them.
  - Add Node runtime checks to the log and surface recommendations for recommended Node versions (Node 18.x or 20.x preferred).

  ### Non-Destructive Memory Utilization Clarification
  - Append-only clarification: previously recorded notes on "skill & memory utilisation" are informational. Agents should prefer deterministic checks (build/test/lint) when deciding progression.

