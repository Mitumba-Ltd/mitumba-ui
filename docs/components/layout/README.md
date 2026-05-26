# Layout Components — Component Specification

The Mitumba UI Layout suite provides the structural scaffolding for the application. These components ensure spatial consistency, responsive alignment, and benchmarked grid proportions.

## 1. MitumbaGrid
A high-fidelity responsive grid system based on the "Very Serious" design benchmark.
*   **Responsive Standards:**
    *   **Desktop:** 12 Columns | 20px Gutter.
    *   **Tablet:** 8 Columns | 20px Gutter.
    *   **Mobile:** 4 Columns | 16px Gutter.
*   **Behavior:** Uses CSS Grid for precise control over column spans and row heights.

## 2. PageContainer
The global layout wrapper that manages max-width and horizontal margins.
*   **Constraint:** Centers content with a responsive max-width.
*   **Padding:** Systematic horizontal padding using the 4px factor.

## 3. SectionHeader
Standardizes the entry point of every major page section. Fulfills the "Minimal Header Inspiration" benchmark.
*   **Layout Archetypes:**
    *   **Standard:** Bold Title + Descriptive Subtitle.
    *   **Actionable:** Title + Subtitle + Action (e.g., "See All" button).
    *   **Inspirational:** Minimal branding and clean typography for hero sections.
*   **Alignment:** Perfect vertical centering of text and actions.

## 4. MitumbaDivider
A thematic break that maintains the 4px factor spacing.

---

## Technical Standards
*   **100% Token Driven:** All spacing and breakpoints derived from `@mitumba/tokens`.
*   **Flexibility:** Components must support both `Grid` and `Flex` internal layouts where appropriate.
*   **Spatial Sanity:** Strict adherence to the 4px factor for all margins and paddings.
