# Navigation Components — Component Specification

The Mitumba UI Navigation suite enables users to traverse the application with clarity and efficiency. These components prioritize clear hierarchy, state awareness, and tactile feedback.

## 1. MitumbaTabs
For switching between related views on the same page.
*   **Variants:** 
    *   **Primary:** Solid background for active tab, designed for top-level navigation.
    *   **Secondary:** Underline-only style for subtle content switching.
*   **Composition:** Supports text-only or text + icon configurations.
*   **Physics:** Smooth indicator transitions and hover scaling.

## 2. MitumbaPagination
For navigating through multi-page data lists.
*   **Layout:** Numbered buttons + Previous/Next arrow indicators.
*   **States:** Default, Hover (subtle background shift), and Selected (solid brand green).
*   **Logic:** Intelligent truncation for long lists (e.g., `1 2 3 ... 17`).

## 3. MitumbaBreadcrumb
Provides hierarchical context for the current view.
*   **Visual:** List of links separated by a custom divider (e.g., `/`).
*   **States:** Supports hover effects on linkable items and a "disabled" look for the current page.

## 4. MitumbaStepper (Steps)
For multi-step processes or onboarding.
*   **States:** 
    *   **Completed:** Green circle with checkmark.
    *   **Active:** Brand blue circle with number.
    *   **InActive:** Neutral/muted circle with number.
*   **Connecting Lines:** Solid lines between completed steps, dashed between pending steps.

---

## Technical Standards
*   **100% Token Driven:** All geometry and colors derived from `@mitumba/tokens`.
*   **Tactile Core:** Inherits system-wide spring transitions.
*   **Accessibility:** Proper ARIA roles (`tablist`, `navigation`, `progressbar`).
