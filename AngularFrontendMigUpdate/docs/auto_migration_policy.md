# Auto Migration Policy (workspace copy)

- When the user requests `implement the migration plan`, the agents must execute a fully autonomous Angular version migration as specified by the active plan (for example, v17→v18 or a later single-step plan).
- Autonomous sequence must include: `npm install`, `ng update` (if applicable), `ng build`, `ng test --watch=false` (headless), and required validation gates.
- After successful validation, create git checkpoint and push: `git status`, `git add -A`, `git commit -m "chore(migration): complete <target>"`, `git push origin HEAD`, then `git tag <target>-stable && git push origin <target>-stable`.
- Agents must accept and persist file changes as part of the run; they should not pause for user confirmation during routine migration steps.
- Optional prompts must be resolved using recommended/default options automatically.
- Agents must log actions and failures to `report/implementation_log.md` and summary to `report/migration_report.md`.
- Location: This policy is stored in-repo at `docs/auto_migration_policy.md` (workspace-local), and should be referenced by agent artifacts instead of external memory paths.

- **Active workspace scope update:** For this workspace the active autonomous migration scope is now Angular v18 -> v19 only until the next explicit plan is created. Agents and skills MUST enforce a fully autonomous start-to-finish run for the v18 → v19 migration, including automatic git checkpointing and push on success.
