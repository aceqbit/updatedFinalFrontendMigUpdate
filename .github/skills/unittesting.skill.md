---
name: Angular Migration Unit Testing
description: >
  Manages and executes unit tests to keep the Angular v16 -> v17 migration stable.
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
      - "CONNECT AND RUN ALL SPEC.TS FILES: The agent must connect with and run all `*.spec.ts` files."
      - "CRITICAL REQUIREMENT: It must run and verify these files before proceeding to the completion and updation status!!"
      - Execute `ng test --watch=false` to run all tests.
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

## User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint steps.
