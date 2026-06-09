# SellerOnboardingPage — Component Specification

**Package:** `@mitumba/ui`  
**Category:** `layout`  
**Status:** Planned — Phase 4

---

## Overview

`SellerOnboardingPage` is a multi-step onboarding wizard for new Mitumba sellers. It collects identity, business, inventory, and store setup information in a structured, professional flow — building the seller's initial STI (Seller Trust Index) baseline and establishing their marketplace presence.

Buyers do **not** receive a dedicated onboarding flow. Buyer registration is handled entirely by `AuthPage`. Forcing buyers through onboarding steps before they can browse listings creates unnecessary friction and reduces conversion. Everything a buyer needs (saved addresses, payment methods) is collected contextually at checkout.

---

## Design principles

- **Trust-first** — Mitumba operates in a market where buyer-seller trust is the primary conversion driver. Every onboarding step exists to build verifiable seller credibility, not just collect data.
- **Mobile-first** — most Kenyan sellers operate on budget Android devices on 3G/4G. The flow must be fast, lightweight, and fully functional at 375px.
- **Persistent progress** — sellers should never lose their place. Step state is controlled externally (consumer saves to backend/localStorage). Reloading resumes at the same step.
- **STI-aware** — completion percentage of onboarding directly influences the seller's starting STI score. This is surfaced to the seller at the end as motivation.
- **No forced KRA PIN** — KRA PIN and business registration are optional and clearly labelled as such. Individual sellers (most of Mitumba's base) must not feel excluded.

---

## Competitive reference

| Platform | Identity required | Business docs | Categories | Store setup |
|---|---|---|---|---|
| Jumia Kenya | Full name, ID, KRA PIN | Required for registered businesses | Mandatory | Logo, store description |
| Jiji Kenya | Phone, location | None | Mandatory | Store name, tagline |
| Kilimall | Name, phone, ID | KRA PIN encouraged | Mandatory | Banner, logo |
| **Mitumba** | Name, phone, ID, photo, county | KRA PIN optional | Mandatory (+ condition grade) | Name, tagline, logo, banner |

---

## Step flow

```
Step 1: Welcome
Step 2: Identity
Step 3: Business
Step 4: What you sell
Step 5: Store setup
         └── Confirmation screen
```

### Step 1 — Welcome

No data collection. Sets context and motivation.

- Mitumba brand illustration (uses `heroImageUrl` pattern from `AuthPage`)
- Headline: "Start selling on Mitumba"
- 3 value props: Reach buyers across Kenya · Build your STI score · Get paid via M-Pesa
- STI explained: brief callout explaining what STI is and why completing onboarding boosts it
- CTA: "Let's get started"

### Step 2 — Identity

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | Text | Yes | |
| Phone number | Tel | Yes | M-Pesa linked — used for payouts |
| ID / Passport number | Text | Yes | KYC — not displayed publicly |
| Profile photo | Image upload | Yes | Used on listings and seller card |
| County | Select | Yes | 47 Kenya counties |
| Town / area | Text | No | More specific location |

### Step 3 — Business

| Field | Type | Required | Notes |
|---|---|---|---|
| Seller type | Radio | Yes | Individual · Registered Business |
| Business name | Text | If registered | Trading name |
| KRA PIN | Text | No | Optional — shown as "Boosts your STI score" |
| About your business | Textarea | No | Max 300 chars |

### Step 4 — What you sell

| Field | Type | Required | Notes |
|---|---|---|---|
| Categories | Multi-select chips | Yes | Min 1. Options: Women's Wear, Men's Wear, Kids, Shoes, Bags, Accessories, Sportswear |
| Condition grades | Multi-select chips | Yes | A (Like new), B (Good), C (Fair) — sets expectations for buyers |
| Delivery method | Radio | Yes | I arrange delivery · Mitumba Logistics (coming soon — shown as disabled) |
| Typical price range | Dual slider | No | KES — helps buyers filter |

### Step 5 — Store setup

| Field | Type | Required | Notes |
|---|---|---|---|
| Store name | Text | Yes | Shown on all listings and seller profile |
| Store tagline | Text | No | Max 60 chars. e.g. "Premium thrift in Nairobi" |
| Store logo | Image upload | No | Square, shown on seller card |
| Store banner | Image upload | No | Wide, shown on seller profile page |

### Confirmation screen

- Animated checkmark
- STI baseline score displayed (calculated from completion — full onboarding = 65/100 starting score)
- Breakdown: what contributed to the score
- CTA: "Start listing your items →"

---

## Props interface

```typescript
interface SellerOnboardingPageProps {
  /** Current active step (0-indexed). Persist this externally — controls resume on reload */
  currentStep?: number;

  /** Called whenever the user advances or goes back — persist the new step */
  onStepChange?: (step: number) => void;

  /** Called when the entire flow is completed with all collected data */
  onComplete?: (data: SellerOnboardingData) => void;

  /** Whether an async operation (save, upload) is in progress */
  loading?: boolean;

  /** Error message to display (e.g. phone already registered) */
  error?: string;

  /** Pre-filled data — for resuming a partially completed flow */
  initialData?: Partial<SellerOnboardingData>;

  /** Theme variant */
  theme?: 'mitumba-light' | 'mitumba-dark';

  /** Hero/brand image for the welcome step panel */
  heroImageUrl?: string;
}

interface SellerOnboardingData {
  // Step 2
  fullName: string;
  phone: string;
  idNumber: string;
  profilePhotoUrl: string;
  county: string;
  town?: string;

  // Step 3
  sellerType: 'individual' | 'business';
  businessName?: string;
  kraPin?: string;
  businessDescription?: string;

  // Step 4
  categories: string[];
  conditionGrades: ('A' | 'B' | 'C')[];
  deliveryMethod: 'self' | 'mitumba-logistics';
  priceRangeMin?: number;
  priceRangeMax?: number;

  // Step 5
  storeName: string;
  storeTagline?: string;
  storeLogoUrl?: string;
  storeBannerUrl?: string;
}
```

---

## Stories required

| Story | Description |
|---|---|
| `Welcome` | Step 1 — default entry point |
| `Identity` | Step 2 pre-filled |
| `Business` | Step 3 — Individual type |
| `BusinessRegistered` | Step 3 — Registered Business type |
| `WhatYouSell` | Step 4 |
| `StoreSetup` | Step 5 |
| `Confirmation` | Final screen with STI score |
| `WithHeroImage` | Welcome step with `heroImageUrl` |
| `LoadingState` | `loading=true` on any step |
| `WithError` | `error` prop showing |
| `Mobile` | 375px viewport |
| `ResumedFlow` | `currentStep=3`, `initialData` pre-filled |

---

## Accessibility

- All form inputs have associated labels
- Step indicator is `aria-label="Onboarding progress, step X of 5"`
- Image upload triggers have `aria-label`
- Keyboard navigable — Tab reaches all fields and buttons
- Color contrast ≥ 4.5:1 on all text

---

## Token usage

No new tokens required. Uses existing:
- `tokens.colors.green` — primary CTAs, progress indicator, STI score
- `tokens.colors.earth` — secondary accents, VAZI-adjacent elements
- `tokens.colors.surface` — card backgrounds
- `tokens.spacing.*` — all spacing
- `tokens.radius.*` — cards and chips

---

## File structure

```
src/components/layout/SellerOnboardingPage/
├── SellerOnboardingPage.tsx
├── SellerOnboardingPage.types.ts
├── SellerOnboardingPage.test.tsx
├── SellerOnboardingPage.stories.tsx
└── index.ts
```
