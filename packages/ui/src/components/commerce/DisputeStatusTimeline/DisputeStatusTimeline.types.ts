export type DisputeStatus = 'open' | 'seller_responded' | 'under_review' | 'resolved_refund' | 'resolved_release' | 'resolved_partial' | 'withdrawn'

export interface DisputeEvent {
  /** Role of the actor who performed this action */
  actor_role: 'buyer' | 'seller' | 'admin' | 'system'
  /** Description of the action taken */
  action: string
  /** New status after this event, if changed */
  new_status: string | null
  /** Optional note or comment */
  note: string | null
  /** ISO timestamp of the event */
  created_at: string
}

export interface DisputeStatusTimelineProps {
  /** Current dispute status */
  status: DisputeStatus
  /** Array of dispute events */
  events: DisputeEvent[]
}
