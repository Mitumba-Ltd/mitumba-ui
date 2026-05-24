import type { Meta, StoryObj } from '@storybook/react'
import InboxIcon from '@mui/icons-material/Inbox'
import StarIcon from '@mui/icons-material/Star'
import PaymentIcon from '@mui/icons-material/Payment'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { ActivityFeed } from './ActivityFeed'
import type { ActivityEvent } from './ActivityFeed.types'

const meta: Meta<typeof ActivityFeed> = {
  title: 'Data Display/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ActivityFeed>

const mockEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'order',
    title: 'New order received',
    subtitle: 'Order #12345 - KES 2,500',
    timestamp: '2 hours ago',
    icon: <InboxIcon />,
  },
  {
    id: '2',
    type: 'review',
    title: 'New review',
    subtitle: '5 stars from Jane Doe',
    timestamp: '5 hours ago',
    icon: <RateReviewIcon />,
  },
  {
    id: '3',
    type: 'payout',
    title: 'Payout processed',
    subtitle: 'KES 15,000 sent to M-Pesa',
    timestamp: '1 day ago',
    icon: <PaymentIcon />,
  },
  {
    id: '4',
    type: 'sti_change',
    title: 'STI score updated',
    subtitle: 'Your score increased by 2 points',
    timestamp: '2 days ago',
    icon: <StarIcon />,
  },
]

export const Default: Story = {
  args: {
    events: mockEvents,
  },
}

export const Empty: Story = {
  args: {
    events: [],
  },
}

export const Loading: Story = {
  args: {
    events: [],
    loading: true,
  },
}

export const SingleEvent: Story = {
  args: {
    events: [mockEvents[0]],
  },
}
