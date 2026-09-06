import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { OrderMessageAttachment } from './OrderMessageAttachment'
import { MessageBubble } from '../MessageBubble'

const meta: Meta<typeof OrderMessageAttachment> = {
  title: 'Messaging/OrderMessageAttachment',
  component: OrderMessageAttachment,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof OrderMessageAttachment>

const orderData = {
  orderId: 'ord_abc123',
  orderShortId: 'a9331769',
  listingTitle: "Levi's 501 Original Fit Stonewash",
  listingImageUrl: 'https://placehold.co/96x96',
  amount: 1500,
  status: 'Shipped',
  createdAt: '2024-01-15',
}

export const Default: Story = { args: orderData }

export const NoImage: Story = {
  args: { ...orderData, listingImageUrl: null },
}

export const InsideBubbleMine: Story = {
  render: () => (
    <Box sx={{ maxWidth: 400 }}>
      <MessageBubble
        body="Hi, I need help with this order — the tracking hasn't updated in 3 days."
        timestamp="2:30 PM"
        isMine
        attachment={{ type: 'order', data: orderData }}
      />
    </Box>
  ),
}

export const InsideBubbleTheirs: Story = {
  render: () => (
    <Box sx={{ maxWidth: 400 }}>
      <MessageBubble
        body="Let me check on that for you."
        timestamp="2:32 PM"
        isMine={false}
        senderName="KisumuKicks"
        attachment={{ type: 'order', data: orderData }}
      />
    </Box>
  ),
}

export const Desktop1280: Story = {
  args: orderData,
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const Mobile375: Story = {
  args: orderData,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
