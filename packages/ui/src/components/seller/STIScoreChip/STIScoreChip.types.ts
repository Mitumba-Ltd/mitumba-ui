export interface STIScoreChipProps {
  /** STI score value from 0 to 100. */
  score: number
  /** When true, only the score number is shown. When false, label + score are shown. Defaults to false. */
  compact?: boolean
  /** Whether to show the text label next to the score. Defaults to true when not compact. */
  showLabel?: boolean
}
