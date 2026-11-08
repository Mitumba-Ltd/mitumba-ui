---
'@mitumba/ui': minor
---

Configurable currency, phone and region formatting.

- New `MitumbaFormatProvider` and `useMitumbaFormat` set the currency code and locale, phone numbering plan and region label/options for everything inside them. Each field is optional and inherits from an enclosing provider; the defaults (`KES` / `en-KE`, `+254` with 9 digits, County with the built-in list) reproduce the previous output exactly.
- Pure helpers are exported too: `formatMoney`, `formatAmount`, `groupNationalDigits`, `nationalPlaceholder`, `maxNationalDigits`, plus the `DEFAULT_*_FORMAT` constants.
- Money follows the provider in `PriceTag`, `CartItem`, `OrderSummaryCard`, `OrderCard`, `EscrowStatusBanner`, `ListingCard`, `OrderMessageAttachment`, `VAZIOutfitCard`, `VAZIShowcase`, `VAZIHeroSpotlight`, `SearchFilterSheet` and `SellerOnboardingPage`, including accessible names. `MitumbaDatePicker` formats dates in the provider locale.
- Neutral prop names are added and the currency-specific ones are deprecated aliases (the neutral name wins when both are set): `price` (`priceKes`), `amount` (`amountKes`), `total` (`totalKes`), `deliveryFee` (`deliveryFeeKes`), `totalPrice` (`totalPriceKes`), `fee` (`feeKes`).
- `PhoneInput` takes its prefix, length, placeholder and grouping from the provider or a new `phone` prop. A partly typed number no longer loses its trailing digits when the field is not focused.
- `AddAddressModal`, `BuyerOnboardingPage` and `SellerOnboardingPage` take the region field from the provider or a new `region` prop (`BuyerOnboardingPage` keeps its `counties` prop, which still wins); `AddAddressModal` and `BuyerOnboardingPage` also validate phone length against the plan.
- `SearchFilterSheet` accepts an optional `cities` prop for the Location section.
