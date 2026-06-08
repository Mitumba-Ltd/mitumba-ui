import React from 'react'
import type { SxProps, Theme } from '@mui/material'

export interface AuthSubmitButtonProps {
  /** Button label text */
  label: string
  /** Whether a request is in progress — disables the button */
  loading?: boolean
  /** Whether the button is disabled */
  disabled?: boolean
  /** Expand to full container width */
  fullWidth?: boolean
  /** Called on click (in addition to native form submit) */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** MUI sx overrides */
  sx?: SxProps<Theme>
}
