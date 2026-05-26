import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import { CartItem } from './CartItem'

const meta: Meta<typeof CartItem> = {
  title: 'Commerce/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CartItem>

const sampleItem = {
  id: '1',
  imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
  title: 'ARTICLE 42453',
  subtitle: 'COLOR GREEN',
  status: 'IN STOCK',
  priceKes: 45000,
  size: 'XL',
  quantity: 1,
}

export const PremiumCart: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 800 }}>
       <CartItem 
         id={sampleItem.id}
         imageUrl={sampleItem.imageUrl}
         title={sampleItem.title}
         subtitle={sampleItem.subtitle}
         status={sampleItem.status}
         priceKes={sampleItem.priceKes}
         size={sampleItem.size}
         quantity={sampleItem.quantity}
       />
       <CartItem 
         id="2"
         title="ARTICLE 54789" 
         subtitle="COLOR BLACK" 
         priceKes={35000} 
         size="L" 
         quantity={1}
         imageUrl="https://images.unsplash.com/photo-1544022613-e87974f37b39?auto=format&fit=crop&w=800&q=80"
       />
    </Stack>
  )
}

export const MobileView: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 360 }}>
       <CartItem 
         id={sampleItem.id}
         imageUrl={sampleItem.imageUrl}
         title={sampleItem.title}
         subtitle={sampleItem.subtitle}
         status={sampleItem.status}
         priceKes={sampleItem.priceKes}
         size={sampleItem.size}
         quantity={sampleItem.quantity}
       />
       <CartItem 
         id="3"
         imageUrl={sampleItem.imageUrl}
         title={sampleItem.title}
         priceKes={sampleItem.priceKes}
         size="S" 
         quantity={2} 
       />
    </Stack>
  )
}
