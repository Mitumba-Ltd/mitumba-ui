# Feedback Components — Component Specification

The Mitumba UI Feedback suite provides essential communication between the system and the user. These components manage state transitions, error handling, and data availability with a focus on "Personality" and "No Dead Ends" UX principles.

## 1. EmptyState
The primary mechanism for handling null data states. Based on the benchmark, it must support diverse contexts and provide clear paths forward.
*   **Illustrative Personality:** Supports custom SVG illustrations or icons centered above the text.
*   **Contextual Messaging:** Clear, friendly header ("It's lonely here...") paired with descriptive sub-text.
*   **No Dead Ends:** Always includes an optional Primary CTA Button (`MitumbaPrimaryButton`) to drive user action (e.g., "Add Photos", "Browse Items").
*   **E-commerce Presets:**
    *   **Cart:** "Your cart is empty" -> "Start Shopping".
    *   **Orders:** "No orders yet" -> "Explore Listings".
    *   **Notifications:** "All caught up!"
    *   **Search:** "No items found" -> "Clear Filters".
*   **Variants:** Standard (Large, centered), Compact (Mini version for small containers).

## 2. MitumbaToast (Snackbar)
Refined for high-end tactile feedback.
*   **Physics:** Slide-in and fade transitions with brand-standard easing.
*   **Status Tints:** Uses brand semantic colors (`success`, `error`, `warning`, `info`).
*   **Progress Visualization (Benchmark):**
    *   **Icon Ring:** Circular progress spinner surrounding the leading status icon.
    *   **Linear Bar:** High-fidelity timer progress bar at the bottom edge.
*   **Action Layouts:** Supports pill-shaped text buttons or standard icons for interactive recovery (e.g., "Undo", "Retry").
*   **Geometry:** Rounded corners (8px) and deep shadows (index 3).
*   **Layout:** Leading status icon + Message text + Optional "Action" + Close icon.

## 3. MitumbaModal (Dialog)
A high-depth container for critical interactions.
*   **Depth:** Uses `tokens.shadows.deep` and a semi-transparent backdrop.
*   **Rounding:** Premium large corners (`tokens.radius.xxxl` / 32px) as defined in our high-res theme.
*   **Structure:** Header (with close icon), Content area (scrollable), and Footer (Sticky action row).
*   **Animation:** Scale-up transition (`transform: scale(0.95) -> 1`) with subtle opacity fade.

## 4. MitumbaSkeleton
For smooth loading transitions.
*   **Animation:** Subdued "wave" or "pulse" effect.
*   **Sanity:** Components must export their own skeleton variants (e.g., `ListingCardSkeleton`) to ensure perfect layout stability during data fetches.
*   **Geometry:** Matches the target component's radius exactly.

---

## Technical Standards
*   **100% Token Driven:** Zero hardcoded colors or spacing.
*   **Tactile Physics:** Inherits system-wide spring transitions.
*   **Accessibility:** Proper ARIA roles (`alert`, `dialog`, `status`, `progressbar`).
