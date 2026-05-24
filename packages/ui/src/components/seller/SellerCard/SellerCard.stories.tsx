import type { Meta, StoryObj } from '@storybook/react'
import { SellerCard } from './SellerCard'

const meta: Meta<typeof SellerCard> = {
  title: 'Seller/SellerCard',
  component: SellerCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SellerCard>

export const Default: Story = {
  args: {
    sellerId: 'seller-1',
    name: "Jane's Closet",
    city: 'Nairobi',
    stiScore: 92,
    totalListings: 34,
    isVaziFeatured: false,
    avatarUrl: undefined,
    onTap: () => {},
  },
}

export const VaziFeatured: Story = {
  args: {
    ...Default.args,
    isVaziFeatured: true,
  },
}

export const LowSti: Story = {
  args: {
    ...Default.args,
    stiScore: 45,
  },
}

export const WithAvatar: Story = {
  args: {
    ...Default.args,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
}

export const NoTap: Story = {
  args: {
    ...Default.args,
    onTap: undefined,
  },
}
