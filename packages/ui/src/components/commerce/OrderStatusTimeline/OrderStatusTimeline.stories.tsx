import type { Meta, StoryObj } from '@storybook/react'
import { OrderStatusTimeline } from './OrderStatusTimeline'
import type { OrderEvent } from './OrderStatusTimeline.types'

const meta: Meta<typeof OrderStatusTimeline> = {
  title: 'Commerce/OrderStatusTimeline',
  component: OrderStatusTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OrderStatusTimeline>

const defaultEvents: OrderEvent[] = [
  { status: 'CREATED', timestamp: '2024-01-01 10:00' },
  { status: 'PAID', timestamp: '2024-01-01 10:05' },
  { status: 'SHIPPED', timestamp: '2024-01-02 14:30', note: 'Tracking number: KE12345' },
]

export const Shipped: Story = {
  args: {
    currentStatus: 'SHIPPED',
    events: defaultEvents,
  },
}

export const Delivered: Story = {
  args: {
    currentStatus: 'DELIVERED',
    events: [
      ...defaultEvents,
      { status: 'DELIVERED', timestamp: '2024-01-04 09:15' },
    ],
  },
}

export const PaymentPending: Story = {
  args: {
    currentStatus: 'PAYMENT_PENDING',
    events: [
      { status: 'CREATED', timestamp: '2024-01-01 10:00' },
    ],
  },
}
