import type React from 'react'

/**
 * Valid HTML heading levels (h1-h6).
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Opt-in semantic heading support shared by title-owning components.
 */
export interface SemanticTitleProps {
  /** Emits h1-h6 when provided; omission preserves existing markup. */
  titleLevel?: HeadingLevel
}

/**
 * Opt-in semantic destination support for surfaces that can act as a link.
 */
export interface SemanticDestinationProps {
  /** When supplied, render the primary surface as a link to this destination. */
  href?: string
  /** Optional host-router renderer; it must ultimately emit an anchor. */
  linkComponent?: React.ElementType<{ href: string; children?: React.ReactNode }>
}
