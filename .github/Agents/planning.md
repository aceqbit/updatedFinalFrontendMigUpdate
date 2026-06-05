## SECTION 2: PLANNING AGENT
name: planning-agent

### Purpose
Constructs a phased, dependency-aware migration roadmap for the Angular **18 → 19** migration, strictly enforcing the single upgrade step in scope.

### Responsibilities
- **Warning Budget:** Any migration-related build warning must be assigned a cleanup task or documented as an explicit follow-up so it does not survive the plan unnoticed.
- **No-Stall Rule:** Ensure that the planning process does not stall by continuously assessing progress and adjusting tasks as necessary.
- **Git After Version Rule:** After the 18 → 19 upgrade, enforce a check to ensure that the latest changes are committed and pushed to the repository.

ote: In this workspace the "version rule" applies to the v18→v19 checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints). Further version checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints) are historical recommendations.

### Planning Addendum
- Keep the optional migration prompt on automatic default selection mode at all times.
- Treat any migration-related build warning as a required cleanup item or explicit follow-up.
- Require git status, commit, and push immediately after the successful 18 → 19 jump.
- Assign risk levels and effort estimations to each task based on manual step complexity.
- Define validation gates (build/test verification) for the migration step.
2. **Angular 18 → 19 Migration Roadmap**
   - **SEQUENCING & RISK PLANNING:**
     - 1. Final Alignment: Group all `@angular/*` packages for a single-shot alignment to Angular 19.
     - 2. Dependency Review: Check third-party libraries for Angular 19 compatibility before applying the upgrade.
     - 3. Clean Workspace: Plan the removal of `node_modules` and `package-lock.json` if install corruption appears.
     - 4. Final Build: Enforce build validation after the upgrade.
     - 5. Optional Prompt Handling: Always select the recommended/default option automatically and continue without asking the user.
   - **Workflow Enforcement:**
     - Log mandatory validation gates to prevent bypassing steps.
     - After the successful jump, require git status, commit, and push before the work is considered complete.
3. Validate that the plan follows the 18 → 19 sequence.

### Input Processing: Assessment Report
The Planning Agent's first responsibility is to ingest the `assessment_report.md`. This report is the single source of truth for the current state of the project.

### Per-Version Migration Plans (Markdown):
  - Active (v18→v19): generate `plan/migration_v18_to_v19.md` — v18→v19 migration with its own gates, rollback, and success criteria.
  - **CRITICAL (active rule)**: The v18→v19 plan file must be ATOMIC and INDEPENDENT. No cross-version dependencies should be introduced into the active plan.
  - Each plan includes: Phase breakdown, validation gates, rollback triggers, git checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) names(never use tags n branches for checkpoints; only check commits for checkpoints), success criteria, specific file changes for THAT version only.
  - Each plan must explicitly state which version it targets and the next version to attempt after success.
### Master Index (Markdown):
  - Generated in `plan/migration_plan.md` — Lists all version-specific plans with brief descriptions.
  - This index helps the implementation agent sequence version jumps and track progress.
### Rationale: 
User experienced midway migration failure. Per-version isolation prevents catastrophic failures and enables granular rollback to any checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints).

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
Note: In this workspace the "version rule" applies to the v18→v19 checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints). Further version checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints) are historical recommendations.
    - Run `ng update @angular/core @angular/cli` for the target version.
    - Validate that `package.json` reflects the correct versions.
- **Tasks:**
  - Define validation gates (build/test verification) for the **v18 -> v19** migration. (Historical: multi-version gates are documented for larger migrations.)
  - The planner must not wait for user confirmation to begin, continue, or finish the v18→v19 plan; the autonomous run should end in a git checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints).
    - Test critical functionality involving these libraries.

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

#### Phase 4b: Targeted Runtime Verification
- **Objective:** Verify that components touched by the migration still behave correctly at runtime.
- **Tasks:**
    - For each component flagged in the assessment report:
      1. Locate the async callback or mutation pattern, if one exists.
      2. Add the smallest appropriate fix or note required by the migration plan.
      3. Add unit tests that cover the changed behavior.
      4. Verify the fix with `ng build` and targeted runtime testing.
    - This is a **P0 (Must Have)** task for any component directly affected by the migration.
    - Document each fix in the implementation log with the pattern used and the line numbers modified.

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
- **Branching Model:** Instead of using tags for checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints), the agent should commit to the main branch n not extra branches with clear commit messages that indicate the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints). This way, the commit history itself serves as the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) system.
- **Clean Reversion with `git revert`:**
  - Instead of `git reset`, which rewrites history, use `git revert`. This creates a new commit that undoes the changes from a previous commit.
  - **Handling Merge Conflicts during Revert:** If a revert causes conflicts, it's often because subsequent commits have modified the same code.
    - **Strategy:** Do not panic. Carefully examine the conflicts. It's often safer to abort the revert (`git revert --abort`), create a new branch from the last stable checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints), and re-apply the successful changes manually, leaving out the problematic commit and finally merging back to main. This way, you maintain a clean history and avoid the complexities of reverting a revert.
- **The "Nuke and Pave" Rollback (Emergency Use Only):**
  - In cases of severe `node_modules` corruption or unsolvable build errors, a hard reset may be necessary.
    - 1. **Stash any valuable, uncommitted changes:** `git stash`
    - 2. **Hard reset to the last known good commit:** `git reset --hard <git_checkpoint_commit>`
    - 3. **Clean the workspace:** `rimraf node_modules package-lock.json dist`
    - 4. **Reinstall:** `npm install`
  - This approach is destructive but guarantees a clean slate. It should be used as a last resort when `git revert` is too complex.
- **Automated Rollback Scripts:** For a fully automated process, the implementation agent should have the ability to generate and execute a rollback script based on the current migration phase. The script would use the `checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints)` commits (never use tags n branches for checkpoints; only check commits for checkpoints) to revert the codebase to the last stable state.
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

### Active Automation Directive
- When the user issues `implement the migration plan`, the planning agent MUST generate or validate the `plan/migration_v18_to_v19.md` per-component checklist and ensure the plan enforces end-to-end autonomous execution. The planning agent must mark required validation gates, git checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) steps(never use tags n branches for checkpoints; only check commits for checkpoints), and rollback procedures. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

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

---
### Checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) & Rollback Addendum (Commit-first policy)

- Policy: The authoritative migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) must be a commit on `main` (commit message + commit hash). Do NOT create or rely on git tags as the canonical checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints).
- Automated rollback guidance:
  1. Locate the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit by commit message: `git rev-list -n 1 --grep="chore(migration): complete Angular v19" --all`
  2. Reset to the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit: `git reset --hard <commit-hash>`
  3. Clean and reinstall: `npx rimraf node_modules package-lock.json && npm install`

- Notes: If any existing text references a tag-based reset (e.g., `git reset --hard <tag>`) or similar tag-based operations, replace the tag usage with a commit-hash based reset. Compute the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit (e.g., via `git rev-list -n 1 --grep="chore(migration): complete Angular v19" --all`) and run `git reset --hard <git_checkpoint_commit>`. Store `git_checkpoint_commit` (short hash) in the plan metadata for deterministic automation.

### Diagnostics & File-Diff Policy

- **File-Level Diffs:** For every automated change, persist a unified patch to `report/patches/<timestamp>-<phase>.diff` using `git diff --staged --patch`. Record the list of modified files in the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) artifact.
- **Focused Build Diagnostics:** On build/test failures, capture and attach a focused diagnostic bundle containing: `ng build` output, the exact failing file path(s), and a 5-line context snippet (3 lines before, failing line, 1 line after). Save as `report/diagnostics/<timestamp>-<error-slug>.md`.
- **Known-Issue Mapping:** Maintain a lightweight mapping of common error signatures to remediation recipes (e.g., `NG6008` → standalone component import fix). When a signature is matched, include the suggested fix and a link to the relevant example from the repository (file and snippet) in the diagnostic bundle.
- **Automated Patch Proposal:** Where safe, the agent should generate a candidate patch file (not auto-applied) and attach it to the diagnostic bundle for human review. The patch must be stored in `report/patches/proposed/<timestamp>-proposal.diff` and be included with the failure report.

### Autonomous Invocation & Strict Enforcement (Append Only)
- When `implement the migration plan` is issued, the Planning Agent MUST execute automatically to produce or refresh `plan/migration_v18_to_v19.md` and any required per-component checklists. No user confirmation is allowed.
- The Planning Agent must record the progress update: "package files updated and timer-based components fixed to trigger change detection" in its planning memory and include the two next-step options (A and B) in the plan metadata.
- The plan must include a mandatory checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) sequence that the Implementation Agent will follow: `npm install`, `ng build`, `ng test -- --watch=false`, `git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v19"`, `git push`.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Outputs
  - Ordered task list with effort, risks, and validation criteria.
  - Detailed v18 → v19 transition sequence.
  - Manual step cross-references.

### must include **OUTPUT
- **Report:** plan/migration_plan.md
- **Total number of components present:** (planning agent to compute from assessment inventory)
- **Total number of components migrated:** (planning agent to track during execution)
- **Migration completion %:** (planning agent to compute)
- **Core details:** Planned phases, validation gates, per-component risk assignments
