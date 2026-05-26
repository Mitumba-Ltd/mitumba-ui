import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { ListingCard } from './ListingCard'
import { ListingGrid } from '../ListingGrid/ListingGrid'

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListingCard>

const sampleImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
]

export const PremiumListing: Story = {
  args: {
    images: sampleImages,
    title: 'Nike Airforce1 Premium',
    brand: 'Own the Airforce',
    size: 'UK 9 / US 10',
    price: 11500,
    originalPrice: 15000,
    badge: 'Best Seller',
    brandLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  },
}

export const GridShowcase: Story = {
  render: () => (
    <Box sx={{ width: 1200, p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid>
        <ListingCard 
          images={[sampleImages[0]]} 
          title="Vintage Denim Jacket" 
          price={4500} 
          brand="Levis" 
          size="Medium" 
          badge="New"
        />
        <ListingCard 
          images={[sampleImages[1]]} 
          title="Classic Leather Boots" 
          price={8200} 
          brand="Clarks" 
          size="UK 8" 
          isLiked
        />
        <ListingCard 
          images={[sampleImages[2]]} 
          title="Sporty Mesh Sneakers" 
          price={5500} 
          originalPrice={7000}
          brand="Adidas" 
          size="UK 10" 
        />
        <ListingCard 
          images={[sampleImages[0]]} 
          title="Retro Graphic Tee" 
          price={1200} 
          brand="Thrift" 
          size="Large" 
        />
      </ListingGrid>
    </Box>
  )
}
