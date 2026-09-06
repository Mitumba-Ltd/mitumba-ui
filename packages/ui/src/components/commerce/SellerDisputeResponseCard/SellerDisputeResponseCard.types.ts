import type { HeadingLevel } from '../../../types/semantic'

export interface SellerDisputeResponseCardProps {
  /** The dispute reason filed by the buyer */
  reason: string
  /** The buyer's description of the issue */
  description: string
  /** Called when seller accepts and agrees to refund */
  onAccept: () => Promise<void>
  /** Called when seller contests with a message and evidence files */
  onContest: (message: string, files: File[]) => Promise<void>
  /** Whether an action is in progress */
  submitting?: boolean
  /**
   * Emits h1-h6 for the "Dispute Filed" card title when provided; omitting it
   * preserves the current non-heading title element. Visual size/weight are
   * unaffected.
   */
  titleLevel?: HeadingLevel
}
