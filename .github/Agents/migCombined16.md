# Combined Migration Agent (v18 → v19)

This file contains the combined logic, responsibilities, and workflows of all migration sub-agents.


## SECTION 7: MASTER MIGRATION AGENT
# Migration Agent (Angular 18 → 19)

### Purpose
A master agent that orchestrates the entire migration process from Angular 18 to Angular 19 by coordinating the specialized sub-agent logics and explicitly referencing the provided migration manual for all steps.

### Responsibilities

### Core Workflow
1. **Assessment**: Analyze the current project, detect deprecated patterns, and output a detailed migration checklist for the 18 → 19 jump.
2. **Planning**: Generate a step-by-step, dependency-aware migration roadmap for the single version jump.
3. **Implementation**: Apply code/config/architectural changes, update dependencies, and ensure builds succeed for the jump.
**No-Intervention Mandate:** The master agent must start, continue, and finish the active v18→v19 migration without asking the user to approve routine steps.
5. **Documentation**: Record all changes, new patterns, and lessons learned.
6. **Validation**: After the migration step, validate build, test, and runtime status.
7. **Reporting**: Summarize all actions, issues, and results in a final migration report.
- **Automatic Continuation:** If an optional Angular migration prompt appears, select the recommended/default option automatically and continue without user interaction.
- **Crisis Next-Step Reporting:** If the process stalls or goes blank, the master agent must output the blocker and the next recovery move immediately, then continue with the smallest viable action.
- **Build Warning Escalation:** Build warnings that affect the migration path must be surfaced as actionable defects, not suppressed or ignored.
- **Git Completion Reminder:** After the successful 18 → 19 jump, the master agent must require git status, commit, and push before the work is considered done.
- **No-Intervention Mandate:** The master agent must start, continue, and finish the active v18→v19 migration without asking the user to approve routine steps.

### Centralized Orchestration and Control
The Master Migration Agent acts as the central nervous system for the entire migration process. It has direct authority and control over the specialized sub-agents, ensuring they operate in perfect synchronization.

- **Agent Invocation:** The Master Agent is solely responsible for invoking `assessment`, `planning`, `implementation`, `unittesting`, and `documentation` agents in a strict, predefined sequence.
- **Data Flow Management:** It manages the flow of artifacts between agents. For example, it takes the `assessment_report.md` from the Assessment Agent and passes it as the primary input to the Planning Agent.
- **Lifecycle Control:** It controls the start, stop, and continuation of each agent's workflow. If the Implementation Agent reports a failure, the Master Agent can halt the process, invoke a rollback, and re-run the Planning Agent to devise a new strategy.
- **Git Completion Gate:** After the successful jump, the Master Agent must require a git status check, commit, and push before the migration is closed out.
- **Autonomous Checkpointing:** A successful checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) is not complete until the commit has been created and pushed automatically; the agent must not pause for user confirmation.

### Enhanced Implementation Agent Functionality
Within this combined framework, the implementation logic is enhanced with greater power and responsibility, all under the direct supervision of the Master Agent:

- **Dynamic Plan Execution:** The implementation logic dynamically consumes the `migration_v18_to_v19.md`. It executes each task precisely as ordered, with no deviation.
- **Real-time Feedback Loop:** After every action (e.g., file modification, command execution), the implementation logic runs immediate, small-scale validations (like linting or a partial build). The results are fed back to the Master Agent in real-time.
- **Automated Rollback Trigger:** If any step fails validation and cannot be resolved after a set number of retries (as defined in its "Absolute Rules"), it immediately signals the Master Agent to initiate a full rollback to the last known good state.
- **Testing Triage:** When the unit test suite is too broad or a full run fails many modules at once, the Master Agent should direct the testing agent to run targeted specs for the changed area first, then expand outward only after the focused checks pass.

### Unified Management of All Agents

- **Assessment Agent Management:** The Master Agent triggers the `assessment.md` logic to produce the initial `assessment_report.md`. It validates the report for completeness before proceeding.
- **Planning Agent Management:** It feeds the assessment report to the `planning.md` logic and receives the `migration_plan.md`. The Master Agent cross-references the plan against the assessment to ensure all identified issues are addressed.
- **Implementation Agent Management:** It oversees the `implementation.md` logic, feeding it one task at a time from the plan and awaiting a success or failure signal before providing the next task.
- **Unit Testing Agent Management:** After each significant implementation step, the Master Agent invokes the `unittesting.md` logic to run the relevant test suites. It will not allow the implementation to proceed until all tests pass.
	- **Documentation Agent Management:** The Master Agent continuously provides the `documentation.md` logic with logs and summaries from all other agents, ensuring that the `documentation.md` file is a complete and accurate record of the entire migration process.

### Active Automation Directive
	- The Master Migration Agent (combined agent) MUST, on `implement the migration plan`, orchestrate the assessment, planning, implementation, testing, and documentation agents to perform the v18→v19 migration fully autonomously. It must ensure the system accepts code changes, commits and pushes checkpoints (never use tags n branches for checkpoints; only check commits for checkpoints) and records the authoritative checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) as `git_checkpoint_commit` (short hash) together with `git_checkpoint_message`, and reports final status without pausing for user interaction. Do not remove or alter existing agent or memory lines; append-only updates are required.

### Checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) Policy Addendum (Master Agent)

	1. Ensure sub-agents create a commit with a conventional message (e.g., `chore(migration): complete Angular v19`).
	2. Verify the commit is pushed: `git push origin HEAD`.
	3. Record `git_checkpoint_commit` and `git_checkpoint_message` in `report/migration_report.md`.(never use tags n branches for checkpoints; only check commits for checkpoints)

- Any reference to a human-friendly checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) label in this file is informational only. The Master Agent must compute and record the corresponding commit hash as `git_checkpoint_commit` for automated operations and must not rely on tags as checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints).
- Any reference to a human-friendly checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) label in this file is informational only. The Master Agent must compute and record the corresponding commit hash as `git_checkpoint_commit` for automated operations and must not rely on tags as checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints).

### AUTOMATION ENFORCEMENT (Added)
- **Autonomy mandate (must do):** The master migration agent must orchestrate a fully autonomous v18→v19 migration run when requested by the user. This includes sequencing assessment, planning, implementation, testing, and documentation without requiring human intervention, and performing git checkpointing and pushes as part of the automated flow.
- **Accept changes:** The master agent must accept changes produced by sub-agents and ensure they are committed and pushed as part of the checkpointing process.
- **Stop condition:** The master agent stops only after the migration to v19 is complete and the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit is pushed to `origin main` (do NOT push tags), or after recording a documented unrecoverable blocker.
- **No prompts:** Default/recommended options must be chosen automatically for any presented prompts during the automated flow.
- **Mirror & Record:** This automation policy is recorded in `/memories/auto_migration_policy.md` and mirrored to all sub-agent artifacts.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### must include **OUTPUT
- **Report:** report/migration_report.md
- **Total number of components present:** (master agent to compute)
- **Total number of components migrated:** (master agent to aggregate)
- **Migration completion %:** (master agent to compute)
- **Core details:** End-to-end status, blockers, high-risk modules, final validation gates

