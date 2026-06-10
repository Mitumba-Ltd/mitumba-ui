---
"@mitumba/ui": minor
---

feat(buyer-onboarding): add BuyerOnboardingPage component

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
