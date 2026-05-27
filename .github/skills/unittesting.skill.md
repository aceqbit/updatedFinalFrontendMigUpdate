---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
name: Angular Migration Unit Testing
description: >
  Manages and executes unit tests to keep the Angular v17 -> v18 migration stable.
  Updates tests for the active migration target and verifies that all tests pass.

dependencies:
  - `implementation.skill.md`

tasks:
  - task: Update outdated test configurations.
    instructions:
      - Modify `karma.conf.js` and `tsconfig.spec.json` to align with the new Angular version.
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

  - task: Generate the Test Report.
    instructions:
      - Capture the output of the test run.
      - Summarize the results, including the number of tests passed, failed, and skipped.
      - Save the report to `report/test_report.md`.
      - Include the next recovery step whenever a run fails so the process does not stall or go blank.
      - Call out any build-warning-to-test-warning pattern so it can be cleaned up deliberately.
    output: `report/test_report.md`
---

### Verification Gate (Append-only)
- Purpose: enforce that every migration phase does not proceed to completion or status update until all `*.spec.ts` files have been executed and verified as passing.
- Required procedure:
  1. Run the full test suite in single-run (non-watch) mode and capture full output and exit code:

     ```bash
     npm test -- --watch=false
     # CI/headless alternative:
     npx ng test --watch=false --browsers=ChromeHeadless
     ```

  2. Collect per-spec results and aggregate counts (passed/failed/skipped). Save a concise summary to `report/test_report.md` and the full runner output to `report/test_output.log`.
  3. If any specs fail, do NOT mark the phase as complete or update migration status. Instead:
     - Run targeted specs for failing files to isolate failures.
     - Produce a file-level git diff artifact capturing pre-fix vs post-fix changes for failing specs: `report/test_failures.diff`.
     - Include remediation steps per failing spec in `report/test_report.md`.
  4. Only after the full-suite exits with status code 0 should the agent proceed to update completion status and hand-off to the next agent.

- Artifacts produced by this gate:
  - `report/test_report.md` (summary + per-file statuses)
  - `report/test_output.log` (raw test runner output)
  - `report/test_failures.diff` (git-style file-level diffs for failing specs and remediation)

### Non-Destructive Memory Utilization Clarification
- Treat earlier mentions of runtime "skill & memory utilization" in agent notes as informational only. Do not rely on ephemeral memory metrics as gating signals. Prefer deterministic checks (build success, test pass, lint) for automation decisions.

