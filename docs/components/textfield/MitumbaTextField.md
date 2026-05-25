# MitumbaTextField — Component Specification

The Mitumba UI Text Field is a high-performance input primitive designed for precision and clarity. It supports a wide array of states, types (including Text Areas), and advanced decorative configurations. Following the "Very Serious" redesign vision, it aligns with the 32/42/52 scaling standard.

## 1. Input Scaling (Matching Buttons/Select)
To maintain absolute spatial harmony, the Text Field height is standardized:
*   **Small:** `32px` — High-density forms.
*   **Medium:** `42px` — Standard baseline.
*   **Large:** `52px` — Hero inputs and search fields.

## 2. Input Types
*   **Text (Standard):** Single-line entry for names, emails, etc.
*   **Text Area (Multi-line):** Support for long-form content with configurable `rows` and resizable handles.
*   **Password:** Secure entry with visibility toggle support.

## 3. Visual States
Inputs must provide immediate visual feedback:
*   **Default:** Clean border (`tokens.colors.divider`).
*   **Hover:** Systematic border darkening.
*   **Focused:** Brand border (`tokens.colors.green`) and focus ring (`tokens.shadows.focus`).
*   **Filled:** Clear distinction from empty state.
*   **Disabled:** De-saturated background and text.

## 4. Status Indicators (Feedback)
Built-in support for validation states with corresponding icons and helper text:
*   **Success:** Green border + Checkmark icon.
*   **Error:** Red border + Error/Cancel icon.
*   **Warning:** Yellow border + Warning icon.

## 5. Adornments & Integrated Actions
Support for complex internal compositions:
*   **Leading Visuals:** Icons for context (e.g., Lock, Mail, Search).
*   **Trailing Visuals:** Icons for actions or status (e.g., Eye, Progress).
*   **Integrated Buttons:** Standardized support for buttons appended to the end of the input (e.g., Search button, Submit button).

## 6. Technical Standards
*   **Typography:** Uses `Nunito` with Semibold (600) weights for input text.
*   **Radius:** Matches the global standard `tokens.radius.md` (8px).
*   **Spacing:** Internal padding uses the 4px factor factor for perfect glyph alignment.
*   **Accessibility:** Proper labeling, ARIA error states, and keyboard focus management.
