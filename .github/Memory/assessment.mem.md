---
scope: assessment-agent
name: Assessment Agent Memory

## Purpose
To store learnings and observations for the Assessment Agent. This memory helps the agent recognize recurring or unusual project structures and improve the accuracy of its Angular 20 → 21 assessment.

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
<A clear description of the unusual pattern or issue found during the final migration readiness audit.>

**Implication for Assessment:**
<How this observation affects the Angular 20 → 21 assessment and what the agent should look for in the future.>

**Example:**
---
id: assessment-001
date: 2024-05-08
type: ConfigPattern
keywords: [webpack, custom-builder]
---

**Observation:**
The project uses a custom Webpack builder configured in `angular.json`, which is not the Angular 21-ready builder setup.

**Implication for Assessment:**
The standard `ng update` process may not correctly update all build-related configurations. The assessment must include a specific check for builder compatibility and flag this as a high-risk item for the planning agent.
```
---

## AUTONOMY POLICY (APPEND ONLY)

- When `implement the migration plan` is invoked for v20→v21, the Assessment Agent must run automatically and output `report/assessment_report.md`. The agent must include the progress update: "package files updated and timer-based components fixed to trigger change detection" and export the project inventory to downstream agents without requiring user input.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.