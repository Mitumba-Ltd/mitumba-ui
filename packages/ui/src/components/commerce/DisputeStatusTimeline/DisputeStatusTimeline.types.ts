import type { HeadingLevel } from '../../../types/semantic'

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
  /**
   * Emits h1-h6 for the timeline's section title when provided; omitting it
   * preserves the current non-heading status chip markup. Visual styling of the
   * chip is unaffected.
   */
  sectionTitleLevel?: HeadingLevel
  /**
   * Zero-based index of the event to mark as the programmatic current step via
   * `aria-current="step"`. Defaults to the most recent (last) event. Pass a
   * value out of range to mark no event as current.
   */
  currentEventIndex?: number
}
