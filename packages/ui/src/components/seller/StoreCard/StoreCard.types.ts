import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel, SemanticDestinationProps } from '../../../types/semantic'

export interface StoreCardProps extends SemanticDestinationProps {
  /** Store display name */
  name: string
  /** Store avatar/logo URL */
  avatarUrl?: string
  /** Subtitle line (e.g. "12 listings · Fashion") */
  subtitle?: string
  /** Called when card is clicked */
  onClick?: () => void
  /** Optional sx override */
  sx?: SxProps<Theme>
  /**
   * Emits an h1-h6 element for the store name when provided. When omitted the
   * name keeps its current non-heading paragraph element and unchanged visual
   * size/weight/truncation.
   */
  titleLevel?: HeadingLevel
}
