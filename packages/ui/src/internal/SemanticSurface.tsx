import React from 'react'
import Box from '@mui/material/Box'
import type { BoxProps } from '@mui/material/Box'
import type { SemanticDestinationProps } from '../types/semantic'

/**
 * Props for the internal SemanticSurface helper.
 *
 * This is an internal utility (not a public four-file component). It picks the
 * correct interactive element for a primary surface so keyboard support comes
 * for free from native semantics:
 *  - `href` present  → an anchor (host `linkComponent` if provided, else
 *    `<Box component="a">`), preserving `onClick`.
 *  - callback only (no `href`) → `<Box component="button" type="button">`.
 *  - neither → a noninteractive element (default `article`, overridable to
 *    `li`).
 *
 * ## Nested-action isolation pattern (`isolateNested`)
 * When the surface is interactive AND contains its own nested buttons/links,
 * those child handlers MUST call `e.stopPropagation()` so activating a child
 * does not also trigger the parent surface's activation. Example:
 * ```tsx
 * <SemanticSurface href={href} onClick={openListing}>
 *   <button onClick={(e) => { e.stopPropagation(); addToCart() }}>Add</button>
 * </SemanticSurface>
 * ```
 * Native `<button>`/`<a>` already give keyboard activation (Enter/Space); the
 * helper does not synthesize `onKeyDown` for them.
 */
export interface SemanticSurfaceProps extends SemanticDestinationProps {
  /** Called when the surface is activated (click / native keyboard). */
  onClick?: React.MouseEventHandler<HTMLElement>
  /** Noninteractive element to emit when neither href nor onClick is set. @default 'article' */
  noninteractiveComponent?: 'article' | 'li'
  /** Styling passed straight through to the underlying element. */
  sx?: BoxProps['sx']
  /** Accessible label for the surface when it is interactive. */
  'aria-label'?: string
  /** Surface content. */
  children?: React.ReactNode
}

/**
 * Renders the primary surface as an anchor, a button, or a noninteractive
 * element based on the supplied destination/callback props. Props are passed
 * explicitly (never spread onto the DOM) to satisfy Airbnb
 * `react/jsx-props-no-spreading`.
 */
export function SemanticSurface({
  href,
  linkComponent: LinkComponent,
  onClick,
  noninteractiveComponent = 'article',
  sx,
  'aria-label': ariaLabel,
  children,
}: SemanticSurfaceProps) {
  if (href) {
    if (LinkComponent) {
      return (
        <LinkComponent href={href}>
          <Box component="span" onClick={onClick} sx={sx} aria-label={ariaLabel}>
            {children}
          </Box>
        </LinkComponent>
      )
    }
    return (
      <Box component="a" href={href} onClick={onClick} sx={sx} aria-label={ariaLabel}>
        {children}
      </Box>
    )
  }

  if (onClick) {
    return (
      <Box component="button" type="button" onClick={onClick} sx={sx} aria-label={ariaLabel}>
        {children}
      </Box>
    )
  }

  return (
    <Box component={noninteractiveComponent} sx={sx}>
      {children}
    </Box>
  )
}

export default SemanticSurface
