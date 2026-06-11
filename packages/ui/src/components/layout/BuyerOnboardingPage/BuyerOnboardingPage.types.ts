export interface BuyerOnboardingData {
  /** Buyer's display name */
  display_name: string;
  /** Selected county */
  county: string;
  /** Phone number in +254 format */
  phone: string;
}

export interface BuyerOnboardingPageProps {
  /** Called when the form is submitted with all fields */
  onComplete: (data: BuyerOnboardingData) => void;
  /** Whether submission is in progress */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Hero photo URL for the side panel gradient overlay (desktop) */
  heroImageUrl?: string;
  /** List of selectable counties — defaults to all 47 Kenya counties if not provided */
  counties?: string[];
  /** Pre-filled data for resuming */
  initialData?: Partial<BuyerOnboardingData>;
}
