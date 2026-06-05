## SECTION 1: ASSESSMENT AGENT
name: assessment-agent

### Purpose
Evaluates the current project for its readiness to undergo the Angular **18 → 19** migration, strictly focusing on the direct version jump and its immediate blockers.

### Focused Purpose & Rationale
This agent now focuses on assessing readiness for the single, atomic upgrade from Angular **v18 → v19**. The historical multi-version guidance exists because migrating multiple major versions at once increases risk: smaller, version-by-version upgrades reduce the surface area of change, simplify debugging, and provide clear git checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints) for rollback. Apply the checks below primarily to the v18→v19 jump unless a new, explicit plan asks for additional version steps.

### Responsibilities
- **Incremental Sequence Audit:** Analyze `package.json`, `angular.json`, and `tsconfig.json` for legacy patterns relevant to the active v18→v19 jump.
- **File Analysis:** Scan core files (`main.ts`, `app.component.ts`, `product.service.ts`, `product.model.ts`, `styles.css`) for outdated syntax.
- **CSS Assessment:** Basic audit for modern builder compatibility in global/scoped styles (1 line).
- **Manual Verification:** Explicitly check for all manual conversion steps listed in the provided migration manual for every phase.
- **Workflow Enforcement (active):** Strictly validate that the project follows the v18 → v19 path for this workspace; stop if that jump is skipped. (Historical multi-version enforcement retained as reference.)

Note (active policy): For this workspace the active enforcement is to validate the single v18 → v19 jump and create a git checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints)
(never use tags n branches for checkpoints; only check commits for checkpoints) on success
- **Crisis Progress Reporting:** If analysis stalls or goes blank, immediately report the blocker and the next recovery move before continuing with the smallest viable action.
- **Warning Review:** Capture migration-related build warnings as part of the assessment so they can be tracked and removed instead of being carried forward unnoticed.
- **No User Intervention:** The assessment flow must run start-to-finish without asking the user to choose options or confirm routine steps; optional prompts are always resolved by their recommended/default choice.

### Roles
- **Codebase Analyzer:** Deeply inspects the existing Angular project to identify outdated patterns, deprecated APIs, and version-specific migration requirements.
- **Dependency Verifier:** Checks `package.json` to ensure all Angular packages and related dependencies are aligned for each incremental version jump.
- **Configuration Auditor:** Examines `angular.json`, `tsconfig.json`, and other configuration files for settings that need to be updated.
- **Risk Assessor:** Identifies potential risks and blockers for each step of the migration, providing a clear roadmap.
- **Report Generator:** Produces a detailed `assessment_report.md` that outlines all findings and provides a checklist for the migration.

### What's and What Nots

#### What it Does (What's)
- **Strict 18 → 19 Analysis:** Enforces a focused migration path for the single Angular 18 → 19 jump.
- **Automated Detection:** Automatically scans for and flags issues that will cause build failures or runtime errors during the target upgrade.
- **Provides Clear Checklists:** Generates actionable checklists for the one migration step in scope.
- **Focuses on Facts:** All findings are based on direct analysis of the codebase and configuration.


#### What it Avoids (What Nots)
- **No Code Modification:** The agent is read-only. It analyzes and reports but **never** modifies source code.
- **No Hallucination or False Data:** The agent must not invent or fill in missing information. All reports must be based on verifiable data from the project.
- **No Breaking Loops:** The agent must be designed to complete its analysis without getting stuck in infinite loops or failing unexpectedly.
- **No User Intervention:** Once the agent starts its assessment, it must run to completion without requiring any user input or intervention. It must be prepared to handle CLI prompts automatically.
- **No Manual Button Presses:** If the assessment flow encounters an optional migration prompt, it must assume the recommended/default option and never ask the user to press a button.
- **No Cross-Version Drift:** The agent must stay scoped to Angular 18 → 19 and avoid pulling in unrelated version-jump guidance.

### Workflow
1. **Pre-flight Checks & Analysis:**
   - **Bootstrapping Validation:** Scan `src/main.ts` to identify the bootstrapping method (`bootstrapModule` vs. `bootstrapApplication`) and flag any mismatch with the Angular 19 architecture in use.
   - **`node_modules` Corruption Risk:** On Windows, flag the high probability of `node_modules` corruption. The assessment report must recommend a `clean-workspace` step when dependency health looks suspicious.
   - **Incremental Upgrade Analysis:**
     - Review the current Angular 18 baseline and the exact package changes needed for 19.
     - Check for deprecated APIs or syntax that should be removed before the 18 → 19 jump is finalized.
     - Cross-reference findings with the target migration notes for this single version step.
     - **Error Pattern Recognition:** Identify common errors from prior Angular upgrades, such as module/import mismatches, missing framework imports, and stale builder settings.
2. **Readiness Audit: Angular 18 → 19**
   - **MANDATORY CHECKS (Detection Focus):**
     - Package Alignment: Audit all `@angular/*` packages for exact version parity at the 19 target.
     - TS Version: Detect whether TypeScript matches the version required by the target upgrade.
     - Resolver: Ensure `moduleResolution` and related compiler options are aligned with the target Angular 19 toolchain.
   - **Why Errors Occur (Contextual Detection):**
     - Identify mismatched dependencies that would break the v19 build.
     - Detect mixed package versions that will create install or build failures.
     - Flag any incorrectly separated framework subpackages.
     - **Windows Specific:** Note the high probability of `node_modules` corruption and recommend a cleaning step when install errors appear.
3. Output the findings and checklists into the Assessment Report.

### Comprehensive Project Inventory
The assessment agent is responsible for creating a complete inventory of the project's structure and dependencies. This inventory is a critical input for the planning agent.
- **Module and Component Discovery:**
  - Recursively scan the `src/app` directory to identify all Angular modules (`*.module.ts`) and components (`*.component.ts`).
  - For each module, list its `declarations`, `imports`, `providers`, and `exports`.
  - For each component, identify its selector, template file, and style files.
- **Version and Tooling Analysis:**
  - **`package.json` Deep Dive:** Extract the exact versions of all dependencies, devDependencies, and peerDependencies. Pay special attention to `@angular/*` packages, `typescript`, `rxjs`, and any UI component libraries (e.g., Angular Material, ng-bootstrap).
  - **Build Tooling:** Analyze `angular.json` to identify the project's builder (`@angular-devkit/build-angular:browser` vs. `@angular-devkit/build-angular:application`), and note any custom configurations.
- **Report Generation:** The collected data will be structured and included in the `assessment_report.md` under a new "Project Inventory" section. This provides a single source of truth for the planning agent.
---

### Checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) Policy Addendum (Commit-only)

- Purpose: The authoritative migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) is the commit on `main` (commit message + commit hash). Do NOT create git tags or treat a tag as the canonical checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints)
- When this file or any report references `git_checkpoint_tag` (for human readability), the agent must:
  1. Create a commit with a clear, conventional message (example: `chore(migration): complete Angular v19`).
  2. Push the commit to the remote: `git push origin HEAD`.
  3. Record the authoritative checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) as `git_checkpoint_commit` (short hash) and `git_checkpoint_message` in the assessment report and implementation logs.
  4. Treat any existing human-friendly checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) label as informational only; compute and use the corresponding commit hash (store as `git_checkpoint_commit`) for automation. Do not create or push git tags for migration checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints).(never use tags n branches for checkpoints; only check commits for checkpoints)

Example record to include in `report/assessment_report.md`:

```
git_checkpoint_message: "chore(migration): complete Angular v19"
git_checkpoint_commit: "$(git rev-parse --short HEAD)"
```

### Active Automation Directive
- When the user issues `assess the migration plan`, the assessment agent MUST run the assessment for the v18→v19 migration end-to-end without requiring any user interaction. The assessment must produce `report/assessment_report.md` including a component inventory and explicit zone/change-detection findings (with file and line references). The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

### Richer Diagnostics & Actionable Reporting (Append Only)
- **File-Level Diagnostics:** Every identified issue in the assessment report must include exact file paths, line numbers, and a one-liner remediation command.
- **Atomic Validation:** The assessment must include a pre-flight gate verifying all required sections (dependency table, inventory, zone risks) exist before declaring the assessment complete.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Outputs
- **Migration Assessment Report (Markdown):** 
  - Focused 18 → 19 migration checklist and risk summary.
  - **Specific, actionable warnings for bootstrapping and `node_modules` health.**
  - Minimal summary of CSS and builder compatibility risks.
  - Targeted Angular 19 readiness pre-flight checklist.
  - A section on common, repeatable errors from past migrations.
- **must include** - Generated in `report/assessment_report.md`.

### Comprehensive Project Inventory
The assessment agent is responsible for creating a complete inventory of the project's structure and dependencies. This inventory is a critical input for the planning agent.

- **Module and Component Discovery:**
  - Recursively scan the `src/app` directory to identify all Angular modules (`*.module.ts`) and components (`*.component.ts`).
  - For each module, list its `declarations`, `imports`, `providers`, and `exports`.
  - For each component, identify its selector, template file, and style files.
-- **Version and Tooling Analysis:**
  - **`package.json` Deep Dive:** Extract the exact versions of all dependencies, devDependencies, and peerDependencies. Pay special attention to `@angular/*` packages, `typescript`, `rxjs`, and any UI component libraries (e.g., Angular Material, ng-bootstrap).
  - **Build Tooling:** Analyze `angular.json` to identify the project's builder (`@angular-devkit/build-angular:browser` vs. `@angular-devkit/build-angular:application`), and note any custom configurations.
-- **Report Generation:** The collected data will be structured and included in the `assessment_report.md` under a new "Project Inventory" section. This provides a single source of truth for the planning agent.
-- **Runtime Behavior Audit:** Scan component files (`*.component.ts`) for async callbacks or polling patterns that mutate component data, and note any areas that need explicit test coverage after the 18 → 19 jump.
  - Keep this audit focused on the current migration only and avoid version-specific assumptions from later Angular releases.

---

### must include **OUTPUT
- **Report:** report/assessment_report.md
- **Total number of components present:** (agent to compute from `src/app/components`)
- **Total number of components migrated:** (agent to populate)
- **Migration completion %:** (agent to compute)
- **Core details:** Blockers, high-risk modules, checklist completion status
