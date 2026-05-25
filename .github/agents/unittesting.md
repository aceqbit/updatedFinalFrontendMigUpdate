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
2. **Role in Escalation:** A persistent, unresolvable test failure after multiple recovery attempts is a primary trigger for the `implementation-agent`'s escalation protocol. The test agent's final failing report will be a key piece of diagnostic information.
3. Address v17 (active) or historical v21 specific test failures related to subpath resolution or DI changes. (Historical: v21 items retained for reference.)

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

---
