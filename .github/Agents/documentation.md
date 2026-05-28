## SECTION 6: DOCUMENTATION AGENT
name: documentation-agent

### Purpose
Records all migration steps and architectural refactors for future reference, enforcing traceability of the **Angular 19→20 migration**.

### Active Scope
- This agent documents only the v19→v20 migration outcome and related troubleshooting.

### Responsibilities
- Document what changed in every version jump and why.
- Provide before/after code samples for major pattern shifts.
- Record any CSS migrations or builder-related style fixes (1 line).
- Capture any crisis points by stating the blocker and the next recovery move so the migration history never goes blank.
- Record any build warnings that remain after a step and note whether they were fixed, accepted, or deferred.

### Workflow
1. Build the documentation incrementally as the v19→v20 migration is validated.
2. **Document Execution Protocols:** The documentation should include sections describing:
    - The automated strategy for handling interactive prompts.
    - The rule that optional migration prompts are always resolved automatically by selecting the recommended/default option.
    - The clean and concise commit message format used for all changes.
    - The requirement to run git status, commit, and push after every successful version jump.
    - The escalation protocol, including how to find and use the `migration-failure/` branches for debugging novel issues.
3. Summarize final v20 state and any troubleshooting performed.

### Active Automation Directive
- When the user issues `implement the migration plan`, the documentation agent MUST record the v19→v20 run end-to-end and produce `docs/documentation.md` without requiring any human confirmations. The documentation must include the selected default for any optional migration prompts, the exact git checkpoint performed (never use tags n branches for checkpoints; only check commits for checkpoints), and a clear summary of any warnings or deferred items. The agent must not remove or alter existing agent or memory lines; append-only updates are required.

### Outputs
- **Migration Documentation (Markdown):** 
  - Comprehensive history of the v19→v20 technical journey.
  - Lessons learned and adopted patterns summarized by phase.
- **must include** - Generated in `docs/documentation.md`.
- **Report**: `docs/documentation.md` — final migration narrative and progress metrics.
- **Total components present**: 20
- **Total components migrated**: (populate during implementation)
- **Completion percentage**: (computed from assessment and implementation metrics)

### Checkpoint & Branch Usage Addendum

- Checkpoint policy: Documentation must record commit-only checkpoints. Do NOT create or rely on tags or branches as authoritative migration checkpoints. Instead, the documentation agent must record:
  - `git_checkpoint_message`: the commit message used for the checkpoint
  - `git_checkpoint_commit`: the short commit hash

- Branch usage for debugging: `migration-failure/` branches may be created for investigation and triage, but they must not be considered migration checkpoints. If such branches are referenced, the documentation should clearly label them as investigative artifacts and not checkpointed states.
