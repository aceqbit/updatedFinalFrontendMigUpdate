---
scope: global-migration
name: Migration Context Memory

## Purpose
To store high-level, cross-cutting knowledge about the Angular 18 → 19 migration process. This memory is accessible to all agents and provides overarching context and strategies.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"CommonPitfall" | "GlobalStrategy" | "VersionMilestone">
keywords: [<keyword1>, <keyword2>]
---

**Insight:**
<A high-level insight or learning that applies across multiple agents or phases.>

**Strategic Application:**
<How this insight should influence the behavior of the agents.>

**Example:**
---
id: global-001
date: 2024-05-08
type: GlobalStrategy
keywords: [standalone, refactoring]
---

**Insight:**
The migration should stay tightly scoped to the Angular 18 → 19 jump. Attempting to pull unrelated version work into the same run is high-risk and often leads to cascading failures.

**Strategic Application:**
- **Planning Agent:** Should keep the plan atomic and limited to the single 18 → 19 step.
- **Implementation Agent:** Should perform the refactoring on the migration slice only, running tests after each meaningful change to ensure stability.
- **Documentation Agent:** Should create a dedicated section on the 18 → 19 migration scope and the benefits it brings to the project.
```
---

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- Strategic note: Agents should compute the authoritative `git_checkpoint_commit` for any human-friendly checkpoint label and use that commit hash for automated rollback or verification.
Do not rely on tags or branches as authoritative checkpoints for automation.
