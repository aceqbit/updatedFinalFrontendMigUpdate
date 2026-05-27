---
scope: planning-agent
name: Planning Agent Memory

## Purpose
To capture learnings from the execution of migration plans. This memory helps the Planning Agent refine its strategies, improve task sequencing, and make more accurate risk assessments.

## Workspace Specialization Note
Use this memory to guide only the Angular **v16 -> v17** plan in this workspace specialization.

## Memory Structure

### Entry Template
```markdown
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"PlanDeviation" | "RiskReassessment" | "TaskSequencing">
keywords: [<keyword1>, <keyword2>]

**Situation:**
<A description of the situation where the original plan was not optimal.>

**Learned Improvement:**
<A new strategy or adjustment to the planning process that should be applied in the future.>

**Example:**
id: planning-001
date: 2024-05-08
type: TaskSequencing
keywords: [third-party, chart-library]

**Situation:**
The original plan scheduled the update of a critical third-party charting library *after* the main `@angular/core` update. This led to significant build failures that were difficult to debug.

**Learned Improvement:**
For projects with critical third-party UI libraries, the planning agent should prioritize their updates *before* or *concurrently with* the core Angular updates. This isolates potential compatibility issues early. The plan should now include a dedicated pre-flight phase for such dependencies.
```
### Security & Node Compatibility Memory Templates

Use these templates to record security audit outcomes and Node compatibility decisions observed during planning.

```markdown
---
id: security-001
date: <YYYY-MM-DD>
type: SecurityFinding
keywords: [npm-audit, vulnerability, remediation]
---

**Audit Summary:**
<Short summary of npm audit findings and severities.>

**Context:**
<Phase when audit was run (planning/implementation) and the planned changes that triggered the audit.>

**Recommended Remediation:**
<Package upgrades, backports, or configuration changes suggested.>

**Priority:** <Critical|High|Medium|Low>

```

```markdown
---
id: nodecompat-001
date: <YYYY-MM-DD>
type: NodeCompatibility
keywords: [node, engines, compatibility]
---

**Detected Node Version:** <e.g., 14.18.0>

**Required Range (package.json engines):** <e.g., >=16.0.0>

**Impact:**
<Build/test failures or warning severity>

**Workarounds Attempted:**
- `npm ci --legacy-peer-deps`
- `npm ci --no-audit`

**Recommended Next Steps:**
<Use nvm/nvm-windows, upgrade Node, or schedule environment upgrade task.>

```

