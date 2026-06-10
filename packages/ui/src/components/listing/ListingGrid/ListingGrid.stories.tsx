import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { ListingGrid } from './ListingGrid'
import { ListingCard } from '../ListingCard/ListingCard'

const meta: Meta<typeof ListingGrid> = {
  title: 'Listing/ListingGrid',
  component: ListingGrid,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ListingGrid>

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid>
        <ListingCard id="1" media={['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80']} title="Nike Airforce 1" price={12000} storeName="NairobiKicks" condition="like_new" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="2" media={['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80']} title="Vintage Denim Jacket" price={4500} storeName="ThriftHub" condition="good" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="3" media={['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=80']} title="Leather Boots" price={8500} storeName="KisumuStyles" condition="like_new" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="4" media={['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80']} title="Retro Band Tee" price={1500} storeName="VintageKE" condition="fair" onSaveToggle={() => {}} onAddToCart={() => {}} />
      </ListingGrid>
    </Box>
  ),
}

export const Loading: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid isLoading>
        <div />
      </ListingGrid>
    </Box>
  ),
}
