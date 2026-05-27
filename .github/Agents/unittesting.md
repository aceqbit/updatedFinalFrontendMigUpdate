## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after **every individual version jump**, ensuring modern test patterns are adopted as the project evolves.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization. Retain the broader test guidance, but apply it only to the v16 -> v17 migration path.

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
1. Discovery & pre-checks
  - Discover all `*.spec.ts` files across the repository.
  - Verify spec files are saved to disk before running any test command.

2. Run the full test suite (single-run, non-watch)
  - Recommended command (single-run, headless):

    ```bash
    npx ng test --watch=false --browsers=ChromeHeadless
    ```

  - Recommended npm script (optional, add to `package.json`):

    ```json
    "scripts": {
      "test:ci": "ng test --watch=false --browsers=ChromeHeadless"
    }
    ```

    Then run:

    ```bash
    npm run test:ci
    ```

  - Capture and append the test run summary and full output to `report/test_report.md`.

3. Targeted debugging
  - If failures persist, run targeted specs for the failing files using the CLI options supported by the project's Angular version (for example `--include` or `--testNamePattern`). Example patterns:

    ```bash
    npx ng test --watch=false --include=src/app/path/to/specific.spec.ts
    npx ng test --watch=false --testNamePattern="should create MyComponent"
    ```

  - After fixes, re-check that spec files are saved to disk, then re-run the full single-run test command.

4. Gate to completion (mandatory)
  - The unit-testing agent MUST run and verify ALL discovered `*.spec.ts` files and confirm zero failing specs before marking the migration/test phase as complete or updating the completion status.
  - If persistent failures remain after targeted recovery attempts, escalate to the `implementation-agent` with the failing report and diagnostic output.

5. Automation behavior
  - Do not prompt the user during verification; select defaults and proceed autonomously.
  - Produce a machine-readable summary in `report/test_report.md` including counts, pass/fail details, and timestamps.


### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

---

### Diagnostics & Remediation Attachments

- **Spec Failure Bundles:** When a spec fails persistently, the unit-testing agent must create a diagnostic bundle in `report/diagnostics/` that includes failing spec names, stack traces, snapshots (if applicable), and a minimal reproduction snippet where possible.
- **Patch Suggestions for Tests:** If a failing test can be resolved by a small, low-risk change (for example, updating an assertion or test timeout), the agent may produce a proposed patch and include it as `report/patches/<timestamp>-test-fix.diff` for human review and optional automatic application by the implementation agent.
- **Targeted Triage Priority:** The agent must prioritize targeted spec reruns and only expand to broader suites after localized fixes are attempted and logged.

### Outputs
- **Test Status Log:** Phase-by-phase pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.

### must include OUTPUT
- **Report:** `report/test_report.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components with spec.ts:** (number of `*.spec.ts` found)
- **Total number of spec failures:** (from the most recent run)
- **Total number of spec passes:** (from the most recent run)
- **Migration test completion percentage:** (computed as passingSpecs/totalSpecs * 100)
- **Timestamp:** (ISO 8601 UTC when tests were executed)
- **Core details:** list of failing specs, stack traces, and targeted recovery suggestions.

- **Spec requirement:** The unit-testing agent will ensure every component has a `<component>.component.spec.ts`; it will discover, run, and report on all `*.spec.ts` files during validation and will include a count of missing spec files in the final test report.
- **Autonomous Completion:** Once tests pass, the unit-testing flow should hand control back to the implementation agent so it can finish the checkpoint and git push without waiting for user intervention.