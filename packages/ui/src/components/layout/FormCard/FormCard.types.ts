import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface FormCardProps {
  /** Optional icon displayed before the title */
  icon?: ReactNode
  /** Form title */
  title: string
  /** Optional subtitle below the title */
  subtitle?: string
  /** Form content (fields, buttons, etc.) */
  children: ReactNode
  /** Error message shown above the form */
  error?: string
  /** Optional sx override */
  sx?: SxProps<Theme>
}
