// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { DEFAULT_FORMAT } from './defaults'
import { MitumbaFormatProvider, useMitumbaFormat } from './provider'

function Probe() {
  const { money, phone, region } = useMitumbaFormat()
  return (
    <span data-testid="probe">
      {money.currencyCode}|{money.locale}|{phone.callingCode}|{region.label}|{region.options.length}
    </span>
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaFormatProvider', () => {
  it('falls back to the documented defaults with no provider', () => {
    render(<Probe />)
    expect(screen.getByTestId('probe')).toHaveTextContent(
      `KES|en-KE|+254|County|${DEFAULT_FORMAT.region.options.length}`,
    )
  })

  it('applies every configured field', () => {
    render(
      <MitumbaFormatProvider
        money={{ currencyCode: 'UGX', locale: 'en-UG' }}
        phone={{ callingCode: '+256', nationalLength: [9], example: '+256712345678' }}
        region={{ label: 'District', options: ['Kampala', 'Wakiso'] }}
      >
        <Probe />
      </MitumbaFormatProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('UGX|en-UG|+256|District|2')
  })

  it('keeps the enclosing value for any field it does not set', () => {
    render(
      <MitumbaFormatProvider money={{ currencyCode: 'UGX', locale: 'en-UG' }} region={{ label: 'District', options: ['Kampala'] }}>
        <MitumbaFormatProvider phone={{ callingCode: '+256', nationalLength: [9], example: '+256712345678' }}>
          <Probe />
        </MitumbaFormatProvider>
      </MitumbaFormatProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('UGX|en-UG|+256|District|1')
  })
})
