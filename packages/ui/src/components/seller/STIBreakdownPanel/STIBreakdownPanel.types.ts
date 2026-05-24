export interface STIEvent {
  type: 'penalty' | 'positive'
  reason: string
  pointsChange: number
  timestamp: string
}

export interface STIBreakdownPanelProps {
  /** Overall STI score (0–100). */
  score: number
  /** Order fulfillment rate as fraction (0–1). */
  fulfillmentRate: number
  /** Listing accuracy rate as fraction (0–1). */
  accuracyRate: number
  /** Average response time in hours. */
  avgResponseHours: number
  /** Number of days the seller has been active. */
  daysActive: number
  /** Recent STI events affecting score. */
  recentEvents: STIEvent[]
}
