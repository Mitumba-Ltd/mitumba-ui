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

const img = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <ListingGrid>
        <ListingCard id="1" imageUrl={img} title="Nike Airforce 1" price={12000} storeName="NairobiKicks" condition="like_new" />
        <ListingCard id="2" imageUrl={img} title="Vintage Denim Jeans" price={4500} storeName="ThriftHub" condition="good" />
        <ListingCard id="3" imageUrl={img} title="Leather Boots" price={8500} storeName="KisumuStyles" condition="like_new" />
        <ListingCard id="4" imageUrl={img} title="Retro Tee" price={1500} storeName="VintageKE" condition="fair" />
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
