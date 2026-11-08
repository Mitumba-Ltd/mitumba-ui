import type { HeadingLevel } from '../../../types/semantic';
import type { PhoneFormat, RegionFormat } from '../../../format';

export interface BuyerOnboardingData {
  /** Buyer's display name */
  display_name: string;
  /** Selected region (e.g. county) */
  county: string;
  /** Phone number as entered (national digits) */
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
   * Emits an h1-h6 element for the form section title when provided. On mobile,
   * the section title remains visually hidden when `titleLevel` supplies the
   * visible welcome heading. When omitted, existing markup and sizing remain.
   */
  sectionTitleLevel?: HeadingLevel;
  /** Whether submission is in progress */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Hero photo URL for the side panel gradient overlay (desktop) */
  heroImageUrl?: string;
  /**
   * Selectable regions. Overrides `region.options`; kept for existing callers. Defaults to the
   * nearest `MitumbaFormatProvider` region list.
   */
  counties?: string[];
  /**
   * Region label and options. Defaults to the nearest `MitumbaFormatProvider` region format.
   */
  region?: RegionFormat;
  /**
   * Numbering plan for the phone field (prefix, placeholder, minimum length). Defaults to the
   * nearest `MitumbaFormatProvider` phone format.
   */
  phone?: PhoneFormat;
  /** Pre-filled data for resuming */
  initialData?: Partial<BuyerOnboardingData>;
}
