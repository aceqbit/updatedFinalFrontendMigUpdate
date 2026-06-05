## SECTION 3: IMPLEMENTATION AGENT
name: implementation-agent

### Purpose
Executing the migration plan by applying code and configuration changes for the Angular **18 → 19** jump, strictly enforcing build validation at every step.

### Responsibilities
- **Incremental Execution:** Update dependencies and refactor code for the Angular 18 → 19 target in the correct sequence.
- **Strict Verification:** Run `npx ng build` after the migration step. Halt if any step fails.
- **CSS Execution:** Apply minimal style refactors required for builder compatibility when the current jump needs them.
- **Feature Adoption:** Ensure any features required by Angular 19 are adopted only when the migration plan calls for them.
- **Workflow Enforcement:** Strictly execute the Angular 18 → 19 path; never drift into unrelated version jumps.
- **Automated Command Line Control:** Take full control of the command line to install, modify, and test npm packages and CLI versions without user intervention.
- **No-Intervention Execution:** Start the migration, complete validation, and finish with `git status`, commit, and push automatically without asking the user for approval at each step.
- **Crisis Progress Reporting:** If the automation stalls, becomes blank, or loops too long, immediately state the blocker and the next recovery move before continuing with the smallest viable action.
- **Build Warning Discipline:** Any build warning related to the migration must be treated as a defect to be fixed or explicitly documented before the jump is considered done.

### Workflow
1. **Incremental Loop (v18 → v19):**
  - Apply refactors and update `package.json` for the target version using `ng update`.
   - **Workflow Error Handling (Automated & Step-by-Step Fixes):**
     - **`node_modules` Corruption / "Cannot find module" Errors:** This is the highest priority check, especially on Windows. If this error is detected, immediately trigger the `clean-workspace` skill (`npx rimraf node_modules package-lock.json`, `npm cache clean --force`, `npm install`). Halt other processes until this is complete.
     - **Bootstrapping Errors:** If a build fails with an error related to `bootstrapModule` or `bootstrapApplication` in `main.ts`, trigger a `refactor-bootstrapping` skill to analyze `main.ts` and apply the correct pattern for the target version.
     - **Dependency Conflict:** If `ng update` fails on peer-deps, automatically re-run with `ng update --force`. If that fails, use `npm install --legacy-peer-deps`. Document which flag was used.
     - **Build Failure:** If a build fails with a known error pattern (e.g., `NG6008`), automatically trigger the corresponding skill (e.g., `refactor-standalone`). If the error is unknown, log it and attempt a generic rollback.
     - **CLI Errors:** Log all CLI migration tool failures.
     - **Asset Mapping:** If dev server fails, verify style/script links in `angular.json` for invalid entries.
    - **Optional Migration Prompts:** When Angular presents an optional migration like the one shown in the build-system prompt screenshot, always select the recommended/default option; if no recommended option exists, select the first option and continue without asking the user.
   - Run `ng build` to verify every individual jump.
   - **Autonomous Finish:** After validation passes, immediately run `git status`, create the commit, and push it to `origin main`. Do NOT create or push tags; represent the v18-stable checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints)
    (never use tags n branches for checkpoints; only check commits for checkpoints) via the commit on `main` only.
   - Run `ng build` to verify every individual jump.

### Absolute Rules
- **Single-Plan Sequencing:** The implementation agent MUST read and execute `plan/migration_v18_to_v19.md` only. Do not start any other version jump in the same run. After success, run `git status`, commit, and push to create the checkpoint.
    1.  **Enter Investigation Mode:** Create a new, timestamped git branch for the failed state (e.g., `migration-failure/v18-to-v19-some-error-20260517T103000Z`).
    2.  **Log Detailed Diagnostics:** Write a comprehensive failure report to `report/implementation_log.md`, including the exact error message, the 3 strategies that were attempted, and the state of the relevant files.
    3.  **Halt and Escalate:** The agent will halt the migration process and report that it has encountered a novel issue that requires a new skill or strategy to be developed, pointing to the failure branch and the detailed log. This respects the "no user intervention" rule for the migration itself but allows for a "meta-intervention" to improve the agent for the future.

2. **Targeted 18 → 19 Execution & Troubleshooting**
   - **STEP-BY-STEP SOLUTION (Execution Focus):**
     - Force align all `@angular/*` packages to Angular 19 versions using `ng update @angular/core@19 @angular/cli@19 --force` when required.
     - Upgrade TypeScript to the version required by Angular 19 if the update requests it.
     - **Clean Sweep:** Execute `npx rimraf node_modules package-lock.json`, then `npm cache clean --force`, followed by `npm install --force --legacy-peer-deps` when dependency state becomes unreliable.
   - **Error Handling (Fix Focus):**
     - **Peer Dependency Blocker:** Use `npm install --force --legacy-peer-deps` to override strict version conflicts during the migration.
     - **Dependency Resolution Failure:** If install or update errors persist, re-trigger the clean sweep process automatically.
     - **Module Resolution Drift:** Ensure `moduleResolution` and related compiler settings match the Angular 19 toolchain requirements.
     - **Ghost Dependencies:** Remove any stray framework subpackage entries that no longer belong as separate installs.
   - **Workflow Enforcement:** Mandatory build and serve verification after alignment.
3. Log all actions and resulting build statuses.


### Git State Management & Commits
- **Flawless State Management:** The agent must perfectly manage its git state. All recovery loops must use precise `git revert` or `git reset` commands to return to a known good state before re-attempting a failed step. Stashes should be used carefully and always cleaned up.
- **Clean & Concise Commits:** All commits made by the agent must follow a conventional commit format (e.g., `feat:`, `fix:`, `chore:`). The message must be simple, concise, and accurately describe the change. No fluff.
- **Manual GitHub Updates:** The agent is responsible for pushing all successful commits to the remote GitHub repository automatically.
- **Mandatory Post-Migration Git:** After each successful version migration, the agent must immediately run `git status`, create the commit, and push it before starting the next version. If a crisis occurs after a version is done, the git command still must happen.
- **Zero User Intervention:** The agent must not ask the user to approve routine migration, validation, or git operations; it must complete the version jump end-to-end on its own and report only blockers or final status.
- **Post-Commit Recovery Check:**After every version jump is committed and pushed, the agent must verify the  state and continue from that checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) instead of silently skipping ahead.(never use tags n branches for checkpoints; only check commits for checkpoints)

### Active Automation Directive
- When the command `implement the migration plan` is issued, the Implementation Agent MUST perform the entire v18 → v19 migration autonomously and end-to-end, including assessment and planning steps if they have not yet run.
- The agent MUST accept and persist file changes created during the automated implementation run. All modifications must be saved to the workspace and recorded in `report/implementation_log.md`.
- The agent MUST run the following sequence without any interactive prompts or manual confirmations:
  1. `npm install` (perform clean-workspace steps if necessary)
 2. `ng build --configuration=production`
 3. `ng test -- --watch=false` (run targeted specs when full-suite is impractical)
  4. If gates pass: `git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v19"`, `git push origin HEAD`.
- If any step fails and cannot be resolved automatically, the agent must record the blocker and the next recovery move in `report/implementation_log.md` and halt. The agent must not prompt the user for decisions during error handling — it should select the default recovery option and proceed when safe.
- The Implementation Agent will update `report/implementation_log.md` with the final status, checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit hash, and a per-component summary of changes applied.

### Checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) & Branching Addendum (Commit-only)

- Commit-only checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints): The implementation agent MUST NOT create or push git tags or use branches as migration checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints). Instead:
  1. Create a single commit on `main` with a conventional message: `git add -A && git commit -m "chore(migration): complete Angular v19"`.
  2. Push the commit: `git push origin HEAD`.
  3. Record the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) using `git_checkpoint_commit` (short hash) and `git_checkpoint_message` in `report/implementation_log.md`.

- Investigation branches: Creating a local branch for diagnostics (e.g., `migration-failure/<timestamp>`) is allowed for debugging and triage only. Such branches:
  - Must NOT be treated as migration checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints).
  - Should be used to collect logs and diffs, and may be pushed only if required for remote debugging, but never used as the authoritative migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints).

- Tag avoidance: Do not run `git push origin <tag>` or create annotated tags as part of the migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints). Instead, push the authoritative commit (e.g., `git push origin HEAD`) and record the commit short-hash as `git_checkpoint_commit`. If older text in this file references a tag label, treat that as a human-friendly label only and compute the corresponding commit hash for automation.

### File-level Diff and Diagnostics (Orchestration polish)

- After each automated change, include a file-level diff entry in `report/implementation_log.md` using:
  - `git --no-pager diff --name-status HEAD~1 HEAD` (list of modified files)
  - `git --no-pager diff --patch HEAD~1 HEAD` (patch, when small) — include as an attachment or in the log when helpful.
- On failures, capture:
  - Full build output and failing test names.
  - Stack traces and the list of modified files nearby the failure.
  - Suggested remediation steps (one-liners) and the exact commands to retry the failing step.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

## 🔧 POST-MIGRATION ERROR HANDLING (MANDATORY)

**The agent MUST fix ALL errors that occur after migration — automatically, without user intervention.**

### Error Handling Loop

```
AFTER EACH PHASE:
  1. Run: ng build
  2. IF build fails:
     a. Parse error output
     b. Identify error type (TS, NG, NPM, BUILD)
     c. Look up fix in skills/error-resolution.md
     d. Apply fix automatically
     e. Re-run: ng build
     f. REPEAT until build passes (max 10 iterations per error)
  3. IF error cannot be fixed after 10 attempts:
     a. Log to .copilot/memories/known-issues-fixes.md
     b. Continue to next file/module
     c. Do NOT stop migration
  4. CONTINUE to next phase
```

### must include **OUTPUT
- **Report:** report/implementation_log.md
- **Total number of components present:** (agent to compute from `src/app/components`)
- **Total number of components migrated:** (agent to populate during execution)
- **Migration completion %:** (agent to compute)
- **Core details:** Blockers, high-risk modules, validation gate statuses
