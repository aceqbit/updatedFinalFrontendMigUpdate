# Angular Migration Notes

This document records the issues and solutions encountered during the Angular 18 → 19 migration process.

## Key Issues

### 1. Inconsistent Bootstrapping

- **Problem:** After migrating to Angular 19, the application failed to bootstrap due to changes in the bootstrapping API. Specifically, the `applicationProviders` property was not recognized in `platformBrowserDynamic().bootstrapModule()`.
- **Solution:** The `bootstrapModule` call in `src/main.ts` was simplified to `platformBrowserDynamic().bootstrapModule(AppModule)`, removing the unsupported options. This resolved the bootstrapping error.

### 2. Corrupted `node_modules` Directory

- **Problem:** The `node_modules` directory became corrupted, leading to "Cannot find module" errors when running `ng serve`. Attempts to remove the directory using `rm -r -force` failed due to file access errors on Windows.
- **Solution:** The `rimraf` package was used to reliably delete the `node_modules` directory and `package-lock.json`. The command `npx rimraf node_modules package-lock.json` was successful. After that, `npm cache clean --force` and `npm install` were run to ensure a clean installation of dependencies.

### Orchestration Polish & Actionability
- *Minor Orchestration Polish:* Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- *Atomic & Actionable Outputs:* All generated plans and reports must be atomic, isolated per version, and actionable.
- *Richer Diagnostics & File-Level Diffs:* Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- *Remediation Steps:* Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Checkpoint Policy Addendum (Commit-only)
- Purpose: The authoritative migration checkpoint is the commit on `main` (commit message + short hash). Do NOT create or push git tags or treat branches as authoritative migration checkpoints.
- When documenting migration notes, always include the checkpoint commit short-hash (`git_checkpoint_commit`) when referring to a completed migration state.
Do not rely on tags or branches as authoritative checkpoints for automation.
