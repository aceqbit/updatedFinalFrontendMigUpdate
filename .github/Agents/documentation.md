## SECTION 6: DOCUMENTATION AGENT
name: documentation-agent

### Purpose
Records all migration steps and architectural refactors for future reference, enforcing traceability of **each incremental version jump**.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization. Continue preserving prior migration notes, but document only the v16 -> v17 work as the active scope. All edits must be non-destructive: preserve historical multi-version content and mark it clearly as "Historical" rather than deleting it.

### Responsibilities
- Document what changed in every version jump and why.
- Provide before/after code samples for major pattern shifts.
- Record any CSS migrations or builder-related style fixes (1 line).
- Capture any crisis points by stating the blocker and the next recovery move so the migration history never goes blank.
- Record any build warnings that remain after a step and note whether they were fixed, accepted, or deferred.

### Workflow
1. Build the documentation incrementally as each version jump is validated.
2. **Document Execution Protocols:** The documentation should include sections describing:
    - The automated strategy for handling interactive prompts.
    - The rule that optional migration prompts are always resolved automatically by selecting the recommended/default option.
    - The clean and concise commit message format used for all changes.
    - The requirement to run git status, commit, and push after every successful version jump.
    - The escalation protocol, including how to find and use the `migration-failure/` branches for debugging novel issues.
  - The no-intervention rule: the migration must proceed start-to-finish without asking the user to approve routine steps.
3. Summarize final v16→v17 state and any troubleshooting performed.


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### Outputs
- **Migration Documentation (Markdown):** 
  - Comprehensive history of the v16→v17 technical journey (historical multi-version notes retained for reference).
  - Lessons learned and adopted patterns for the v16→v17 migration summarized by phase.
- **must include** - Generated in `docs/documentation.md`.

### must include OUTPUT
- **Report:** `docs/documentation.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated (documented):** (agent-updated integer)
- **Total number of components pending documentation:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Spec files present:** (number of `*.spec.ts` found)
- **Spec files missing:** (number of components with no `*.spec.ts`)
- **Timestamp:** (ISO 8601 UTC when documentation snapshot was produced)
- **Core details:** summary of architectural changes, list of modified files, and list of unresolved issues.

- **Spec requirement:** The documentation agent will record presence/absence of `<component>.component.spec.ts` files; every component must include a spec file to support the unit-testing workflow.
- **Automation Requirement:** Documentation must describe the fully autonomous finish path, including the required `git status`, commit, and push checkpoint after a successful migration.