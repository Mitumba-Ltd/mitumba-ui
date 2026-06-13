---
"@mitumba/ui": patch
---

fix: replace AuthSubmitButton with MitumbaPrimaryButton in all non-auth contexts

AuthSubmitButton (plain type=submit button) was being used in onboarding,
VAZI, and UnauthenticatedState where MitumbaPrimaryButton (rich interaction
with hover lift, scale, variants) is more appropriate. Now only AuthPage
uses AuthSubmitButton for actual form submission.

Affected: BuyerOnboardingPage, SellerOnboardingPage, VAZIShowcase,
VAZIHeroSpotlight, UnauthenticatedState.
