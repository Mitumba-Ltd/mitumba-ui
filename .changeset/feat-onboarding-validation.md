---
"@mitumba/ui": patch
---

feat(onboarding): add field validation — disable CTA until required fields filled

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
