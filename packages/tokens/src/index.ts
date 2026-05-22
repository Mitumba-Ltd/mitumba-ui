import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { radius } from './radius'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'

export { breakpoints, colors, radius, shadows, spacing, typography }

export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
} as const

export type Tokens = typeof tokens
export type ColorTokens = typeof colors
export type SpacingTokens = typeof spacing
export type TypographyTokens = typeof typography
export type RadiusTokens = typeof radius
export type ShadowTokens = typeof shadows
export type BreakpointTokens = typeof breakpoints
