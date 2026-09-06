# Typography & Semantic-Title Dependency Matrix

Tracking artifact for issue **#251 — "feat(ui): inherit host typography across shared components"**.

This document is the human-readable half of the direct-to-transitive matrix. Its
executable counterpart lives in
[`packages/ui/src/__matrix__/dependency-matrix.test.tsx`](../packages/ui/src/__matrix__/dependency-matrix.test.tsx),
which asserts that (1) all 36 direct checklist components are represented and
(2) every reachable text-owning primitive inherits the host body font (no
component-local `fontFamily` override remains). The host-theme inheritance
contract (distinct heading vs body families) is proven in
[`packages/ui/src/__matrix__/host-theme-contract.test.tsx`](../packages/ui/src/__matrix__/host-theme-contract.test.tsx)
using the shared theme in
[`packages/ui/src/__matrix__/hostTheme.ts`](../packages/ui/src/__matrix__/hostTheme.ts).

## Package-wide contract

- **Host-controlled typography.** No ordinary text (headings, body, labels,
  captions, buttons, cards, dialogs, navigation, states, chat) carries a
  component-local `fontFamily`. The family is resolved entirely from the host
  theme's `typography.fontFamily` (body) and `typography.h1..h6.fontFamily`
  (headings). `mitumbaTheme` remains a complete standalone fallback, so default
  appearance is byte-identical.
- **Monospace exceptions (retained, literal `'monospace'`).** Code-like data
  only:
  - `DestructiveConfirmDialog` — the exact confirm phrase + its input.
  - `TwoFactorLoginStep` — the OTP input.
  - `TwoFactorSetupModal` — the secret, backup codes, and OTP input.
  - `EmailVerificationPage` — the verification-code input.
- **Semantic title API.** Title-owning components expose `titleLevel?: HeadingLevel`
  (h1-h6) that changes only the emitted element, never the visual variant.
  Components with multiple independent titles expose slot-specific props
  (`sectionTitleLevel`, `stepTitleLevel`, `emptyTitleLevel`). Omitting a prop
  preserves the previous non-heading markup and callbacks (backward compatible;
  no required prop added, none removed).

## Verification snapshot

```
grep -rn 'fontFamily' packages/ui/src/components --include=*.tsx \
  | grep -v .test. | grep -v .stories. | grep -v monospace
# → zero ordinary-family matches (only the four documented monospace exceptions remain)
```

## Text-owning primitive chains (verified against `@mitumba/ui@0.33.1` source)

| Text-owning primitive | Direct consumer group |
|---|---|
| `MitumbaModal` | `RaiseDisputeModal`, `AddAddressModal`, `DestructiveConfirmDialog`, `AddTwoFactorMethodModal`, `TwoFactorSetupModal` |
| `MitumbaPrimaryButton`, `MitumbaTextField`, `MitumbaSelect`, `MitumbaChip` | Auth/onboarding, feedback, commerce/order forms, disputes, filters, security, chat/VAZI controls where used |
| `AuthSubmitButton` | `AuthPage` |
| `ConditionBadge` | `ListingCard` |
| `STIScoreChip`, `MitumbaAvatar` | `SellerCard` (also `MitumbaAvatar` → `StoreCard`, `ProfileCard`) |
| `MessageBubble` → `OrderMessageAttachment` | `ChatThread`, `FloatingChatDock` |
| `ConversationList`, `ChatThread` | `InboxLayout` |
| Direct implementation | Components that own their text directly (see matrix below) |

## Direct-to-transitive matrix (all 36 direct checklist components)

`[]` under *Reaches text-owning primitives* means the component owns its text
directly and reaches no other shared package primitive.

| # | Direct component | Title prop(s) | Reaches text-owning primitives |
|---|---|---|---|
| 1 | `AuthPage` | `titleLevel` | `AuthSubmitButton`, `MitumbaTextField`, `MitumbaPrimaryButton` |
| 2 | `TwoFactorLoginStep` | `titleLevel` | `MitumbaPrimaryButton` |
| 3 | `BuyerOnboardingPage` | `titleLevel`, `sectionTitleLevel` | `MitumbaPrimaryButton` |
| 4 | `EmailVerificationPage` | `titleLevel` | `MitumbaPrimaryButton` |
| 5 | `UnauthenticatedState` | `titleLevel` | `MitumbaPrimaryButton` |
| 6 | `EmptyState` | `titleLevel` | — |
| 7 | `MitumbaBanner` | `titleLevel` | — |
| 8 | `MobileBottomNav` | — (nav labels; no false heading) | — |
| 9 | `ProfileNavList` | — (nav/list labels) | — |
| 10 | `InboxLayout` | `titleLevel` | `ConversationList`, `ChatThread` |
| 11 | `ListingCard` | `titleLevel` | `ConditionBadge`, `MitumbaChip` |
| 12 | `SellerCard` | `titleLevel` | `STIScoreChip`, `MitumbaAvatar` |
| 13 | `StoreCard` | `titleLevel` | `MitumbaAvatar` |
| 14 | `CartItem` | `titleLevel` | — |
| 15 | `OrderSummaryCard` | `titleLevel` | — |
| 16 | `OrderCard` | `titleLevel` | `MitumbaChip` |
| 17 | `ProfileCard` | `titleLevel` | `MitumbaAvatar` |
| 18 | `StatsCard` | — (term/value pairs, not headings) | — |
| 19 | `VAZIOutfitCard` | `titleLevel` | `MitumbaChip` |
| 20 | `RaiseDisputeModal` | `titleLevel` | `MitumbaModal`, `MitumbaTextField`, `MitumbaSelect`, `MitumbaPrimaryButton` |
| 21 | `DisputeStatusTimeline` | `sectionTitleLevel` | — |
| 22 | `DisputeEvidenceGallery` | `titleLevel` | — |
| 23 | `SellerDisputeResponseCard` | `titleLevel` | `MitumbaPrimaryButton` |
| 24 | `AddAddressModal` | `titleLevel` | `MitumbaModal`, `MitumbaTextField`, `MitumbaPrimaryButton` |
| 25 | `DestructiveConfirmDialog` | `titleLevel` | `MitumbaModal`, `MitumbaTextField`, `MitumbaPrimaryButton` |
| 26 | `StylePicker` | `titleLevel` | — |
| 27 | `SearchFilterSheet` | `titleLevel`, `sectionTitleLevel` | `MitumbaChip` |
| 28 | `SellerOnboardingPage` | `titleLevel`, `stepTitleLevel`, `sectionTitleLevel` | `MitumbaPrimaryButton` |
| 29 | `TwoFactorSetupModal` | `titleLevel` | `MitumbaModal`, `MitumbaTextField`, `MitumbaPrimaryButton` |
| 30 | `TwoFactorMethodList` | `titleLevel` | `MitumbaPrimaryButton` |
| 31 | `AddTwoFactorMethodModal` | `titleLevel` | `MitumbaModal`, `MitumbaPrimaryButton` |
| 32 | `FloatingChatDock` | `titleLevel` | `MessageBubble`, `OrderMessageAttachment` |
| 33 | `ConversationList` | `emptyTitleLevel` | — |
| 34 | `ChatThread` | `titleLevel` | `MessageBubble`, `OrderMessageAttachment` |
| 35 | `VAZIShowcase` | `titleLevel`, `sectionTitleLevel` | `MitumbaPrimaryButton` |
| 36 | `VAZIHeroSpotlight` | `titleLevel` | `MitumbaPrimaryButton` |

## Additional reachable text-owning primitives (source-derived, beyond the issue baseline)

The `@mitumba/ui@0.33.1` baseline table listed the primary chains. Verifying
against source surfaced these additional reachable primitives, all migrated and
covered by the matrix test:

- `MitumbaAvatar` is reachable from `StoreCard` and `ProfileCard` (not only
  `SellerCard`).
- `MitumbaModal` is also reached by `TwoFactorSetupModal`.
- `ConversationList` and `ChatThread` are reachable from `InboxLayout` as
  text-owning composites.
- `MessageBubble` → `OrderMessageAttachment` is reachable from `FloatingChatDock`
  in addition to `ChatThread`.

## Notes on VAZI hardcoded colours (no exact token — intentionally retained)

`VAZIShowcase` and `VAZIHeroSpotlight` use bespoke light-grey/glassmorphism
values that have **no exact `tokens.colors.*` match**, so per the issue's "where
a token exists" rule they are retained rather than mapped to an approximate
token:

- Neutral greys: `#e8f0f2`, `#888`, `#999`, `#333`, `#aaa`, `#444`, `#555`,
  `#222`, `#666`.
- Glassmorphism overlays: `rgba(255,255,255,0.25|0.35|0.8|0.92)`, blur/saturate
  backdrops, and the `linear-gradient(180deg, #f0f4f5 0%, #e8eef0 100%)` model
  backdrop.

These are candidates for a future `@mitumba/tokens` addition (a neutral-grey
ramp + glass-surface tokens); no token is invented here.
