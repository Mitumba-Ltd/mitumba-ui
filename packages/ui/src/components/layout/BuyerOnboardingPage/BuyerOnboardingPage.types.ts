import type { HeadingLevel } from '../../../types/semantic';

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
  /**
   * Emits an h1-h6 element for the page/welcome title when provided. When
   * omitted the title keeps its current `<h4>` element and unchanged visual
   * size.
   */
  titleLevel?: HeadingLevel;
  /**
   * Emits an h1-h6 element for the form section title ("Complete your profile"
   * / mobile welcome heading) when provided. When omitted it keeps its current
   * heading element and unchanged visual size.
   */
  sectionTitleLevel?: HeadingLevel;
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
