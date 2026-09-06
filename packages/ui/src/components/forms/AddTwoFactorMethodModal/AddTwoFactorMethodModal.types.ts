import type { TwoFactorMethodType } from '../TwoFactorMethodList/TwoFactorMethodList.types'
import type { HeadingLevel } from '../../../types/semantic'

export interface AddTwoFactorMethodModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Which method types are available to add */
  availableTypes: TwoFactorMethodType[]
  /** Called when user picks a type — app runs type-specific flow */
  onSelectType: (type: TwoFactorMethodType) => void
  /**
   * Emits h1-h6 for the modal title (via MitumbaModal) when provided; omitting
   * it preserves the current styled, non-heading title element. Visual size and
   * weight are unaffected.
   */
  titleLevel?: HeadingLevel
}
