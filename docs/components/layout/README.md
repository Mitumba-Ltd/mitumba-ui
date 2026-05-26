# Layout Components — Component Specification

The Mitumba UI Layout suite provides the structural scaffolding for the application. These components ensure spatial consistency, responsive alignment, and benchmarked grid proportions.

## 1. MitumbaGrid
A high-fidelity responsive grid system based on the "Very Serious" design benchmark. It provides a reliable structure for arranging components across different viewports.

*   **Responsive Standards (Benchmark):**
    *   **Desktop (1200px+):** 12 Columns | 20px Gutter.
    *   **Tablet (800px+):** 8 Columns | 20px Gutter.
    *   **Mobile (0px+):** 4 Columns | 16px Gutter.
*   **Behavior:** Uses CSS Grid for precise control over column spans and row heights.
*   **Gap Sanity:** Defaults to `tokens.spacing.base` (16px) or `tokens.spacing.lg` (20px) based on viewport.

## 2. PageContainer
The global layout wrapper that manages max-width and horizontal margins.
*   **Constraint:** Centers content with a responsive max-width to prevent line lengths from becoming unreadable on ultra-wide screens.
*   **Padding:** Systematic horizontal padding using the 4px factor.

## 3. SectionHeader
Standardizes the entry point of every major page section.
*   **Visual:** Bold title + Descriptive subtitle + Optional Action (e.g., "See All" button).
*   **Alignment:** Perfect vertical centering of text and actions.

---

## Technical Standards
*   **100% Token Driven:** All spacing and breakpoints derived from `@mitumba/tokens`.
*   **Flexibility:** Components must support both `Grid` and `Flex` internal layouts where appropriate.
*   **Spatial Sanity:** Strict adherence to the 4px factor for all margins and paddings.
