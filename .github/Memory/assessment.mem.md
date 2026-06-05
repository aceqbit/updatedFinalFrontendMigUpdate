---

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- When recording assessment observations tied to a checkpoint, capture `git_checkpoint_commit` and `git_checkpoint_message` in the memory entry metadata.
Do not rely on tags or branches as authoritative checkpoints for automation.
scope: assessment-agent
name: Assessment Agent Memory

## Purpose
To store learnings and observations for the Assessment Agent during the Angular 18 → 19 migration. This memory helps the agent recognize recurring or unusual project structures and improve the accuracy of its assessment over time.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"ConfigPattern" | "DependencyAnomaly" | "ProjectStructure">
keywords: [<keyword1>, <keyword2>]
---

**Observation:**
<A clear description of the unusual pattern or issue found.>

**Implication for Assessment:**
<How this observation affects the migration assessment and what the agent should look for in the future.>

**Example:**
---
id: assessment-001
date: 2024-05-08
type: ConfigPattern
keywords: [webpack, custom-builder]
---

**Observation:**
The project uses a custom Webpack builder configured in `angular.json`, which is not the standard Angular CLI builder.

**Implication for Assessment:**
The standard `ng update` process may not correctly update all build-related configurations. The assessment must include a specific check for custom builders and flag this as a high-risk item for the planning agent during the 18 → 19 jump.
```
---
