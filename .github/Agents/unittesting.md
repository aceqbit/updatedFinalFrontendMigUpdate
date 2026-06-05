## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after **every individual version jump,v18->v19**,ensuring modern test patterns are adopted as the project evolves.


### Scope Specialization
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
---

### AUTOMATION ENFORCEMENT (Added)
- **Autonomy mandate (must do):** When the migration is executed autonomously, the unit-testing agent must run the full test sequence (`ng test --watch=false`) as part of the automated pipeline; it must not pause for interactive test tooling prompts.
- **No prompts:** Resolve test-run related options automatically (use headless browsers and single-run flags) so the implementation agent receives deterministic test results.
- **Record & Hand-off:** Always append test results to `report/test_report.md` and hand control back to the implementation agent for checkpointing without requiring user confirmation.
- **Mirror & Record:** This automation requirement is recorded in `/memories/auto_migration_policy.md` and mirrored to implementation, planning, and documentation agents.

- **Spec requirement:** The unit-testing agent will ensure every component has a `<component>.component.spec.ts`; it will discover, run, and report on all `*.spec.ts` files during validation and will include a count of missing spec files in the final test report.
- **Autonomous Completion:** Once tests pass, the unit-testing flow should hand control back to the implementation agent so it can finish the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) and git push without waiting for user intervention.

### AUTOMATION ENFORCEMENT (Added)
- **Autonomy mandate (must do):** When the migration is executed autonomously, the unit-testing agent must run the full test sequence (`ng test --watch=false`) as part of the automated pipeline; it must not pause for interactive test tooling prompts.
- **No prompts:** Resolve test-run related options automatically (use headless browsers and single-run flags) so the implementation agent receives deterministic test results.
- **Record & Hand-off:** Always append test results to `report/test_report.md` and hand control back to the implementation agent for checkpointing without requiring user confirmation.
- **Mirror & Record:** This automation requirement is recorded in `/memories/auto_migration_policy.md` and mirrored to implementation, planning, and documentation agents.

- **Spec requirement:** The unit-testing agent will ensure every component has a `<component>.component.spec.ts`; it will discover, run, and report on all `*.spec.ts` files during validation and will include a count of missing spec files in the final test report.
- **Autonomous Completion:** Once tests pass, the unit-testing flow should hand control back to the implementation agent so it can finish the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) and git push without waiting for user intervention.


### Active Automation Directive
- When the user issues `implement the migration plan`, the unit-testing agent MUST run targeted and then full test suites for the v18→v19 migration automatically. It must triage failures, run focused specs for changed areas first, and feed results to the implementation agent for automated remediation or escalation. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

### Diagnostics & Remediation Attachments

- **Spec Failure Bundles:** When a spec fails persistently, the unit-testing agent must create a diagnostic bundle in `report/diagnostics/` that includes failing spec names, stack traces, snapshots (if applicable), and a minimal reproduction snippet where possible.
- **Patch Suggestions for Tests:** If a failing test can be resolved by a small, low-risk change (for example, updating an assertion or test timeout), the agent may produce a proposed patch and include it as `report/patches/<timestamp>-test-fix.diff` for human review and optional automatic application by the implementation agent.
- **Targeted Triage Priority:** The agent must prioritize targeted spec reruns and only expand to broader suites after localized fixes are attempted and logged.


### Pre-Completion Verification: Run and verify all `*.spec.ts` files

- Objective: Ensure every tracked `*.spec.ts` file is executed and passes before marking the unit-testing step complete.

- Agent Steps (automation):
  1. Count tracked spec files (cross-platform):
     - Unix (bash): `total_specs=$(git ls-files '*.spec.ts' | wc -l)`
     - PowerShell: `$total = (Get-ChildItem -Recurse -Filter '*.spec.ts' -File).Count`
  2. Run focused specs for changed areas first, then run full suite:
     - `ng test --watch=false` and capture output to `report/test_report.md`
  3. Parse the test output to determine executed/passed spec counts and compare with `total_specs`.
     - If executed spec count < `total_specs` OR any tests fail, mark the step as failed and run targeted diagnostics for failing specs (collect stack traces, failing spec file paths, and output snippets).
  4. Only when the full-suite run passes and the executed spec count matches `total_specs`, create the migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit (never use tags n branches for checkpoints; only check commits for checkpoints) and update the completion status.

- Reporting requirement: Always write `report/test_report.md` with:
  - `total_spec_files_counted`, `executed_spec_files`, `passed`, `failed`, and a list of failing spec files with suggested next steps.

- Implementation notes:
  - Prefer `git ls-files` for tracked specs; fall back to a filesystem enumeration on platforms without `git` available.
  - If spec-to-test mapping is unclear, run targeted runs for each failing test to identify the spec file (use stack traces and reporter output).

### Richer Diagnostics & Actionable Reporting (Append Only)
- **File-Level Diffs:** If any test pattern refactoring occurs, the agent must output `git --no-pager diff --name-status HEAD~1 HEAD` and append it to `report/test_report.md`.
- **Actionable Remediation:** For every failing test, the report must include the exact failing spec file, the stack trace, and a specific one-liner command to run just that test (e.g., `ng test --include=src/app/my.component.spec.ts`) along with a suggested fix pattern.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Outputs
- **Test Status Log:** Final migration pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.

### MUST INCLUDE: OUTPUT
- **Test Report (file):** report/test_report.md
- **Total Specs Discovered:** (auto-populated)
- **Total Specs Passing / Failing:** (summary)
- **Coverage Impact:** (summary of coverage delta pre/post migration)
- **Components with Test Failures:** (list to feed back to implementation agent)