---
scope: unittesting-agent
name: Unit Testing Agent Memory

## Purpose
To remember solutions for fixing specific test failures that occur after the Angular 18 → 19 migration. This helps the agent automate test-fixing and ensures the stability of the test suite.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"TestFailure" | "ConfigError" | "MockingIssue">
keywords: [<keyword1>, <keyword2>]
---

**Error Pattern:**
<The characteristic error message from the test runner.>

**Context:**
<The type of component or service under test and the migration version.>

**Refactoring Solution:**
<The specific code change required to make the test pass.>

**Example:**
---
id: unittesting-001
date: 2024-05-08
type: TestFailure
keywords: [async, fakeAsync, tick]
---

**Error Pattern:**
`Error: 1 timer(s) still in the queue.`

**Context:**
Testing a component that uses an async operation inside `ngOnInit` after migrating to Angular 19. The test was using `fakeAsync` and `tick()`.

**Refactoring Solution:**
The issue was resolved by ensuring that all asynchronous operations within the `fakeAsync` zone were properly flushed. The solution was to wrap the trigger for the async operation in `TestBed.runInInjectionContext` and ensure `tick()` was called after the async operation was initiated.
```
---

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- When recording checkpoints, the memory entry should record `git_checkpoint_commit` (short hash) and `git_checkpoint_message` in the entry metadata.
Do not rely on tags or branches as authoritative checkpoints for automation.
