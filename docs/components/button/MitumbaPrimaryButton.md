# MitumbaPrimaryButton — Component Specification

The Mitumba UI Primary Button is the workhorse of the design system. It is engineered for high visibility, tactile feedback, and absolute spatial sanity. Fulfilling the "Very Serious" standard, it incorporates benchmarked scaling and premium interaction physics.

## 1. Button Scale (Fixed Heights)
To ensure a consistent spatial rhythm across the application, buttons follow strict height constraints:
*   **Small:** `32px` — For dense layouts and secondary actions.
*   **Medium:** `42px` — The standard baseline for most interactions.
*   **Large:** `52px` — For primary calls-to-action on onboarding and landing screens.
*   **Icon-Only:** A perfect square matching the height of the current size (e.g., `52x52px` for Large).

## 2. Visual Variants
*   **Solid (Contained):** High-contrast background for primary actions (`primary`, `earth`, `success`, `error`).
*   **Outline:** Transparent background with a `2px` stroke for secondary importance.
*   **Ghost (Text):** No background or border, used for tertiary actions or within dense headers.

## 3. Interaction Physics (Tactile Logic)
Buttons must feel like physical objects that respond to touch:
*   **Default:** Uses token-based shadows and clean typography.
*   **Hover:** Systematic lightening of the background color and a subtle `translateY(-2px) scale(1.02)` lift.
*   **Pressed (Active):** Darkening of the background and physical compression (`scale(0.98)`).
*   **Disabled:** Consistent de-saturation and opacity reduction (`0.6`) with `pointer-events: none`.

## 4. Icon Composition
Icons should be perfectly aligned with the label, maintaining a dense, professional gap (`tokens.spacing.sm`).
*   **Left Icon:** Standard for adding visual cues to actions (e.g., Camera, Edit).
*   **Right Icon:** Used to indicate direction or progression (e.g., Arrow Forward).
*   **Icon-Only:** Centered perfectly within a square container.

## 5. Loading States
*   **Mechanism:** When `loading` is true, the label and icons fade out (`opacity: 0`), and a centered `CircularProgress` appears.
*   **Alignment:** The button maintains its exact dimensions during loading to prevent layout shifts.

## 6. Technical Standards
*   **Typography:** Uses `Nunito` with `fontWeights.semibold` (600).
*   **Radius:** Standardized on `tokens.radius.md` (8px) for a modern, refined corner.
*   **Spacing:** Horizontal padding is strictly token-driven (e.g., `theme.spacing(6)` for 24px).
*   **Accessibility:** Full `aria-busy` and `role="button"` support.

---

## 3D Perspective Integration
While the Avatar uses extreme 3D tilt, the Button uses **Subtle Depth**. It inherits the theme's `standard` transition (`cubic-bezier(0.4, 0, 0.2, 1)`) to ensure every interaction feels premium and intentional.
