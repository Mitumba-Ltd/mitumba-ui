import type { HeadingLevel } from '../../../types/semantic';

export interface EmailVerificationPageProps {
  /** User's email — displayed as "We sent a code to ..." */
  email: string;
  /**
   * Emits an h1-h6 element for the "Verify your email" title when provided.
   * When omitted the title keeps its current non-heading paragraph element and
   * unchanged visual size/weight.
   */
  titleLevel?: HeadingLevel;
  /** Called when user submits the 6-digit code */
  onVerify: (code: string) => void;
  /** Called when "Resend code" is tapped */
  onResend: () => void;
  /** Whether verification is in progress */
  loading?: boolean;
  /** Error message (e.g. "Invalid code") */
  error?: string;
  /** Success message after resend (e.g. "Code resent!") */
  resendSuccess?: boolean;
  /** Hero image URL for the side panel (desktop) */
  heroImageUrl?: string;
  /** Called when "Wrong email? Go back" is tapped */
  onGoBack?: () => void;
}
