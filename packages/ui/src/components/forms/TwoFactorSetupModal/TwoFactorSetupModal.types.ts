import type { HeadingLevel } from '../../../types/semantic';

export interface TwoFactorSetupModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the modal should close. */
  onClose: () => void;
  /** otpauth:// URI encoded into the QR code. */
  otpauthUri: string;
  /** The shared TOTP secret shown for manual entry (monospace, documented exception). */
  secret: string;
  /** Called with the 6-digit code the user enters to verify setup. */
  onVerify: (code: string) => Promise<void>;
  /** Recovery/backup codes shown on the final step (monospace, documented exception). */
  backupCodes?: string[];
  /** Whether verification is in progress. */
  verifying?: boolean;
  /** Error message shown under the verification input. */
  error?: string;
  /**
   * Emits h1-h6 for the modal title when provided; omitting it preserves the
   * current non-heading title element. Visual size/weight are unaffected.
   */
  titleLevel?: HeadingLevel;
}
