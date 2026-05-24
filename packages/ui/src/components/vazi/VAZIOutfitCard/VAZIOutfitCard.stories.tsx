import type { Meta, StoryObj } from '@storybook/react'
import { VAZIOutfitCard } from './VAZIOutfitCard'

const meta: Meta<typeof VAZIOutfitCard> = {
  title: 'VAZI/VAZIOutfitCard',
  component: VAZIOutfitCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof VAZIOutfitCard>

const defaultItems = [
  {
    listingId: '1',
    imageUrl: 'https://picsum.photos/300/400?random=1',
    garmentType: 'top' as const,
    priceKes: 1500,
    sellerName: 'Ama Fashion',
  },
  {
    listingId: '2',
    imageUrl: 'https://picsum.photos/300/400?random=2',
    garmentType: 'bottom' as const,
    priceKes: 2000,
    sellerName: 'Kampala Threads',
  },
  {
    listingId: '3',
    imageUrl: 'https://picsum.photos/300/400?random=3',
    garmentType: 'shoes' as const,
    priceKes: 3500,
    sellerName: 'Sneaker Hub',
  },
]

export const Default: Story = {
  args: {
    outfitName: 'Weekend Chill',
    items: defaultItems,
    totalPriceKes: 7000,
    sellersCount: 3,
    isMultiCity: false,
    onTap: () => {},
    onBuyAll: () => {},
  },
}

export const MultiCity: Story = {
  args: {
    outfitName: 'City Slicker',
    items: defaultItems.map((item, i) => ({
      ...item,
      listingId: `mc-${i + 1}`,
    })),
    totalPriceKes: 12500,
    sellersCount: 4,
    isMultiCity: true,
    onTap: () => {},
    onBuyAll: () => {},
  },
}

export const SingleSeller: Story = {
  args: {
    outfitName: 'One Stop Shop',
    items: [
      {
        listingId: 's1',
        imageUrl: 'https://picsum.photos/300/400?random=4',
        garmentType: 'top' as const,
        priceKes: 2500,
        sellerName: 'Threadbare Vintage',
      },
      {
        listingId: 's2',
        imageUrl: 'https://picsum.photos/300/400?random=5',
        garmentType: 'bottom' as const,
        priceKes: 1800,
        sellerName: 'Threadbare Vintage',
      },
    ],
    totalPriceKes: 4300,
    sellersCount: 1,
    isMultiCity: false,
    onTap: () => {},
    onBuyAll: () => {},
  },
}

export const FourItems: Story = {
  args: {
    outfitName: 'Full Look',
    items: [
      ...defaultItems.slice(0, 2),
      {
        listingId: '4',
        imageUrl: 'https://picsum.photos/300/400?random=6',
        garmentType: 'shoes' as const,
        priceKes: 4500,
        sellerName: 'Sneaker Hub',
      },
      {
        listingId: '5',
        imageUrl: 'https://picsum.photos/300/400?random=7',
        garmentType: 'accessory' as const,
        priceKes: 800,
        sellerName: 'Beads & Beyond',
      },
    ],
    totalPriceKes: 8800,
    sellersCount: 3,
    isMultiCity: false,
    onTap: () => {},
    onBuyAll: () => {},
  },
}

export const Mobile: Story = {
  args: {
    outfitName: 'Weekend Chill',
    items: defaultItems,
    totalPriceKes: 7000,
    sellersCount: 3,
    isMultiCity: false,
    onTap: () => {},
    onBuyAll: () => {},
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
