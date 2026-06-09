export interface SellerOnboardingData {
  // Step 2 — Identity
  /** Seller's full legal name */
  fullName: string;
  /** M-Pesa linked phone number */
  phone: string;
  /** National ID or passport number (KYC, not shown publicly) */
  idNumber: string;
  /** Profile photo URL (R2 CDN) */
  profilePhotoUrl: string;
  /** Kenya county (1 of 47) */
  county: string;
  /** More specific town or area */
  town?: string;

  // Step 3 — Business
  /** Individual seller or registered business */
  sellerType: 'individual' | 'business';
  /** Trading/business name (required if sellerType === 'business') */
  businessName?: string;
  /** KRA PIN — optional, boosts STI score */
  kraPin?: string;
  /** Short business description, max 300 chars */
  businessDescription?: string;

  // Step 4 — What you sell
  /** Product categories the seller lists in */
  categories: string[];
  /** Condition grades the seller typically offers */
  conditionGrades: ('A' | 'B' | 'C')[];
  /** How the seller handles delivery */
  deliveryMethod: 'self' | 'mitumba-logistics';
  /** Typical listing price range lower bound (KES) */
  priceRangeMin?: number;
  /** Typical listing price range upper bound (KES) */
  priceRangeMax?: number;

  // Step 5 — Store setup
  /** Public store name shown on all listings */
  storeName: string;
  /** Short store tagline, max 60 chars */
  storeTagline?: string;
  /** Store logo URL (R2 CDN) */
  storeLogoUrl?: string;
  /** Store banner URL (R2 CDN) */
  storeBannerUrl?: string;
}

export interface SellerOnboardingPageProps {
  /**
   * Current active step (0-indexed, 0=welcome … 5=confirmation).
   * Persist this externally so the flow resumes on reload.
   */
  currentStep?: number;

  /** Called whenever the user advances or goes back — persist the returned step */
  onStepChange?: (step: number) => void;

  /** Called when all 5 steps are completed with the collected data */
  onComplete?: (data: SellerOnboardingData) => void;

  /** Whether an async operation (save, upload) is in progress */
  loading?: boolean;

  /** Error message to display inline (e.g. "Phone already registered") */
  error?: string;

  /** Pre-filled data for resuming a partially completed flow */
  initialData?: Partial<SellerOnboardingData>;

  /** Theme variant */
  theme?: 'mitumba-light' | 'mitumba-dark';

  /** Hero photo URL layered under the side panel gradient (desktop) */
  heroImageUrl?: string;

  /**
   * Called when the user selects a profile photo file.
   * Upload it to your CDN and return the public URL.
   * The component shows a loading spinner while the promise is pending.
   */
  onProfilePhotoUpload?: (file: File) => Promise<string>;

  /**
   * Called when the user selects a store logo file.
   * Upload it to your CDN and return the public URL.
   */
  onStoreLogoUpload?: (file: File) => Promise<string>;

  /**
   * Called when the user selects a store banner file.
   * Upload it to your CDN and return the public URL.
   */
  onStoreBannerUpload?: (file: File) => Promise<string>;
}
