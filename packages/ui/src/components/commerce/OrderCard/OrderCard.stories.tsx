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

/** A multi-item order: up to four photos stacked, the first item's on top, with the unit count. */
export const StackedItems: Story = {
  args: {
    ...Default.args,
    status: 'paid',
    images: [
      'https://placehold.co/160x160/3D9A52/FFFFFF?text=1',
      'https://placehold.co/160x160/A0522D/FFFFFF?text=2',
      'https://placehold.co/160x160/1F3A5F/FFFFFF?text=3',
      'https://placehold.co/160x160/C9A227/FFFFFF?text=4',
    ],
    itemCount: 6,
  },
}

export const StackedItemsMobile: Story = {
  args: StackedItems.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

/** Awaiting payment: there is no package yet, so no Track action, even with `onTrack`. */
export const PendingWithoutTrack: Story = {
  args: { ...Default.args, status: 'pending', onTrack: () => {} },
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
