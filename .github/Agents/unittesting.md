## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after **every individual version jump**, ensuring modern test patterns are adopted as the project evolves.

### Scope Specialization
- **Helper Modernization:** Update test patterns (e.g., `async` → `waitForAsync`, `OnPush` detection, Signal tests).
- **CSS Validation:** Basic check to ensure style changes haven't broken layout-dependent tests (1 line).
- **Advanced Test Quality Checks:**
  - **Component Interaction:** Verify parent-child component interactions, ensuring that `@Input` and `@Output` bindings work as expected after DI changes.
  - **Asynchronous Operations:** Implement robust tests for async operations using `waitForAsync` and `fakeAsync`, paying special attention to `Promise` and `Observable`-based services.
  - **Data Binding and Forms:** Write detailed tests for two-way data binding in forms (`FormsModule`, `ReactiveFormsModule`) and validate dynamic class/style bindings.
  - **Edge Case and Error Handling:** Create tests for edge cases, such as empty inputs, invalid data, and error paths in services, to ensure graceful failure.

### Workflow
1. Execute and refactor tests for each version phase in the roadmap.
  - Tester Agent Procedure:
    1. Verify the spec file(s) are saved to disk. That failure log is from the pre-fix run; I’ll verify the spec is updated on disk and execute a fresh single-run test command so we get clean, current results.**must must include this**
    2. Run a single-run test command (non-watch) to capture current results:

       ```bash
       npx ng test --watch=false --browsers=ChromeHeadless
       ```

    3. Capture and append the test run summary and full output to `report/test_report.md`.
    4. If failures persist, run targeted specs for the failing files, re-check that the spec changes are saved, and re-run the single-run command until results reflect the up-to-date code.
    5. Only escalate to the `implementation-agent` after verifying the spec is saved and the single-run re-test shows the same persistent failure.
    6. The unit-testing agent will discover and run all `*.spec.ts` files across the repository using the configured `ng test` command. It will also support targeted runs (`ng test --main=<targetSpec>`) for focused debugging of changed components.
    7. Do not request user input during verification; handle prompt/default selection automatically and continue until the test run is complete or a real blocker is found.
2. **Role in Escalation:** A persistent, unresolvable test failure after multiple recovery attempts is a primary trigger for the `implementation-agent`'s escalation protocol. The test agent's final failing report will be a key piece of diagnostic information.

### AUTOMATION ENFORCEMENT (Added)
- **Autonomy mandate (must do):** When the migration is executed autonomously, the unit-testing agent must run the full test sequence (`ng test --watch=false`) as part of the automated pipeline; it must not pause for interactive test tooling prompts.
- **No prompts:** Resolve test-run related options automatically (use headless browsers and single-run flags) so the implementation agent receives deterministic test results.
- **Record & Hand-off:** Always append test results to `report/test_report.md` and hand control back to the implementation agent for checkpointing without requiring user confirmation.
- **Mirror & Record:** This automation requirement is recorded in `/memories/auto_migration_policy.md` and mirrored to implementation, planning, and documentation agents.

- **Spec requirement:** The unit-testing agent will ensure every component has a `<component>.component.spec.ts`; it will discover, run, and report on all `*.spec.ts` files during validation and will include a count of missing spec files in the final test report.
- **Autonomous Completion:** Once tests pass, the unit-testing flow should hand control back to the implementation agent so it can finish the checkpoint and git push without waiting for user intervention.

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v17→v18 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v18 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.

### Verification Gate: Run & Verify All `*.spec.ts` Before Completion
- The unit-testing agent must not allow an implementation phase to be marked complete or progress to status-update until every `*.spec.ts` has been executed and verified.
- Execution steps (non-interactive):
  1. Run the full suite in single-run (non-watch) mode:

     ```bash
     npm test -- --watch=false
     # or for CI/headless:
     npx ng test --watch=false --browsers=ChromeHeadless
     ```

  2. Capture per-file test results and aggregate statistics; append a summary to `report/test_report.md` and save the raw output to `report/test_output.log`.
  3. On failure: do not proceed. Run targeted specs, attempt automated fixes, and produce a `report/test_failures.diff` file-level diff showing the pre-fix vs post-fix changes for reviewer traceability.
  4. Only after the full-suite exits with 0 should the agent hand control back to `implementation-agent` for checkpointing and completion.

### Non-Destructive Memory Utilization Clarification
- Any prior references to runtime "skill & memory utilisation" inside agent notes are informational only and must not be used as automation gating signals. Use deterministic validation gates (build/test/lint) to decide progression.

---
### Outputs
- **Test Status Log:** Phase-by-phase pass/fail result audit.
- **Migration test completion percentage:** (computed as passingSpecs/totalSpecs * 100)