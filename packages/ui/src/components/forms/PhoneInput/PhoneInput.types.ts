import type { PhoneFormat } from '../../../format'

/**
 * Props for the PhoneInput component.
 */
export interface PhoneInputProps {
  /** The current phone number value (national digits, without the calling code). */
  value: string
  /** Called when the phone number changes, with digits only. */
  onChange: (value: string) => void
  /** Optional error message to display below the input. */
  error?: string
  /** Whether the input is disabled. */
  disabled?: boolean
  /**
   * Numbering plan for this field. Defaults to the nearest `MitumbaFormatProvider` phone format
   * (`+254`, 9 digits when none is set).
   */
  phone?: PhoneFormat
}
