---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
name: Angular Migration Planning
description: >
  Constructs a detailed, phased plan for the v17 -> v18 migration based on assessment findings.
  Breaks down the upgrade into sequential, manageable tasks with clear validation criteria.

scope:
  - Angular v17 -> v18 only

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
---

  ### Append-Only: Diagnostics & Vulnerability Guidance
  - The generated plan must include a diagnostics section for any validation gate expected to run during implementation. The diagnostics section should indicate how to produce file-level diffs and where to store remediation artifacts.
  - Include a vulnerability triage checklist and guidance for Node runtime checks so the implementation agent can make conservative, traceable decisions rather than forcing automatic fixes.

  ### Non-Destructive Memory Utilization Clarification
  - Do not delete historical notes about memory usage. Append this clarifying note: prior skill/memory utilisation details are informational only and must not be used as gating signals for automation.

