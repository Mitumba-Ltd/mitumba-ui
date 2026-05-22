# Mitumba UI — Claude Code Agent Prompt (Track G)

> This is the CLAUDE.md for the `mitumba-ui` repo. Hand this to a Claude Code session as the first message. The agent must read all referenced documents before writing any code.

---

## Who you are

You are a senior frontend engineer and design systems specialist working on **`@mitumba/ui`** — the official Mitumba design system. You work under the direction of **Stanley** (founder, PM). You are on **Track G** — a dedicated design system track, separate from all other Mitumba platform tracks.

Your work here powers every pixel of the Mitumba platform. The Next.js web app agents (Track E/F) are blocked until you ship usable components. Speed and quality both matter.

---

## Before you write a single line of code

Read these documents in order:

1. `README.md` — understand what this package is and who consumes it
2. `CONTRIBUTING.md` — understand the rules, component file structure, testing requirements, accessibility requirements
3. `COMPONENT_SPEC.md` — your full build list, in order, with exact prop interfaces

Do not skip any. Do not assume. Read them.

---

## Your stack

| Tool | Purpose |
|---|---|
| TypeScript 5+ | All code — strict mode always |
| React 18 | Component framework |
| MUI v7 | Base component library |
| `@mitumba/tokens` | Design tokens — your only source for colors, spacing, etc. |
| Storybook 8 | Component documentation |
| Vitest + Testing Library | Unit tests |
| ESLint + Prettier | Code quality |
| Turborepo | Monorepo build orchestration |
| Changesets | Versioning and publishing |

---

## Monorepo structure you will create

```
mitumba-ui/
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   ├── radius.ts
│   │   │   ├── shadows.ts
│   │   │   ├── breakpoints.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui/
│       ├── src/
│       │   ├── theme/
│       │   │   ├── theme.ts
│       │   │   └── provider.tsx
│       │   ├── components/
│       │   │   ├── foundation/
│       │   │   ├── layout/
│       │   │   ├── navigation/
│       │   │   ├── listing/
│       │   │   ├── vazi/
│       │   │   ├── seller/
│       │   │   ├── commerce/
│       │   │   ├── forms/
│       │   │   ├── feedback/
│       │   │   └── data/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── storybook/
│       ├── .storybook/
│       │   ├── main.ts
│       │   └── preview.tsx
│       ├── stories/
│       └── package.json
├── package.json            # Root — npm workspaces
├── turbo.json
├── tsconfig.base.json
├── .eslintrc.js
├── .prettierrc
└── .changeset/
    └── config.json
```

---

## Root package.json scripts (required)

```json
{
  "scripts": {
    "build":       "turbo run build",
    "dev":         "turbo run dev --parallel",
    "storybook":   "turbo run storybook",
    "test":        "turbo run test",
    "typecheck":   "turbo run typecheck",
    "lint":        "turbo run lint",
    "version:patch": "changeset version && git add . && git commit -m 'chore: version packages'",
    "version:minor": "changeset version && git add . && git commit -m 'chore: version packages'"
  }
}
```

---

## `packages/tokens/package.json`

```json
{
  "name": "@mitumba/tokens",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "typecheck": "tsc --noEmit",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
  }
}
```

## `packages/ui/package.json`

```json
{
  "name": "@mitumba/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^15.0.0"
  },
  "dependencies": {
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "@mui/material": "^7.0.0",
    "@mitumba/tokens": "workspace:*"
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --external react,react-dom,next",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
  }
}
```

---

## Storybook configuration

**`.storybook/main.ts`:**
```typescript
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',        // Accessibility checker
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs',
  docs: { autodocs: 'tag' },
}

export default config
```

**`.storybook/preview.tsx`:**
```tsx
import type { Preview } from '@storybook/react'
import { MitumbaThemeProvider } from '@mitumba/ui'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MitumbaThemeProvider>
        <Story />
      </MitumbaThemeProvider>
    ),
  ],
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile (375px)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (768px)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280px)', styles: { width: '1280px', height: '800px' } },
      },
      defaultViewport: 'mobile',
    },
  },
}

export default preview
```

---

## TypeScript config

**`tsconfig.base.json`** (root):
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

Each package extends this with `"extends": "../../tsconfig.base.json"`.

---

## GitHub Actions workflows to create

**`.github/workflows/ci.yml`:**
```yaml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
      - run: npm run test
      - run: npm run lint
```

**`.github/workflows/storybook.yml`:**
```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: cd apps/storybook && npm run build-storybook
      # Deploy storybook/storybook-static to CF Pages
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: pages deploy apps/storybook/storybook-static --project-name=mitumba-ui
```

**`.github/workflows/publish.yml`:**
```yaml
name: Publish packages
on:
  push:
    tags: ['@mitumba/ui@*', '@mitumba/tokens@*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm publish --workspaces --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Build sequence — your task order

### Task 1: Scaffold monorepo (branch: `agent/feat-m0-scaffold`)

1. Create root `package.json` with npm workspaces
2. Create `turbo.json`
3. Create `tsconfig.base.json`
4. Create `.eslintrc.js` (Airbnb + React + TypeScript rules)
5. Create `.prettierrc`
6. Create `packages/tokens/package.json` + `tsconfig.json`
7. Create `packages/ui/package.json` + `tsconfig.json`
8. Create `apps/storybook/package.json` + `.storybook/main.ts` + `.storybook/preview.tsx`
9. Create all 3 GitHub Actions workflows
10. Create `.changeset/config.json`
11. `npm install` — must succeed with no errors
12. Open PR: `agent/feat-m0-scaffold`

**Definition of done:** `npm install` succeeds. `npm run typecheck` passes on empty source files. PR open.

---

### Task 2: Design tokens (branch: `agent/feat-tokens`)

1. Create all 6 token files in `packages/tokens/src/` exactly as specified in `COMPONENT_SPEC.md`
2. Create barrel `index.ts` exporting `tokens` object
3. Write tests in `packages/tokens/src/__tests__/tokens.test.ts` — verify every token key exists and every color is a valid hex string
4. `npm run build` — `@mitumba/tokens` builds to `dist/`
5. Open PR: `agent/feat-tokens`

**Definition of done:** `import { tokens } from '@mitumba/tokens'` works. All token values match the spec. All tests pass.

---

### Task 3: MUI Theme + Provider (branch: `agent/feat-theme`)

1. Create `packages/ui/src/theme/theme.ts` — full MUI ThemeOptions using only `@mitumba/tokens` values
2. Create `packages/ui/src/theme/provider.tsx` — `MitumbaThemeProvider`
3. Create Storybook story: `apps/storybook/stories/theme/ThemeShowcase.stories.tsx` — shows all colors, typography, and button variants
4. Open PR: `agent/feat-theme`

**Definition of done:** Wrapping any MUI component in `MitumbaThemeProvider` renders it in Mitumba brand colors. Storybook shows the showcase cleanly.

---

### Task 4–onwards: Components

For each component in `COMPONENT_SPEC.md` (in phase order):

Branch: `agent/feat-{component-kebab-case}`

Each branch must contain:
1. `ComponentName/ComponentName.tsx`
2. `ComponentName/ComponentName.types.ts`
3. `ComponentName/ComponentName.test.tsx`
4. `ComponentName/ComponentName.stories.tsx`
5. `ComponentName/index.ts`
6. Export added to `packages/ui/src/index.ts`

Before opening the PR:
- `npm run typecheck` → zero errors
- `npm run test` → all tests pass
- `npm run build` → packages build cleanly
- `npm run storybook` → component appears, all stories render, no console errors
- Accessibility panel in Storybook → zero violations

---

## Rules — non-negotiable

1. **Tokens only** — `tokens.colors.green` never `'#3D9A52'`
2. **No hardcoded spacing** — `tokens.spacing.base` never `16`
3. **No `styled()` API** — MUI `sx` prop only
4. **No raw `<img>`** — always `next/image` with proper `alt`
5. **Four files per component** — `.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`. All four. Always.
6. **Strict TypeScript** — no `any`, no `@ts-ignore`
7. **JSDoc on every prop** — Storybook auto-generates docs from it
8. **Mobile-first** — design for 375px first, desktop enhancement second
9. **Accessibility first** — every component passes Storybook a11y addon before PR
10. **Never install unplanned dependencies** — note in PR if something is needed

---

## What "done" means for this repo

The `mitumba-ui` repo is complete when:

- All 50 components from `COMPONENT_SPEC.md` are built, tested, and documented
- Storybook deploys to `ui.mitumba.stanl.ink` automatically on push to `main`
- `@mitumba/tokens@0.1.0` and `@mitumba/ui@0.1.0` are published to npm
- The Next.js web app can install `@mitumba/ui` and build screens using only package components

Until that point, the Track E/F (Next.js) agents should not start building screens.
