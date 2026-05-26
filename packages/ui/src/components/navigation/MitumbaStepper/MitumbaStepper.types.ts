import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaStepOption {
  /** Primary label for the step. */
  label: string
  /** Optional secondary description. */
  subtitle?: string
}

export interface MitumbaStepperProps {
  /** The current active step (0-indexed). */
  activeStep: number
  /** Array of step configurations. */
  steps: MitumbaStepOption[]
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
