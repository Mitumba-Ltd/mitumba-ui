export type ConditionGrade = 'A' | 'B' | 'C'
export type ConditionString = 'new' | 'like_new' | 'good' | 'fair'

export interface ConditionBadgeProps {
  /** Condition grade (A/B/C) or string condition (new/like_new/good/fair). */
  grade: ConditionGrade | ConditionString
  /** Whether to show the text label along with the grade letter. @default false */
  showLabel?: boolean
}
