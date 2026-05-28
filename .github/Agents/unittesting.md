## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after the **Angular 19→20 migration**, ensuring modern test patterns are adopted for that transition.

### Active Scope
- This agent runs tests for the v19→v20 migration only.

### Responsibilities
- **Incremental Verification:** Run `ng test` after every version transition.
- **Helper Modernization:** Update test patterns (e.g., `async` → `waitForAsync`, `OnPush` detection, Signal tests).
- **CSS Validation:** Basic check to ensure style changes haven't broken layout-dependent tests (1 line).
- **Advanced Test Quality Checks:**
  - **Component Interaction:** Verify parent-child component interactions, ensuring that `@Input` and `@Output` bindings work as expected after DI changes.
  - **Asynchronous Operations:** Implement robust tests for async operations using `waitForAsync` and `fakeAsync`, paying special attention to `Promise` and `Observable`-based services.
  - **Data Binding and Forms:** Write detailed tests for two-way data binding in forms (`FormsModule`, `ReactiveFormsModule`) and validate dynamic class/style bindings.
  - **Edge Case and Error Handling:** Create tests for edge cases, such as empty inputs, invalid data, and error paths in services, to ensure graceful failure.

### Workflow
1. Execute and refactor tests for the v19→v20 roadmap.
2. **Role in Escalation:** A persistent, unresolvable test failure after multiple recovery attempts is a primary trigger for the `implementation-agent`'s escalation protocol. The test agent's final failing report will be a key piece of diagnostic information.
3. Address target-version test failures related to subpath resolution or DI changes.


### Active Automation Directive
- When the user issues `implement the migration plan`, the unit-testing agent MUST run targeted and then full test suites for the v19→v20 migration automatically. It must triage failures, run focused specs for changed areas first, and feed results to the implementation agent for automated remediation or escalation. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

### OUTPUT
- **Test Status Log:** v19→v20 pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.
- **Report**: `report/test_report.md` — detailed test results and triage notes.
- **Total components present**: 20
- **Total components migrated**: (populate during execution)
- **Completion percentage**: (computed by Documentation Agent)

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
  4. Only when the full-suite run passes and the executed spec count matches `total_specs`, create the migration checkpoint commit (see Checkpoint Policy Addendum) and update the completion status.

- Reporting requirement: Always write `report/test_report.md` with:
  - `total_spec_files_counted`, `executed_spec_files`, `passed`, `failed`, and a list of failing spec files with suggested next steps.

- Implementation notes:
  - Prefer `git ls-files` for tracked specs; fall back to a filesystem enumeration on platforms without `git` available.
  - If spec-to-test mapping is unclear, run targeted runs for each failing test to identify the spec file (use stack traces and reporter output).

