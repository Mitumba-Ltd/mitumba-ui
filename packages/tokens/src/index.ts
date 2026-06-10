import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { motion } from './motion'
import { radius } from './radius'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'
import { zIndex } from './zIndex'

export { breakpoints, colors, motion, radius, shadows, spacing, typography, zIndex }

export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
  motion,
  zIndex,
} as const

export type Tokens = typeof tokens
export type ColorTokens = typeof colors
export type SpacingTokens = typeof spacing
export type TypographyTokens = typeof typography
export type RadiusTokens = typeof radius
export type ShadowTokens = typeof shadows
export type BreakpointTokens = typeof breakpoints
export type MotionTokens = typeof motion
export type ZIndexTokens = typeof zIndex
