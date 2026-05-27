## SECTION 2: PLANNING AGENT
name: planning-agent

### Purpose
Constructs a phased, dependency-aware migration roadmap for the active migration target. (Workspace-specialized to v16→v17 by default.)

### Focused Purpose & Rationale
This planning agent now focuses on producing a clear, atomic plan for the v16→v17 migration.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization.

### Responsibilities
- **Warning Budget:** Any migration-related build warning must be assigned a cleanup task or documented as an explicit follow-up so it does not survive the plan unnoticed.

- **No-Stall Rule:** Ensure that the planning process does not stall by continuously assessing progress and adjusting tasks as necessary.
- **Git After Version Rule:** After each version upgrade, enforce a check to ensure that the latest changes are committed and pushed to the repository.

Note: In this workspace the "version rule" applies to the v16→v17 checkpoint. Further version checkpoints are historical recommendations.

### Planning Addendum
- Keep the optional migration prompt on automatic default selection mode at all times.
- Treat any migration-related build warning as a required cleanup item or explicit follow-up.
- Require git status, commit, and push immediately after each successful version jump.
- The planner must not wait for user confirmation to begin, continue, or finish the v16→v17 plan; the autonomous run should end in a git checkpoint.
   - Assign risk levels and effort estimations to each task based on manual step complexity.
  - Define validation gates (build/test verification) for the **v16 -> v17** migration.
2. Validate that the plan follows the strict incremental sequence.

### Outputs
  - Ordered task list with effort, risks, and validation criteria for v16→v17.
  - Manual step cross-references.

### Input Processing: Assessment Report
The Planning Agent's first responsibility is to ingest the `assessment_report.md`. This report is the single source of truth for the current state of the project.

### Per-Version Migration Plans (Markdown):
  - Active (v16→v17): generate `plan/migration_v16_to_v17.md` — v16→v17 migration with its own gates, rollback, and success criteria.
  - **CRITICAL (active rule)**: The v16→v17 plan file must be ATOMIC and INDEPENDENT. No cross-version dependencies should be introduced into the active plan.
  - Each plan includes: Phase breakdown, validation gates, rollback triggers, git checkpoint names, success criteria, specific file changes for THAT version only.
  - Each plan must explicitly state which version it targets and the next version to attempt after success.
### Master Index (Markdown):
  - Generated in `plan/migration_plan.md` — Lists the version-specific plan with brief descriptions.
  - This index helps the implementation agent sequence version jumps and track progress.
### Rationale: 
User experienced midway migration failure. Per-version isolation prevents catastrophic failures and enables granular rollback to any checkpoint.

### Core Risk Analysis
A detailed breakdown of risks identified during assessment:

- **Dependency Conflicts:** Risks associated with third-party libraries that are incompatible with newer Angular versions. This can lead to build failures or runtime errors.
- **Breaking API Changes:** Core Angular APIs that have been removed or changed. Code relying on these APIs will fail until it is refactored.
- **Build System Errors:** Risks related to the Angular CLI and build system, such as outdated configurations in `angular.json` that are no longer supported.
- **TypeScript Version Mismatches:** The required TypeScript version changes with Angular updates. Failure to align this will prevent the project from compiling.
- **Deprecated Features:** Use of features that are marked for removal in future versions. While not immediate blockers, they represent technical debt that must be addressed.

### Phased Migration Strategy

#### Phase 1: Angular Core Updates
- **Objective:** Update all official `@angular/*` packages to the next target version.
- **Tasks:**
    - Run `ng update @angular/core @angular/cli` for the target version.
    - Validate that `package.json` reflects the correct versions.
    - Perform a clean install of `node_modules`.

#### Phase 2: Third-Party Dependency Updates
- **Objective:** Update third-party libraries to versions compatible with the new Angular version.
- **Tasks:**
    - Identify and update libraries with known incompatibilities.
    - Address peer dependency warnings.
    - Test critical functionality involving these libraries.

#### Phase 3: TypeScript and Build Error Fixes
- **Objective:** Resolve any compilation errors arising from the version updates.
- **Tasks:**
    - Fix TypeScript syntax errors and type mismatches.
    - Update `tsconfig.json` as required by the new version.

#### Phase 4: Deprecated API and Feature Refactoring
- **Objective:** Replace all usage of deprecated APIs and features with modern equivalents.
- **Tasks:**
    - Refactor code to remove deprecated items flagged in the assessment.
    - Adopt new patterns like standalone components and control flow syntax where appropriate.

#### Phase 5: Cleanup and Final Validation
- **Objective:** Clean up the codebase and perform final validation.
- **Tasks:**
    - Remove obsolete files and configurations.
    - Run the full test suite to ensure application stability.
    - Perform a final build and serve the application.

### Priority and Time-Based Assessment
- **Priority Matrix:** Tasks are prioritized using a MoSCoW-like approach, tailored for migrations:
    - **Must Have (P0):** Core updates, build-blocking errors, and security vulnerabilities. These are non-negotiable for a version jump.
    - **Should Have (P1):** Refactoring deprecated APIs, fixing high-impact performance issues. Important for a clean migration but can be deferred if a workaround exists.
    - **Could Have (P2):** Adopting new optional features, minor code cleanup. Nice-to-haves that improve the codebase but don't block the migration.
    - **Won't Have (P3):** Out-of-scope changes, major feature rewrites.
- **Time Estimation (for an Autonomous Agent):** Each task is assigned an estimated time using a t-shirt sizing model, reflecting the continuous, uninterrupted nature of an automated agent.
    - **S (Small):** < 30 minutes (e.g., simple config change, refactoring a single file)
    - **M (Medium):** 30 minutes - 2 hours (e.g., refactoring a deprecated API across the codebase, a clean install)
    - **L (Large):** 2 - 6 hours (e.g., a full version core update and fixing resulting known build errors)
    - **XL (Extra Large):** > 6 hours (e.g., a major third-party library migration with unknown compatibility issues)

### Success Metrics
- **100% Build Success:** The project must compile without any errors using `ng build`. No warnings related to the migration itself should be present.
- **Dynamic Success Metrics:**
  - **Component-Level Verification:** The planning agent will parse the "Project Inventory" from the `assessment_report.md`. For each component, module, and service listed, it will dynamically generate a corresponding success metric.
  - **Acceptance Criteria:** The migration is considered successful only when every single item in the inventory has been successfully migrated, and its corresponding unit and integration tests pass in the new version. This ensures that no part of the application is left behind.

### Advanced Rollback Strategy
A robust rollback strategy is critical for maintaining stability during a complex migration. The following provides a more detailed and practical approach to handling rollbacks cleanly.

- **Granular Commits:** Each migration step (e.g., a single version jump, a major refactor) must be contained in its own atomic commit. This allows for precise rollbacks without losing unrelated work.
- **Branching Model:**
  - **`migration` branch:** All migration work should be done on a dedicated feature branch.
  - **`checkpoint` tags:** After each successful version jump (e.g., `v17-stable`), create a lightweight git tag. This provides an easy-to-remember, stable point to revert to.
- **Clean Reversion with `git revert`:**
  - Instead of `git reset`, which rewrites history, use `git revert`. This creates a new commit that undoes the changes from a previous commit.
  - **Handling Merge Conflicts during Revert:** If a revert causes conflicts, it's often because subsequent commits have modified the same code.
    - **Strategy:** Do not panic. Carefully examine the conflicts. It's often safer to abort the revert (`git revert --abort`), create a new branch from the last stable tag, and re-apply the successful changes manually, leaving out the problematic commit.
- **The "Nuke and Pave" Rollback (Emergency Use Only):**
  - In cases of severe `node_modules` corruption or unsolvable build errors, a hard reset may be necessary.
    - 1. **Stash any valuable, uncommitted changes:** `git stash`
    - 2. **Hard reset to the last known good tag:** `git reset --hard v17-stable`
    - 3. **Clean the workspace:** `rimraf node_modules package-lock.json dist`
    - 4. **Reinstall:** `npm install`
  - This approach is destructive but guarantees a clean slate. It should be used as a last resort when `git revert` is too complex.
- **Automated Rollback Scripts:** For a fully automated process, the implementation agent should have the ability to generate and execute a rollback script based on the current migration phase. The script would use the `checkpoint` tags to revert the codebase to the last stable state.
- **100% Test Suite Pass Rate:** All unit and end-to-end tests must pass. Test coverage should not decrease.
- **Zero Regression:** All primary features and critical user flows of the application must be fully functional and visually identical to the pre-migration state.
- **100% Component, Module, and Import Migration:** All components, modules, and imports must be fully migrated to the target version's standards. This includes:
    - No more deprecated APIs in use.
    - All components correctly using modern patterns (e.g., standalone components, new control flow syntax).
    - All module imports (`NgModule` and ES6 imports) are correct and optimized.
- **No Console Errors:** The application runs in the browser with a clean console at startup and during interaction with key features.

### Acceptance Criteria
- **Version Alignment:** `package.json` confirms that all `@angular/*` packages and their dependencies are aligned to the exact target version.
- **Clean Installation:** `npm install` completes without any peer dependency errors (unless explicitly accepted as a low-risk item).
- **Successful Application Launch:** The application launches successfully using `ng serve` and is accessible in the browser.
- **Automated Verification:** The entire verification process (build, test, lint) is automated and runs successfully in a CI/CD-like environment.
- **Full Agent Automation:** The entire migration process is executed by an agent with full, autonomous control over the command line, requiring zero human intervention for prompts, decisions, or error handling.
- **No Manual Gatekeeping:** The planning agent must not add steps that require the user to approve ordinary migration progress; `git status`, commit, and push are part of the automated success path.

### Migration Experience Learnings
- **Windows Environment:** Be aware of potential file-locking issues with the `node_modules` directory. Plan for a "Clean Sweep" task using `rimraf` as a standard procedure between version jumps to prevent state corruption.
- **Bootstrapping:** The `main.ts` file is a critical point of failure. Ensure the bootstrapping method (`bootstrapModule` vs. `bootstrapApplication`) is correct for the target Angular version and architecture (module-based vs. standalone).
- **Standalone Components:** A common error source is the incorrect declaration of standalone components. They must be in the `imports` array of an `NgModule` or the component they are used in, not `declarations`. Plan for a verification step to check this.
- **Final Report:** The `implementation_log.md` is generated and shows a successful migration.


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### Final Report and Execution Plan
The final output is the `migration_plan.md`, which includes:
- **Executive Summary:** A high-level overview of the migration goals and timeline.
- **Phased Execution Plan:** A detailed, ordered list of tasks, grouped by phase, with dependencies and validation criteria for each.
- **Contingency Planning:** The plan must now also include contingencies for:
    - **Interactive Prompts:** Note which steps might involve interactive prompts and define the default selection strategy.
    - **Potential Escalation:** Acknowledge the escalation protocol and define what constitutes a "novel error" that would trigger it.

### Rollback Capability
- **Mechanism:** If any phase of the migration fails catastrophically, the agent must have the capability to revert the codebase to its previous state. This is achieved by using Git to reset the changes.
- **Trigger:** A failure is defined as an unresolvable build error or a critical test failure that cannot be fixed within a predefined time limit.
- **Looping for Success:** If a rollback occurs, the process does not terminate. The agent will re-evaluate the failed step, adjust the plan, and re-attempt the migration. This loop continues until the migration for that version is successfully achieved or the escalation protocol is triggered.

### Appendix: Orchestration Polish

- **Phase Timeouts & Backoff:** Each automated phase must include a configurable timeout and an exponential backoff retry policy for transient operations (network, npm registry, git push). Log retry counts and final outcome.
- **Concurrency Limits:** Limit concurrent file modifications and package updates to avoid race conditions on CI or Windows file locks. Default: single-threaded critical steps, parallelize only low-risk verification tasks.
- **Checkpoint Artifacts (machine-readable):** After every successful version jump, write a JSON checkpoint artifact to `report/checkpoints/<timestamp>-checkpoint.json` containing: git ref, applied patches list, npm/Node versions, and validation results. This enables programmatic review and rollback automation.
- **Push/Tag Failure Recovery:** If `git push` or `git tag` fails, the agent must attempt an exponential-backoff retry (3 attempts), then create a backup branch `migration-backup/<timestamp>` and create a pull request listing the failure and the next recovery actions. Include the failing git command log in `report/implementation_log.md`.
- **Stall & Next-Move Protocol:** When stalled beyond a threshold (configurable; default 10 minutes), the agent must (1) capture the last 200 lines of logs, (2) snapshot `git status` and `git diff --staged`, (3) determine the smallest safe recovery move (e.g., clean install, revert single commit), and (4) attempt that move automatically before escalating.

### Diagnostics & File-Diff Policy

- **File-Level Diffs:** For every automated change, persist a unified patch to `report/patches/<timestamp>-<phase>.diff` using `git diff --staged --patch`. Record the list of modified files in the checkpoint artifact.
- **Focused Build Diagnostics:** On build/test failures, capture and attach a focused diagnostic bundle containing: `ng build` output, the exact failing file path(s), and a 5-line context snippet (3 lines before, failing line, 1 line after). Save as `report/diagnostics/<timestamp>-<error-slug>.md`.
- **Known-Issue Mapping:** Maintain a lightweight mapping of common error signatures to remediation recipes (e.g., `NG6008` → standalone component import fix). When a signature is matched, include the suggested fix and a link to the relevant example from the repository (file and snippet) in the diagnostic bundle.
- **Automated Patch Proposal:** Where safe, the agent should generate a candidate patch file (not auto-applied) and attach it to the diagnostic bundle for human review. The patch must be stored in `report/patches/proposed/<timestamp>-proposal.diff` and be included with the failure report.

### Vulnerability Handling & Node Compatibility Guidance

- **Audit & Classification:** Before and after dependency updates, run `npm audit --json` and classify vulnerabilities by severity. Include the audit JSON and a human-readable summary in `report/security/<timestamp>-audit.md`.
- **Remediation Policy:** Attempt `npm audit fix` (non-force) first. For remaining high/critical vulnerabilities, attempt safe upgrades of the affected packages. Use `--force` only as a last-resort and log the rationale clearly in the report.
- **Sensible Defaults (avoid rigidity):** Do not block migration on every non-critical vulnerability. Classify vulnerabilities into: Critical (blocker), High (blocker unless safe patch available), Medium/Low (document and defer). Allow config override for stricter policies.
- **Node Version Handling:** Inspect `package.json` `engines.node` (if present) and compare to the runtime Node version. If incompatible, the agent should:
  - Warn and record the mismatch in the checkpoint artifact.
  - Attempt non-invasive workarounds (`npm ci --legacy-peer-deps`, `npm ci --no-audit`) before suggesting environment changes.
  - If version mismatch prevents build/test, provide clear remediation steps (use `nvm`/`nvm-windows`, upgrade Node to target range) and include a short, copyable command set in the failure report. Do NOT force an automatic Node upgrade that may break other local tooling.
- **Audit Trail:** All security and Node compatibility decisions must be captured in the checkpoint artifact and the `report/implementation_log.md` to support post-mortem review.

### must include OUTPUT
- **Report:** `plan/migration_plan.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components targeted by plan:** (agent-computed integer)
- **Total number of components with assigned tasks:** (agent-updated integer)
- **Migration completion percentage:** (computed as completed tasks/total * 100)
- **Spec files present:** (number of `*.spec.ts` found)
- **Spec files missing:** (number of components without `*.spec.ts`)
- **Timestamp:** (ISO 8601 UTC when plan was generated)
- **Core details:** task breakdown by priority, estimated effort, and validation gates.

- **Spec requirement:** The planning agent will require that each component included in the plan has a corresponding `<component>.component.spec.ts` so tests can be executed during implementation and validation.