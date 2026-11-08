import type { MitumbaFormat, MoneyFormat, PhoneFormat, RegionFormat } from './types'

// The documented defaults. With no MitumbaFormatProvider and no per-instance override, every
// component renders exactly as it did before formatting became configurable. These are the only
// place in the package that names a currency, a calling code or a region list.

export const DEFAULT_MONEY_FORMAT: MoneyFormat = {
  currencyCode: 'KES',
  locale: 'en-KE',
}

export const DEFAULT_PHONE_FORMAT: PhoneFormat = {
  callingCode: '+254',
  nationalLength: [9],
  example: '+254712345678',
}

export const DEFAULT_REGION_FORMAT: RegionFormat = {
  label: 'County',
  options: [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
    'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
    'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', "Murang'a",
    'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
    'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia',
    'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot',
  ],
}

export const DEFAULT_FORMAT: MitumbaFormat = {
  money: DEFAULT_MONEY_FORMAT,
  phone: DEFAULT_PHONE_FORMAT,
  region: DEFAULT_REGION_FORMAT,
}
