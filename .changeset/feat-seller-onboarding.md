---
"@mitumba/ui": minor
---

feat(seller-onboarding): add SellerOnboardingPage component

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
