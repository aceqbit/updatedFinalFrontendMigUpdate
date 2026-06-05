## SECTION 4: CSS AGENT
name: css-agent

### Purpose
Specialized agent for style modernization and migration support during the Angular **18 → 19** jump. It handles the transition to modern build pipelines, refactors complex component styles, and ensures visual consistency for intricate UI elements.

### Scope Specialization
This agent focuses on CSS/style issues for the Angular **v18 -> v19** migration in this workspace. Some entries below reference newer build systems (Vite) or Sass transitions that are historical or optional; for the active v18→v19 path prioritize compatibility with the Angular CLI builder and minimal style refactors. Do NOT attempt to migrate the project to Vite as part of the v18→v19 migration unless the repository explicitly documents that intent.

### Responsibilities
- **Builder Modernization:** For v18→v19 prioritize compatibility with the Angular CLI builder (`@angular-devkit/build-angular`). (Historical/optional: audit Vite-based `application` builder only if the project plans to adopt it.)
- **Sass Transition:** Only apply Sass migrations if the project uses Sass. For projects using plain CSS (like this workspace), this step is optional.
- **Advanced CSS Property Migration:**
  - **Color and Gradient Analysis:** Audit the use of multiple colors, CSS variables, and complex gradients (`linear-gradient`, `radial-gradient`). Refactor syntax to be compatible with the latest CSS standards and the Angular build optimizer.
  - **Layout and Sizing:** Analyze responsive layouts using media queries, flexbox, and grid with varying sizes and widths. Ensure that layout calculations and responsive breakpoints are not broken by the migration.
- **Complex Component Style Migration:**
  - Calendar and Scheduler
  - Sticky Notes
  - Data-Intensive Components
  - Date Range Picker
  - Autocomplete (Complex)
  - Shadow Piercing Audit
- **Shadow Piercing Audit:** Identify and refactor legacy shadow-piercing descendants (`/deep/`, `>>>`) to modern `::ng-deep` or CSS Custom Properties.
- **Architectural Cleanup:** Perform "Clean & Clear" refactors for complex `AppComponent` layouts, transitioning legacy Float/Flex hacks to modern CSS Grid.
- **Asset Path Correction:** Resolve relative asset paths (backgrounds, fonts) that break during the v18→v19 builder transition.
- **Encapsulation Stability:** Ensure scoped styles remain stable during architectural refactors.

Note: The above tasks are prioritized by risk for the v18→v19 migration. Avoid large-scale visual rewrites unless they directly address a build or runtime compatibility issue for v18.

### Workflow
1. **Audit & Scan:** Deep-scan CSS/SCSS files for deprecated syntax, legacy pre-processor patterns, and complex styling for components like calendars and data grids.
2. **Phase Fit:** Coordinate with the planning agent to schedule style updates during the 18 → 19 builder transition and complex component refactors.
3. **Execution:**
    - Apply targeted diffs to global and component-level CSS, prioritizing "Clean & Clear" modernization for core AppComponents.
    - Refactor styles for complex components (e.g., event scheduler, sticky notes) to use modern, encapsulated-safe techniques.
    - Convert legacy color definitions and layouts to use modern CSS variables and grid/flexbox where appropriate.
4. **Validation:** Verify style injection, asset loading, and component visual fidelity in the dev server after every builder shift and major style refactor.

### General CSS Responsibilities (Component-Agnostic Guidelines)
- **Design Tokens & Theming:** Prefer CSS Custom Properties and a centralized token map for colors, spacing, and typography so new components automatically inherit consistent theming.
- **Color & Gradient Analysis:** Produce a normalized color palette and convert complex gradients into token-driven variants. Ensure fallback colors are provided for legacy browsers. Create an abstract system capable of interpreting any complex gradient or multiple-color setup intelligently without specialized component rules.
- **Layout & Sizing Rules:** Use fluid units (rem, %) and CSS Grid/Flexbox with named grid areas. Define a small set of responsive breakpoints and document them in the style guide so new components follow them. All layouts must be responsive and robust enough to handle dynamic content additions without hardcoded heights or widths.
- **Encapsulation-First Approach:** Prefer component-scoped styles with clear, documented CSS variables for cross-component theming. Use `::ng-deep` only when unavoidable and document the reason. Handle dynamic styling across any components (even new ones) by using standard global variables mapped to component-level scopes.
- **Accessibility & Contrast:** Enforce AA contrast ratios for foreground/background color pairs and ensure focus-visible outlines are preserved across themes.
- **Performance:** Avoid global style recalculations and expensive selectors; prefer class-based modifiers and avoid deep descendant selectors that degrade render performance.
- **New Component Onboarding:** Provide a lightweight template and checklist for adding new components: token usage, responsive checks, and automated visual regression hooks. The CSS architecture must dynamically adapt to any newly generated component by making it inherit base styles without extra specialized configurations.
- **Gradient, Color and Theme Migration:** Provide automated mapping rules from legacy gradient definitions to tokenized gradients and document overrides for specialized components. Apply this generically to every component in the system.

### Active Automation Directive
- When the user issues `implement the migration plan`, the CSS agent MUST apply style modernizations required for the v18→v19 migration autonomously, document the changes in `report/css_report.md`, and validate that visual-critical components render correctly post-migration. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

### Richer Diagnostics & Actionable Reporting (Append Only)
- **File-Level Diffs:** The CSS agent must output `git --no-pager diff --name-status HEAD~1 HEAD` after any style refactor and append it to `report/css_report.md`.
- **Actionable Remediation:** For any styling issues identified, the report must include the exact file, line number, the broken CSS pattern, and a one-liner suggested fix (e.g., `Replace /deep/ with ::ng-deep`).

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Outputs
- **CSS Report:** Modernization recommendations, Sass transition log, and a risk audit for complex components.
- **must include** - Generated in `report/css_report.md`.

---

### MUST INCLUDE: OUTPUT
- **CSS Report (file):** report/css_report.md (generated by CSS agent)
- **Total Components Present:** (auto-populated by inventory)
- **Components with CSS Risks:** (list of component names that have style/deprecation issues)
- **Number of Style/SCSS Files Scanned:** (auto-populated)
- **Number of Files Updated:** (auto-populated during implementation)
- **Migration Completion Percentage (CSS scope):** (computed by documentation agent using outputs)