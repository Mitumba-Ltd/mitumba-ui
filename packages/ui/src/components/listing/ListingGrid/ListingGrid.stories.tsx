import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { ListingGrid } from './ListingGrid'
import { ListingCard } from '../ListingCard/ListingCard'

const meta: Meta<typeof ListingGrid> = {
  title: 'Listing/ListingGrid',
  component: ListingGrid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof ListingGrid>

const sampleImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
]

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid>
        <ListingCard
          images={sampleImages}
          title="Nike Airforce 1"
          price={12000}
          brand="Nike"
          size="UK 9"
          badge="Popular"
        />
        <ListingCard
          images={sampleImages}
          title="Vintage Denim"
          price={4500}
          brand="Levis"
          size="M"
        />
        <ListingCard
          images={sampleImages}
          title="Leather Boots"
          price={8500}
          brand="Clarks"
          size="UK 8"
        />
        <ListingCard
          images={sampleImages}
          title="Retro Tee"
          price={1500}
          brand="Thrift"
          size="L"
        />
      </ListingGrid>
    </Box>
  ),
}

export const Loading: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid isLoading>
        {/* Children will be ignored when isLoading is true */}
        <div />
      </ListingGrid>
    </Box>
  ),
}
