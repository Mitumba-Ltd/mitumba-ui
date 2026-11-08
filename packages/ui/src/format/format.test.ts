import { describe, expect, it } from 'vitest'
import { DEFAULT_MONEY_FORMAT, DEFAULT_PHONE_FORMAT, DEFAULT_REGION_FORMAT } from './defaults'
import { formatAmount, formatMoney, groupNationalDigits, maxNationalDigits, nationalPlaceholder } from './format'
import type { PhoneFormat } from './types'

const UGX = { currencyCode: 'UGX', locale: 'en-UG' }
const NIGERIA_PHONE: PhoneFormat = { callingCode: '+234', nationalLength: [10], example: '+2348031234567' }

describe('formatMoney', () => {
  it('matches the previous KES output by default', () => {
    expect(formatMoney(2500, DEFAULT_MONEY_FORMAT)).toBe('KES 2,500')
    expect(formatMoney(0, DEFAULT_MONEY_FORMAT)).toBe('KES 0')
    expect(formatMoney(1250000, DEFAULT_MONEY_FORMAT)).toBe('KES 1,250,000')
  })

  it('uses the configured currency', () => {
    expect(formatMoney(5000, UGX)).toBe('UGX 5,000')
  })

  it('rounds to whole units and keeps the sign in front', () => {
    expect(formatMoney(1849.6, DEFAULT_MONEY_FORMAT)).toBe('KES 1,850')
    expect(formatMoney(-1850, DEFAULT_MONEY_FORMAT)).toBe('-KES 1,850')
  })

  it('never renders NaN or Infinity', () => {
    expect(formatMoney(Number.NaN, DEFAULT_MONEY_FORMAT)).toBe('KES —')
    expect(formatMoney(Number.POSITIVE_INFINITY, UGX)).toBe('UGX —')
  })

  it('falls back to comma grouping for a rejected locale', () => {
    expect(formatMoney(1234567, { currencyCode: 'KES', locale: 'not a locale!!' })).toBe('KES 1,234,567')
  })
})

describe('formatAmount', () => {
  it('omits the currency', () => {
    expect(formatAmount(1850, DEFAULT_MONEY_FORMAT)).toBe('1,850')
    expect(formatAmount(-1850, DEFAULT_MONEY_FORMAT)).toBe('-1,850')
    expect(formatAmount(Number.NaN, DEFAULT_MONEY_FORMAT)).toBe('—')
  })
})

describe('phone helpers', () => {
  it('derives the previous placeholder by default', () => {
    expect(nationalPlaceholder(DEFAULT_PHONE_FORMAT)).toBe('7XX XXX XXX')
  })

  it('derives a placeholder for another numbering plan', () => {
    expect(nationalPlaceholder(NIGERIA_PHONE)).toBe('8XX XXX XXXX')
  })

  it('returns no placeholder for an example without national digits', () => {
    expect(nationalPlaceholder({ callingCode: '+254', nationalLength: [9], example: '+254' })).toBe('')
  })

  it('groups national digits for reading, keeping every digit', () => {
    expect(groupNationalDigits('712345678')).toBe('712 345 678')
    expect(groupNationalDigits('8031234567')).toBe('803 123 4567')
    expect(groupNationalDigits('71234')).toBe('712 34')
    expect(groupNationalDigits('7')).toBe('7')
    expect(groupNationalDigits('')).toBe('')
    expect(groupNationalDigits('712-345')).toBe('712 345')
  })

  it('reports the longest accepted national length', () => {
    expect(maxNationalDigits(DEFAULT_PHONE_FORMAT)).toBe(9)
    expect(maxNationalDigits({ ...NIGERIA_PHONE, nationalLength: [8, 10] })).toBe(10)
  })
})

describe('defaults', () => {
  it('keep the built-in region list of 47 counties', () => {
    expect(DEFAULT_REGION_FORMAT.label).toBe('County')
    expect(DEFAULT_REGION_FORMAT.options).toHaveLength(47)
    expect(new Set(DEFAULT_REGION_FORMAT.options).size).toBe(47)
  })
})
