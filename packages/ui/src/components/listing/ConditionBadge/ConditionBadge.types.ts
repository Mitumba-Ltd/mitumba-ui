export interface ConditionBadgeProps {
  /**
   * Condition grade of the listing item.
   * - A: Like new
   * - B: Good
   * - C: Fair
   */
  grade: 'A' | 'B' | 'C'
  /**
   * Whether to show the text label along with the grade letter.
   * When false, only the grade letter is shown.
   * @default false
   */
  showLabel?: boolean
}
