## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after the Angular **18 → 19** jump, ensuring modern test patterns are adopted where needed.

### Responsibilities
- **Incremental Verification:** Run `ng test` after the 18 → 19 transition.
- **Helper Modernization:** Update test patterns (e.g., `async` → `waitForAsync`, `OnPush` detection) only where the current migration needs them.
- **CSS Validation:** Basic check to ensure style changes haven't broken layout-dependent tests (1 line).
- **Advanced Test Quality Checks:**
  - **Component Interaction:** Verify parent-child component interactions, ensuring that `@Input` and `@Output` bindings work as expected after DI changes.
  - **Asynchronous Operations:** Implement robust tests for async operations using `waitForAsync` and `fakeAsync`, paying special attention to `Promise` and `Observable`-based services.
  - **Data Binding and Forms:** Write detailed tests for two-way data binding in forms (`FormsModule`, `ReactiveFormsModule`) and validate dynamic class/style bindings.
  - **Edge Case and Error Handling:** Create tests for edge cases, such as empty inputs, invalid data, and error paths in services, to ensure graceful failure.

### Workflow
1. Execute and refactor tests for each version phase in the roadmap.
2. **Role in Escalation:** A persistent, unresolvable test failure after multiple recovery attempts is a primary trigger for the `implementation-agent`'s escalation protocol. The test agent's final failing report will be a key piece of diagnostic information.
3. Address 18 → 19 specific test failures related to the files changed by the migration.

### Outputs
- **Test Status Log:** Phase-by-phase pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.

---

### must include **OUTPUT
- **Report:** report/test_report.md
- **Total number of components present:** (agent to compute)
- **Total number of components migrated:** (agent to populate)
- **Migration completion %:** (agent to compute)
- **Core details:** failing suites, focused specs to run, triage status

---
**MANDATORY: Autonomous end-to-end execution (appended):**
- The unit-testing agent MUST run targeted tests as directed by the implementation agent during an `implement the migration plan` run without pausing for user input.
- When test failures occur, the agent MUST log the next recovery step and allow the implementation agent to act; it MUST NOT require manual approval to continue automated recovery attempts.

## VERIFICATION: Run and Verify All Specs (appended)

- The unit-testing agent MUST enumerate all `src/**/*.spec.ts` files and ensure each is executed and verified before declaring the testing phase complete.
- Execution guidance:
  - Prefer focused per-file test runs when the runner supports it; otherwise, run the full suite and parse the machine-readable report (JUnit/JSON) to extract per-file outcomes.
  - Produce a per-file status summary and include it in `report/test_report.md`.
  - For each failing spec, include the failing stack/trace, a `git diff HEAD -- <path/to/spec.ts>`, and a recommended remediation action.

## ORCHESTRATION POLISH (appended)

- The unit-testing agent should apply short step-level timeouts and sensible retry limits to avoid long-running loops. When a test run stalls, capture the last 200 lines of output and the exact command that caused the stall.
- Always prefer the smallest focused spec run for triage before running the broad suite to reduce noisy failures.

## DIAGNOSTICS & REMEDIATION (appended)

- The agent MUST add richer diagnostics to `report/test_report.md`, including per-file pass/fail, failure traces, and file-level diffs to aid rapid remediation.

## VULNERABILITY & NODE GUIDANCE (appended)

- As part of the migration step, run a lightweight dependency audit: `npm audit --audit-level=high`, save output to `report/vulnerability_report.md`, and attempt `npm audit fix` for safe fixes. Escalate high/critical vulnerabilities with context rather than blocking migration unnecessarily.
- Record the Node runtime version (`node -v`) and include a compatibility note. Prefer Node 18.x or 20.x LTS. If Node version mismatches are detected, log a clear warning and prefer automated mitigation suggestions (e.g., `nvm`) rather than a hard failure.

## STRICT GIT POLICY (appended)

- For checkpointing related to the v19 migration, the unit-testing agent MUST NOT create git tags or push tags. The authoritative checkpointing mechanism is a commit pushed to `main` with a clear message (for example, `chore: complete Angular v19 migration`). The implementation agent is responsible for creating and pushing that commit (`git push origin main`).

---
**DEPRECATION: Skill/Memory Utilisation Sections (appended)**

- Any historical or internal instructions in this file that reference "skill" discovery, memory write-backs, or in-file memory wiring are deprecated and should be treated as historical reference only. Automation must not use these sections for runtime orchestration. The canonical runtime wiring and memory guidance is maintained in `.github/Memory/` and `.github/Skills/` artifacts.
- If this file contains any instructions to create or push git tags as part of automated checkpointing, treat those instructions as deprecated: the canonical automated checkpoint is a commit pushed to `main` (for example, `chore: complete Angular v19 migration`). Do NOT create or push git tags as part of automated migration flows.
- Do not delete or modify existing historical lines; this appended note supersedes them and clarifies the intended runtime behavior.
---
