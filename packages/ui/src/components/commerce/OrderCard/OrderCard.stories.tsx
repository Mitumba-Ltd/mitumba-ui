import type { Meta, StoryObj } from '@storybook/react'
import { OrderCard } from './OrderCard'

const meta: Meta<typeof OrderCard> = {
  title: 'Commerce/OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof OrderCard>

export const Default: Story = {
  args: {
    orderShortId: 'a9331769',
    title: "Levi's 501 Original Fit Stonewash",
    imageUrl: 'https://placehold.co/160x160',
    totalKes: 2500,
    deliveryFeeKes: 200,
    status: 'shipped',
    createdAt: 'Jun 15, 2024',
    onClick: () => {},
  },
}

export const Delivered: Story = {
  args: { ...Default.args, status: 'delivered' },
}

export const Cancelled: Story = {
  args: { ...Default.args, status: 'cancelled' },
}

export const Disputed: Story = {
  args: { ...Default.args, status: 'disputed' },
}

export const NoImage: Story = {
  args: { ...Default.args, imageUrl: undefined },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const AsLinkWithHeading: Story = {
  args: {
    ...Default.args,
    onClick: undefined,
    href: '/orders/a9331769',
    titleLevel: 2,
    onTrack: () => {},
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const MobileAsLink: Story = {
  args: {
    ...Default.args,
    onClick: undefined,
    href: '/orders/a9331769',
    titleLevel: 2,
    onTrack: () => {},
  },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
