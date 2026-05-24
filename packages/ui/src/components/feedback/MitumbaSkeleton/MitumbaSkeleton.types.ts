/**
 * Props for the MitumbaSkeleton component.
 */
export interface MitumbaSkeletonProps {
  /** Width of the skeleton block. */
  width: number | string
  /** Height of the skeleton block. */
  height: number
  /** Border radius override. */
  borderRadius?: number
  /** Visual variant of the skeleton. */
  variant?: 'rectangular' | 'rounded' | 'circular'
}
