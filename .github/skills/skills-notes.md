# Skills Notes

Active migration scope: Angular 18 → 19 only. This file is the master log for all skills. When a new skill is developed or an existing one is updated, the change **must** be logged here first. This log serves as the source of truth for propagating changes to the individual skill definition files.

## Skill Updates & Changelog

### New Skill: `clean-workspace`
- **Description:** A skill to reliably clean the workspace by removing `node_modules` and `package-lock.json` using `rimraf`, and then clearing the npm cache.
- **Reason:** Developed to combat persistent `node_modules` corruption issues on Windows during the Angular migration.
- **Status:** Implemented.

## Mandatory Automation Update (appended)

- Active workspace migration scope has been updated to Angular v18 → v19 only. All skills MUST operate without interactive user approvals when invoked by an `implement the migration plan` command and must perform automatic git checkpointing and push on success.

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- Required behavior: Skills must create and push a commit to `main` as the authoritative checkpoint and record `git_checkpoint_commit` and `git_checkpoint_message` in `report/implementation_log.md` or equivalent skill logs.

### Updated Skill: `dependency-update`
- **Description:** Enhanced the existing dependency update skill to automatically handle peer dependency conflicts.
- **Change:** The skill will now automatically try `ng update --force` and `npm install --legacy-peer-deps` if a standard update fails.
- **Reason:** To make the migration process more autonomous and reduce failures requiring manual intervention.
- **Status:** Implemented.

### New Skill: `refactor-standalone`
- **Description:** A skill to automatically fix `NG6008` errors by moving standalone components from `declarations` to `imports` in NgModules.
- **Reason:** This was a frequent and repetitive error during the initial migration phases.
- **Status:** Implemented.

### Updated Skill Behavior: Optional Migration Prompts (18 → 19)
- **Description:** Migration skills must automatically choose the recommended/default option, or the first option if no default is shown, when Angular presents an optional migration prompt.
- **Reason:** The migration must never pause for user button presses.
- **Status:** Implemented.

### Updated Skill Behavior: Targeted Test Triage (18 → 19)
- **Description:** Unit-testing skills must start with the changed feature area or the first failing spec when the full suite becomes too broad or fails many modules at once.
- **Reason:** The full suite was too heavy for some migration steps and caused unhelpful all-module failures.
- **Status:** Implemented.

### Updated Skill Behavior: Build Warning Cleanup (18 → 19)
- **Description:** Build warnings tied to the migration must be treated as cleanup tasks or explicitly logged follow-ups instead of being ignored.
- **Reason:** The migration should not leave unresolved warning debt behind.
- **Status:** Implemented.
