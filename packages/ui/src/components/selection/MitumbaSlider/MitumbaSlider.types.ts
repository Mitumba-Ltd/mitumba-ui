import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaSliderProps {
  /** The value of the slider. Can be a number or an array of numbers for range sliders. */
  value: number | number[]
  /** Called when the value changes. */
  onChange: (value: number | number[]) => void
  /** The minimum value. Defaults to 0. */
  min?: number
  /** The maximum value. Defaults to 100. */
  max?: number
  /** The step between values. Defaults to 1. */
  step?: number
  /** Optional label displayed above the slider. */
  label?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Shows a numeric tooltip when hovering/dragging. Defaults to true. */
  showTooltip?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
