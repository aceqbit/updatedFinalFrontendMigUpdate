## SECTION 4: CSS AGENT
name: css-agent

### Purpose
Specialized agent for style modernization and migration across Angular version jumps. It handles the transition to modern build pipelines, refactors complex component styles, and ensures visual consistency for intricate UI elements.

### Scope Specialization
This agent focuses on CSS/style issues for the Angular **v16 -> v17** migration in this workspace. Some entries below reference newer build systems (Vite) or Sass transitions that are historical or optional; for the active v16→v17 path prioritize compatibility with the Angular CLI builder and minimal style refactors. Do NOT attempt to migrate the project to Vite as part of the v16→v17 migration unless the repository explicitly documents that intent.

### Responsibilities
- **Builder Modernization:** For v16→v17 prioritize compatibility with the Angular CLI builder (`@angular-devkit/build-angular`). (Historical/optional: audit Vite-based `application` builder only if the project plans to adopt it.)
- **Sass Transition:** Only apply Sass migrations if the project uses Sass. For projects using plain CSS (like this workspace), this step is optional.
- **Advanced CSS Property Migration:**
  - **Color and Gradient Analysis:** Audit the use of multiple colors, CSS variables, and complex gradients (`linear-gradient`, `radial-gradient`). Refactor syntax to be compatible with the latest CSS standards and the Angular build optimizer.
  - **Layout and Sizing:** Analyze responsive layouts using media queries, flexbox, and grid with varying sizes and widths. Ensure that layout calculations and responsive breakpoints are not broken by the migration.
- **Complex Component Style Migration:**
- **Complex Component Style Migration:**
  - Calendar and Scheduler
  - Sticky Notes
  - Data-Intensive Components
  - Date Range Picker
  - Autocomplete (Complex)
  - Shadow Piercing Audit
- **Shadow Piercing Audit:** Identify and refactor legacy shadow-piercing descendants (`/deep/`, `>>>`) to modern `::ng-deep` or CSS Custom Properties.
- **Architectural Cleanup:** Perform "Clean & Clear" refactors for complex `AppComponent` layouts, transitioning legacy Float/Flex hacks to modern CSS Grid.
- **Asset Path Correction:** Resolve relative asset paths (backgrounds, fonts) that break during the v16→v17 builder transition.
- **Encapsulation Stability:** Ensure scoped styles remain stable during architectural refactors.

Note: The above tasks are prioritized by risk for the v16→v17 migration. Avoid large-scale visual rewrites unless they directly address a build or runtime compatibility issue for v17.

### Workflow
1. **Audit & Scan:** Deep-scan CSS/SCSS files for deprecated syntax, legacy pre-processor patterns, and complex styling for components like calendars and data grids.
2. **Phase Fit:** Coordinate with the planning agent to schedule style updates during builder transitions (v16→v17) and complex component refactors.
3. **Execution:**
    - Apply targeted diffs to global and component-level CSS, prioritizing "Clean & Clear" modernization for core AppComponents.
    - Refactor styles for complex components (e.g., event scheduler, sticky notes) to use modern, encapsulated-safe techniques.
    - Convert legacy color definitions and layouts to use modern CSS variables and grid/flexbox where appropriate.
4. **Validation:** Verify style injection, asset loading, and component visual fidelity in the dev server after every builder shift and major style refactor.

### Outputs
- **CSS Report:** Modernization recommendations, Sass transition log, and a risk audit for complex components.
- **must include** - Generated in `report/css_report.md`.

### Append-Only: Diagnostics, Node, and Memory Guidance
- When style validation fails, produce a diagnostics section in `report/css_report.md` with:
  - Affected files and a file-level diff (`report/css_file_diffs.diff`)
  - Remediation steps and effort estimates
  - Node version and environment info if style build fails due to tooling
- Vulnerability triage: If a CSS-related npm package is flagged by `npm audit`, note it in the report and suggest a remediation step.
- Non-destructive memory clarification: Any prior notes on "skill & memory utilisation" are informational only and must not be used as gating signals for automation.


### General CSS Responsibilities (Component-Agnostic Guidelines)
- **Design Tokens & Theming:** Prefer CSS Custom Properties and a centralized token map for colors, spacing, and typography so new components automatically inherit consistent theming.
- **Color & Gradient Analysis:** Produce a normalized color palette and convert complex gradients into token-driven variants. Ensure fallback colors are provided for legacy browsers.
- **Layout & Sizing Rules:** Use fluid units (rem, %) and CSS Grid/Flexbox with named grid areas. Define a small set of responsive breakpoints and document them in the style guide so new components follow them.
- **Encapsulation-First Approach:** Prefer component-scoped styles with clear, documented CSS variables for cross-component theming. Use `::ng-deep` only when unavoidable and document the reason.
- **Accessibility & Contrast:** Enforce AA contrast ratios for foreground/background color pairs and ensure focus-visible outlines are preserved across themes.
- **Performance:** Avoid global style recalculations and expensive selectors; prefer class-based modifiers and avoid deep descendant selectors that degrade render performance.
- **New Component Onboarding:** Provide a lightweight template and checklist for adding new components: token usage, responsive checks, spec file presence, and automated visual regression hooks.
- **Gradient, Color and Theme Migration:** Provide automated mapping rules from legacy gradient definitions to tokenized gradients and document overrides for specialized components.

### Extended General Responsibilities (added)
- **Automated Token & Gradient Normalization:** Provide mapping rules and a lightweight script or recipe to convert legacy gradients and hard-coded colors into tokenized variants that new and existing components consume.
- **New Component Robustness:** Ensure the CSS approach gracefully supports new components without bespoke rules; favor token-driven overrides, semantic class names, and documented component style templates so newly added components adopt the global theme automatically.
- **Layout System Standards:** Publish a minimal layout system (named grid areas, spacing scale, and breakpoint tokens) so all components can align with a single, consistent responsive strategy.
- **Color & Contrast Audit Tools:** Recommend or include lightweight checks for color contrast and token usage to guard against accessibility regressions during automated refactors.
- **Performance & Rendering Discipline:** Standardize on class-based, low-specificity selectors and discourage deep combinators. Provide guidance on CSS complexity limits per component and how to split large style blobs into composable tokens.
- **Change-Ready Migration:** Document a rollback-safe pattern for style updates: apply token mapping in a layered approach (`tokens.css` → component vars → overrides) so visual regressions are easy to isolate and revert.

### must include OUTPUT
- **Report:** `report/css_report.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated (styles updated):** (agent-updated integer)
- **Total number of components pending style migration:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Timestamp:** (ISO 8601 UTC when report was generated)
- **Core details:** color token map, gradients normalized, layout changes list, and list of updated breakpoints.