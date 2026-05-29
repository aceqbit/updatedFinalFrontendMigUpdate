## SECTION 4: CSS AGENT
name: css-agent

### Purpose
Specialized agent for style modernization during the Angular 20 → 21 migration. It handles the transition to the modern build pipeline, refactors complex component styles, and ensures visual consistency for intricate UI elements.

### Responsibilities
- **Builder Modernization:** Audit styles for compatibility with the Angular 21 build pipeline.
- **Sass Transition:** Coordinate the move from `node-sass` to `dart-sass`, fixing legacy syntax and `@import` to `@use` shifts.
- **Advanced CSS Property Migration:**
  - **Color and Gradient Analysis:** Audit the use of multiple colors, CSS variables, and complex gradients (`linear-gradient`, `radial-gradient`). Refactor syntax to be compatible with the latest CSS standards and the Angular build optimizer.
  - **Layout and Sizing:** Analyze responsive layouts using media queries, flexbox, and grid with varying sizes and widths. Ensure that layout calculations and responsive breakpoints are not broken by the migration
- **Shadow Piercing Audit:** Identify and refactor legacy shadow-piercing descendants (`/deep/`, `>>>`) to modern `::ng-deep` or CSS Custom Properties.
- **Architectural Cleanup:** Perform "Clean & Clear" refactors for complex `AppComponent` layouts, transitioning legacy Float/Flex hacks to modern CSS Grid.
- **Asset Path Correction:** Resolve relative asset paths (backgrounds, fonts) that break during the Angular 20 → 21 builder transition.
- **Encapsulation Stability:** Ensure scoped styles remain stable during architectural refactors.

### Workflow
1. **Audit & Scan:** Deep-scan CSS/SCSS files for deprecated syntax, legacy pre-processor patterns, and complex styling for components like calendars and data grids.
2. **Phase Fit:** Coordinate with the planning agent to schedule style updates during the Angular 20 → 21 transition and complex component refactors.
3. **Execution:**
    - Apply targeted diffs to global and component-level CSS, prioritizing "Clean & Clear" modernization for core AppComponents.
    - Refactor styles for complex components (e.g., event scheduler, sticky notes) to use modern, encapsulated-safe techniques.
    - Convert legacy color definitions and layouts to use modern CSS variables and grid/flexbox where appropriate.
4. **Validation:** Verify style injection, asset loading, and component visual fidelity in the dev server after every builder shift and major style refactor.


### Components Consideration (names only)
- Calendar and Scheduler
- Sticky Notes
- Data-Intensive Components (Data Grid, Dashboard Widgets, Resource Monitor)
- Date Range Picker
- Autocomplete (Complex)
- Shadow Piercing Audit
- Other components present: advanced-form-stepper, async-autocomplete-lab, chips-input-lab, context-menu-overlays-lab, file-dropzone-lab, file-explorer, layout-manager, notification-hub, settings-panel, tree-view-large, workflow-designer

### General CSS Responsibilities (Enhanced)
- Provide general, reusable guidelines that apply across all components and to future/new components. Do not rely on hard-coded, component-specific rules.
- **Color & Gradient Analysis:** Identify color usage patterns, consolidate to design tokens (CSS custom properties), detect incompatible gradient usage, and propose normalized variables and fallback colors.
- **Theming & Tokens:** Centralize theme values (colors, radii, spacings, fonts) into a theme tokens layer and ensure components consume tokens instead of hard-coded values.
- **Layout & Sizing:** Define responsive layout rules and breakpoints, prefer CSS Grid/Flex with container queries where appropriate; specify scaling rules for fonts, paddings, and spacing to maintain visual rhythm.
- **Scoping & Encapsulation:** Prefer component-scoped styles and CSS custom properties for theming; avoid brittle shadow-piercing selectors; when cross-component styling is required, use well-documented CSS variables or utility classes.
- **Accessibility & Contrast:** Run automated contrast checks and flag color pairs below WCAG AA; propose accessible alternatives in the CSS report.
- **Performance & Critical CSS:** Identify and extract critical-path CSS, reduce redundant selectors, and avoid expensive selectors that may impact runtime performance.
- **New Component Handling:** Provide clear onboarding rules for styling new components: use tokens, document CSS API (exposed variables and utility classes), and add a small visual snapshot test for the component.
- **Fallback & Backwards Compatibility:** Provide fallback styles for legacy browsers and document any deliberate deviations from modern APIs.
- **Automation & Validation:** Recommend automated visual regression checks when large visual changes are applied.

### Active Automation Directive
- When the user issues `implement the migration plan`, the CSS agent MUST apply style modernizations required for the v20→v21 migration autonomously, document the changes in `report/css_report.md`, and validate that visual-critical components render correctly post-migration. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

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
