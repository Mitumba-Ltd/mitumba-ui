import React from 'react'
import Typography from '@mui/material/Typography'
import type { TypographyProps } from '@mui/material/Typography'
import type { HeadingLevel } from '../types/semantic'

/**
 * Props for the internal SemanticTitle helper.
 *
 * This is an internal utility (not a public four-file component). It centralizes
 * the `component={`h${level}`}` mapping so no component repeats the ternary. The
 * `titleLevel` prop changes ONLY the emitted DOM element, never the visual
 * variant/size; styling comes from `sx`/`variant` exactly as before.
 */
export interface SemanticTitleProps {
  /** Emits h1-h6 when provided; omission preserves existing markup. */
  titleLevel?: HeadingLevel
  /** Element rendered when no `titleLevel` is supplied. @default 'p' */
  fallbackComponent?: React.ElementType
  /** Passed straight through to the underlying Typography `sx`. */
  sx?: TypographyProps['sx']
  /** Passed straight through to the underlying Typography `variant`. */
  variant?: TypographyProps['variant']
  /** Optional id for aria-labelledby wiring. */
  id?: string
  /** Title content. */
  children?: React.ReactNode
}

/**
 * Renders a Typography node whose emitted element is driven by `titleLevel`
 * (h1-h6) while all visual styling stays under the caller's control. When
 * `titleLevel` is omitted the element falls back to `fallbackComponent` (or a
 * plain paragraph), preserving existing markup.
 */
export function SemanticTitle({
  titleLevel,
  fallbackComponent = 'p',
  sx,
  variant,
  id,
  children,
}: SemanticTitleProps) {
  const component: React.ElementType = titleLevel ? (`h${titleLevel}` as React.ElementType) : fallbackComponent

  return (
    <Typography component={component} variant={variant} sx={sx} id={id}>
      {children}
    </Typography>
  )
}

export default SemanticTitle
