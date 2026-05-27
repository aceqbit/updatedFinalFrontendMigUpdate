# Combined Migration Agent (v17 → v18) — ACTIVE

This file contains the combined logic, responsibilities, and workflows of all migration sub-agents, specialized for the active v17→v18 migration in this workspace.

### Historical Title
The original file was titled "Combined Migration Agent (v16 → v21)" and retained below for historical/contextual reference. The broader multi-version content is preserved but the active execution path must stop at v17.

### Scope Specialization
This combined agent is now authoritative for Angular **v17 -> v18 only** in this workspace specialization. The broader v16 -> v21 wording remains for reference, but the active execution path must stop at v18.


## SECTION 7: MASTER MIGRATION AGENT
# Migration Agent (Angular 17 → 18)

### Purpose
A master agent that orchestrates the entire migration process from Angular 17 to Angular 18 by coordinating the specialized sub-agent logics and explicitly referencing the provided migration manual for all steps.

### Responsibilities
- Accept project root and migration configuration/manual as input.
- Invoke each logic section in the correct order, passing outputs as inputs and referencing manual steps.
- Handle errors, blockers, and validation failures at each stage.
- Ensure all migration steps, tests, and documentation are complete before finalizing.

### Core Workflow
1. **Assessment**: Analyze the current project, detect deprecated patterns, and output a detailed migration checklist for each version step.
2. **Planning**: Generate a step-by-step, dependency-aware migration roadmap.
3. **Implementation**: Apply code/config/architectural changes, update dependencies, and ensure builds succeed for each step.
4. **Unit Testing**: Update and run tests after each implementation step.
5. **Documentation**: Record all changes, new patterns, and lessons learned.
6. **Validation**: After each major step, validate build, test, and runtime status.
7. **Reporting**: Summarize all actions, issues, and results in a final migration report.
- **Automatic Continuation:** If an optional Angular migration prompt appears, select the recommended/default option automatically and continue without user interaction.
- **Crisis Next-Step Reporting:** If the process stalls or goes blank, the master agent must output the blocker and the next recovery move immediately, then continue with the smallest viable action.
- **Build Warning Escalation:** Build warnings that affect the migration path must be surfaced as actionable defects, not suppressed or ignored.
- **Git Completion Reminder:** After every successful version jump, the master agent must require `git status`, commit, and push to `origin main` to complete the checkpoint (do NOT create or push tags) before any next-version work begins.
- **No-Intervention Mandate:** The master agent must start, continue, and finish the active v17→v18 migration without asking the user to approve routine steps.

### Centralized Orchestration and Control
The Master Migration Agent acts as the central nervous system for the entire migration process. It has direct authority and control over the specialized sub-agents, ensuring they operate in perfect synchronization.

- **Agent Invocation:** The Master Agent is solely responsible for invoking `assessment`, `planning`, `implementation`, `unittesting`, and `documentation` agents in a strict, predefined sequence.
- **Data Flow Management:** It manages the flow of artifacts between agents. For example, it takes the `assessment_report.md` from the Assessment Agent and passes it as the primary input to the Planning Agent.
- **Lifecycle Control:** It controls the start, stop, and continuation of each agent's workflow. If the Implementation Agent reports a failure, the Master Agent can halt the process, invoke a rollback, and re-run the Planning Agent to devise a new strategy.
- **Git Completion Gate:** After every successful version jump, the Master Agent must require a `git status` check, commit, and push to `origin main` before allowing the next version jump to start (do NOT create or push tags).
- **Autonomous Checkpointing:** A successful checkpoint is not complete until the commit has been created and pushed automatically; the agent must not pause for user confirmation.

### Enhanced Implementation Agent Functionality
Within this combined framework, the implementation logic is enhanced with greater power and responsibility, all under the direct supervision of the Master Agent:

- **Dynamic Plan Execution:** The implementation logic dynamically consumes the `migration_plan.md`. It executes each task precisely as ordered, with no deviation.
- **Real-time Feedback Loop:** After every action (e.g., file modification, command execution), the implementation logic runs immediate, small-scale validations (like linting or a partial build). The results are fed back to the Master Agent in real-time.
- **Automated Rollback Trigger:** If any step fails validation and cannot be resolved after a set number of retries (as defined in its "Absolute Rules"), it immediately signals the Master Agent to initiate a full rollback to the last known good state.
- **Testing Triage:** When the unit test suite is too broad or a full run fails many modules at once, the Master Agent should direct the testing agent to run targeted specs for the changed area first, then expand outward only after the focused checks pass.


### Orchestration Polish & Diagnostics (Append-only)
- The master agent must:
	- Log the start and end of each agent invocation with timestamps and the triggering event.
	- For each agent hand-off, record the input and output artifact filenames and a short status summary (success/failure/blocker).
	- On any validation failure, produce a diagnostics bundle containing:
		- The triggering command and error summary
		- File-level diffs (`report/plan_file_diffs.diff`, `report/test_failures.diff`, etc.)
		- Remediation steps and effort estimates
		- A vulnerability summary if available
	- Ensure all diagnostics and remediation artifacts are referenced in the final `report/migration_report.md`.

### Non-Destructive Memory Utilization Clarification
- Any prior references to "skill & memory utilisation" in orchestration or agent notes are informational only. Do not use ephemeral memory metrics as gating signals; prefer deterministic validation gates (build/test/lint) for all automation decisions.


- **Assessment Agent Management:** The Master Agent triggers the `assessment.md` logic to produce the initial `assessment_report.md`. It validates the report for completeness before proceeding.
- **Planning Agent Management:** It feeds the assessment report to the `planning.md` logic and receives the `migration_plan.md`. The Master Agent cross-references the plan against the assessment to ensure all identified issues are addressed.
- **Implementation Agent Management:** It oversees the `implementation.md` logic, feeding it one task at a time from the plan and awaiting a success or failure signal before providing the next task.
- **Unit Testing Agent Management:** After each significant implementation step, the Master Agent invokes the `unittesting.md` logic to run the relevant test suites. It will not allow the implementation to proceed until all tests pass.
- **Documentation Agent Management:** The Master Agent continuously provides the `documentation.md` logic with logs and summaries from all other agents, ensuring that the `documentation.md` file is a complete and accurate record of the entire migration process.


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### AUTOMATION ENFORCEMENT (Added)
- **Autonomy mandate (must do):** The master migration agent must orchestrate a fully autonomous v17→v18 migration run when requested by the user. This includes sequencing assessment, planning, implementation, testing, and documentation without requiring human intervention, and performing git checkpointing and pushes as part of the automated flow.
- **Accept changes:** The master agent must accept changes produced by sub-agents and ensure they are committed and pushed as part of the checkpointing process.
- **Stop condition:** The master agent stops only after the migration to v18 is complete and the checkpoint commit is pushed to `origin main` (do NOT push tags), or after recording a documented unrecoverable blocker.
- **No prompts:** Default/recommended options must be chosen automatically for any presented prompts during the automated flow.
- **Mirror & Record:** This automation policy is recorded in `/memories/auto_migration_policy.md` and mirrored to all sub-agent artifacts.


### must include OUTPUT
- **Report:** `report/migration_report.md` (master combined migration summary)
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated:** (agent-updated integer)
- **Total number of components pending migration:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Spec files present:** (number of `*.spec.ts` found across the repo)
- **Spec files missing:** (number of components without `*.spec.ts`)
- **Timestamp:** (ISO 8601 UTC for the snapshot)
- **Core details:** aggregated list of blockers, high-risk modules, and final verification status for build/test/runtime.

- **Spec requirement:** The combined agent enforces that every component includes a `<component>.component.spec.ts` and that the unit-testing agent discovers and runs all `*.spec.ts` during validation.