import type { ReactNode } from 'react'

/**
 * Props for the MitumbaModal universal base component.
 */
export interface MitumbaModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when the modal should close. */
  onClose: () => void
  /** Modal title shown in header. */
  title: string
  /** Optional subtitle below title. */
  subtitle?: string
  /** Modal content. */
  children: ReactNode
  /** Footer actions (buttons) — rendered at bottom with proper spacing. */
  actions?: ReactNode
  /** Max width in pixels. @default 500 */
  maxWidth?: number
  /** Whether to show the close X button. @default true */
  showClose?: boolean
  /** Whether clicking backdrop closes the modal. @default true */
  closeOnBackdrop?: boolean
  /** Loading state — disables actions and shows overlay spinner. @default false */
  loading?: boolean
}
