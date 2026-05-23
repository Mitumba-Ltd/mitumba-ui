export interface SectionHeaderProps {
  /** Main title of the section. */
  title: string
  /** Optional subtitle text. */
  subtitle?: string
  /** Label for the action button. */
  actionLabel?: string
  /** Called when the action button is clicked. */
  onAction?: () => void
}
