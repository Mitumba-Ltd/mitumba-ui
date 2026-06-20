# @mitumba/ui

## 0.18.0

### Minor Changes

- 40f106e: feat(forms): add AddAddressModal — inline delivery address form for checkout

  feat(feedback): upgrade MitumbaModal to universal base — mobile bottom-sheet, subtitle, loading overlay, showClose, closeOnBackdrop props

## 0.17.2

### Patch Changes

- d9299f9: fix(listing-card): dynamic height after image loads — switches from fixed aspectRatio to natural image height for proper masonry layout

## 0.17.1

### Patch Changes

- a8ded85: fix(listing-card): add shimmer loading placeholder and crossfade for images — eliminates layout shift when images load

## 0.17.0

### Minor Changes

- f69a0e2: fix(commerce): redesign OrderStatusTimeline — color-coded icons, animated nodes, horizontal/vertical orientation, cancelled/disputed terminal states, compact mode, estimated delivery, bare mode

## 0.16.0

### Minor Changes

- bf20348: feat(layout): add EmailVerificationPage — post-signup email verification

  Split-layout page (hero left, form right on desktop, form-only on mobile).
  Features:
  - Green-tinted email icon
  - Large 6-digit code input (MitumbaTextField, monospace, centered)
  - "Verify" button disabled until 6 digits
  - Resend link with 60s countdown timer after tap
  - "Wrong email? Go back" link
  - Inline error via MitumbaTextField error prop
  - Resend success Alert
  - heroImageUrl support (same as AuthPage)

## 0.15.0

### Minor Changes

- 4464c63: feat(selection): add StylePicker — generic visual style selector with live previews

  A reusable grid component for picking between visual styles/variants of any
  customizable component. Each option card shows a live miniature preview + label
  - description. Selected = green border + checkmark. Changes fire immediately.

  Used for: bottom nav style, future theme picker, layout preferences, etc.

## 0.14.1

### Patch Changes

- 9afecce: fix(two-factor): redesign both 2FA components — proper spacing, MitumbaTextField, polished UX

  TwoFactorLoginStep:
  - Green-tinted icon circle (not grey)
  - Generous padding (huge on desktop)
  - MitumbaTextField for code input with large monospace styling
  - Proper visual hierarchy matching AuthPage language

  TwoFactorSetupModal:
  - Centered step indicators with checkmarks for completed
  - QR code on subtle background card for prominence
  - MitumbaTextField for code input
  - Backup codes in properly spaced grid with monospace + background
  - "Done" button to close after saving codes
  - Consistent token usage throughout

## 0.14.0

### Minor Changes

- 858cf1f: feat(forms): add TwoFactorSetupModal + TwoFactorLoginStep

## 0.13.3

### Patch Changes

- 15a5f6e: fix: replace AuthSubmitButton with MitumbaPrimaryButton in all non-auth contexts

  AuthSubmitButton (plain type=submit button) was being used in onboarding,
  VAZI, and UnauthenticatedState where MitumbaPrimaryButton (rich interaction
  with hover lift, scale, variants) is more appropriate. Now only AuthPage
  uses AuthSubmitButton for actual form submission.

  Affected: BuyerOnboardingPage, SellerOnboardingPage, VAZIShowcase,
  VAZIHeroSpotlight, UnauthenticatedState.

## 0.13.2

### Patch Changes

- cd7cbe2: feat(onboarding): add field validation — disable CTA until required fields filled

  BuyerOnboardingPage:
  - Button disabled until display name, county, and phone (9+ digits) are filled
  - Inline error messages shown on blur
  - onComplete never called with invalid data

  SellerOnboardingPage:
  - Each step's Continue/Finish button disabled until that step's required fields are filled
  - Step 1: fullName, phone, idNumber, county required
  - Step 2: businessName required if sellerType is 'business'
  - Step 3: at least one category and condition grade selected
  - Step 4: storeName required
  - advance() blocked if step is invalid

## 0.13.1

### Patch Changes

- 5641b49: feat(bottom-nav): redesign all 6 variants — clean, professional, reference-aligned

  Complete rewrite of MobileBottomNav:
  - **indicator** — line below active icon (Material 3 reference #5)
  - **m3** — pill-shaped bg behind icon, label below
  - **expansive** — large rounded bg fills the active tab
  - **bubble** — circular bg + label chip below active
  - **pill** — tall rounded rect with icon+label
  - **pill-horizontal** — inline icon+label pill (compact)

  All variants: filled icon for active, outlined for inactive, smooth transitions,
  scale-on-tap feedback. Default changed from 'm3' to 'indicator'.
  Renamed 'standalone' → 'bubble'. Added 'pill-horizontal'.

## 0.13.0

### Minor Changes

- 1d8d3ab: feat(feedback): add UnauthenticatedState — login-required page prompt

  Centered full-page prompt for pages requiring authentication. Shows icon,
  title, subtitle, "Sign In" CTA, and optional secondary action ("Create Account").
  Used on /orders, /wishlist, /cart, /inbox, /profile when user is not logged in.

## 0.12.0

### Minor Changes

- be8451a: feat(search): add SearchFilterSheet — bottom sheet (mobile) / sidebar panel (desktop) for filtering

## 0.11.0

### Minor Changes

- 600737f: feat(messaging): add ConversationList, MessageBubble, ChatThread, InboxLayout

  Full messaging component suite for buyer-seller communication:
  - **ConversationList** — left panel with search, compose button, conversation
    rows (avatar, name, last message, timestamp, unread dot, listing chip)
  - **MessageBubble** — individual message (sent=green right, received=grey left)
    with file/image attachment support
  - **ChatThread** — scrollable message thread with header (name, status) and
    input bar (attach + send buttons)
  - **InboxLayout** — responsive split-panel shell (340px list | flex thread on
    desktop, single panel with back button on mobile)

  Closes #168, closes #169, closes #170, closes #171

## 0.10.4

### Patch Changes

- ed8b17b: fix(vazi-hero): popover appears at click position — like Gmail hover card

  Uses a virtual anchor element positioned at the cursor's clientX/clientY
  coordinates instead of anchoring to the model element. The popover now
  appears exactly where the user clicked.

## 0.10.3

### Patch Changes

- a125ed1: feat(vazi-hero): add title prop, default to "VAZI Featured"

  Replaces hardcoded "VAZI" + "AI" badge with a single configurable title prop.

## 0.10.2

### Patch Changes

- a3c06d6: feat(seller-card): add actionLabel + onAction props

  Renders an outlined button at the bottom of SellerCard when actionLabel is
  provided. Clicking the button fires onAction without triggering onTap.

## 0.10.1

### Patch Changes

- 8d68fba: feat(vazi-hero): rebuild VAZIHeroSpotlight — models side by side + floating outfit popover

  Replaces the auto-rotating single-model design with a row of living models
  standing together. Tap a model → floating glassmorphism popover shows outfit
  name, item thumbnails, total price, and "Shop" CTA. Clean, no clutter.

## 0.10.0

### Minor Changes

- 052fcf7: feat(vazi): add VAZIHeroSpotlight — embeddable home page hero section

  A lightweight VAZI teaser component for the home page. Shows one featured
  model at a time with outfit items panel, auto-rotates between looks every 8s.
  - Desktop: side-by-side (model left on gradient bg, outfit card right)
  - Mobile: stacked (model top, outfit items below)
  - Animated dots navigation
  - Subtle gradient background, glassmorphism outfit card
  - Auto-advance with configurable interval
  - "See all" link to full VAZIShowcase page

## 0.9.0

### Minor Changes

- 8a3d0b4: feat(vazi): add VAZIShowcase — depth-perspective model queue with glassmorphism outfit panel

  New component for the VAZI AI stylist feed experience:
  - Depth-perspective model queue — models recede into the background with scale,
    opacity, and blur based on their depth position
  - Supports .webm (alpha channel) video for living transparent models, with image fallback
  - Glassmorphism outfit panel showing items that make up the focused model's outfit
  - Scroll-wheel and arrow-driven navigation between outfits
  - "Shop this look" CTA with total price
  - VAZI branding pill overlay
  - Dark full-viewport layout

  Also updates COMPONENT_SPEC.md with specs for VAZIModelSpotlight, VAZIOutfitPanel,
  and VAZIShowcase (sections 7.6, 7.7, 7.8).

## 0.8.3

### Patch Changes

- ad97d35: feat(seller): redesign STIScoreChip and SellerCard

  **STIScoreChip:**
  - Replaced cluttered label|score divider with clean dot + number + label layout
  - Removed "★" from Trusted label
  - Thresholds aligned: 80+ Trusted, 60+ Good, 40+ At Risk, 20+ Flagged, <20 Suspended
  - Subtle tinted background, no border

  **SellerCard:**
  - Removed uppercase 10px metadata — now uses natural sentence: "Nairobi · 48 listings"
  - VAZI badge as a subtle earth-toned pill instead of importing full VAZIBadge
  - STI chip moved to right side for visual balance
  - Removed box-shadow, kept only border (consistent with ListingCard)
  - Green border on hover, not elevated shadow

## 0.8.2

### Patch Changes

- befa676: feat(sti-breakdown): redesign with circular score ring, color-coded status, trending event icons
  - Large circular progress ring showing score/100 with dynamic color (green/blue/orange/red)
  - Score label below ring: Trusted / Good / At Risk / Flagged
  - Clean factor bars with token-based colors
  - Recent events with circular icon badges (trending up/down), timestamps, point changes
  - Separated sections with divider
  - Removed STIScoreChip dependency — self-contained

## 0.8.1

### Patch Changes

- 83ede4e: fix(buyer-onboarding): use counties (47 Kenya counties) instead of cities — prop now optional

  Replaced the `cities` prop with `counties` (string array). All 47 Kenya counties
  are baked in as the default, matching the seller onboarding pattern. The field
  label is now "County" and `BuyerOnboardingData.city` is renamed to `county`.

## 0.8.0

### Minor Changes

- af96eb3: feat(image-uploader): complete overhaul — Depop/Vinted-style

  Rebuilt ImageUploader from scratch:
  - Grid variant: 3-column layout with cover photo badge on first slot,
    drag-to-reorder, circular progress on uploading, error overlay,
    remove button on hover, dashed empty slots with camera icon
  - Single variant: one large drop zone for profile photos/logos/banners
    with configurable aspect ratio
  - Clean counter: "2/6 photos · Drag to reorder · First photo is the cover"
  - Uses motion tokens for transitions
  - 8 stories: Default (interactive), Empty, WithUploading, WithError,
    SingleVariant, SingleWithImage, Mobile
  - 5 unit tests

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
