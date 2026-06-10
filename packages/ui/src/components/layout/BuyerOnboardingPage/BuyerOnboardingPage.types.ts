export interface BuyerOnboardingData {
  /** Buyer's display name */
  display_name: string;
  /** Selected city ID */
  city: string;
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
  /** List of selectable cities */
  cities: { id: string; name: string }[];
  /** Pre-filled data for resuming */
  initialData?: Partial<BuyerOnboardingData>;
}
