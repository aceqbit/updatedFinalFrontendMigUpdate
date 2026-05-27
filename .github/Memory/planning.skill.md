---
name: Angular Migration Planning
description: >
  Constructs a detailed, phased migration plan based on the findings from the assessment report.
  This skill breaks down the migration into sequential, manageable tasks and defines the strategy for the Angular 18 → 19 jump.

dependencies:
  - `assessment.skill.md`

inputs:
  - `report/assessment_report.md`

tasks:
  - task: Decompose assessment findings into a phased roadmap.
    instructions:
      - Parse `report/assessment_report.md` to extract all identified issues.
      - Group issues into logical phases (e.g., Core Updates, Dependency Fixes, Refactoring).
      - Create a strict, sequential plan for the Angular 18 → 19 jump.

  - task: Define tasks, risks, and validation criteria for each phase.
    instructions:
      - For each task, specify the files to be modified and the actions to be taken.
      - Assign a risk level (Low, Medium, High) to each task.
      - Define clear validation criteria (e.g., "Build succeeds," "All tests pass").

  - task: Incorporate rollback procedures.
    instructions:
      - For each high-risk phase, define a clear rollback plan to revert changes if the migration step fails.
      - Specify the trigger conditions for a rollback.

  - task: Plan runtime behavior checks for the 18 → 19 jump.
    instructions:
      - Extract any runtime behavior findings from the assessment report.
      - For each flagged component, create a task that identifies the relevant async or callback-driven pattern.
      - Include unit test creation to verify template updates after data mutations.
      - List the exact file paths and line numbers to be modified.
      - Mark the highest-risk checks as **P0 (Must Have)** priority.

  - task: Generate the Migration Plan.
    instructions:
      - Compile all phases, tasks, and metadata into a comprehensive `migration_plan.md`.
      - The plan must be ordered and easy to follow.
    output: `plan/migration_plan.md`

    - task: Generate the 18 → 19 migration plan.
      instructions:
        - Generate one atomic migration plan file:
          1. `plan/migration_v18_to_v19.md` — All tasks, phases, validation gates, rollback triggers for the 18→19 jump only
        - The plan file must be INDEPENDENT and include:
          - Target version range (e.g., "Angular 18 → 19")
          - Phase breakdown specific to that version
          - Validation gates (build, test, lint) for that version
          - Rollback trigger conditions and procedures for that version
          - Git checkpoint name (e.g., "v19-stable")
          - Success criteria for that version
          - Specific file changes required ONLY for that version
          - Completion statement: "Upon success, the migration is complete."
        - Create `plan/migration_plan.md` as a master INDEX listing the single version-specific plan with a brief description and link.
        - **CRITICAL**: Do NOT cross-reference or create dependencies with other version plans in the files themselves. The plan must be complete and standalone.
        - Rationale: User experienced catastrophic midway failures with monolithic plans. A single atomic plan prevents cross-version corruption and simplifies recovery.
      outputs:
        - `plan/migration_v18_to_v19.md`
        - `plan/migration_plan.md` (master index)
---

  ## MANDATORY BEHAVIOR (appended)

  - The planning skill MUST output a complete, atomic `plan/migration_v18_to_v19.md` and mark validation gates and checkpoint names so the implementation skill can run without waiting for user confirmation.

## ENHANCED PLAN & REPORT REQUIREMENTS (appended)

- The planning memory should require plans to be actionable and diagnostic-rich by including file-level diffs, per-task remediation checklists, and a pre-flight diagnostics summary that lists likely Node/runtime requirements and key third-party packages.

## STRICT GIT POLICY (appended)

- The planning memory must make explicit that automated checkpointing uses commit+push to `main` and must NOT rely on creating or pushing git tags. Plans should instruct the implementation agent to create the checkpoint commit and run `git push origin main` on success.

## Angular 19 CLI Schema Advisory
- The planning memory should require the plan to include an early `angular.json` validation step for the Angular 19 CLI schema change from `browserTarget` to `buildTarget`.
- This ensures the migration detects configuration issues before build/serve validation and avoids the known `ng serve` schema failure mode.
