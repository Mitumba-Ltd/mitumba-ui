// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ListingCard } from './ListingCard'

const sampleImages = ['https://test.com/image.jpg']

describe('ListingCard', () => {
  afterEach(cleanup)

  it('renders basic product info', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Test Product"
          price={5000}
          brand="Test Brand"
          size="Medium"
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/5,000/)).toBeInTheDocument()
    expect(screen.getByText(/Test Brand/)).toBeInTheDocument()
    expect(screen.getByText(/Medium/)).toBeInTheDocument()
  })

  it('renders badges and logos', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Product"
          price={100}
          badge="Bestseller"
          brandLogoUrl="https://logo.com"
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Bestseller')).toBeInTheDocument()
    expect(screen.getByAltText('brand')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Product"
          price={100}
          onClick={onClick}
        />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByText('Product'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onBuyClick when buy button is clicked', () => {
    const onBuyClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Product"
          price={100}
          onBuyClick={onBuyClick}
        />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: /Buy Now/i }))
    expect(onBuyClick).toHaveBeenCalledTimes(1)
  })

  it('reflects liked state and calls onLikeClick', () => {
    const onLikeClick = vi.fn()
    const { rerender } = render(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Product"
          price={100}
          isLiked={false}
          onLikeClick={onLikeClick}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.queryByTestId('FavoriteIcon')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('FavoriteBorderIcon'))
    expect(onLikeClick).toHaveBeenCalledTimes(1)

    rerender(
      <MitumbaThemeProvider>
        <ListingCard
          images={sampleImages}
          title="Product"
          price={100}
          isLiked
        />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument()
  })
})
