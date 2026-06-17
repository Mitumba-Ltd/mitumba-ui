import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { OrderStatusTimeline } from './OrderStatusTimeline'
import type { OrderEvent } from './OrderStatusTimeline.types'

const meta: Meta<typeof OrderStatusTimeline> = {
  title: 'Commerce/OrderStatusTimeline',
  component: OrderStatusTimeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OrderStatusTimeline>

const shippedEvents: OrderEvent[] = [
  { status: 'CREATED', timestamp: 'Jan 1, 2024 at 10:00 AM' },
  { status: 'PAYMENT_PENDING', timestamp: 'Jan 1, 2024 at 10:01 AM' },
  { status: 'PAID', timestamp: 'Jan 1, 2024 at 10:05 AM' },
  { status: 'SELLER_CONFIRMED', timestamp: 'Jan 1, 2024 at 2:00 PM' },
  { status: 'SHIPPED', timestamp: 'Jan 2, 2024 at 9:30 AM', note: 'Tracking: KE-2024-78432' },
]

export const Default: Story = {
  args: { currentStatus: 'SHIPPED', events: shippedEvents, estimatedDelivery: 'Jan 4, 2024' },
}

export const OrderPlaced: Story = {
  args: { currentStatus: 'CREATED', events: [{ status: 'CREATED', timestamp: 'Jun 15, 2024 at 3:22 PM' }] },
}

export const PaymentPending: Story = {
  args: {
    currentStatus: 'PAYMENT_PENDING',
    events: [
      { status: 'CREATED', timestamp: 'Jun 15, 2024 at 3:22 PM' },
      { status: 'PAYMENT_PENDING', timestamp: 'Jun 15, 2024 at 3:23 PM', note: 'M-PESA prompt sent to 0712***890' },
    ],
  },
}

export const Delivered: Story = {
  args: {
    currentStatus: 'DELIVERED',
    events: [
      ...shippedEvents,
      { status: 'DELIVERED', timestamp: 'Jan 4, 2024 at 11:15 AM', note: 'Signed by: James K.' },
    ],
  },
}

export const Completed: Story = {
  args: {
    currentStatus: 'COMPLETED',
    events: [
      ...shippedEvents,
      { status: 'DELIVERED', timestamp: 'Jan 4, 2024 at 11:15 AM' },
      { status: 'COMPLETED', timestamp: 'Jan 5, 2024 at 8:00 AM', note: 'Escrow released to seller' },
    ],
  },
}

export const Cancelled: Story = {
  args: {
    currentStatus: 'CANCELLED',
    events: [
      { status: 'CREATED', timestamp: 'Jan 1, 2024 at 10:00 AM' },
      { status: 'PAID', timestamp: 'Jan 1, 2024 at 10:05 AM' },
      { status: 'CANCELLED', timestamp: 'Jan 1, 2024 at 4:00 PM', note: 'Buyer requested cancellation — item out of stock' },
    ],
  },
}

export const Disputed: Story = {
  args: {
    currentStatus: 'DISPUTED',
    events: [
      ...shippedEvents,
      { status: 'DELIVERED', timestamp: 'Jan 4, 2024 at 11:15 AM' },
      { status: 'DISPUTED', timestamp: 'Jan 5, 2024 at 2:00 PM', note: 'Item not as described — buyer opened dispute' },
    ],
  },
}

export const Horizontal: Story = {
  args: { ...Default.args, orientation: 'horizontal' },
}

export const Compact: Story = {
  args: { ...Default.args, compact: true },
}

export const Bare: Story = {
  args: { ...Default.args, bare: true },
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: '#f7f7f5', borderRadius: 3 }}>
        <Story />
      </Box>
    ),
  ],
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
