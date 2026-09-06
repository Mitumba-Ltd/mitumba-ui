import type { HeadingLevel } from '../../../types/semantic'

export interface DestructiveConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Dialog title (e.g. "Delete this store") */
  title: string
  /** Description of what will happen — irreversible warning */
  description: string
  /** Blocker reasons — when non-empty, confirm is disabled and these are listed */
  blockers?: string[]
  /** Require user to type this exact phrase to enable confirm (e.g. "DELETE" or store name) */
  confirmPhrase?: string
  /** Show a 6-digit TOTP field; the value is passed to onConfirm */
  requireTotp?: boolean
  /** Called when user confirms. Receives TOTP code if requireTotp is set. */
  onConfirm: (input: { code?: string }) => Promise<void>
  /** Whether submission is in progress */
  submitting?: boolean
  /** Confirm button label. @default "Delete" */
  confirmLabel?: string
  /**
   * Emits h1-h6 for the dialog title (via MitumbaModal) when provided; omitting
   * it preserves the current styled, non-heading title element. Visual size and
   * weight are unaffected.
   */
  titleLevel?: HeadingLevel
}
