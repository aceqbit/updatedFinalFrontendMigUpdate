---
name: Angular Migration Planning
description: >
  Constructs a detailed, phased migration plan based on the findings from the assessment report.
  This skill breaks down the migration into sequential, manageable tasks and defines the strategy for each version jump.

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
      - Create a strict, sequential plan for the Angular 20 → 21 jump only.

  - task: Define tasks, risks, and validation criteria for each phase.
    instructions:
      - For each task, specify the files to be modified and the actions to be taken.
      - Assign a risk level (Low, Medium, High) to each task.
      - Define clear validation criteria (e.g., "Build succeeds," "All tests pass").

  - task: Incorporate rollback procedures.
    instructions:
      - For each high-risk phase, define a clear rollback plan to revert changes if the migration step fails.
      - Specify the trigger conditions for a rollback.

  - task: Plan zone & change detection fixes (Angular 21).
    instructions:
      - Extract all findings from the "Zone/Change Detection Risks" section of the assessment report.
      - For each flagged component, create a task that:
        1. Identifies the problematic async pattern (setInterval, setTimeout, event handler, etc.).
        2. Specifies which fix strategy to use (markForCheck, NgZone.run, or RxJS refactor).
        3. Includes unit test creation to verify template updates after data mutations.
        4. Lists the exact file paths and line numbers to be modified.
      - Mark all zone/change detection fixes as **P0 (Must Have)** priority and assign them to Phase 4b.
      - These tasks must be completed before Phase 5 cleanup and validation, as they are breaking changes for Angular 21.

  - task: Autonomous Execution Extension
    instructions:
      - When invoked as part of `implement the migration plan`, this skill must automatically generate or refresh `plan/migration_v20_to_v21.md` and any per-component checklists, record the progress update "package files updated and timer-based components fixed to trigger change detection", and declare the mandatory checkpoint sequence(never use tags n branches for checkpoints; only check commits for checkpoints) for the Implementation Agent to follow.

  - task: Richer Plan Diagnostics & Actionable Output
    instructions:
      - Enrich plan with per-task remediation steps (remediation_if_fail) and file-level diff anchors (validation_command, expected_diff_summary).
      - Emit a plan metadata block at the top of the plan file.
      - Validate plan completeness before handoff to Implementation Agent.

  - task: Generate the Migration Plan.
    instructions:
      - Compile all phases, tasks, and metadata into a comprehensive `migration_plan.md`.
      - The plan must be ordered and easy to follow.
    output: `plan/migration_plan.md`

    - task: Generate per-version migration plans.
      instructions:
        - Generate FIVE separate, atomic migration plan files, one for each version jump:
          1. `plan/migration_v20_to_v21.md` — All tasks, phases, validation gates, rollback triggers for v20→v21 only
        - Each plan file must be INDEPENDENT and include:
          - Target version range (e.g., "Angular 20 → 21")
          - Phase breakdown specific to that version
          - Validation gates (build, test, lint) for that version
          - Rollback trigger conditions and procedures for that version
          - Git checkpoint commit (the commit hash marking the stable migration state)(never use tags n branches for checkpoints; only check commits for checkpoints)
          - Success criteria for that version
          - Specific file changes required ONLY for that version
  - task: Enrich plan with per-task remediation steps and file-level diff anchors.
    instructions:
      - For every task written into `plan/migration_v20_to_v21.md`, include the following sub-fields:
        1. **files_to_modify:** explicit file paths that the task will change.
        2. **expected_diff_summary:** one-line description of the expected change (e.g., "update @angular/core from 20.x to 21.x in package.json").
        3. **validation_command:** exact CLI command to verify the task succeeded (e.g., `ng build`, `npm ls @angular/core`).
        4. **remediation_if_fail:** one-liner fallback command or rollback step (e.g., `npm install --legacy-peer-deps`, `git revert HEAD`).
      - These fields make every plan task self-contained and actionable without requiring additional context lookup.

  - task: Emit a plan metadata block at the top of the plan file.
    instructions:
      - Insert the following YAML-style metadata header at the top of `plan/migration_v20_to_v21.md`:
        ```
        migration_target: v20→v21
        plan_file: plan/migration_v20_to_v21.md
        git_checkpoint_message: "chore(migration): complete Angular v21"
        git_checkpoint_commit: (populate after final jump — short hash)
        plan_gate_status: PENDING
        total_tasks: (count after plan generation)
        p0_tasks: (count of Must-Have tasks)
        ```
      - Update `plan_gate_status` to PASS or FAIL after the completeness gate runs.

  - task: Validate plan completeness before handoff to Implementation Agent.
    instructions:
      - After generating `plan/migration_v20_to_v21.md`, verify the plan contains ALL of:
        - [ ] Phase breakdown (≥ 4 phases)
        - [ ] Validation gate per phase (build/test command)
        - [ ] Rollback trigger condition per high-risk phase
        - [ ] Git checkpoint sequence (commit + push commands)
        - [ ] Per-task `remediation_if_fail` field
        - [ ] Plan metadata block (as above)
      - If any item is missing, generate the missing content before declaring planning complete.
      - Log result to `report/planning_report.md`:
        - "PLAN GATE PASS: all required sections present." — OR —
        - "PLAN GATE FAIL: missing [section-name]. Generating now."

  - task: Generate the Migration Plan.
    instructions:
      - Compile all phases, tasks, and metadata into a comprehensive `migration_plan.md`.
      - The plan must be ordered and easy to follow.
    output: `plan/migration_plan.md`

  - task: Generate per-version migration plans.
    instructions:
      - Generate FIVE separate, atomic migration plan files, one for each version jump:
        1. `plan/migration_v20_to_v21.md` — All tasks, phases, validation gates, rollback triggers for v20→v21 only
      - Each plan file must be INDEPENDENT and include:
        - Target version range (e.g., "Angular 20 → 21")
        - Phase breakdown specific to that version
        - Validation gates (build, test, lint) for that version
        - Rollback trigger conditions and procedures for that version
        - Git checkpoint commit (the commit hash marking the stable migration state)(never use tags n branches for checkpoints; only check commits for checkpoints)
        - Success criteria for that version
        - Specific file changes required ONLY for that version
        - Next version statement: "Migration complete"
      - Create `plan/migration_plan.md` as the master INDEX listing the final plan with brief descriptions and links.
      - **CRITICAL**: Do NOT cross-reference or create dependencies beyond the final jump.
      - Rationale: User experienced catastrophic midway failures with monolithic plans. Focusing on the final jump keeps the workflow narrow and predictable.
  
  - task: Autonomous Execution Extension
    instructions:
      - When invoked as part of `implement the migration plan`, this skill must automatically generate or refresh `plan/migration_v20_to_v21.md` and any per-component checklists, record the progress update "package files updated and timer-based components fixed to trigger change detection", and declare the mandatory checkpoint sequence(never use tags n branches for checkpoints; only check commits for checkpoints) for the Implementation Agent to follow.
    outputs:
      - `plan/migration_v20_to_v21.md`
      - `plan/migration_plan.md` (master index)
