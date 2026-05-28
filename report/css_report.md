# CSS Report — Angular 20 → 21 Migration

Date: 2026-05-28

## Summary
- Scanned component styles for deprecated shadow-piercing selectors (`/deep/`, `>>>`, `::ng-deep`).
- Found one usage of `::ng-deep` in `src/app/components/autocomplete-complex/autocomplete-complex.component.css`.

## Findings
- `src/app/components/autocomplete-complex/autocomplete-complex.component.css` contains `::ng-deep` selectors (line ~98). This is permitted but should be reviewed for future removal; `::ng-deep` is a last-resort escape hatch.
- No `/deep/` or `>>>` selectors were found.

## Recommendations
- Keep `::ng-deep` usage as-is for now; plan later refactor to use CSS variables or component composition if desired.
