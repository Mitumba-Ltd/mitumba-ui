// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { SellerCard } from './SellerCard'

const sampleProps = {
  sellerId: '1',
  name: "Jane's Closet",
  avatarUrl: '',
  city: 'Nairobi',
  stiScore: 92,
  totalListings: 34,
}

function renderSellerCard(customProps = {}) {
  const merged = { ...sampleProps, ...customProps }
  return render(
    <MitumbaThemeProvider>
      <SellerCard 
        sellerId={merged.sellerId}
        name={merged.name}
        avatarUrl={merged.avatarUrl}
        city={merged.city}
        stiScore={merged.stiScore}
        totalListings={merged.totalListings}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...customProps}
      />
    </MitumbaThemeProvider>,
  )
}

describe('SellerCard', () => {
  afterEach(cleanup)

  it('renders seller name and info', () => {
    renderSellerCard()
    expect(screen.getByText("Jane's Closet")).toBeInTheDocument()
  })

  it('shows STI score correctly', () => {
    renderSellerCard()
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('shows VAZI badge when featured', () => {
    renderSellerCard({ isVaziFeatured: true })
    expect(screen.getByText(/VAZI Curation/i)).toBeInTheDocument()
  })
})
