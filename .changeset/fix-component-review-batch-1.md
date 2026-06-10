---
"@mitumba/tokens": minor
"@mitumba/ui": minor
---

feat: comprehensive token + component improvements

**@mitumba/tokens:**
- Add `backgroundDark` and `surfaceDark` color tokens for proper dark mode
- Add `zIndex` scale (base, sticky, fixed, drawer, modal, toast, tooltip, backdrop, max)
- Add `motion` tokens (durations, easings, pre-composed transitions)
- Rewrite tests with full coverage (ascending order, type checks, dark mode, z-index, motion)

**@mitumba/ui:**
- Export all previously inaccessible components: PhoneInput, OTPInput,
  ImageUploader, MitumbaSearchBar, StatsCard, ActivityFeed, MitumbaTabs,
  MitumbaPagination, MitumbaStepper, and all selection components
- Export all missing type interfaces across all categories
- Add aria-labels to 10 IconButton instances across 9 components
- Use new `backgroundDark`/`surfaceDark` tokens in AuthPage and SellerOnboardingPage

**Docs:**
- Fix CONTRIBUTING.md breakpoints table to match actual token values
