// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ListingCard } from './ListingCard'

afterEach(() => {
  cleanup()
})

describe('ListingCard', () => {
  it('renders title and price', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Nike Air Max')).toBeInTheDocument()
    expect(screen.getByText('KES 4,500')).toBeInTheDocument()
  })

  it('shows VAZI Featured badge when vaziEligible is true', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText(/VAZI Featured/i)).toBeInTheDocument()
  })

  it('hides VAZI badge when vaziEligible is false', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.queryByText(/VAZI Featured/i)).not.toBeInTheDocument()
  })

  it('calls onTap when clicked', () => {
    const onTap = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={onTap}
        />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('formats price with comma separator', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={1250000}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('KES 1,250,000')).toBeInTheDocument()
  })

  it('shows STI chip for seller', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('shows seller name and city', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="A"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Alice Mwangi')).toBeInTheDocument()
    expect(screen.getByText('Kisumu')).toBeInTheDocument()
  })

  it('shows condition badge', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCard
          listingId="123"
          imageUrl="https://example.com/item.jpg"
          title="Nike Air Max"
          priceKes={4500}
          sellerName="Alice Mwangi"
          sellerSti={92}
          city="Kisumu"
          conditionGrade="B"
          isVaziEligible={false}
          onTap={undefined}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
