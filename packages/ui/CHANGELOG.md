# @mitumba/ui

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
