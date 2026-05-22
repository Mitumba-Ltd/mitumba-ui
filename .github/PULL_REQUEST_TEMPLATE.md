## What does this PR do?

<!-- One paragraph. New component, bug fix, token addition, etc. -->

## Type

- [ ] `feat` — new component
- [ ] `fix` — bug fix
- [ ] `chore` — tooling, deps, config
- [ ] `docs` — Storybook stories only
- [ ] `refactor` — no behavior change
- [ ] `test` — tests only

## Component(s) affected

<!-- List the component name(s) -->

## Checklist

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

## Stories written

- [ ] Default
- [ ] All significant variants
- [ ] Loading / skeleton state
- [ ] Error / empty state
- [ ] Mobile viewport (375px)
- [ ] Edge case content (long text, missing data)

## Screenshots

<!-- Storybook screenshot of your component at mobile (375px) and desktop (1280px) -->

| Mobile 375px | Desktop 1280px |
|---|---|
| <!-- screenshot --> | <!-- screenshot --> |

## Questions for review

<!-- Anything architecturally ambiguous — token missing, prop interface unclear, etc. -->
