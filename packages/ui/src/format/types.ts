/** How amounts are shown. Amounts are integers in whole major units (1850 means 1,850). */
export interface MoneyFormat {
  /** ISO 4217 currency code shown before the amount, e.g. `'KES'`. */
  currencyCode: string
  /** BCP 47 locale used for digit grouping and dates, e.g. `'en-KE'`. */
  locale: string
}

/** How phone numbers are entered, shown and validated. */
export interface PhoneFormat {
  /** Calling code with the plus, e.g. `'+254'`. */
  callingCode: string
  /** Allowed digit counts after the calling code, without a trunk `0`, e.g. `[9]`. */
  nationalLength: number[]
  /** A valid E.164 example, used to derive the placeholder, e.g. `'+254712345678'`. */
  example: string
}

/** The first-level administrative regions a person picks from. */
export interface RegionFormat {
  /** Singular label for the field, e.g. `'County'`. */
  label: string
  /** The selectable regions, in display order. */
  options: string[]
}

/** Everything the formatting context supplies. */
export interface MitumbaFormat {
  money: MoneyFormat
  phone: PhoneFormat
  region: RegionFormat
}
