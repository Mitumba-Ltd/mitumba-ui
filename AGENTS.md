# AGENTS.md — entry point for coding agents

> This is the canonical entry point for **any** coding agent working on `@mitumba/ui` (not just Claude). Read this first, then read the documents it links to before writing a single line of code.

`mitumba-ui` is the official Mitumba design system — a public, MIT-licensed monorepo of design tokens (`@mitumba/tokens`) and React + MUI v7 components (`@mitumba/ui`), documented in Storybook.

---

## Read these first, in order

1. **[docs/WORKFLOW.md](./docs/WORKFLOW.md)** — the authoritative, end-to-end workflow: how a request (feature / fix / update) flows from issue → branch → implementation → PR → review → merge → versioning → npm publish. **Start here.**
2. **[CONTRIBUTING.md](./CONTRIBUTING.md)** — detailed authoring standards: file structure, token rules, testing, accessibility, publishing.
3. **[COMPONENT_SPEC.md](./COMPONENT_SPEC.md)** — the component catalog and build order.
4. **[CLAUDE.md](./CLAUDE.md)** — the detailed Track G agent prompt (stack, monorepo layout, task order, non-negotiable rules).

---

## Golden rules

1. **Only work `agent-ready` issues** — props defined, variants documented, no open design questions.
2. **One concern per branch.** Branch from `main` (protected); names are lowercase/hyphenated: `feat/<thing>`, `fix/<thing>`, `chore/<thing>`, `docs/<thing>` (agent sessions may use `agent/feat-<component>`).
3. **Tokens only.** Import from `@mitumba/tokens`; never hardcode hex or spacing. Never invent a token — note a missing one in the PR.
4. **MUI `sx` prop only.** No `styled()`, no inline `style`.
5. **Strict TypeScript.** No `any`, no `@ts-ignore`.
6. **Four files per component** — `.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx` — plus `index.ts` and an export added to `packages/ui/src/index.ts`. JSDoc on every prop (Storybook builds the props table from it).
7. **Mobile-first (375px)** and **accessibility gate** — zero violations in the Storybook a11y addon.
8. **Never install unplanned dependencies** — bundle size matters; note any need in the PR.
9. **Always add a changeset** when you change published behavior. `@mitumba/tokens` and `@mitumba/ui` are versioned independently; `@mitumba/storybook` is ignored. Pick the right package and bump (`patch` / `minor` / `major`).

---

## Local quality gates (exactly what CI runs)

```bash
npm install        # once
npm run typecheck
npm run test
npm run build
npm run lint
```

All four must pass before you open a PR. See [docs/WORKFLOW.md → Local quality gates in detail](./docs/WORKFLOW.md#local-quality-gates-in-detail) for the ESLint (Airbnb) and Testing-Library gotchas — including that components render in **both** mobile and desktop layouts, so use `getAllByText` / `queryByText` where content is duplicated.

---

## Pull requests

- Open against `main`. Title follows Conventional Commits scoped to the component (`feat(scope): ...`), under ~70 chars.
- Fill in [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) and reference the issue with `Closes #NNN`.
- CI (`ci.yml`) and Chromatic (`chromatic.yml`) must be green; minimum 1 approval (Stanley approves new components); squash-merge.
- Publishing is fully automated after merge (Version Packages PR → npm publish). Do **not** run `npm publish` or tag manually. See [docs/WORKFLOW.md](./docs/WORKFLOW.md#stage-8--version-packages-pr-automated).

---

Built by [StaNLink Inc.](https://stanlink.online) — Kisii & Nairobi, Kenya. Repository: [github.com/Mitumba-Ltd/mitumba-ui](https://github.com/Mitumba-Ltd/mitumba-ui).
