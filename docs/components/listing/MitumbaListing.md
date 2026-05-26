# Listing Components — Component Specification

The Mitumba UI Listing suite represents the "extraordinary" heart of the marketplace. These components combine high-end aesthetics with extreme performance and deep customization.

## 1. ListingCard
A "Pinterest-level" product card designed for maximum visual impact.
*   **Media Gallery:** Integrated carousel support for multiple images with smooth "anime" dot indicators.
*   **Content Architecture:**
    *   **Badges:** Floating top-left/right indicators (e.g., "Best Seller", "New").
    *   **Brand Overlay:** Support for small circular brand logos on the image.
    *   **Typography:** Strict 900-weight headers with descriptive subtexts.
*   **Action Area:** Systematic price pill + prominent "Buy Now" CTA with tactile interaction.
*   **Geometry:** High-fidelity large radii (`tokens.radius.lg` or `xl`) for a soft, premium feel.

## 2. MitumbaGlass (The Glass Primitive)
A reusable backdrop-filter component designed for "out of this world" overlays.
*   **Physics:** 
    *   **Blur:** High-end `backdrop-filter: blur(20px)`.
    *   **Transparency:** 40-60% opacity surface fills.
    *   **Border:** Ultra-thin `1px` white semi-transparent borders for depth.
*   **Context:** Used for "Quick View" panes, virtual fits, and floating action menus.

## 3. ListingGrid
A specialized layout engine for these high-fidelity cards.
*   **Synergy:** Inherits from `MitumbaGrid` but optimized for 2-column mobile and 4-column desktop viewing.

---

## Technical Standards
*   **100% Token Driven:** Zero hardcoded values.
*   **Anime Transitions:** Injected spring transitions for every hover and click.
*   **Accessibility:** Full support for image alt text, keyboard navigation, and screen-reader price reporting.
