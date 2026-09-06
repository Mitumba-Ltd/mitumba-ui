import type { HeadingLevel } from '../../../types/semantic'

export type DisputeReason = 'not_received' | 'not_as_described' | 'damaged' | 'counterfeit' | 'wrong_item'
export type DesiredResolution = 'refund' | 'replacement' | 'partial_refund'

export interface RaiseDisputeSubmitInput {
  reason: DisputeReason
  description: string
  desired_resolution: DesiredResolution
  evidence_files: File[]
}

export interface RaiseDisputeModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Short order ID displayed in the modal */
  orderShortId: string
  /** Called when form is submitted */
  onSubmit: (input: RaiseDisputeSubmitInput) => Promise<void>
  /** Whether submission is in progress */
  submitting?: boolean
  /**
   * Emits h1-h6 for the modal title (via MitumbaModal) when provided; omitting
   * it preserves the current styled, non-heading title element. Visual size and
   * weight are unaffected.
   */
  titleLevel?: HeadingLevel
  /**
   * Optional error message announced politely-but-assertively via `role="alert"`
   * when submission fails. Omit to render no error region.
   */
  errorMessage?: string
}
