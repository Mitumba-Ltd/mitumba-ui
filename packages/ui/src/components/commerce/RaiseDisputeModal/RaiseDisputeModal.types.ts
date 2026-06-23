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
}
