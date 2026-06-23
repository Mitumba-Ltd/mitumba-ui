import type { Meta, StoryObj } from '@storybook/react'
import { DisputeStatusTimeline } from './DisputeStatusTimeline'
import type { DisputeEvent } from './DisputeStatusTimeline.types'

const meta: Meta<typeof DisputeStatusTimeline> = {
  title: 'Commerce/DisputeStatusTimeline',
  component: DisputeStatusTimeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DisputeStatusTimeline>

const openEvents: DisputeEvent[] = [
  { actor_role: 'buyer', action: 'Opened dispute', new_status: 'open', note: 'Item not as described — wrong size received', created_at: 'Jun 20, 2024 at 3:15 PM' },
  { actor_role: 'system', action: 'Seller notified', new_status: null, note: null, created_at: 'Jun 20, 2024 at 3:16 PM' },
]

const underReviewEvents: DisputeEvent[] = [
  ...openEvents,
  { actor_role: 'seller', action: 'Responded to dispute', new_status: 'seller_responded', note: 'Correct size was shipped — attaching photo proof', created_at: 'Jun 21, 2024 at 10:00 AM' },
]

const resolvedEvents: DisputeEvent[] = [
  ...underReviewEvents,
  { actor_role: 'admin', action: 'Escalated to review', new_status: 'under_review', note: null, created_at: 'Jun 22, 2024 at 9:00 AM' },
  { actor_role: 'admin', action: 'Resolved — full refund issued', new_status: 'resolved_refund', note: 'Photo evidence confirms wrong item shipped', created_at: 'Jun 23, 2024 at 2:30 PM' },
]

export const OpenDispute: Story = {
  args: { status: 'open', events: openEvents },
}

export const UnderReview: Story = {
  args: { status: 'under_review', events: [...underReviewEvents, { actor_role: 'admin', action: 'Escalated to review', new_status: 'under_review', note: null, created_at: 'Jun 22, 2024 at 9:00 AM' }] },
}

export const Resolved: Story = {
  args: { status: 'resolved_refund', events: resolvedEvents },
}

export const Mobile: Story = {
  args: { status: 'open', events: openEvents },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
