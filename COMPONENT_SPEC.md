# Mitumba UI — Component Specification

This document is the authoritative list of every component that must exist in `@mitumba/ui`. Components are listed in **build order** — agents must build them in this sequence. Do not skip ahead.

---

## Build order overview

Phase 1 — Tokens (`packages/tokens`)
Phase 2 — Theme foundation (`packages/ui/src/theme`)
Phase 3 — Foundation primitives
Phase 4 — Layout components
Phase 5 — Navigation components
Phase 6 — Listing components
Phase 7 — VAZI (AI stylist) components
Phase 8 — Seller components
Phase 9 — Commerce components
Phase 10 — Form components
Phase 11 — Feedback components
Phase 12 — Data display components
Phase 13 — Selection components
```

---

## Phase 1 — Tokens (`packages/tokens`)

Definition of the 4px-factor spacing, colors, shadows, and typography.

## Phase 2 — Theme foundation (`packages/ui/src/theme`)

- Base MUI Theme configuration
- Nunito Font integration
- Global CSS reset
- Component overrides: Button, Card, Input, Chip, BottomNavigation, AppBar, Dialog, Snackbar, BottomSheet

---

## Phase 3 — Foundation primitives

The atomic building blocks used by everything else.

### 3.1 `MitumbaPrimaryButton`

Standard button for all primary/secondary actions.

Props:
- `label: string`
- `onClick: () => void`
- `variant?: 'primary' | 'earth' | 'outline' | 'ghost' | 'danger'`
- `size?: 'small' | 'medium' | 'large'`
- `disabled?: boolean`
- `loading?: boolean`
- `fullWidth?: boolean`
- `icon?: React.ReactNode`
- `iconPosition?: 'left' | 'right'`

### 3.2 `MitumbaTextField` (Overhauled)

Standard text input.

Props:
- `label?: string`
- `hint: string`
- `value: string`
- `onChange: (value: string) => void`
- `error?: string`
- `disabled?: boolean`
- `multiline?: boolean`
- `rows?: number`
- `prefix?: React.ReactNode`
- `suffix?: React.ReactNode`
- `size?: 'small' | 'medium' | 'large'`
- `rounding?: 'pill' | 'rounded'`

### 3.3 `MitumbaSelect`

Dropdown selector.

Props:
- `label?: string`
- `value: any`
- `onChange: (value: any) => void`
- `options: { label: string; value: any; icon?: React.ReactNode; subtitle?: string; group?: string }[]`
- `error?: string`
- `placeholder?: string`
- `size?: 'small' | 'medium' | 'large'`
- `rounding?: 'pill' | 'rounded' | 'square'`
- `multiple?: boolean`
- `showSearch?: boolean`
- `inverted?: boolean`

### 3.4 `MitumbaChip`

Tags, status labels, or filters.

Props:
- `label: string`
- `onClick?: () => void`
- `onDelete?: () => void`
- `selected?: boolean`
- `disabled?: boolean`
- `size?: 'small' | 'medium'`
- `color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'earth'`
- `variant?: 'solid' | 'outline' | 'shaded' | 'dashed'`
- `rounding?: 'pill' | 'rounded' | 'square'`
- `elevation?: 'flat' | 'tiny' | 'elevated'`
- `badge?: string | number`
- `avatar?: React.ReactElement`
- `icon?: React.ReactElement`

### 3.5 `MitumbaAvatar`

User identity visual.

Props:
- `src?: string`
- `name: string`
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'huge'`
- `status?: 'online' | 'offline' | 'away' | 'busy'`
- `presence?: 'active' | 'event' | 'progress'`
- `tilt?: boolean`

---

## Phase 4 — Layout components

Containers and spacing primitives.

### 4.1 `PageContainer`

Main content wrapper with max-width and padding.

Props:
- `children: React.ReactNode`
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl'`

### 4.2 `SectionHeader`

Page or section title with optional subtitle and action.

Props:
- `title: string`
- `subtitle?: string`
- `action?: React.ReactNode`

### 4.3 `MitumbaDivider`

Thematic break.

Props:
- `orientation?: 'horizontal' | 'vertical'`
- `light?: boolean`

### 4.4 `MitumbaGrid`

Responsive grid system.

Props:
- `children: React.ReactNode`
- `columns?: number | object`
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

### 5.3 `MitumbaBreadcrumb`

Hierarchy visualization.

Props:
- `items: { label: string; href?: string }[]`

### 5.4 `MitumbaTabs`

Tabbed navigation.

Props:
- `value: any`
- `onChange: (value: any) => void`
- `tabs: { label: string; value: any; icon?: React.ReactNode }[]`
- `variant?: 'primary' | 'secondary'`

### 5.5 `MitumbaPagination`

List paging.

Props:
- `count: number`
- `page: number`
- `onChange: (page: number) => void`

### 5.6 `MitumbaStepper`

Progress steps.

Props:
- `activeStep: number`
- `steps: { label: string; subtitle?: string }[]`

---

## Phase 6 — Listing components

### 6.1 `ListingCard`

The primary e-commerce item card.

Props:
- `image: string`
- `title: string`
- `price: number`
- `originalPrice?: number`
- `brand?: string`
- `size?: string`
- `condition: 'new_with_tags' | 'excellent' | 'good' | 'fair'`
- `isLiked?: boolean`
- `onLikeClick?: () => void`
- `onClick?: () => void`

### 6.2 `ListingCardSkeleton`

Loading state for the card.

### 6.3 `ListingGrid`

Responsive grid specifically tuned for item cards.

Props:
- `listings: ListingItem[]`
- `isLoading?: boolean`

### 6.4 `ListingImageGallery`

Product image viewer with thumbnails/pagination.

Props:
- `images: string[]`

### 6.5 `ConditionBadge`

Sub-primitive for condition status.

---

## Phase 7 — VAZI (AI stylist) components

### 7.1 `VAZIOutfitCard`

Card showing an AI-generated look.

### 7.2 `VAZIOutfitCardSkeleton`

### 7.3 `VAZIBadge`

Stylized badge indicating VAZI curation.

### 7.4 `VAZIFeedSection`

Horizontal scrolling section for VAZI content.

### 7.5 `CompleteThisLookPanel`

Contextual panel suggesting items to complete a look.

---

## Phase 8 — Seller components

### 8.1 `SellerCard`

Mini profile for a shop owner.

Props:
- `name: string`
- `avatarUrl: string`
- `rating: number`
- `listingCount: number`
- `onFollowClick?: () => void`

### 8.2 `STIScoreChip`

Visual badge for "Seller Trust Index".

Props:
- `score: number` (0-100)

### 8.3 `STIBreakdownPanel`

Detailed view of how an STI score is calculated.

---

## Phase 9 — Commerce components

### 9.1 `PriceTag`

Formatted currency display with discount logic.

### 9.2 `DeliveryBadge`

Visual for shipping methods/ETA.

### 9.3 `CartItem`

Compact listing representation for cart/checkout.

### 9.4 `OrderStatusTimeline`

Vertical/Horizontal visualization of order progress.

### 9.5 `EscrowStatusBanner`

Status indicator for Mitumba Escrow protection.

---

## Phase 10 — Form components

### 10.1 `PhoneInput`

Standardized phone number entry with country selection.

### 10.2 `OTPInput`

6-digit code entry for verification.

### 10.3 `ImageUploader`

Drag-and-drop or click-to-upload for listing photos.

### 10.4 `MitumbaSearchBar`

Advanced search with filters and suggestions.

---

## Phase 11 — Feedback components

### 11.1 `EmptyState` (Overhauled)

High-fidelity illustrative states ('No Dead Ends').

### 11.2 `ErrorState` (Overhauled)

Archetypes (404, 500, Network) with personality.

### 11.3 `OfflineBanner`

Network status indicator.

### 11.4 `MitumbaToast` (Overhauled)

Tactile snackbars with progress rings.

### 11.5 `MitumbaModal` (Overhauled)

High-depth dialogs with 32px rounding.

### 11.6 `MitumbaSkeleton` (Overhauled)

Shimmer wave animations.

---

## Phase 12 — Data display components

### 12.1 `StatsCard`

Numeric dashboard card.

### 12.2 `ActivityFeed`

Stream of order/shop events.

---

## Phase 13 — Selection components

### 13.1 `MitumbaCheckbox`

### 13.2 `MitumbaRadio`

### 13.3 `MitumbaSwitch`

### 13.4 `MitumbaSlider`

### 13.5 `MitumbaDatePicker`

---

## Component count summary

| Phase | Components | Count |
|---|---|---|
| Tokens | Token files | 6 |
| Theme | Provider + theme | 2 |
| Foundation | Button, Input, Select, Chip, Avatar | 5 |
| Layout | PageContainer, SectionHeader, Divider, Grid | 4 |
| Navigation | TopNav, MobileBottomNav, Breadcrumb, Tabs, Pagination, Stepper | 6 |
| Listing | ListingCard, Skeleton, Grid, ImageGallery, ConditionBadge | 5 |
| VAZI | OutfitCard, Skeleton, Badge, Feed, CompleteLook | 5 |
| Seller | SellerCard, STIChip, STIBreakdown | 3 |
| Commerce | PriceTag, DeliveryBadge, CartItem, OrderTimeline, EscrowBanner | 5 |
| Forms | PhoneInput, OTPInput, ImageUploader, SearchBar | 4 |
| Feedback | EmptyState, ErrorState, OfflineBanner, Toast, Modal, Skeleton | 6 |
| Data display | StatsCard, ActivityFeed | 2 |
| Selection | Checkbox, Radio, Switch, Slider, DatePicker | 5 |
| **Total** | | **58** |
