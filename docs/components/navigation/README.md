# Navigation Components — Component Specification

The Mitumba UI Navigation suite enables users to traverse the application with clarity and efficiency. These components prioritize clear hierarchy, state awareness, and tactile feedback.

## 1. TopNav
The primary application header bar. Fulfills the "20 Customizable Styles" benchmark for maximum branding flexibility.
*   **Layout Archetypes:**
    *   **Classic:** Logo Left | Links Center | Actions Right.
    *   **Modern:** Logo Left | Links Left | Actions Right.
    *   **Split:** Logo Center | Links Left & Right.
*   **Announcement Bar:** Integrated high-contrast strip at the very top for urgent updates or promos.
*   **Interactive Elements:** Support for `MitumbaPrimaryButton` CTAs (e.g., "Get Started", "Start Trial") directly in the nav row.
*   **Behaviors:** Supports `Sticky`, `Fixed`, and `Transparent` (scroll-aware) states.

## 2. MobileBottomNav
Sticky bottom navigation designed for thumb-ready mobile access.
*   **Standard:** Home, Search, VAZI, Orders, Profile.
*   **Visual:** Active state indicator with brand green and smooth icon transitions.

## 3. MitumbaTabs
For switching between related views on the same page.
*   **Variants:** 
    *   **Primary:** Solid background for active tab, designed for top-level navigation.
    *   **Secondary:** Underline-only style for subtle content switching.
*   **Composition:** Supports text-only or text + icon configurations.
*   **Physics:** Smooth indicator transitions and hover scaling.

## 4. MitumbaPagination
For navigating through multi-page data lists.
*   **Layout:** Numbered buttons + Previous/Next arrow indicators.
*   **States:** Default, Hover (subtle background shift), and Selected (solid brand green).
*   **Logic:** Intelligent truncation for long lists (e.g., `1 2 3 ... 17`).

## 5. MitumbaBreadcrumb
Provides hierarchical context for the current view.
*   **Visual:** List of links separated by a custom divider (e.g., `/`).
*   **States:** Supports hover effects on linkable items and a "disabled" look for the current page.

## 6. MitumbaStepper (Steps)
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
