// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import type { PriceTagProps } from './PriceTag.types'
import { PriceTag } from './PriceTag'

function renderTag(overrides: PriceTagProps = { priceKes: 2500, size: 'medium', color: 'default' }) {
  return render(
    <MitumbaThemeProvider>
      <PriceTag priceKes={overrides.priceKes} size={overrides.size} color={overrides.color} strikethrough={overrides.strikethrough} />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('PriceTag', () => {
  it('formats price with KES', () => {
    renderTag()
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('shows zero price', () => {
    renderTag({ priceKes: 0 })
    expect(screen.getByText('KES 0')).toBeInTheDocument()
  })

  it('shows large price with commas', () => {
    renderTag({ priceKes: 1250000 })
    expect(screen.getByText('KES 1,250,000')).toBeInTheDocument()
  })

  it('applies strikethrough class when prop is set', () => {
    const { container } = renderTag({ strikethrough: true })
    expect(container.querySelector('span')).toHaveStyle('text-decoration: line-through')
  })
})
