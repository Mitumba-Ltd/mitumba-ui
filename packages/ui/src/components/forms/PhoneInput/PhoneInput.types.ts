/**
 * Props for the PhoneInput component.
 */
export interface PhoneInputProps {
  /** The current phone number value (without prefix). */
  value: string
  /** Called when the phone number changes. */
  onChange: (value: string) => void
  /** Optional error message to display below the input. */
  error?: string
  /** Whether the input is disabled. */
  disabled?: boolean
}
