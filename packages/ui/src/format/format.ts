import type { MoneyFormat, PhoneFormat } from './types'

const GAP = ' '

/** Digit grouping for the locale, falling back to comma grouping if the locale is rejected. */
function group(value: number, locale: string): string {
  const rounded = Math.round(Math.abs(value))
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(rounded)
  } catch {
    return String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

/**
 * The amount alone, grouped for the locale: `1850` reads `1,850`. A non-finite amount reads `—`
 * rather than `NaN` or `Infinity`.
 */
export function formatAmount(amount: number, money: MoneyFormat): string {
  if (!Number.isFinite(amount)) return '—'
  return `${amount < 0 ? '-' : ''}${group(amount, money.locale)}`
}

/**
 * The currency code, a space, then the grouped amount: `1850` reads `KES 1,850`. The space is
 * deliberate (`KES1,850` misreads). A non-finite amount reads `KES —`.
 */
export function formatMoney(amount: number, money: MoneyFormat): string {
  if (!Number.isFinite(amount)) return `${money.currencyCode}${GAP}—`
  return `${amount < 0 ? '-' : ''}${money.currencyCode}${GAP}${group(amount, money.locale)}`
}

/** The longest number of national digits the phone format accepts. */
export function maxNationalDigits(phone: PhoneFormat): number {
  return Math.max(...phone.nationalLength)
}

/** Groups of three for reading; a lone trailing character joins the group before it. */
function groupInThrees(value: string): string {
  const groups = value.match(/.{1,3}/g) ?? []
  if (groups.length > 1 && groups[groups.length - 1]!.length === 1) {
    const last = groups.pop()!
    groups[groups.length - 1] += last
  }
  return groups.join(GAP)
}

/**
 * Split national digits into reading groups. `712345678` reads `712 345 678`, `8031234567` reads
 * `803 123 4567`. Non-digits are dropped.
 */
export function groupNationalDigits(digits: string): string {
  return groupInThrees(digits.replace(/\D/g, ''))
}

/**
 * A placeholder derived from the example number: its first national digit, the rest masked, in
 * reading groups. `+254712345678` gives `7XX XXX XXX`.
 */
export function nationalPlaceholder(phone: PhoneFormat): string {
  const callingDigits = phone.callingCode.replace(/\D/g, '')
  const national = phone.example.replace(/\D/g, '').slice(callingDigits.length)
  if (!national) return ''
  return groupInThrees(national[0] + 'X'.repeat(national.length - 1))
}
