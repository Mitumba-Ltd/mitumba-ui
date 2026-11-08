// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import type { ReactElement } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaFormatProvider } from '../../../format'
import { PriceTag } from './PriceTag'

function renderInTheme(ui: ReactElement) {
  return render(<MitumbaThemeProvider>{ui}</MitumbaThemeProvider>)
}

afterEach(() => {
  cleanup()
})

describe('PriceTag', () => {
  it('formats price with KES', () => {
    renderInTheme(<PriceTag priceKes={2500} size="medium" color="default" />)
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('shows zero price', () => {
    renderInTheme(<PriceTag priceKes={0} />)
    expect(screen.getByText('KES 0')).toBeInTheDocument()
  })

  it('shows large price with commas', () => {
    renderInTheme(<PriceTag priceKes={1250000} />)
    expect(screen.getByText('KES 1,250,000')).toBeInTheDocument()
  })

  it('applies strikethrough class when prop is set', () => {
    const { container } = renderInTheme(<PriceTag priceKes={2500} strikethrough />)
    expect(container.querySelector('span')).toHaveStyle('text-decoration: line-through')
  })

  it('accepts the neutral price prop', () => {
    renderInTheme(<PriceTag price={2500} />)
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('prefers price when both names are set', () => {
    renderInTheme(<PriceTag price={3000} priceKes={2500} />)
    expect(screen.getByText('KES 3,000')).toBeInTheDocument()
  })

  it('formats in the provider currency and names it accessibly', () => {
    renderInTheme(
      <MitumbaFormatProvider money={{ currencyCode: 'UGX', locale: 'en-UG' }}>
        <PriceTag price={5000} />
      </MitumbaFormatProvider>,
    )
    expect(screen.getByText('UGX 5,000')).toBeInTheDocument()
    expect(screen.getByLabelText('Price: UGX 5,000')).toBeInTheDocument()
    expect(screen.queryByText(/KES/)).not.toBeInTheDocument()
  })
})
