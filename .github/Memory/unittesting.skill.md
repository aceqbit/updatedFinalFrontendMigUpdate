---
name: Angular Migration Unit Testing
description: >
  Manages and executes unit tests to ensure the application remains stable throughout the Angular 18 → 19 migration.
  This skill is responsible for updating tests to be compatible with the target version and verifying that all tests pass.

dependencies:
  - `implementation.skill.md`

tasks:
  - task: Update outdated test configurations.
    instructions:
      - Modify `karma.conf.js` and `tsconfig.spec.json` to align with Angular 19.
      - Update testing libraries like Jasmine and Karma as needed.
    files:
      - `karma.conf.js`
      - `tsconfig.spec.json`
    notes:
      - Prefer minimal test-config changes that keep the suite moving instead of broad rewrites.

  - task: Refactor deprecated testing APIs.
    instructions:
      - Scan all `*.spec.ts` files for deprecated testing utilities and APIs.
      - Refactor tests to use the modern, recommended APIs.
      - When many modules fail together, isolate the first failing spec or the changed feature area before expanding the fix.

  - task: Run the full unit test suite.
    instructions:
      - Execute `ng test` with the `--watch=false` flag to run all tests once after the focused specs pass.
      - If the suite is too heavy or fails across many modules, switch to targeted specs for the changed area first, then retry the full suite.
      - Ensure that the command exits with a zero status code, indicating all tests passed.
      - If a failure affects many modules, start with the smallest changed area and report the next recovery move before re-running the broad suite.

  - task: Test runtime behavior coverage for the 18 → 19 jump.
    instructions:
      - For each component that was touched by the migration, verify that targeted tests exist.
      - Tests should cover the changed behavior with focused assertions and any required async helpers.
      - Run the tests for the affected components before running the full suite.
      - Document which components have targeted coverage and their status in the test report.

  - task: Generate the Test Report.
    instructions:
      - Capture the output of the test run.
      - Summarize the results, including the number of tests passed, failed, and skipped.
      - Save the report to `report/test_report.md`.
      - Include the next recovery step whenever a run fails so the process does not stall or go blank.
      - Call out any build-warning-to-test-warning pattern so it can be cleaned up deliberately.
    output: `report/test_report.md`
---

  ## MANDATORY BEHAVIOR (appended)

  - The unit-testing skill MUST run targeted and full tests as dictated by the implementation flow without pausing for user input, and must report failures together with the next recovery action so automation can continue.

## VERIFICATION: Run and Verify All Specs (appended)

- The unit-testing skill MUST enumerate all `src/**/*.spec.ts` files and ensure each spec file is executed and verified before marking the unit-testing phase complete.
- Preferred execution flow:
  1. Ensure the test runner is producing machine-readable output (JUnit XML, JSON, or similar). If not enabled, temporarily enable a machine-readable reporter for the test run.
  2. Attempt a focused run per spec file when supported by the runner, e.g., `ng test --watch=false --include=<path/to/spec.ts>` or an equivalent runner-specific include flag.
  3. If per-file focused runs are not available, run the full suite `ng test --watch=false` and parse the machine-readable report to extract per-file results.
  4. Produce a per-file status summary and include it in `report/test_report.md`.
  5. For any failing spec file, capture a file-level diff (`git diff HEAD -- <path/to/spec.ts>`), include the failing test's stack/trace, and append a recommended remediation step to the report.

- Only when every discovered `*.spec.ts` file reports zero failures may the unit-testing phase mark itself as complete and allow the implementation flow to proceed to the completion and updation status.

## DIAGNOSTICS & REMEDIATION (appended)

- The unit-testing skill MUST include richer diagnostics in the `report/test_report.md`:
  - Per-file pass/fail status.
  - The exact failure message and stack/trace for failing specs.
  - The `git diff` for the spec file and the related source files to help remediation.
  - Suggested remediation steps (e.g., update mocking strategy, adapt async helpers, add ChangeDetectorRef.markForCheck() after interval-driven mutations).

- For widely failing suites, the skill MUST identify the first failing spec or the smallest changed feature area and recommend a triage action to the implementation agent.

## VULNERABILITY & NODE COMPATIBILITY GUIDANCE (appended)

- The unit-testing skill should run a lightweight dependency audit before and after dependency updates: run `npm audit --audit-level=high` and export results to `report/vulnerability_report.md`.
- Attempt `npm audit fix` for fixable, low-risk issues. For high/critical vulnerabilities, record and escalate with context; do not block the migration for vulnerabilities unless they directly affect build/test integrity.
- Node runtime guidance: Log the current Node version (`node -v`) and compare against recommended LTS versions. Prefer Node 18.x or 20.x LTS (but avoid failing the migration solely due to Node version); attempt to adapt or document Node incompatibilities and provide suggestions (e.g., use `nvm` to switch nodes) rather than enforcing a hard fail.

## STRICT PUSH POLICY (appended)

- For the v19 migration flow, the unit-testing skill MUST NOT create or push git tags. On success, it must ensure that the implementation agent commits the checkpoint with a clear message (for example, `chore: complete Angular v19 migration`) and pushes that commit to the `main` branch using `git push origin main`.
  - Tags or tag pushes are explicitly prohibited for checkpointing in this workspace's migration automation.
