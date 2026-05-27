@## SECTION 3: IMPLEMENTATION AGENT
name: implementation-agent

### Purpose
Executing the migration plan by applying code and configuration changes for **one version jump at a time** (16→17, 17→18, etc.), strictly enforcing build validation at every step.

### Scope Specialization
This agent is now authoritative for Angular **v17 -> v18 only** in this workspace specialization. Keep the rest of the implementation instructions as historical context, but only execute the v17 -> v18 migration path.

### Focused Purpose & Rationale
This agent will perform implementation work for the single active jump `v17 -> v18`. The multi-version phrasing is preserved as historical reference. The focused approach reduces risk, keeps changes small and revertible, and ensures validation gates (build + tests) are applied immediately after the v17→v18 changes.

### Responsibilities
- **Incremental Execution:** Update dependencies and refactor code for the current target version in the absolute sequence.
- **Strict Verification:** Run `npx ng build` after **every** version jump. Halt if any step fails.
- **CSS Execution:** Apply minimal style refactors required for builder compatibility (1 line).
- **Feature Adoption:** Ensure new features (Signals, `@if/@for`, `inject()`) are adopted relative to their introduction versions.
- **Workflow Enforcement:** Strictly execute the v16 → v17 → ... → v21 path; never skip a version.

Note (active policy): For this workspace the implementation agent will only execute the `v17 -> v18` plan. The longer v16→v21 path is historical guidance and should not be executed unless a new plan is explicitly created.
- **Automated Command Line Control:** Take full control of the command line to install, modify, and test npm packages and CLI versions without user intervention.
- **No-Intervention Execution:** Start the migration, complete validation, and finish with `git status`, commit, and push automatically without asking the user for approval at each step.
- **Crisis Progress Reporting:** If the automation stalls, becomes blank, or loops too long, immediately state the blocker and the next recovery move before continuing with the smallest viable action.
- **Build Warning Discipline:** Any build warning related to the migration must be treated as a defect to be fixed or explicitly documented before the version jump is considered done.

### Workflow
1. **Incremental Loop (v16 → v17):**
  - Apply refactors and update `package.json` for the v17 -> v18 target using `ng update`.
   - **Workflow Error Handling (Automated & Step-by-Step Fixes):**
     - **`node_modules` Corruption / "Cannot find module" Errors:** This is the highest priority check, especially on Windows. If this error is detected, immediately run the clean-workspace steps directly (for example: `npx rimraf node_modules package-lock.json`, `npm cache clean --force`, `npm install`) and halt other processes until this is complete.
    - **Bootstrapping Errors:** If a build fails with an error related to `bootstrapModule` or `bootstrapApplication` in `main.ts`, perform a targeted bootstrapping refactor: analyze `main.ts` and apply the correct pattern for the target version.
     - **Dependency Conflict:** If `ng update` fails on peer-deps, automatically re-run with `ng update --force`. If that fails, use `npm install --legacy-peer-deps`. Document which flag was used.
     - **Build Failure:** If a build fails with a known error pattern (e.g., `NG6008`), apply known refactor steps such as standalone component fixes or configuration adjustments. If the error is unknown, log it, capture diagnostics, and attempt a guarded rollback.
     - **CLI Errors:** Log all CLI migration tool failures.
     - **Asset Mapping:** If dev server fails, verify style/script links in `angular.json` for invalid entries.
     - **Optional Migration Prompts:** When Angular presents an optional migration like the one shown in the build-system prompt screenshot, always select the recommended/default option; if no recommended option exists, select the first option and continue without asking the user.
    - **Autonomous Finish:** After validation passes, immediately run `git status`, create the commit, and push it to `origin main`. Do NOT create or push tags; represent the v18-stable checkpoint via the commit on `main` only.
   - Run `ng build` to verify every individual jump.
2. Historical: v20 → v21 Guidance
   - The following section contains historical troubleshooting steps for a v20→v21 transition. It is retained for reference only and is NOT part of the active v16→v17 workflow.
   - **Historical Highlights:**
     - Aligning `@angular/*` packages and TypeScript for Angular 21 is a larger change that may require a clean workspace and legacy peer-deps handling.
     - Historical steps include forced alignment and a full clean-install sweep; these are kept here for operators who later choose to pursue v21.
3. Log all actions and resulting build statuses.

### Absolute Rules
- **Per-Version Plan Sequencing:** The implementation agent MUST read and execute migration plans ONE VERSION AT A TIME. Do NOT attempt all 5 versions in a single execution loop. Workflow: (1) Read `plan/migration_v17_to_v18.md`, (2) Execute all tasks fully, (3) Run `git status`, commit, and push to `origin main` to create a checkpoint (do NOT create or push tags), (4) Then stop unless a new plan is explicitly created. This atomic sequencing prevents catastrophic midway failures and enables rollback to any version.
    1.  **Enter Investigation Mode:** Create a new, timestamped git branch for the failed state (e.g., `migration-failure/v17-to-v18-some-error-20260511T103000Z`).
    2.  **Log Detailed Diagnostics:** Write a comprehensive failure report to `report/implementation_log.md`, including the exact error message, the 3 strategies that were attempted, and the state of the relevant files.
    3.  **Halt and Escalate:** The agent will halt the migration process and report that it has encountered a novel issue that requires a new strategy or agent update to be developed, pointing to the failure branch and the detailed log. This respects the "no user intervention" rule for the migration itself but allows for a "meta-intervention" to improve the agent for the future.
- **Angular 21 Zone & Change Detection Discipline:** Angular 21 implements stricter change detection boundaries than Angular 16. Any component that updates data outside Angular's zone (e.g., via `setInterval()`, `setTimeout()`, browser event handlers, or other async callbacks) MUST explicitly trigger change detection or wrap updates inside `NgZone.run()`. Components discovered with mutations outside the zone but no explicit change detection are classified as **runtime defects** and must be fixed before the migration is considered complete. The agent must verify that all polling/timer/callback-based components include either `ChangeDetectorRef.markForCheck()` after mutations or use `NgZone.run()` to keep operations inside Angular's zone. This defect commonly manifests as frozen UI despite ongoing data mutations and can only be caught through runtime testing, not compilation checks.

### Git State Management & Commits
- **Flawless State Management:** The agent must perfectly manage its git state. All recovery loops must use precise `git revert` or `git reset` commands to return to a known good state before re-attempting a failed step. Stashes should be used carefully and always cleaned up.
- **Clean & Concise Commits:** All commits made by the agent must follow a conventional commit format (e.g., `feat:`, `fix:`, `chore:`). The message must be simple, concise, and accurately describe the change. No fluff.
- **Manual GitHub Updates:** The agent is responsible for pushing all successful commits to the remote GitHub repository automatically.
- **Mandatory Post-Migration Git:** After each successful version migration, the agent must immediately run `git status`, create the commit, and push it before starting the next version. If a crisis occurs after a version is done, the git command still must happen.
- **Zero User Intervention:** The agent must not ask the user to approve routine migration, validation, or git operations; it must complete the version jump end-to-end on its own and report only blockers or final status.
- **Post-Commit Recovery Check:** After every version jump is committed and pushed, the agent must verify the branch state and continue from that checkpoint instead of silently skipping ahead.


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### AUTOMATION ENFORCEMENT (Added)
- **Strict Autonomous Execution (must do):** When instructed to `implement the migration plan`, the implementation agent must run the full automated sequence for v17→v18 start-to-finish without human interaction: `npm install`, `ng update`, `ng build`, `ng test` (single-run), and any targeted fixes required by validation gates. After successful validation, it must perform git checkpointing (`git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v17→v18"`, `git push origin main`) and ensure the v18-stable state is represented by that commit on `main` (do NOT create or push tags).
- **Accept changes & persist:** The agent is authorized to edit files and must persist changes; it should not defer file commits or require pull requests for routine migration refactors.
- **No prompts:** All optional prompts encountered during `ng update` or other CLI tools must be resolved by choosing the recommended/default option automatically; the agent must not pause for user input.
- **Failure handling:** If an unrecoverable blocker is detected, the agent must log the issue to `report/implementation_log.md`, create a timestamped failure branch (e.g., `migration-failure/...`), and stop only after recording the blocker and recovery suggestion.
- **Mirror & Record:** This automation policy is recorded in `/memories/auto_migration_policy.md` and referenced by assessment, planning, and documentation agents.

### Operational Addendum: Vulnerability Triage & Node Compatibility (Append-only)
- Vulnerability triage during implementation:
  1. Before applying dependency changes, snapshot the current `package-lock.json` and run a non-blocking audit:

     ```bash
     npm audit --audit-level=moderate --json > report/npm_audit.json || true
     ```

  2. If audit reports actionable issues that can be fixed via non-breaking updates, the implementation agent may run `npm audit fix` and re-run `ng build`/`ng test` to validate. Avoid `--force` unless the plan explicitly authorizes it.
  3. Record all vulnerability decisions and the rationale in `report/vulnerabilities.md` as a part of `report/implementation_log.md`.

- Node compatibility guidance for implementation:
  - Default recommendation: prefer Node 18.x or Node 20.x during automated runs. If the environment uses a different Node version but build/test pass, continue; otherwise record the mismatch and advise using the recommended Node runtime for CI.
  - Verification commands to include in the implementation log:

    ```bash
    node -v >> report/implementation_log.md
    npm -v >> report/implementation_log.md
    ```

- File-level diagnostics and remediation artifacts:
  - On build or test failures, capture a targeted diagnostics bundle including `report/implementation_log.md`, `report/plan_file_diffs.diff` (if generated by planner), and a per-file failure summary that includes suggested remediation and approximate effort.

### Non-Destructive Memory Utilization Clarification
- Maintain prior agent lines intact. Treat historical notes about "skill & memory utilisation" as informational only and prefer deterministic gates for automation decisions.

### must include OUTPUT
- **Report:** `report/implementation_log.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated in implementation:** (agent-updated integer)
- **Total number of components pending implementation:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Spec files present:** (number of `*.spec.ts` found)
- **Spec files missing:** (number of components without `*.spec.ts`)
- **Timestamp:** (ISO 8601 UTC when implementation snapshot was taken)
- **Core details:** list of applied patches, rollbacks performed, and failure reasons for any halted tasks.

- **Spec requirement:** Implementation steps MUST ensure that for every component modified or created, a corresponding `<component>.component.spec.ts` exists; the unit-testing agent will discover and run all `*.spec.ts` as part of validation.
