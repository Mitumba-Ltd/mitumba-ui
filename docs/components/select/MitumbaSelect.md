# MitumbaSelect — Component Specification

The Mitumba UI Select is a high-fidelity input primitive designed for complex data selection. It balances visual simplicity in its collapsed state with a rich, interactive menu experience. Following the "Very Serious" redesign vision, it incorporates benchmarked scaling and premium menu physics.

## 1. Input Scaling (Matching Buttons)
To maintain a consistent horizontal rhythm, the Select input matches the button height standard:
*   **Small:** `32px` — For dense forms and secondary filters.
*   **Medium:** `42px` — The standard baseline for primary data entry.
*   **Large:** `52px` — For high-visibility search or onboarding fields.

## 2. Menu Architecture (The Popover)
The dropdown menu is a physical object floating above the surface:
*   **Shadow:** Uses `tokens.shadows.deep` (or shadow index 3) for clear separation.
*   **Rounding:** Matches the input's rounding (standard `8px` or `full` pill).
*   **Transition:** Smooth scale/fade entry (`transform: scale(0.95) -> 1`).

## 3. Content Permutations
Options within the menu support rich metadata:
*   **Leading Visuals:** Support for `MitumbaAvatar`, Status Dots, or Icons/Flags.
*   **Secondary Text:** Descriptive labels beneath the primary option name.
*   **Trailing Indicators:** Checkmarks for selected states or information icons.

## 4. Advanced Features
*   **Search Integration:** Optional fixed search bar at the top of the menu for long lists.
*   **Multi-Select:** Support for multiple selections with checkboxes and "X items selected" label.
*   **Grouped Options:** Categorized items with clear section headers.
*   **Inverted Mode:** High-contrast dark menu variants for specific UI contexts.

## 5. Interaction States
*   **Hover:** Subtle background tint shift and lift.
*   **Focused:** Bold border transition and focus ring (`tokens.shadows.focus`).
*   **Active Selection:** Systematic checkmark glyph and high-contrast text.
*   **Disabled:** Consistent de-saturation and reduced opacity.

## 6. Technical Standards
*   **Typography:** Uses `Nunito` with Semibold (600) weights for primary labels.
*   **Accessibility:** Full ARIA `combobox`, `listbox`, and keyboard navigation support.
*   **Overflow:** Intelligent positioning (top/bottom) based on viewport clearance.
