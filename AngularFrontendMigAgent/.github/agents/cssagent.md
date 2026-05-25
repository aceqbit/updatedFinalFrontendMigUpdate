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
  - **Calendar and Scheduler:** Calendar and Scheduler.
  - **Sticky Notes:** Sticky Notes.
  - **Data-Intensive Components:** Data-Intensive Components.
  - **Date Picker and Autocomplete Migration:**
    - **Date Range Picker:** Date Range Picker.
    - **Autocomplete (Complex):** Autocomplete (Complex).
- **Shadow Piercing Audit:** Shadow Piercing Audit.
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

---

### must include OUTPUT
- **Report:** `report/css_report.md`
- **Total number of components present:** (agent-discovered integer)
- **Total number of components migrated (styles updated):** (agent-updated integer)
- **Total number of components pending style migration:** (agent-computed integer)
- **Migration completion percentage:** (computed as migrated/total * 100)
- **Timestamp:** (ISO 8601 UTC when report was generated)
- **Core details:** color token map, gradients normalized, layout changes list, and list of updated breakpoints.


### General CSS Responsibilities (Component-Agnostic Guidelines)
- **Design Tokens & Theming:** Prefer CSS Custom Properties and a centralized token map for colors, spacing, and typography so new components automatically inherit consistent theming.
- **Token Governance:** Keep tokens centralized and versioned so component styles read from shared variables instead of hard-coded values.
- **Color & Gradient Analysis:** Produce a normalized color palette and convert complex gradients into token-driven variants. Ensure fallback colors are provided for legacy browsers.
- **Palette Mapping:** Maintain a small, named palette for brand, surface, text, accent, success, warning, and error colors.
- **Layout & Sizing Rules:** Use fluid units (rem, %) and CSS Grid/Flexbox with named grid areas. Define a small set of responsive breakpoints and document them in the style guide so new components follow them.
- **Breakpoint Discipline:** Prefer one mobile, one tablet, and one desktop breakpoint unless a component has a documented exception.
- **Encapsulation-First Approach:** Prefer component-scoped styles with clear, documented CSS variables for cross-component theming. Use `::ng-deep` only when unavoidable and document the reason.
- **Selector Hygiene:** Avoid deep descendant selectors and brittle DOM coupling; favor utility classes and component-scoped modifiers.
- **Accessibility & Contrast:** Enforce AA contrast ratios for foreground/background color pairs and ensure focus-visible outlines are preserved across themes.
- **Interaction States:** Define hover, focus-visible, disabled, and active states for interactive controls before adding component-specific overrides.
- **Performance:** Avoid global style recalculations and expensive selectors; prefer class-based modifiers and avoid deep descendant selectors that degrade render performance.
- **Style Cost Control:** Keep expensive effects such as heavy shadows, large filters, and wide-area repaints isolated to the smallest possible surface.
- **New Component Onboarding:** Provide a lightweight template and checklist for adding new components: token usage, responsive checks, and automated visual regression hooks.
- **Visual Regression Hooks:** Capture baseline screenshots for layout-heavy components before shipping style changes.
- **Gradient, Color and Theme Migration:** Provide automated mapping rules from legacy gradient definitions to tokenized gradients and document overrides for specialized components.

### Last Run Summary

- Report generated: [report/css_report.md](report/css_report.md)
- Total components discovered: 16
- Components with styles updated by agent: 0
- Total number of components migrated: 0
- Components pending style migration: 16
- Total number of components pending migration: 16
- Migration completion percentage: 0%
- Spec files present: 16
- Spec files missing: 0
- Report timestamp (UTC): 2026-05-19T12:00:00Z

Please review `report/css_report.md` for component details and next steps.

