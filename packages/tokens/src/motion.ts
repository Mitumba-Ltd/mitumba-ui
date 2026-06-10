export const motion = {
  /** Duration in ms */
  durations: {
    instant: '100ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    deliberate: '600ms',
    dramatic: '800ms',
  },

  /** Easing curves */
  easings: {
    /** Standard — most UI transitions */
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    /** Enter — elements appearing */
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    /** Exit — elements leaving */
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    /** Spring — interactive elements (buttons, cards) */
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Smooth — clip-path, layout shifts */
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },

  /** Pre-composed transitions for common patterns */
  transitions: {
    /** Buttons, chips — fast + standard */
    interaction: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    /** Opacity fades */
    fade: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    /** Transform moves (hover lifts, scale) */
    transform: 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    /** Layout/panel transitions */
    layout: 'all 400ms cubic-bezier(0.65, 0, 0.35, 1)',
    /** AuthPage trapezoid animation */
    clipPath: 'clip-path 800ms cubic-bezier(0.65, 0, 0.35, 1)',
  },
} as const
