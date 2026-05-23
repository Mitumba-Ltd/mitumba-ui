import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaAvatar } from './MitumbaAvatar'

const meta: Meta<typeof MitumbaAvatar> = {
  title: 'Foundation/MitumbaAvatar',
  component: MitumbaAvatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaAvatar>

export const Default: Story = {
  args: {
    name: 'Alice Mwangi',
    size: 'md',
  },
}

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    imageUrl: 'https://placehold.co/100x100',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <MitumbaAvatar name="X Small" size="xs" />
      <MitumbaAvatar name="Small" size="sm" />
      <MitumbaAvatar name="Medium" size="md" />
      <MitumbaAvatar name="Large" size="lg" />
    </div>
  ),
}

export const WithBadge: Story = {
  args: {
    name: 'Seller One',
    imageUrl: 'https://placehold.co/100x100',
    size: 'md',
    badge: '★',
  },
}

export const WithBadgeNoImage: Story = {
  args: {
    name: 'Trusted Seller',
    size: 'lg',
    badge: 'TOP',
  },
}

export const Mobile: Story = {
  args: {
    name: 'Mobile User',
    size: 'sm',
    imageUrl: 'https://placehold.co/100x100',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
