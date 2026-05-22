<p align="center">
  <a href="https://mitumba.stanl.ink">
    <img src="https://cloud.stanlink.online/mitumba/assets/images/brand/mitumba-textmark-processed.png" alt="Mitumba" height="48" />
  </a>
</p>

<p align="center">
  <strong>@mitumba/ui</strong><br/>
  The official Mitumba design system — tokens, components, and Storybook documentation.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mitumba/ui"><img src="https://img.shields.io/npm/v/@mitumba/ui?color=3D9A52&label=%40mitumba%2Fui" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@mitumba/tokens"><img src="https://img.shields.io/npm/v/@mitumba/tokens?color=A06235&label=%40mitumba%2Ftokens" alt="npm tokens version" /></a>
  <img src="https://img.shields.io/badge/storybook-live-FF4785" alt="Storybook" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## What this is

`mitumba-ui` is the design system powering all Mitumba products — the web marketplace (`apps/web`), the admin dashboard (`apps/admin`), and eventually the Flutter mobile app via token export.

It ships two packages:

| Package | Description | Install |
|---|---|---|
| `@mitumba/tokens` | Design tokens — colors, spacing, typography, radius, shadows | `npm i @mitumba/tokens` |
| `@mitumba/ui` | React components built on MUI v7 + Mitumba tokens | `npm i @mitumba/ui` |

Both packages are framework-agnostic at the token level. `@mitumba/ui` requires React 18+ and MUI v7.

---

## Live Storybook

> **[ui.mitumba.stanl.ink](https://ui.mitumba.stanl.ink)**

Every component is documented with:
- All variants and states
- Mobile (375px) and desktop (1280px) viewports
- Loading / skeleton states
- Error states
- Accessibility notes

---

## Quick start

### Install

```bash
npm install @mitumba/ui @mitumba/tokens
# peer deps
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### Wrap your app

```tsx
// app/layout.tsx (Next.js 15 app router)
import { MitumbaThemeProvider } from '@mitumba/ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MitumbaThemeProvider>
          {children}
        </MitumbaThemeProvider>
      </body>
    </html>
  )
}
```

### Use components

```tsx
import {
  ListingCard,
  VAZIOutfitCard,
  STIScoreChip,
  PriceTag,
  MitumbaPrimaryButton,
  OfflineBanner,
} from '@mitumba/ui'

import { colors, spacing } from '@mitumba/tokens'
```

---

## Monorepo structure

```
mitumba-ui/
├── packages/
│   ├── tokens/                   # @mitumba/tokens — framework-agnostic design tokens
│   │   ├── src/
│   │   │   ├── colors.ts         # Brand + semantic colors
│   │   │   ├── spacing.ts        # Spacing scale
│   │   │   ├── typography.ts     # Font family, sizes, weights
│   │   │   ├── radius.ts         # Border radius scale
│   │   │   ├── shadows.ts        # Elevation shadows
│   │   │   ├── breakpoints.ts    # Responsive breakpoints
│   │   │   └── index.ts          # Barrel export
│   │   ├── css/
│   │   │   └── variables.css     # CSS custom properties for non-React consumers
│   │   └── package.json
│   └── ui/                       # @mitumba/ui — React + MUI components
│       ├── src/
│       │   ├── theme/
│       │   │   ├── theme.ts      # MUI theme override using tokens
│       │   │   └── provider.tsx  # MitumbaThemeProvider
│       │   ├── components/       # All components (one folder per component)
│       │   │   ├── ListingCard/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── ListingCard.tsx
│       │   │   │   ├── ListingCard.stories.tsx
│       │   │   │   └── ListingCard.test.tsx
│       │   │   ├── VAZIOutfitCard/
│       │   │   ├── STIScoreChip/
│       │   │   └── ... (see COMPONENT_SPEC.md for full list)
│       │   └── index.ts          # Barrel export — all public components
│       └── package.json
├── apps/
│   └── storybook/                # Storybook 8 — documentation site
│       ├── .storybook/
│       │   ├── main.ts
│       │   └── preview.tsx       # Wraps all stories in MitumbaThemeProvider
│       └── package.json
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── ci.yml                # Typecheck + test + build on every PR
│       ├── storybook.yml         # Deploy Storybook to CF Pages on main
│       └── publish.yml           # Publish to npm on release tag vX.X.X
├── CLAUDE.md                     # Agent prompt — read before any code
├── CONTRIBUTING.md
├── COMPONENT_SPEC.md             # Full component catalog with props
└── package.json                  # Root workspace (npm workspaces)
```

---

## Brand colors

| Token | Hex | Usage |
|---|---|---|
| `colors.green` | `#3D9A52` | Primary — buttons, links, success, STI trusted |
| `colors.greenLight` | `#EAF5EC` | Green tint — chip backgrounds, highlights |
| `colors.earth` | `#A06235` | Secondary — VAZI branding, accents |
| `colors.earthLight` | `#F5EDE5` | Earth tint — VAZI backgrounds |
| `colors.background` | `#F7F7F5` | App background — warm off-white |
| `colors.surface` | `#FFFFFF` | Cards, sheets, modals |
| `colors.textPrimary` | `#1A1A18` | Body text, headings |
| `colors.textSecondary` | `#6B6B65` | Subtitles, captions, hints |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

Built by [StaNLink Inc.](https://stanlink.online) — Kisii & Nairobi, Kenya.
