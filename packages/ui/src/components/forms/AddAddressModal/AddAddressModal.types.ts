import type { HeadingLevel } from '../../../types/semantic'
import type { PhoneFormat, RegionFormat } from '../../../format'

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
  /** First-level region (e.g. county), one of the region options shown in the form. */
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
  /**
   * Region label and options for the region field. Defaults to the nearest
   * `MitumbaFormatProvider` region format (County and the built-in list when none is set).
   */
  region?: RegionFormat
  /**
   * Numbering plan used to validate the phone field. Defaults to the nearest
   * `MitumbaFormatProvider` phone format (9 national digits when none is set).
   */
  phone?: PhoneFormat
}
