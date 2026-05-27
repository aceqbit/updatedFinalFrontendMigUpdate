## SECTION 1: ASSESSMENT AGENT
name: assessment-agent

### Purpose
Evaluates the current project for its readiness to undergo the active, incremental migration (v16→v17). Historical multi-version guidance (v17→v21) is retained for reference but is not actively enforced.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization. Keep the existing guidance below as historical context, but apply it only to the v16 -> v17 migration path.

### Focused Purpose & Rationale
This agent now focuses on assessing readiness for the single, atomic upgrade from Angular **v16 → v17**.

### Responsibilities
- **Incremental Sequence Audit:** Analyze `package.json`, `angular.json`, and `tsconfig.json` for legacy patterns relevant to the active v16→v17 jump.
- **File Analysis:** Scan core files (`main.ts`, `app.component.ts`, `product.service.ts`, `product.model.ts`, `styles.css`) for outdated syntax.
- **CSS Assessment:** Basic audit for modern builder compatibility in global/scoped styles (1 line).
- **Manual Verification:** Explicitly check for all manual conversion steps listed in the provided migration manual for every phase.
- **Workflow Enforcement (active):** Strictly validate that the project follows the v16 → v17 path for this workspace; stop if that jump is skipped.

Note (active policy): For this workspace the active enforcement is to validate the single v16 → v17 jump and create a git checkpoint on success.
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
- **Strict Incremental Analysis:** Enforces a strict, sequential version-by-version migration path (e.g., v16 -> v17, v17 -> v18).
- **Automated Detection:** Automatically scans for and flags issues that will cause build failures or runtime errors.

Clarification: In this workspace the "Strict Incremental Analysis" should be read as "perform a strict analysis for the v16 -> v17 jump only." The automated detection will prioritize issues known to be relevant to v16→v17.
- **Provides Clear Checklists:** Generates actionable checklists for each phase of the migration.
- **Focuses on Facts:** All findings are based on direct analysis of the codebase and configuration.


#### What it Avoids (What Nots)
- **No Code Modification:** The agent is read-only. It analyzes and reports but **never** modifies source code.
- **No Hallucination or False Data:** The agent must not invent or fill in missing information. All reports must be based on verifiable data from the project.
- **No Breaking Loops:** The agent must be designed to complete its analysis without getting stuck in infinite loops or failing unexpectedly.
- **No User Intervention:** Once the agent starts its assessment, it must run to completion without requiring any user input or intervention. It must be prepared to handle CLI prompts automatically.
- **No Manual Button Presses:** If the assessment flow encounters an optional migration prompt, it must assume the recommended/default option and never ask the user to press a button.
- **No Skipping Version Jumps:** The agent must strictly follow the incremental migration path and not skip any intermediate versions.

### Workflow
1. **Pre-flight Checks & Analysis:**
   - **Bootstrapping Validation:** Scan `src/main.ts` to identify the bootstrapping method (`bootstrapModule` vs. `bootstrapApplication`). Flag any legacy or incorrect patterns based on the target Angular version.
   - **`node_modules` Corruption Risk:** On Windows, flag the high probability of `node_modules` corruption. The assessment report must recommend a `clean-workspace` step as a standard part of the migration plan.
   - **Incremental Sequence Analysis:**
    - Scan for legacy templates and APIs relevant to the v16 -> v17 migration. (Historical: broader multi-version scans are available in the reference guidance but are not active by default.)
      - Detect standalone readiness and Signal adoption early in the sequence.
     - Cross-reference findings with official migration notes for each intermediate jump.
     - **Error Pattern Recognition:** Identify common errors from past migrations, such as `NG6008` for standalone components in `declarations`, and `NG8002`/`NG8004` for missing `CommonModule`/`FormsModule`.
2. Output the findings and checklists into the Assessment Report.

### Outputs
- **Migration Assessment Report (Markdown):** 
  - v16→v17 roadmap and per-phase risks.
  - **Specific, actionable warnings for bootstrapping and `node_modules` health.**
  - Minimal summary of CSS architectural risks.
  - A section on common, repeatable errors from past migrations.
- **must include** - Generated in `report/assessment_report.md`.

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


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### Preflight: Security & Node Compatibility Checks

- **Security Audit:** As part of pre-flight, run `npm audit --json` and summarize any Critical/High vulnerabilities in the `assessment_report.md`. Flag Critical vulnerabilities as blockers for the next-phase plan unless a safe remediation path is identified.
- **Node Runtime Check:** Inspect `package.json` for `engines.node`. Compare with the local runtime and record mismatches in the assessment report. If the runtime is outside the supported range, include non-invasive fallback recommendations (e.g., `npm ci --legacy-peer-deps`) and a clear, copyable remediation paragraph (nvm/nvm-windows guidance) but do not auto-upgrade the environment.

### must include OUTPUT
- **Report:** `report/assessment_report.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated:** (agent-updated integer)
- **Total number of components pending migration:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Spec files present:** (number of `*.spec.ts` found)
- **Spec files missing:** (number of components with no `*.spec.ts`)
- **Timestamp:** (ISO 8601 UTC when report was generated)
- **Additional core details:** list of modules impacted, major blockers, and top 5 risk items.

- **Spec requirement:** Every component discovered MUST have a corresponding `<component>.component.spec.ts` file. The unit-testing agent will discover and run all `*.spec.ts` files and include results in `report/test_report.md`.
- **Automation Requirement:** The assessment output should explicitly support a fully autonomous migration run that ends in the required git status, commit, and push checkpoint.