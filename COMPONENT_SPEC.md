# Mitumba UI — Component Specification

This document is the authoritative list of every component that must exist in `@mitumba/ui`. Components are listed in **build order** — agents must build them in this sequence. Do not skip ahead. Foundation components are dependencies of domain components.

---

## Build order overview

```
Phase 1 — Tokens
Phase 2 — Theme + Provider
Phase 3 — Foundation components
Phase 4 — Layout components
Phase 5 — Navigation components
Phase 6 — Listing components
Phase 7 — VAZI components
Phase 8 — Seller components
Phase 9 — Commerce components
Phase 10 — Form components
Phase 11 — Feedback components
Phase 12 — Data display components
Phase 13 — Selection components
```

---

## Phase 1 — Tokens (`packages/tokens`)

> Build this first. Everything else depends on it.

### Token files to create

**`src/colors.ts`**
```typescript
export const colors = {
  // Brand
  green:         '#3D9A52',
  greenLight:    '#EAF5EC',
  greenDark:     '#2C7A3E',
  earth:         '#A06235',
  earthLight:    '#F5EDE5',
  earthDark:     '#7D4A24',

  // Neutrals
  white:         '#FFFFFF',
  background:    '#F7F7F5',
  surface:       '#FFFFFF',
  divider:       '#EAEAE7',
  border:        '#D9D9D5',

  // Text
  textPrimary:   '#1A1A18',
  textSecondary: '#6B6B65',
  textDisabled:  '#ADADA8',
  textOnGreen:   '#FFFFFF',
  textOnEarth:   '#FFFFFF',

  // Semantic
  success:       '#3D9A52',
  successLight:  '#EAF5EC',
  error:         '#D93025',
  errorLight:    '#FCECEB',
  warning:       '#E67E22',
  warningLight:  '#FEF3E2',
  info:          '#2E86C1',
  infoLight:     '#E8F4FD',

  // STI Score
  stiTrusted:    '#3D9A52',
  stiGood:       '#2E86C1',
  stiAtRisk:     '#E67E22',
  stiFlagged:    '#D93025',
  stiSuspended:  '#6B6B65',
} as const
```

**`src/spacing.ts`**
```typescript
export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
} as const
```

**`src/typography.ts`**
```typescript
export const typography = {
  fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
  fontWeights: {
    regular:     400,
    medium:      500,
    semibold:    600,
    bold:        700,
    extrabold:   800,
  },
  fontSizes: {
    xs:     11,
    sm:     12,
    base:   14,
    md:     16,
    lg:     18,
    xl:     20,
    xxl:    22,
    xxxl:   26,
    display: 32,
  },
  lineHeights: {
    tight:   1.2,
    snug:    1.35,
    normal:  1.5,
    relaxed: 1.6,
  },
  letterSpacings: {
    tight:  '-0.5px',
    normal: '0px',
    wide:   '0.1px',
    wider:  '0.3px',
  },
} as const
```

**`src/radius.ts`**
```typescript
export const radius = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  full: 9999,
} as const
```

**`src/shadows.ts`**
```typescript
export const shadows = {
  card:        '0px 2px 8px rgba(0,0,0,0.04), 0px 0px 2px rgba(0,0,0,0.02)',
  elevated:    '0px 4px 16px rgba(0,0,0,0.08)',
  bottomSheet: '0px -4px 24px rgba(0,0,0,0.10)',
  focus:       '0 0 0 3px rgba(61,154,82,0.25)',
} as const
```

**`src/breakpoints.ts`**
```typescript
export const breakpoints = {
  xs:  375,   // Mobile — Tecno Spark, budget Android
  sm:  600,   // Small tablet
  md:  900,   // Tablet
  lg:  1200,  // Desktop
  xl:  1536,  // Wide desktop
} as const
```

**`src/index.ts`** — barrel export of all tokens as `tokens` object:
```typescript
import { colors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'
import { radius } from './radius'
import { shadows } from './shadows'
import { breakpoints } from './breakpoints'

export const tokens = { colors, spacing, typography, radius, shadows, breakpoints }
export type { /* all token types */ }
```

**Deliverable:** `@mitumba/tokens` builds cleanly and all token values match the spec above exactly.

---

## Phase 2 — Theme + Provider (`packages/ui/src/theme/`)

**`theme.ts`** — MUI ThemeOptions configured entirely from `@mitumba/tokens`:
- ColorScheme mapped to Mitumba colors
- Typography using Nunito font
- Component overrides: Button, Card, Input, Chip, BottomNavigation, AppBar, Dialog, Snackbar, BottomSheet
- All values from tokens — no hardcoded values

**`provider.tsx`** — `MitumbaThemeProvider`:
```tsx
export const MitumbaThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={mitumbaTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)
```

**Deliverable:** Wrapping any component in `MitumbaThemeProvider` applies the full Mitumba visual language.

---

## Phase 3 — Foundation components

Build in this order:

### 3.1 `MitumbaPrimaryButton`

Props:
- `label: string`
- `onClick?: () => void`
- `loading?: boolean` — shows spinner, disables click
- `disabled?: boolean`
- `icon?: React.ReactNode` — optional leading icon
- `fullWidth?: boolean` — default true
- `size?: 'small' | 'medium' | 'large'` — default medium

Variants: primary (green), earth (for VAZI actions), ghost (outlined)

States: default, hover, pressed, loading, disabled

### 3.2 `MitumbaTextField`

Props:
- `label?: string`
- `hint: string` — placeholder
- `value: string`
- `onChange: (value: string) => void`
- `error?: string` — error message shown below field
- `prefix?: React.ReactNode`
- `suffix?: React.ReactNode`
- `type?: string`
- `disabled?: boolean`
- `multiline?: boolean`
- `rows?: number`

States: default, focused (green border), error (red border + message), disabled

### 3.3 `MitumbaSelect`

Props:
- `label: string`
- `options: { value: string; label: string }[]`
- `value: string`
- `onChange: (value: string) => void`
- `error?: string`
- `disabled?: boolean`

### 3.4 `MitumbaChip`

Props:
- `label: string`
- `variant?: 'filled' | 'outlined'`
- `color?: 'green' | 'earth' | 'neutral'`
- `onDelete?: () => void`
- `onClick?: () => void`
- `size?: 'small' | 'medium'`

### 3.5 `MitumbaAvatar`

Props:
- `name: string` — used for initials fallback
- `imageUrl?: string`
- `size?: 'xs' | 'sm' | 'md' | 'lg'`
- `badge?: React.ReactNode`

---

## Phase 4 — Layout components

### 4.1 `PageContainer`

Responsive max-width wrapper with horizontal padding.

Props:
- `children: React.ReactNode`
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl'` — default `lg`
- `noPadding?: boolean`

Behavior: 16px padding on mobile, 24px on tablet, 32px on desktop.

### 4.2 `SectionHeader`

Props:
- `title: string`
- `subtitle?: string`
- `actionLabel?: string`
- `onAction?: () => void`

### 4.3 `MitumbaDivider`

Thin horizontal rule using `tokens.colors.divider`.

### 4.4 `MitumbaGrid`

Responsive grid for listing cards.

Props:
- `children: React.ReactNode`
- `columns?: { xs: number; sm: number; md: number; lg: number }` — default `{ xs: 2, sm: 2, md: 3, lg: 4 }`
- `gap?: number`

---

## Phase 5 — Navigation components

### 5.1 `TopNav`

Desktop/tablet header bar.

Props:
- `onLogoClick?: () => void`
- `onSearchSubmit?: (query: string) => void`
- `searchValue?: string`
- `onSearchChange?: (value: string) => void`
- `isAuthenticated?: boolean`
- `user?: { name: string; avatarUrl?: string }`
- `onAuthClick?: () => void`
- `onProfileClick?: () => void`
- `cartCount?: number`
- `onCartClick?: () => void`

Layout: Logo left | Search center (full-width on mobile) | Auth/cart right

### 5.2 `MobileBottomNav`

Sticky bottom navigation for mobile.

Props:
- `activeTab: 'home' | 'search' | 'vazi' | 'orders' | 'profile'`
- `onTabChange: (tab: string) => void`
- `vaziDotActive?: boolean` — pulsing dot when new VAZI outfits available

Tabs: Home (house icon) | Search (magnifier) | VAZI (sparkle/outfit icon) | Orders (box) | Profile (person)

### 5.3 `MitumbaBreadcrumb`

Props:
- `items: { label: string; href?: string }[]`

---

## Phase 6 — Listing components

### 6.1 `ListingCard`

The most important component in the entire system.

Props:
- `listingId: string`
- `imageUrl: string`
- `title: string`
- `priceKes: number`
- `sellerName: string`
- `sellerSti: number`
- `city: string`
- `conditionGrade: 'A' | 'B' | 'C'`
- `isVaziEligible?: boolean`
- `onTap?: () => void`

Includes:
- `ConditionBadge` overlay (top-left of image)
- `VAZI` badge overlay (top-right of image, only when eligible)
- Price formatted as `KES X,XXX`
- STI chip (compact)
- City label
- Hover: slight lift (`translateY(-2px)`) + elevated shadow
- Image: `next/image` with fill, object-cover, placeholder blur

### 6.2 `ListingCardSkeleton`

Animated skeleton that matches `ListingCard` dimensions exactly. Used in feed loading states.

### 6.3 `ListingGrid`

Responsive grid wrapper for `ListingCard` instances.

### 6.4 `ListingImageGallery`

Full listing detail image viewer.

Props:
- `images: string[]` — array of image URLs
- `title: string`

Behavior:
- Primary image large, thumbnails below
- Click thumbnail → swap primary
- Pinch-zoom on mobile (via CSS touch-action)
- Keyboard: left/right arrows cycle images

---

## Phase 7 — VAZI components

### 7.1 `VAZIOutfitCard`

The hero VAZI component — shown in the VAZI feed tab.

Props:
- `outfitName: string`
- `items: VAZIOutfitItem[]` — 2–4 items (top, bottom, shoes, optional accessory)
- `totalPriceKes: number`
- `sellersCount: number`
- `isMultiCity?: boolean`
- `onTap?: () => void`
- `onBuyAll?: () => void`

```typescript
interface VAZIOutfitItem {
  listingId: string
  imageUrl: string
  garmentType: 'top' | 'bottom' | 'shoes' | 'accessory'
  priceKes: number
  sellerName: string
}
```

Layout:
- VAZI label (earth color) + outfit name
- Horizontal scroll of item images (3:4 aspect ratio each)
- Total price + "Buy this look" button (earth background)
- "Ships from N sellers" badge when multi-seller
- Hover: lift + shadow

### 7.2 `VAZIOutfitCardSkeleton`

Skeleton matching `VAZIOutfitCard` dimensions.

### 7.3 `VAZIBadge`

"VAZI Featured" badge for seller storefronts.

Props:
- `size?: 'small' | 'medium'`

### 7.4 `VAZIFeedSection`

Horizontal scroll section for VAZI outfit cards on the home feed.

Props:
- `outfits: VAZIOutfitCardProps[]`
- `loading?: boolean`
- `onSeeAll?: () => void`

Behavior: horizontal scroll on mobile, 3-col grid on desktop.

### 7.5 `CompleteThisLookPanel`

Shown on the listing detail page — "Complete this look" with 2–3 outfit suggestions seeded from the current listing.

Props:
- `outfits: VAZIOutfitCardProps[]`
- `loading?: boolean`

---

## Phase 8 — Seller components

### 8.1 `SellerCard`

Storefront preview card — shown in search results and listing detail.

Props:
- `sellerId: string`
- `name: string`
- `avatarUrl?: string`
- `city: string`
- `stiScore: number`
- `totalListings: number`
- `isVaziFeatured?: boolean`
- `onTap?: () => void`

### 8.2 `STIScoreChip`

Seller Trust Index score display — used everywhere a seller is referenced.

Props:
- `score: number` — 0–100
- `compact?: boolean` — compact shows score only, full shows label + score
- `showLabel?: boolean`

Color logic:
- 85–100 → `stiTrusted` (green) + "Trusted ★" label
- 60–84 → `stiGood` (blue) + "Good" label
- 40–59 → `stiAtRisk` (orange) + "At risk" label
- 20–39 → `stiFlagged` (red) + "Flagged" label
- 0–19 → `stiSuspended` (grey) + "Suspended" label

### 8.3 `STIBreakdownPanel`

Full STI score breakdown for the seller dashboard. Shows the formula factors visually.

Props:
- `score: number`
- `fulfillmentRate: number` — 0–1
- `accuracyRate: number` — 0–1
- `avgResponseHours: number`
- `daysActive: number`
- `recentEvents: STIEvent[]`

```typescript
interface STIEvent {
  type: 'penalty' | 'positive'
  reason: string
  pointsChange: number
  timestamp: string
}
```

### 8.4 `ConditionBadge`

Props:
- `grade: 'A' | 'B' | 'C'`
- `showLabel?: boolean`

Color + label:
- A → green + "Like new"
- B → blue + "Good"
- C → orange + "Fair"

---

## Phase 9 — Commerce components

### 9.1 `PriceTag`

Props:
- `priceKes: number`
- `size?: 'small' | 'medium' | 'large'`
- `color?: 'green' | 'earth' | 'default'`
- `strikethrough?: boolean` — for showing original vs discounted price

Format: always `KES X,XXX` with comma separator. Never abbreviate (no `KES 2.5K`).

### 9.2 `DeliveryBadge`

Props:
- `type: 'same-city' | 'intercity'`
- `estimatedDays?: string`
- `feeKes?: number`

Display:
- same-city → green · boda icon · "Delivery today"
- intercity → blue · bus icon · "3–5 business days · KES 299"

### 9.3 `CartItem`

Single item in the cart/checkout flow.

Props:
- `imageUrl: string`
- `title: string`
- `priceKes: number`
- `conditionGrade: 'A' | 'B' | 'C'`
- `sellerName: string`
- `onRemove?: () => void`

### 9.4 `OrderStatusTimeline`

Visual timeline of order state progression.

Props:
- `currentStatus: OrderStatus`
- `events: OrderEvent[]`

```typescript
type OrderStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'SELLER_CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'

interface OrderEvent {
  status: OrderStatus
  timestamp: string
  note?: string
}
```

### 9.5 `EscrowStatusBanner`

Prominent banner shown on order detail page explaining escrow state.

Props:
- `status: 'FUNDED' | 'SHIPPED' | 'TIMEOUT_WARNING' | 'RELEASED' | 'REFUNDED'`
- `hoursRemaining?: number` — shown when status is TIMEOUT_WARNING
- `onConfirmDelivery?: () => void`
- `onRaiseDispute?: () => void`

---

## Phase 10 — Form components

### 10.1 `PhoneInput`

Kenya-specific phone number input.

Props:
- `value: string`
- `onChange: (value: string) => void`
- `error?: string`
- `disabled?: boolean`

Behavior:
- Prefixed with `+254` flag + code (not editable)
- Accepts 9-digit number after prefix
- Formats as `+254 7XX XXX XXX` on blur
- Validates: must be valid Safaricom/Airtel/Telkom KE number

### 10.2 `OTPInput`

6-digit OTP entry field.

Props:
- `value: string`
- `onChange: (value: string) => void`
- `onComplete: (otp: string) => void` — called when all 6 digits entered
- `error?: boolean`
- `loading?: boolean`

Behavior:
- 6 separate single-digit inputs
- Auto-advance focus on digit entry
- Auto-backspace to previous on delete
- Paste support — pastes across all 6 fields
- Shake animation on error

### 10.3 `ImageUploader`

Listing photo upload component.

Props:
- `images: UploadedImage[]`
- `onAdd: (files: File[]) => void`
- `onRemove: (imageId: string) => void`
- `onReorder: (newOrder: string[]) => void`
- `maxImages?: number` — default 6
- `uploading?: boolean`

```typescript
interface UploadedImage {
  id: string
  url: string         // preview URL or R2 URL after upload
  status: 'uploading' | 'done' | 'error'
  isPrimary: boolean  // first image = primary listing image
}
```

Behavior:
- Drag-and-drop + tap-to-browse
- Shows upload progress per image
- Drag to reorder
- First image marked "Cover photo"
- Max 6 images

### 10.4 `MitumbaSearchBar`

Props:
- `value: string`
- `onChange: (value: string) => void`
- `onSubmit: (query: string) => void`
- `placeholder?: string`
- `suggestions?: string[]`
- `onSuggestionClick?: (suggestion: string) => void`

---

## Phase 11 — Feedback components

### 11.1 `EmptyState`

Props:
- `icon: React.ReactNode`
- `title: string`
- `subtitle: string`
- `action?: { label: string; onClick: () => void }`

### 11.2 `ErrorState`

Props:
- `title?: string` — default "Something went wrong"
- `subtitle?: string` — default "Please try again"
- `onRetry?: () => void`

### 11.3 `OfflineBanner`

No props. Detects `navigator.onLine` internally and shows/hides automatically.

Visual: warning color bar at top of page — "No connection — showing cached content"

### 11.4 `MitumbaToast`

Thin wrapper around MUI Snackbar with Mitumba styling.

Props:
- `message: string`
- `severity: 'success' | 'error' | 'warning' | 'info'`
- `open: boolean`
- `onClose: () => void`
- `duration?: number` — default 4000ms

### 11.5 `MitumbaModal`

Props:
- `open: boolean`
- `onClose: () => void`
- `title: string`
- `children: React.ReactNode`
- `actions?: React.ReactNode`
- `maxWidth?: 'sm' | 'md'`

### 11.6 `MitumbaSkeleton`

Generic animated skeleton block.

Props:
- `width: number | string`
- `height: number`
- `borderRadius?: number`
- `variant?: 'rectangular' | 'rounded' | 'circular'`

---

## Phase 12 — Data display components

### 12.1 `StatsCard`

For seller dashboard stats grid.

Props:
- `label: string`
- `value: string | number`
- `unit?: string` — e.g. "KES", "orders"
- `trend?: { direction: 'up' | 'down'; percent: number }`
- `icon?: React.ReactNode`

### 12.2 `ActivityFeed`

Vertical list of timestamped events.

Props:
- `events: ActivityEvent[]`
- `loading?: boolean`
- `emptyMessage?: string`

```typescript
interface ActivityEvent {
  id: string
  type: 'order' | 'sti_change' | 'payout' | 'review'
  title: string
  subtitle?: string
  timestamp: string
  icon?: React.ReactNode
  color?: string
}
```

---

## Phase 13 — Selection components

### 13.1 `MitumbaCheckbox`

Props:
- `checked: boolean`
- `onChange: (checked: boolean) => void`
- `label?: string`
- `disabled?: boolean`
- `indeterminate?: boolean`

### 13.2 `MitumbaRadio`

Props:
- `selected: boolean`
- `value: any`
- `label?: string`
- `onChange: (value: any) => void`
- `disabled?: boolean`

### 13.3 `MitumbaSwitch`

Props:
- `on: boolean`
- `onChange: (on: boolean) => void`
- `label?: string`
- `disabled?: boolean`

### 13.4 `MitumbaSlider`

Props:
- `value: number | number[]`
- `onChange: (value: number | number[]) => void`
- `min?: number`
- `max?: number`
- `range?: boolean`

### 13.5 `MitumbaDatePicker`

Props:
- `value: Date | null`
- `onChange: (date: Date | null) => void`
- `label?: string`
- `hint?: string`

---

## Component count summary

| Phase | Components | Count |
|---|---|---|
| Tokens | Token files | 6 |
| Theme | Provider + theme | 2 |
| Foundation | Button, Input, Select, Chip, Avatar | 5 |
| Layout | PageContainer, SectionHeader, Divider, Grid | 4 |
| Navigation | TopNav, MobileBottomNav, Breadcrumb | 3 |
| Listing | ListingCard, Skeleton, Grid, ImageGallery | 4 |
| VAZI | OutfitCard, Skeleton, Badge, Feed, CompleteLook | 5 |
| Seller | SellerCard, STIChip, STIBreakdown, ConditionBadge | 4 |
| Commerce | PriceTag, DeliveryBadge, CartItem, OrderTimeline, EscrowBanner | 5 |
| Forms | PhoneInput, OTPInput, ImageUploader, SearchBar | 4 |
| Feedback | EmptyState, ErrorState, OfflineBanner, Toast, Modal, Skeleton | 6 |
| Data display | StatsCard, ActivityFeed | 2 |
| Selection | Checkbox, Radio, Switch, Slider, DatePicker | 5 |
| **Total** | | **55** |
