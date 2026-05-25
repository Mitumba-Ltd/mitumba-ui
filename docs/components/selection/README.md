# Selection Controls — Component Specification

The Mitumba UI Selection Controls are a suite of interactive foundation primitives designed for Boolean states, choice selection, and range adjustments. These components emphasize tactile feedback and physical "state-awareness."

## 1. MitumbaCheckbox
A square selection control for multiple-choice or agreement scenarios.
*   **States:** Unchecked, Hover (Subtle border shift), Checked (Brand green fill with checkmark), Indeterminate (Dash icon), and Disabled.
*   **Physics:** Systematic scaling on press and smooth color transitions.

## 2. MitumbaRadio
A circular selection control for single-choice scenarios within a group.
*   **States:** Unselected, Hover, Selected (Inner brand circle), and Disabled.
*   **Physics:** Concentric spring expansion upon selection.

## 3. MitumbaSwitch (Toggle)
A high-fidelity binary toggle for settings and preferences.
*   **States:** On (Brand green track), Off (Neutral track), and Disabled.
*   **Visual:** Smooth handle movement with a subtle "bounce" effect.

## 4. MitumbaSlider
A precision control for adjusting values along a continuum.
*   **Variants:** Single Slider (Single handle) and Double Slider (Range selection with two handles).
*   **Physics:** High-contrast focus handles, drag-compression physics, and real-time value tooltip support.

## 5. MitumbaDatePicker
A complex input for selecting dates with high accuracy.
*   **Atoms:** Standardized "Today," "Selected," and "Hover/Range" cell states.
*   **Architecture:** Integrated input field (matching TextField scaling) with a floating calendar popover.
*   **Geometry:** Rounded corners matching the global 8px standard.

---

## Technical Standards
*   **100% Token Driven:** All colors, shadows, and spacing derived from `@mitumba/tokens`.
*   **Tactile Core:** Inherits the system-wide spring transitions and compression physics.
*   **Accessibility:** Proper ARIA roles (`checkbox`, `radio`, `switch`, `slider`) and full keyboard focus management.
