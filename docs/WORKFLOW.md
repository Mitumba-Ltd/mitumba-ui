# Workflow — how a request becomes a released component or fix

This document explains the **end-to-end workflow** for `mitumba-ui`: how an incoming request (a new feature, an enhancement to an existing component, or a bug fix) flows through the system, from the moment an issue is filed to the moment a new version is published to npm and Storybook is redeployed.

This repository is **public** ([github.com/Mitumba-Ltd/mitumba-ui](https://github.com/Mitumba-Ltd/mitumba-ui)), so pull requests come from maintainers, Mitumba engineers, coding agents, and outside contributors alike. The workflow below applies to everyone.

> **This is the narrative "how it flows" guide.** For the detailed authoring *standards* (file structure, token rules, testing and a11y requirements) see [CONTRIBUTING.md](../CONTRIBUTING.md). For the component catalog and build order see [COMPONENT_SPEC.md](../COMPONENT_SPEC.md). This document links to those rather than duplicating them.

---

## Table of contents

1. [The flow at a glance](#the-flow-at-a-glance)
2. [Stage 1 — Issue intake and triage](#stage-1--issue-intake-and-triage)
3. [Stage 2 — Branching](#stage-2--branching)
4. [Stage 3 — Implementation](#stage-3--implementation)
5. [Stage 4 — Local quality gates](#stage-4--local-quality-gates)
6. [Stage 5 — Changeset](#stage-5--changeset)
7. [Stage 6 — Pull request](#stage-6--pull-request)
8. [Stage 7 — Review and squash-merge](#stage-7--review-and-squash-merge)
9. [Stage 8 — Version Packages PR (automated)](#stage-8--version-packages-pr-automated)
10. [Stage 9 — npm publish and Storybook deploy (automated)](#stage-9--npm-publish-and-storybook-deploy-automated)
11. [Stage 10 — Close-out](#stage-10--close-out)
12. [Kinds of requests](#kinds-of-requests)
13. [Choosing the changeset bump](#choosing-the-changeset-bump)
14. [Local quality gates in detail](#local-quality-gates-in-detail)
15. [For agents](#for-agents)
16. [Troubleshooting the release](#troubleshooting-the-release)
17. [Reference links](#reference-links)

---

## The flow at a glance

```
  Issue filed                Triage / label            Branch from main
  (bug / component  ─────▶   (needs-triage,     ─────▶  feat|fix|chore|docs/<thing>
   request / plain           needs-discussion,          one concern per branch
   feature issue)            component-request,
                             bug, agent-ready)
        │
        ▼
  Implement                  Local gates               Add changeset
  (four files,        ─────▶ typecheck · test   ─────▶ .changeset/<name>.md
   tokens only,              build · lint               (pick package + bump)
   a11y, JSDoc)             (exactly what CI runs)
        │
        ▼
  Open PR against main       Review + approval          Squash-merge to main
  (CI + Chromatic     ─────▶ (min 1 approval,    ─────▶ (auto-closes issue
   must be green)            Stanley for new             via "Closes #NNN")
                             components)
        │
        ▼
  "Version Packages" PR       Merge Version PR          npm publish (automated)
  opened automatically ─────▶ (bumps version,   ─────▶ changeset publish
  by changesets/action        updates CHANGELOG,        --access public
                              deletes changeset)         + Storybook redeploy
```

Every arrow after the squash-merge is **automated**. No human runs `npm publish`, and no one tags releases by hand.

---

## Stage 1 — Issue intake and triage

Every unit of work starts as a GitHub issue. There are two issue templates plus the plain-issue path:

| Template | File | Default labels | Use for |
|---|---|---|---|
| **Bug report** | [`.github/ISSUE_TEMPLATE/bug_report.md`](../.github/ISSUE_TEMPLATE/bug_report.md) | `bug`, `needs-triage` | A component is broken or behaving incorrectly |
| **New component request** | [`.github/ISSUE_TEMPLATE/new_component.md`](../.github/ISSUE_TEMPLATE/new_component.md) | `component-request`, `needs-discussion` | A brand-new component or variant |
| Plain issue | (no template) | applied at triage | A general feature/enhancement/update to an existing component |

A general **enhancement or update** to an existing component — for example, [issue #243](https://github.com/Mitumba-Ltd/mitumba-ui/issues/243), which asked to add an optional prop to an existing component — can come in as a plain issue. It does not have to use the new-component template.

**Triage** happens via labels:

- `needs-triage` — new bug, not yet assessed
- `needs-discussion` — design or API is not settled yet
- `component-request` — request for a new component
- `bug` — confirmed defect
- `agent-ready` — the issue is fully specified (props defined, variants documented, no open design questions) and safe to hand to a coding agent

The new-component template includes an **"Agent ready?"** checklist. When every box is ticked (props interface defined, all variants documented, no unresolved design questions), a maintainer applies the `agent-ready` label. Only then should an agent pick the issue up.

---

## Stage 2 — Branching

Branch from `main`, always. `main` is **protected** — there are no direct pushes; every change lands through a pull request.

Branch names are lowercase and hyphenated, prefixed by the change type:

```
feat/<thing>     new component or new capability
fix/<thing>      bug fix
chore/<thing>    tooling, deps, config
docs/<thing>     documentation / Storybook stories only
```

Historically, agent sessions also use `agent/feat-<component>` (see [CONTRIBUTING.md → Branch strategy](../CONTRIBUTING.md#branch-strategy)).

**One component or one concern per branch — no mixing.** A branch that touches two components or fixes two unrelated bugs will be sent back.

```bash
git switch main
git pull
git switch -c feat/listing-card-badge
```

---

## Stage 3 — Implementation

Implementation must follow the standards in [CONTRIBUTING.md](../CONTRIBUTING.md#component-authoring-standards). The essentials:

- **Tokens only.** Import from `@mitumba/tokens`. Never hardcode a hex value or a spacing number. If a token is missing, add it to `packages/tokens/src/` in a separate PR — do not invent local values.
- **MUI `sx` prop only.** No `styled()` API, no inline `style` prop.
- **Strict TypeScript.** No `any`, no `@ts-ignore`.
- **JSDoc on every prop.** Storybook builds the props table from these comments, so they are not optional.
- **Four files per component**, plus a re-export, plus an export from the package barrel:

  ```
  packages/ui/src/components/<group>/<Component>/
  ├── <Component>.tsx          # implementation
  ├── <Component>.types.ts     # props interface (JSDoc on every prop)
  ├── <Component>.test.tsx     # unit + interaction tests
  ├── <Component>.stories.tsx  # Storybook stories
  └── index.ts                 # re-export
  ```

  Then add the export to `packages/ui/src/index.ts`.
- **Mobile-first.** Design for 375px first (the Tecno Spark buyer), then enhance for desktop.
- **Accessibility gate.** Run the Storybook a11y addon on every story; zero violations before the PR.

For an enhancement to an existing component (like issue #243), you edit the existing four files rather than creating new ones — add the prop to `<Component>.types.ts` with JSDoc, implement it in `<Component>.tsx`, add a story variant, and add a test.

---

## Stage 4 — Local quality gates

Run **exactly what CI runs** before opening a PR. `npm install` once, then the four scripts, all of which must pass:

```bash
npm install        # once, to install workspace deps
npm run typecheck
npm run test
npm run build
npm run lint
```

These mirror `.github/workflows/ci.yml` (Node 20). See [Local quality gates in detail](#local-quality-gates-in-detail) for the common ESLint and Testing-Library gotchas.

---

## Stage 5 — Changeset

**Every PR that changes published package behavior must include a changeset.** This is the single trigger that drives versioning and publishing — there is no manual tagging.

Create `.changeset/<name>.md` with frontmatter selecting the package and the bump level:

```md
---
"@mitumba/ui": minor
---

feat(forms): short description of the change
```

Notes specific to this repo:

- `@mitumba/tokens` and `@mitumba/ui` are versioned **independently** (they are not linked in [`.changeset/config.json`](../.changeset/config.json)). Target the package you actually changed. If you changed both, add a frontmatter line for each.
- `@mitumba/storybook` is **ignored** by changesets (see the `ignore` array in `.changeset/config.json`) — it is never published, so it never needs a changeset.
- A PR that changes nothing published (docs-only, CI config) does **not** need a changeset.

See [Choosing the changeset bump](#choosing-the-changeset-bump) for how to pick `patch` / `minor` / `major`.

---

## Stage 6 — Pull request

Open the PR against `main`. It is populated by [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md).

**Title** follows Conventional Commits, scoped to the component or package, and stays under about 70 characters:

```
feat(listing-card): add optional VAZI badge overlay
fix(sti-chip): correct color for score range 40-59
```

**Body** follows the PR template and the observed maintainer style:

- **What does this PR do?** — a one-paragraph summary.
- **Design** — framed in tokens (which colors, spacing, radius tokens you used), never raw hex.
- **Props** — the list of props added or changed.
- `COMPONENT_SPEC updated (X.Y)` — when the change affects the component catalog.
- `Tests: N | Stories: M` — the counts.
- `Closes #NNN` — reference the issue so the merge auto-closes it.

Walk through the PR template **checklist** before requesting review:

- [ ] `npm run typecheck` passes — zero errors
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds for all packages
- [ ] Storybook runs locally — no console errors
- [ ] All required stories written (Default, variants, loading, error, mobile viewport)
- [ ] Storybook a11y panel — zero violations
- [ ] No hardcoded hex values or spacing numbers
- [ ] JSDoc on every prop
- [ ] All four files present: `.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`
- [ ] Export added to `packages/ui/src/index.ts`

On the PR, two automated checks run and **must be green**:

- **CI** (`.github/workflows/ci.yml`) — typecheck → build → test → lint on Node 20.
- **Chromatic** (`.github/workflows/chromatic.yml`) — visual-regression snapshots of your Storybook stories.

---

## Stage 7 — Review and squash-merge

- Minimum **1 approval** before merge.
- **Stanley approves all new components** before their first merge.
- Merge strategy is **squash-merge** into `main`, so each PR becomes a single commit.
- When the PR body contains `Closes #NNN`, the squash-merge **auto-closes the issue**.

---

## Stage 8 — Version Packages PR (automated)

The publish workflow ([`.github/workflows/publish.yml`](../.github/workflows/publish.yml)) runs on **every push to `main`** and uses [`changesets/action@v1`](https://github.com/changesets/action).

When unconsumed `.changeset/*.md` files exist on `main`, `changesets/action` opens a **"Version Packages"** PR (head branch `changeset-release/main`) that:

- bumps the affected package's `version` in its `package.json`,
- updates that package's `CHANGELOG.md`,
- deletes the consumed changeset file.

No one edits versions or changelogs by hand — this PR is generated. Review it and merge it when the bumps look right.

---

## Stage 9 — npm publish and Storybook deploy (automated)

Merging the **Version Packages** PR is another push to `main`, so `publish.yml` runs again. This time there are no unconsumed changesets, so `changesets/action` runs the release step instead:

```bash
npm run release      # → changeset publish
```

This publishes the newly-versioned package(s) to npm with `--access public`. There is **no manual `npm publish` and no manual tagging**.

In parallel, two other workflows react to the push to `main`:

- **`storybook.yml`** deploys Storybook to Cloudflare Pages → [ui.mitumba.stanl.ink](https://ui.mitumba.stanl.ink).
- **`chromatic.yml`** runs visual regression on the merged state.

---

## Stage 10 — Close-out

- The squash-merge already **auto-closed the issue** via `Closes #NNN`.
- A maintainer or agent may comment on the closed issue linking the merged PR(s) and the released version, so anyone following the issue knows exactly where the change shipped.

---

## Kinds of requests

The workflow is the same shape for every request, but the issue template, commit type, and changeset bump differ:

| Request | Example | Issue template | Commit type | Typical bump |
|---|---|---|---|---|
| **New component** | "Add a `RatingStars` component" | New component request | `feat(<component>)` | `minor` |
| **Enhancement / update to an existing component** | Issue #243 — add an optional prop | Plain issue | `feat(<component>)` | `minor` |
| **Bug fix** | "STIScoreChip color wrong for 40-59" | Bug report | `fix(<component>)` | `patch` |
| **Tooling / deps / config** | "Bump MUI to v7.1" | Plain issue | `chore(<scope>)` | `patch` (or none, if unpublished) |
| **Docs / stories only** | "Add all-states story for OTPInput" | Plain issue | `docs(<scope>)` | usually none |

Adding a new **optional** prop (issue #243) is backward compatible, so it is a `feat` with a `minor` bump — not a `major`, because existing consumers are unaffected.

---

## Choosing the changeset bump

Pick the bump level in the changeset frontmatter based on the impact to consumers:

| Bump | When | Examples |
|---|---|---|
| `patch` | Bug fix, no API change | color correction, layout fix, internal refactor with identical behavior |
| `minor` | New component or new **backward-compatible** prop | new `RatingStars`, new optional prop on `ListingCard` |
| `major` | **Breaking** change | prop rename, removed component, removed/renamed token, changed default behavior |

A `major` bump **requires a migration guide** under `docs/migrations/` describing how consumers update.

**Independent versioning:** `@mitumba/tokens` and `@mitumba/ui` carry their own version numbers and are bumped independently. Choose the package that actually changed. A change that touches both packages needs a frontmatter line for each:

```md
---
"@mitumba/tokens": minor
"@mitumba/ui": patch
---

feat(tokens): add earthDark shadow token; ui consumes it
```

---

## Local quality gates in detail

The four scripts below are exactly what `ci.yml` runs on Node 20. Run them locally before every PR.

| Script | What it checks |
|---|---|
| `npm run typecheck` | Strict TypeScript across all packages — zero errors |
| `npm run test` | Vitest + Testing Library unit and interaction tests |
| `npm run build` | All packages build cleanly to `dist/` |
| `npm run lint` | ESLint (Airbnb, strict) + Prettier |

### ESLint gotchas (Airbnb config)

The lint step is strict. The rules that most often break a build:

- `no-nested-ternary` — extract nested ternaries into a variable or helper.
- `no-plusplus` — use `i += 1`, not `i++`.
- `no-use-before-define` — declare before use (functions, variables, types).
- `react/jsx-props-no-spreading` — do not spread `{...props}` onto elements; pass props explicitly.
- `react/no-array-index-key` — do not use the array index as a React `key`.
- `no-promise-executor-return` — do not `return` a value inside a `new Promise((resolve) => ...)` executor.

### Testing-Library gotcha

Components render in **both mobile and desktop layouts**, so the same text can appear **twice** in the DOM. Use `getAllByText` / `queryByText` (or a scoped `within(...)`) where content is duplicated, and avoid asserting on a single heading role when the heading is rendered in both layouts.

---

## For agents

If you are a coding agent working this repo:

1. **Read [`AGENTS.md`](../AGENTS.md), [`CLAUDE.md`](../CLAUDE.md), and [`CONTRIBUTING.md`](../CONTRIBUTING.md) first**, before writing any code. `AGENTS.md` is the canonical entry point for any agent; `CLAUDE.md` is the detailed Track G prompt.
2. **Only pick up `agent-ready` issues** — where the props interface is defined, variants are documented, and there are no open design questions.
3. **One concern per branch.** New component, single fix, or single enhancement — never a mix.
4. **Never invent tokens.** If a token is missing, note it in the PR under "Questions for review" and, if needed, add it in a separate `packages/tokens/src/` PR.
5. **Never install unplanned dependencies.** Bundle size matters; note any needed dependency in the PR.
6. **Always include a changeset** when you change published behavior, and pick the correct package and bump.
7. **Run the four local gates** (`typecheck`, `test`, `build`, `lint`) before opening the PR.

---

## Troubleshooting the release

The release is fully automated, but the final npm publish depends on the **`NPM_TOKEN`** Actions secret having publish rights to the `@mitumba` scope.

**If the "Publish packages" workflow fails on the publish step with an npm auth / registry error** (for example an `E404` on the publish `PUT` request):

- This is a **maintainer secrets issue**, not a code problem.
- The code and the bumped version on `main` are **already correct** — the Version Packages PR has merged, `package.json` and `CHANGELOG.md` are updated, and the changeset is consumed.
- A maintainer needs to fix or refresh `NPM_TOKEN` (ensure it has publish rights to the `@mitumba` scope) and **re-run the failed "Publish packages" workflow**.
- **No code changes and no new PR are needed** — do not bump the version again or re-add a changeset; simply re-run the workflow once the token is fixed.

---

## Reference links

- [CONTRIBUTING.md](../CONTRIBUTING.md) — detailed authoring standards, branch strategy, publishing rules
- [COMPONENT_SPEC.md](../COMPONENT_SPEC.md) — component catalog and build order
- [CLAUDE.md](../CLAUDE.md) — Track G agent prompt
- [AGENTS.md](../AGENTS.md) — canonical entry point for any coding agent
- [`.github/ISSUE_TEMPLATE/bug_report.md`](../.github/ISSUE_TEMPLATE/bug_report.md) — bug report template
- [`.github/ISSUE_TEMPLATE/new_component.md`](../.github/ISSUE_TEMPLATE/new_component.md) — new component request template
- [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md) — PR checklist
- Live Storybook — [ui.mitumba.stanl.ink](https://ui.mitumba.stanl.ink)
- Repository — [github.com/Mitumba-Ltd/mitumba-ui](https://github.com/Mitumba-Ltd/mitumba-ui)
