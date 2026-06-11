---
"@mitumba/ui": patch
---

fix(buyer-onboarding): use counties (47 Kenya counties) instead of cities — prop now optional

Replaced the `cities` prop with `counties` (string array). All 47 Kenya counties
are baked in as the default, matching the seller onboarding pattern. The field
label is now "County" and `BuyerOnboardingData.city` is renamed to `county`.
