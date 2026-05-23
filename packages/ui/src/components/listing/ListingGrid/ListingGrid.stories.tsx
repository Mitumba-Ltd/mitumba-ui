import type { Meta, StoryObj } from '@storybook/react'
import { ListingCard } from '../ListingCard'
import { ListingGrid } from './ListingGrid'

const meta: Meta<typeof ListingGrid> = {
  title: 'Listing/ListingGrid',
  component: ListingGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListingGrid>

export const Default: Story = {
  render: () => (
    <ListingGrid>
      <ListingCard
        listingId="1"
        imageUrl="https://images.unsplash.com/photo-1520256862855-398b796c8195?auto=format&fit=crop&w=400&q=80"
        title="Vintage Leather Jacket"
        priceKes={3500}
        sellerName="Wanjiku T."
        sellerSti={94}
        city="Nairobi"
        conditionGrade="A"
        isVaziEligible
      />
      <ListingCard
        listingId="2"
        imageUrl="https://images.unsplash.com/photo-1542291026-7bbc19228738?auto=format&fit=crop&w=400&q=80"
        title="Running Sneakers"
        priceKes={2800}
        sellerName="Omondi K."
        sellerSti={78}
        city="Kisumu"
        conditionGrade="B"
      />
      <ListingCard
        listingId="3"
        imageUrl="https://images.unsplash.com/photo-1556905055-8f2fad25b37e?auto=format&fit=crop&w=400&q=80"
        title="Denim Jacket"
        priceKes={1500}
        sellerName="Achieng M."
        sellerSti={65}
        city="Mombasa"
        conditionGrade="C"
      />
      <ListingCard
        listingId="4"
        imageUrl="https://images.unsplash.com/photo-1517836357463-d25e3de9d59c?auto=format&fit=crop&w=400&q=80"
        title="Cotton T-Shirt Bundle"
        priceKes={900}
        sellerName="Mutua J."
        sellerSti={88}
        city="Nakuru"
        conditionGrade="A"
        isVaziEligible
      />
    </ListingGrid>
  ),
}

export const Mobile: Story = {
  render: () => (
    <ListingGrid>
      <ListingCard
        listingId="1"
        imageUrl="https://images.unsplash.com/photo-1520256862855-398b796c8195?auto=format&fit=crop&w=400&q=80"
        title="Vintage Leather Jacket"
        priceKes={3500}
        sellerName="Wanjiku T."
        sellerSti={94}
        city="Nairobi"
        conditionGrade="A"
        isVaziEligible
      />
      <ListingCard
        listingId="2"
        imageUrl="https://images.unsplash.com/photo-1542291026-7bbc19228738?auto=format&fit=crop&w=400&q=80"
        title="Running Sneakers"
        priceKes={2800}
        sellerName="Omondi K."
        sellerSti={78}
        city="Kisumu"
        conditionGrade="B"
      />
    </ListingGrid>
  ),
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
