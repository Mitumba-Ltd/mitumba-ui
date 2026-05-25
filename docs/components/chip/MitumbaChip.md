# MitumbaChip — Component Specification

The Mitumba UI Chip is a versatile, tactile metadata primitive. It is designed to represent tags, filters, and status indicators with high visual fidelity and interactive feedback. Following the "Very Serious" design standard, it supports a wide range of visual permutations and elevation states.

## 1. Visual Geometry (Rounding)
Chips are not limited to a single shape; they must adapt to the context:
*   **Pill (Default):** Full circular ends (`tokens.radius.full`).
*   **Rounded:** Refined soft corners (`tokens.radius.md` / 8px).
*   **Square:** Minimalist sharp corners (`tokens.radius.xs` / 4px).

## 2. Content Permutations
A chip is a container for more than just text:
*   **Text Only:** The baseline state.
*   **Leading Avatar/Icon:** Integration with `MitumbaAvatar` or standard MUI icons for identity/categorization.
*   **Trailing Delete (X):** Interactive "remove" action for multi-select or filter contexts.
*   **Numeric Badge:** Small circular counts appended within the chip.

## 3. Visual Treatment (Variants)
*   **Solid:** High-contrast background for active or primary tags.
*   **Outline:** `1px` or `2px` stroke for secondary metadata.
*   **Shaded (Soft):** Low-opacity tinted background for subtle grouping.
*   **Dashed:** Used for "Add" or placeholder states.
*   **Bold:** High-weight typography for emphasis.

## 4. Interaction Physics
Chips must feel interactive and responsive:
*   **Hover:** Subtle lift (`translateY(-1px)`) and background shift.
*   **Focused:** Clear focus ring using `tokens.shadows.focus`.
*   **Active (Selected):** Color shift and checkmark glyph integration.
*   **Pressed:** Tactile compression (`scale(0.96)`).

## 5. Elevation States
Chips support varying degrees of depth:
*   **Flat:** No shadow, integrated into the surface.
*   **Tiny Shadow:** Standard metadata depth.
*   **Elevated:** Higher z-index for floating or "soaring" chips.

## 6. Technical Standards
*   **Height:** Standardized baseline (e.g., `24px` for Small, `32px` for Medium).
*   **Typography:** Uses `Nunito` with granular font size control (`fontSizes.xs` or `sm`).
*   **Padding:** Perfectly balanced internal spacing using the 4px factor.
*   **Accessibility:** Proper `role="button"` or `role="status"` based on interactivity.
