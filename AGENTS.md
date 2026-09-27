# Repository AI Operating Contract

This repository remains authoritative for project-specific scope, architecture, implementation and evidence. `jeremytheva/project-master` supplies reusable standards/templates only.

## Autonomous continuation
On Continue / Proceed / Next, inspect repository and GitHub state, select the highest-priority dependency-correct task, prefer validation/integration when WIP limits are reached, bypass only non-critical blockers with independent work, update durable state, and stop rather than invent speculative work when no accepted requirement, defect, failed validation, review finding, security/data requirement, technical debt or release work exists.

## PR and WIP controls
Normal non-draft PRs are the default. Lifecycle metadata: `IMPLEMENTING → VALIDATING → READY FOR REVIEW → MERGE READY → MERGED`; `BLOCKED` may overlay a state.

Default limits: dependent PR stack <= 2; ordinary open implementation PRs <= 3. If exceeded, stop overlapping implementation, validate/reconcile/merge, update `STATUS.md`, then resume.

## Validation
Prefer the repository canonical executor, normally `npm run platform:validate` when defined. Fallback: canonical executor → trusted alternate → exact-commit equivalent deployment/build → `VALIDATION WAITING`. Unexecuted checks are never PASS; zero-step CI is infrastructure evidence only.

## Evidence, data and providers
`STATUS.md` is the continuity source. Keep validation/deployment/runtime/browser evidence distinct. Application/domain semantics remain separate from physical/provider schemas. Do not invent SQL for a provider-managed system. Provider claims distinguish `IMPLEMENTED`, `PROVIDER VERIFIED` and `APPLICATION VERIFIED`. Irreversible production data/provider changes require a migration approval package with backup/restore and post-change verification evidence.

## Template use
Reuse Project Master patterns before sharing runtime implementation. Record adoption in `.project-master/manifest.yaml`.

## Owner boundary and reporting
Escalate only for inaccessible credentials/secrets, external account/billing configuration, destructive/irreversible operations, third-party approvals, unavailable manual verification, genuinely unresolved product decisions, or material security/privacy/provider/cost choices not already governed.

Routine response:
```text
Done
- <1–3 material outcomes>
Next
- <single best next action>
You
- Nothing required.
```
Add `Blocked`, `Problem` or `Decision needed` only when materially necessary. Detailed evidence stays in repository/GitHub.
