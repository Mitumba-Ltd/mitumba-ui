# @mitumba/ui

## 0.7.1

### Patch Changes

- 6f20e6b: fix(feedback): rewrite EmptyState, ErrorState, and Showcase stories

  Professional Storybook stories with:
  - Contextual Mitumba copy (cart, wishlist, orders, search, seller inventory)
  - All error types demonstrated (general, 404, 500, network, forbidden)
  - Grid and side-by-side layout stories
  - Mobile viewport stories
  - Showcase reorganized with sections, real toast messages, proper skeleton patterns
  - Removed all alert() calls and hardcoded hex colors from stories

## 0.7.0

### Minor Changes

- 8deab72: feat(listing-card): complete overhaul — Pinterest/Depop-style card

  Breaking change to ListingCard props interface. The previous version had an
  over-engineered multi-image carousel with "Buy Now" CTA. The new version is
  minimal and masonry-friendly:
  - No fixed height — image takes natural aspect ratio
  - Single imageUrl instead of images array
  - Rounded corners, subtle border, no box-shadow elevation
  - Title truncated to 2 lines via -webkit-line-clamp
  - Price bold below title in KES format
  - Store name as optional caption
  - Wishlist heart icon top-right overlay (toggleable via onSaveToggle)
  - Condition chip bottom-left overlay (only if passed)
  - Works in CSS grid/masonry without breaking
  - Uses motion tokens for transitions

## 0.6.0

### Minor Changes

- ae228d2: feat(buyer-onboarding): add BuyerOnboardingPage component

  Lightweight single-screen buyer onboarding — display name, city select, and
  phone number (+254 format). Same split-layout visual style as AuthPage with
  hero image panel on desktop, form-only on mobile.

  Features:
  - Hero image panel with gradient overlay (desktop)
  - City dropdown from consumer-provided list
  - Phone input with +254 prefix adornment
  - Loading state with backdrop spinner
  - Error message display
  - Pre-fillable via initialData prop
  - Full Storybook coverage (6 stories) and 5 unit tests

### Patch Changes

- 00ad03c: feat(tokens): add dark mode colors, z-index scale, motion tokens
  - Add backgroundDark and surfaceDark color tokens
  - Add zIndex scale (base → max)
  - Add motion tokens (durations, easings, transitions)
  - Comprehensive test rewrite
  - AuthPage + SellerOnboardingPage use new dark mode tokens
  - Fix CONTRIBUTING.md breakpoints table

- Updated dependencies [00ad03c]
  - @mitumba/tokens@0.2.0

## 0.5.0

### Minor Changes

- 9d59657: fix: export all components + accessibility improvements
  - Export all previously inaccessible components: PhoneInput, OTPInput,
    ImageUploader, MitumbaSearchBar, StatsCard, ActivityFeed, MitumbaTabs,
    MitumbaPagination, MitumbaStepper, MitumbaGlass, and all selection
    components (Checkbox, Radio, Switch, Slider, DatePicker)
  - Export all missing type interfaces for feedback, navigation, forms, data,
    and selection categories
  - Add aria-labels to 10 IconButton instances across 9 components (TopNav,
    MitumbaDatePicker, MitumbaBanner, MitumbaModal, MitumbaTextField,
    ListingCard, CartItem, AuthPage, SellerOnboardingPage)
  - Replace hardcoded '#2a2a2a' with tokens.colors.textPrimary in SellerOnboardingPage

## 0.4.0

### Minor Changes

- 75caf81: feat(seller-onboarding): add SellerOnboardingPage component

  Adds a multi-step seller onboarding wizard with 5 steps: welcome, identity,
  business, what-you-sell, and store setup — plus a confirmation screen showing
  the seller's starting STI score.

  Key features:
  - Controlled `currentStep` prop for persistent progress (consumer saves to backend/localStorage — reload resumes at same step)
  - STI score calculated from onboarding completeness, shown on confirmation
  - All 47 Kenya counties in location select
  - Category chips, condition grade chips, delivery method, price range slider
  - KRA PIN field with STI incentive messaging
  - `heroImageUrl` support for the side panel (matches AuthPage pattern)
  - Dark mode support
  - Mobile-first (fixed viewport frame, no vertical scroll)
  - Full Storybook coverage (13 stories) and 7 unit tests

  Closes #133

## 0.3.3

### Patch Changes

- 002fbc9: fix(auth-page): fixed viewport frame on mobile — no more vertical scrolling

  All form panels are now `position: absolute` on all breakpoints. The card uses
  `height: 100vh` on mobile instead of `height: auto`, making it a fixed
  full-viewport frame. Views fade in/out within the fixed frame — nothing scrolls.
  Matches the stanlink-ui reference implementation.

  Closes #130

## 0.3.2

### Patch Changes

- e979aef: fix(auth-page): set explicit white background on TextField inputs

  All form panels are in the DOM simultaneously (opacity/pointerEvents approach).
  Without an explicit background, inactive panels bleed through the transparent
  input backgrounds causing a grey tint on the sign-in inputs. Fixed by setting
  `bgcolor: tokens.colors.surface` on all TextField MuiInputBase-root elements.

  Closes #127

## 0.3.1

### Patch Changes

- dc61ec7: fix(auth-page): export AuthPage and AuthPageProps from package index

  AuthPage and AuthPageProps were missing from the top-level barrel export,
  making them inaccessible to consumers of @mitumba/ui.

## 0.3.0

### Minor Changes

- 779501e: feat(auth-page): add heroImageUrl prop + fix Chromatic CI

  Adds `heroImageUrl` to `AuthPageProps` — when provided, layers a full-bleed hero
  photo under the gradient panel (desktop only) using a brand gradient overlay,
  matching the Mitumba marketing site visual language.

  Also fixes the Visual Regression (Chromatic) workflow which was failing due to
  `storybookBuildDir` pointing to a non-existent pre-built directory.

## 0.2.0

### Minor Changes

- 895f97d: feat(auth-page): add AuthPage unified authentication component

  Adds the AuthPage component — a unified sign-in, sign-up, forgot-password, and
  reset-password screen with animated trapezoid panel, social auth support, dark
  mode, illustration slot, and footer actions. Includes AuthSubmitButton, a
  type=submit button primitive used internally by auth forms.

## 0.1.5

### Patch Changes

- e9ff7d4: fix(MobileBottomNav): correct indicator variant positioning to render inside visible bounds

## 0.1.4

### Patch Changes

- Extraordinary Lead Engineer overhaul of the VAZI (AI Stylist) suite.
  - Redesigned VAZIOutfitCard with high-depth collage architecture and tactile physics.
  - Overhauled VAZIBadge with glassmorphism and AI-inspired animations.
  - Engineered systematic grid logic for VAZIFeedSection and Recommendation panels.
  - Fixed Chromatic CI build path and NPM publish settings.
- Updated dependencies
  - @mitumba/tokens@0.1.4

## 0.1.3

### Patch Changes

- Fix Chromatic CI build path and script resolution for monorepo compatibility.
  - Switched to direct npm workspace build for Storybook to ensure artifact isolation.
  - Updated GitHub workflow to target the specific build-storybook task.
- Updated dependencies
  - @mitumba/tokens@0.1.3

## 0.1.2

### Patch Changes

- Premium Lead Engineer overhaul of the Banner & Notification suite.
  - Engineered MitumbaBanner high-fidelity primitive with status-aware top borders.
  - Refactored OfflineBanner with automated connection detection logic.
  - Redefined EscrowStatusBanner for absolute marketplace benchmark parity.
- Updated dependencies
  - @mitumba/tokens@0.1.2

## 0.1.1

### Patch Changes

- Initial Lead Engineer overhaul including:
  - Premium 'Extraordinary' redesign of Foundation, Layout, Navigation, Feedback, and Selection suites.
  - High-fidelity Pinterest-level Listing and Glass components.
  - Automated Visual Regression (Chromatic) and CI/CD pipelines.
  - Standardized 'Lead Engineer' Storybook documentation.
- Updated dependencies
  - @mitumba/tokens@0.1.1
