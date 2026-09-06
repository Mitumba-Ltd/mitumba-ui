import type { HeadingLevel } from '../../../types/semantic'

export interface AddressFormData {
  /** Label like "Home", "Office" */
  label: string
  /** Recipient full name */
  fullName: string
  /** Contact phone */
  phone: string
  /** Street/building */
  line1: string
  /** Apartment/suite (optional) */
  line2: string
  /** City or town */
  city: string
  /** Kenya county */
  county: string
  /** Whether this is the default address */
  isDefault: boolean
}

export interface AddAddressModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when the modal should close. */
  onClose: () => void
  /** Called with the form data when user saves. */
  onSave: (data: AddressFormData) => void
  /** Whether save is in progress. @default false */
  saving?: boolean
  /** Error message from save attempt. */
  error?: string
  /** Whether this is the user's first address (defaults checkbox to checked). @default false */
  isFirstAddress?: boolean
  /**
   * Emits h1-h6 for the modal title (via MitumbaModal) when provided; omitting
   * it preserves the current styled, non-heading title element. Visual size and
   * weight are unaffected.
   */
  titleLevel?: HeadingLevel
}
