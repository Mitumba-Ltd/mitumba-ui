# Contributing to mitumba-ui

This is the Mitumba design system. Read this fully before writing a single component. A bad component here breaks every screen that uses it.

---

## Table of contents

1. [Mindset](#mindset)
2. [Branch strategy](#branch-strategy)
3. [Commit conventions](#commit-conventions)
4. [Pull request process](#pull-request-process)
5. [Component authoring standards](#component-authoring-standards)
6. [Token usage rules](#token-usage-rules)
7. [Storybook requirements](#storybook-requirements)
8. [Testing requirements](#testing-requirements)
9. [Accessibility requirements](#accessibility-requirements)
10. [Publishing rules](#publishing-rules)
11. [For agent sessions (Claude Code — Track G)](#for-agent-sessions)

---

## Mindset

Every component in this repo will be used across every screen of the Mitumba platform — seen by millions of Kenyan buyers and sellers. A broken button blocks checkout. A misaligned card destroys trust. An inaccessible input excludes users.

Design with three users in mind at all times:
- A buyer in Kisumu on a Tecno Spark, Chrome browser, 3G connection
- A seller in Nairobi on a desktop Chrome, listing 10 items at once
- A buyer on a desktop in Westlands comparing 3 listings side by side

If it works beautifully for all three, ship it.

---

## Branch strategy

Same as the main Mitumba repo — GitHub Flow.

```
main
  └── feat/listing-card
  └── feat/vazi-outfit-card
  └── fix/sti-chip-color-contrast
  └── chore/bump-mui-v7
  └── docs/storybook-phone-input
  └── agent/feat-otp-input
```

**Rules:**
- Branch from `main` always
- One component or one fix per branch — no mixing
- Lowercase, hyphenated names only
- `main` is protected — PRs required, no direct pushes

---

## Commit conventions

Conventional Commits, scoped to the component or package:

```
feat(listing-card): add VAZI badge overlay
fix(sti-chip): correct color for score range 40-59
chore(tokens): add earthDark shadow token
docs(storybook): add OTPInput all-states story
refactor(button): extract loading spinner to shared util
test(price-tag): add KES formatting edge case tests
```

---

## Pull request process

### Before opening

- [ ] `npm run typecheck` — zero errors
- [ ] `npm run test` — all tests pass
- [ ] `npm run build` — packages build cleanly
- [ ] Storybook runs locally with no console errors for your component
- [ ] All required stories written (see Storybook requirements)
- [ ] Accessibility checked (see Accessibility requirements)
- [ ] No hardcoded hex values — tokens only

### PR title

Same format as commit: `feat(vazi-outfit-card): add multi-city shipping label`

### Review rules

- Minimum 1 approval before merge
- Stanley approves all new components before first merge
- Squash merge into `main`

---

## Component authoring standards

### File structure — one component per folder

```
src/components/listing/ListingCard/
├── ListingCard.tsx          # Component implementation
├── ListingCard.types.ts     # TypeScript interface for props
├── ListingCard.test.tsx     # Unit + snapshot tests
├── ListingCard.stories.tsx  # Storybook stories
└── index.ts                 # Re-export
```

### Props interface — always explicit

```tsx
// ListingCard.types.ts
export interface ListingCardProps {
  /** Unique listing identifier */
  listingId: string
  /** Full URL to primary listing image (R2 CDN) */
  imageUrl: string
  /** Listing title — max 80 chars */
  title: string
  /** Price in Kenyan Shillings */
  priceKes: number
  /** Seller display name */
  sellerName: string
  /** Seller Trust Index score 0–100 */
  sellerSti: number
  /** City where the seller is located */
  city: string
  /** Item condition grade */
  conditionGrade: 'A' | 'B' | 'C'
  /** Whether listing has passed VAZI classification */
  isVaziEligible?: boolean
  /** Called when card is tapped/clicked */
  onTap?: () => void
}
```

Every prop must have a JSDoc comment — this is what Storybook uses to generate the props table automatically.

### Component structure

```tsx
// ListingCard.tsx
import React from 'react'
import { Box, Typography } from '@mui/material'
import { tokens } from '@mitumba/tokens'
import type { ListingCardProps } from './ListingCard.types'

export const ListingCard: React.FC<ListingCardProps> = ({
  listingId,
  imageUrl,
  title,
  priceKes,
  sellerName,
  sellerSti,
  city,
  conditionGrade,
  isVaziEligible = false,
  onTap,
}) => {
  return (
    <Box
      onClick={onTap}
      sx={{
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        cursor: onTap ? 'pointer' : 'default',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': onTap ? {
          transform: 'translateY(-2px)',
          boxShadow: tokens.shadows.elevated,
        } : {},
      }}
    >
      {/* implementation */}
    </Box>
  )
}

export default ListingCard
```

### Rules

- **No hardcoded colors** — `tokens.colors.green` not `'#3D9A52'`
- **No hardcoded spacing** — `tokens.spacing.base` not `16`
- **No inline `style` prop** — use MUI `sx` prop only
- **No MUI `styled()` API** — `sx` keeps styles colocated and readable
- **All images via `next/image`** — never a raw `<img>` tag
- **All interactive elements keyboard accessible** — `onClick` on non-button elements needs `onKeyDown` + `role` too
- **Loading state required** — every component that fetches or loads data must have a skeleton variant
- **Error state required** — every component must handle failed/missing data gracefully

### Responsive behavior — required for every component

All components must be tested and documented at these breakpoints:

| Breakpoint | Width | Represents |
|---|---|---|
| `xs` | 375px | Tecno Spark, budget Android |
| `sm` | 390px | iPhone SE |
| `md` | 768px | Tablet |
| `lg` | 1280px | Desktop |
| `xl` | 1440px | Wide desktop |

Mobile (xs/sm) is the primary viewport. Desktop enhances. Never the other way around.

---

## Token usage rules

**Always import from `@mitumba/tokens`:**

```tsx
import { tokens } from '@mitumba/tokens'

// ✅ correct
sx={{ color: tokens.colors.green }}
sx={{ padding: tokens.spacing.base }}
sx={{ borderRadius: tokens.radius.lg }}

// ❌ wrong — hardcoded values
sx={{ color: '#3D9A52' }}
sx={{ padding: 16 }}
sx={{ borderRadius: 12 }}
```

**Never extend or override tokens locally.** If a token is missing, add it to `packages/tokens/src/` in a separate PR — don't invent local values.

---

## Storybook requirements

Every component must have the following stories before the PR is opened:

### Required stories

```tsx
// ListingCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ListingCard } from './ListingCard'

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'], // Auto-generates props table from JSDoc
}

export default meta
type Story = StoryObj<typeof ListingCard>

// 1. Default — the most common usage
export const Default: Story = {
  args: {
    listingId: 'abc123',
    imageUrl: 'https://placehold.co/300x400',
    title: 'Nike Air Force 1 Low White',
    priceKes: 2500,
    sellerName: 'KisumuKicks',
    sellerSti: 88,
    city: 'Kisumu',
    conditionGrade: 'A',
    isVaziEligible: true,
  },
}

// 2. All condition grades
export const ConditionGradeA: Story = { args: { ...Default.args, conditionGrade: 'A' } }
export const ConditionGradeB: Story = { args: { ...Default.args, conditionGrade: 'B' } }
export const ConditionGradeC: Story = { args: { ...Default.args, conditionGrade: 'C' } }

// 3. STI score variants
export const TrustedSeller: Story = { args: { ...Default.args, sellerSti: 92 } }
export const GoodSeller: Story = { args: { ...Default.args, sellerSti: 72 } }
export const AtRiskSeller: Story = { args: { ...Default.args, sellerSti: 48 } }

// 4. Without VAZI badge
export const NonVazi: Story = { args: { ...Default.args, isVaziEligible: false } }

// 5. Loading skeleton
export const Loading: Story = { render: () => <ListingCardSkeleton /> }

// 6. Mobile viewport
export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
}

// 7. Long title (truncation test)
export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Vintage Levi\'s 501 Original Fit Stonewash Blue Denim Jeans W32 L30 Made in USA',
  },
}
```

**Storybook story checklist:**
- [ ] Default story
- [ ] All significant prop variants
- [ ] Loading/skeleton state
- [ ] Error/empty state
- [ ] Mobile viewport (375px)
- [ ] Long content / edge case content
- [ ] Keyboard interaction documented in story notes if applicable

---

## Testing requirements

### Unit tests — required for all components

```tsx
// ListingCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MitumbaThemeProvider } from '../../theme/provider'
import { ListingCard } from './ListingCard'

const defaultProps = {
  listingId: 'abc123',
  imageUrl: 'https://placehold.co/300x400',
  title: 'Nike Air Force 1',
  priceKes: 2500,
  sellerName: 'TestSeller',
  sellerSti: 85,
  city: 'Nairobi',
  conditionGrade: 'A' as const,
}

const renderCard = (props = {}) =>
  render(
    <MitumbaThemeProvider>
      <ListingCard {...defaultProps} {...props} />
    </MitumbaThemeProvider>
  )

describe('ListingCard', () => {
  it('renders title and price', () => {
    renderCard()
    expect(screen.getByText('Nike Air Force 1')).toBeInTheDocument()
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('shows VAZI badge when eligible', () => {
    renderCard({ isVaziEligible: true })
    expect(screen.getByText('VAZI')).toBeInTheDocument()
  })

  it('hides VAZI badge when not eligible', () => {
    renderCard({ isVaziEligible: false })
    expect(screen.queryByText('VAZI')).not.toBeInTheDocument()
  })

  it('calls onTap when clicked', () => {
    const onTap = jest.fn()
    renderCard({ onTap })
    fireEvent.click(screen.getByRole('article'))
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('formats price with comma separator', () => {
    renderCard({ priceKes: 1500 })
    expect(screen.getByText('KES 1,500')).toBeInTheDocument()
  })
})
```

**Coverage requirements:**
- All components: 80%+ line coverage
- Commerce components (PriceTag, OrderTimeline, EscrowStatus): 100% branch coverage
- Token exports: 100% — every token must be tested for existence and correct value

---

## Accessibility requirements

Every component must pass before merge:

- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text (use Storybook a11y addon)
- [ ] Keyboard navigable — Tab reaches all interactive elements
- [ ] Focus ring visible — never `outline: none` without a custom focus indicator
- [ ] Images have `alt` text — empty string `alt=""` for decorative images
- [ ] Form inputs have associated labels
- [ ] Interactive non-button elements have `role` and `tabIndex`
- [ ] Screen reader text for icon-only buttons (`aria-label`)

Run the Storybook accessibility panel on every story before opening a PR.

---

## Publishing rules

- Packages publish automatically via GitHub Actions when a release tag is pushed
- Version bumps use semantic versioning: `MAJOR.MINOR.PATCH`
- `PATCH` — bug fixes, no API changes
- `MINOR` — new components, new props (backward compatible)
- `MAJOR` — breaking changes (prop renames, removed components, token renames)
- Breaking changes require a migration guide in `docs/migrations/`
- Never publish manually — always via the CI workflow

---

## For agent sessions

If you are a Claude Code agent (Track G) reading this:

1. **Read `CLAUDE.md` first** — it is your primary instruction file
2. **Read `COMPONENT_SPEC.md`** — it lists every component you need to build, in order
3. **One component per branch** — `agent/feat-listing-card`, `agent/feat-sti-chip`, etc.
4. **Build in order** — tokens first, then foundation, then domain components. Do not jump ahead.
5. **Every component needs all four files** — `.tsx`, `.types.ts`, `.test.tsx`, `.stories.tsx`
6. **Run before every commit:** `npm run typecheck` + `npm run test` + `npm run build`
7. **Storybook must run cleanly** — `npm run storybook` with no console errors
8. **No hardcoded values anywhere** — tokens only
9. **Do not create new tokens** — if a token is missing, note it in your PR under "Questions for review"
10. **Do not install new dependencies** without noting them in the PR — the bundle size of this package matters
