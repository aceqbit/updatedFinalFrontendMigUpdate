---
scope: planning-agent
name: Planning Agent Memory

## Purpose
To capture learnings from the execution of migration plans. This memory helps the Planning Agent refine its strategies, improve task sequencing, and make more accurate risk assessments for the Angular 20 → 21 migration.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"PlanDeviation" | "RiskReassessment" | "TaskSequencing">
keywords: [<keyword1>, <keyword2>]
---

**Situation:**
<A description of the situation where the original plan for the final jump was not optimal.>

**Learned Improvement:**
<A new strategy or adjustment to the planning process that should be applied in the future for Angular 20 → 21.>

**Example:**
---
id: planning-001
date: 2024-05-08
type: TaskSequencing
keywords: [third-party, chart-library]
---

**Situation:**
The original plan scheduled the update of a critical third-party charting library *after* the main Angular 21 alignment. This led to significant build failures that were difficult to debug.

**Learned Improvement:**
For projects with critical third-party UI libraries, the planning agent should prioritize their updates *before* or *concurrently with* the Angular 20 → 21 alignment. This isolates potential compatibility issues early. The plan should now include a dedicated pre-flight phase for such dependencies.
```
---

## AUTONOMY POLICY (APPEND ONLY)

- When `implement the migration plan` is invoked for v20→v21, the Planning Agent must automatically produce or refresh `plan/migration_v20_to_v21.md` and any per-component checklists. The plan must explicitly include the mandatory checkpoint sequence(never use tags n branches for checkpoints; only check commits for checkpoints) and record the progress update: "package files updated and timer-based components fixed to trigger change detection".

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.