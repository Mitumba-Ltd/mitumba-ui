/**
 * Props for the OTPInput component.
 */
export interface OTPInputProps {
  /** The current OTP value (6 digits). */
  value: string
  /** Called when the OTP value changes. */
  onChange: (value: string) => void
  /** Called when all 6 digits are entered. */
  onComplete: (otp: string) => void
  /** Whether the input has an error (triggers shake animation). */
  error?: boolean
  /** Whether the input is in a loading state. */
  loading?: boolean
}
