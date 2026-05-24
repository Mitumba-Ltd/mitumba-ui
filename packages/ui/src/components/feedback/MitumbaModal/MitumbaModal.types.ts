import type { ReactNode } from 'react'

/**
 * Props for the MitumbaModal component.
 */
export interface MitumbaModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when the modal should close. */
  onClose: () => void
  /** Modal title. */
  title: string
  /** Modal content. */
  children: ReactNode
  /** Optional footer actions. */
  actions?: ReactNode
  /** Maximum width of the modal. */
  maxWidth?: 'sm' | 'md'
}
