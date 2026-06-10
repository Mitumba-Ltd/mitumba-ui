export const zIndex = {
  /** Below everything — hidden layers */
  hide: -1,
  /** Default stacking */
  base: 0,
  /** Sticky headers, navbars */
  sticky: 100,
  /** Fixed elements — bottom nav, FABs */
  fixed: 200,
  /** Drawers, side panels */
  drawer: 300,
  /** Modals, dialogs */
  modal: 400,
  /** Toast notifications */
  toast: 500,
  /** Tooltips, popovers */
  tooltip: 600,
  /** Backdrops, overlays */
  backdrop: 700,
  /** Absolute top — loading overlays */
  max: 1000,
} as const
