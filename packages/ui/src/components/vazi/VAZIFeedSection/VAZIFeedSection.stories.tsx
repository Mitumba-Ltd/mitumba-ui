import type { Meta, StoryObj } from '@storybook/react'
import { VAZIFeedSection } from './VAZIFeedSection'
import type { VAZIOutfitCardProps } from '../VAZIOutfitCard/VAZIOutfitCard.types'

const meta: Meta<typeof VAZIFeedSection> = {
  title: 'VAZI/VAZIFeedSection',
  component: VAZIFeedSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VAZIFeedSection>

const mockOutfits: VAZIOutfitCardProps[] = [
  {
    outfitName: 'Weekend Chill',
    items: [
      { listingId: '1', imageUrl: 'https://picsum.photos/300/400?random=1', garmentType: 'top', priceKes: 1500, sellerName: 'Ama Fashion' },
      { listingId: '2', imageUrl: 'https://picsum.photos/300/400?random=2', garmentType: 'bottom', priceKes: 2000, sellerName: 'Kampala Threads' },
      { listingId: '3', imageUrl: 'https://picsum.photos/300/400?random=3', garmentType: 'shoes', priceKes: 3500, sellerName: 'Sneaker Hub' },
    ],
    totalPriceKes: 7000,
    sellersCount: 3,
  },
  {
    outfitName: 'City Slicker',
    items: [
      { listingId: '4', imageUrl: 'https://picsum.photos/300/400?random=4', garmentType: 'top', priceKes: 2500, sellerName: 'Threadbare' },
      { listingId: '5', imageUrl: 'https://picsum.photos/300/400?random=5', garmentType: 'bottom', priceKes: 1800, sellerName: 'Vintage Vibes' },
      { listingId: '6', imageUrl: 'https://picsum.photos/300/400?random=6', garmentType: 'accessory', priceKes: 800, sellerName: 'Beads & Beyond' },
    ],
    totalPriceKes: 5100,
    sellersCount: 3,
  },
  {
    outfitName: 'Date Night',
    items: [
      { listingId: '7', imageUrl: 'https://picsum.photos/300/400?random=7', garmentType: 'top', priceKes: 3200, sellerName: 'Luxe Looks' },
      { listingId: '8', imageUrl: 'https://picsum.photos/300/400?random=8', garmentType: 'bottom', priceKes: 2800, sellerName: 'Luxe Looks' },
      { listingId: '9', imageUrl: 'https://picsum.photos/300/400?random=9', garmentType: 'shoes', priceKes: 4500, sellerName: 'Sneaker Hub' },
    ],
    totalPriceKes: 10500,
    sellersCount: 2,
  },
]

export const Default: Story = {
  args: {
    outfits: mockOutfits,
    loading: false,
    onSeeAll: () => {},
  },
}

export const Loading: Story = {
  args: {
    outfits: [],
    loading: true,
    onSeeAll: () => {},
  },
}

export const WithoutSeeAll: Story = {
  args: {
    outfits: mockOutfits.slice(0, 2),
    loading: false,
    onSeeAll: undefined,
  },
}

export const Mobile: Story = {
  args: {
    outfits: mockOutfits,
    loading: false,
    onSeeAll: () => {},
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
