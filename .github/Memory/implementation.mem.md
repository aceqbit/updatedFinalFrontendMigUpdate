---
scope: implementation-agent
name: Implementation Agent Memory

## Purpose
To record successful solutions and workarounds for specific, unexpected errors encountered during the implementation phase of the Angular 18 → 19 migration. This memory serves as a knowledge base for resolving future technical challenges.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"BuildError" | "DependencyConflict" | "RuntimeError">
keywords: [<keyword1>, <keyword2>]
---

**Error Signature:**
<A unique, searchable string from the error message.>

**Context:**
<The migration step being performed when the error occurred.>

**Successful Solution:**
<The exact sequence of commands or code modifications that resolved the error.>

**Example:**
---
id: implementation-001
date: 2024-05-08
type: DependencyConflict
keywords: [peer-dependency, rxjs]
---

**Error Signature:**
`Could not resolve dependency: peer rxjs@"^6.0.0" from @angular/core@"18.0.0"`

**Context:**
Running `ng update @angular/core@19` in a project with an older, incompatible third-party library.

**Successful Solution:**
The conflict was resolved by first updating the problematic third-party library to its latest version, which supported RxJS 7.
1. `npm install some-legacy-library@latest`
2. `ng update @angular/core@18`
This resolved the conflict without needing to use `--force` or `--legacy-peer-deps`.
```
---

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- When documenting implementation solutions, always include the `git_checkpoint_commit` and `git_checkpoint_message` associated with the resolved migration state.
Do not rely on tags or branches as authoritative checkpoints for automation.
