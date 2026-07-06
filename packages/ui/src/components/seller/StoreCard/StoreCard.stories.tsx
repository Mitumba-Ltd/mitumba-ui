import type { Meta, StoryObj } from '@storybook/react'
import { StoreCard } from './StoreCard'

const meta: Meta<typeof StoreCard> = {
  title: 'Seller/StoreCard',
  component: StoreCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof StoreCard>

export const Default: Story = {
  args: {
    name: 'KisumuKicks',
    subtitle: '24 listings · Sneakers',
    onClick: () => {},
  },
}

export const WithAvatar: Story = {
  args: {
    name: 'Nairobi Vintage',
    avatarUrl: 'https://placehold.co/96',
    subtitle: '56 listings · Vintage Fashion',
    onClick: () => {},
  },
}

export const NoSubtitle: Story = {
  args: { name: 'New Store', onClick: () => {} },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
