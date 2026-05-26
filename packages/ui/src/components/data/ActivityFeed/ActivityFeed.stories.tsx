import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ActivityFeed } from './ActivityFeed'
import type { ActivityEvent, ActivityFeedProps } from './ActivityFeed.types'

const meta: Meta<typeof ActivityFeed> = {
  title: 'Data/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ActivityFeed>

const sampleEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Received',
    subtitle: 'Vintage Nike Airforce 1 (UK 9) purchased by @stanley',
    timestamp: '2 mins ago',
  },
  {
    id: '2',
    type: 'sti_change',
    title: 'Seller Trust Index Updated',
    subtitle: 'Your score increased to 94. Great job on recent fulfillment!',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    type: 'review',
    title: 'New 5-Star Review',
    subtitle: '"Item was exactly as described, fast shipping!" - @anonymous',
    timestamp: '5 hours ago',
  },
  {
    id: '4',
    type: 'payout',
    title: 'Payout Processed',
    subtitle: 'KES 12,400 has been sent to your M-PESA wallet.',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    type: 'system',
    title: 'System Maintenance',
    subtitle: 'Marketplace will be offline for 2 hours on Sunday 02:00 AM.',
    timestamp: '2 days ago',
  },
]

export const StandardTimeline: Story = {
  render: () => (
    <Box sx={{ width: 500, p: 4 }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 800 }}>Activity Timeline</Typography>
      <ActivityFeed events={sampleEvents} />
    </Box>
  ),
}

export const ElevatedCards: Story = {
  render: () => (
    <Box sx={{ width: 500, p: 4, bgcolor: '#f8faff' }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 800 }}>Elevated Event Stream</Typography>
      <ActivityFeed events={sampleEvents.slice(0, 3)} variant="elevated" showTimeline={false} />
    </Box>
  ),
}

export const GlassFeed: Story = {
  render: () => (
    <Box 
      sx={{ 
        width: 600, 
        height: 500, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3D9A52 10%, #A06235 90%)',
        borderRadius: 4,
        p: 4
      }}
    >
      <Box sx={{ width: 450, height: '100%', overflowY: 'auto', p: 1 }}>
        <ActivityFeed events={sampleEvents} variant="glass" />
      </Box>
    </Box>
  ),
}

function LoadingComponent({
  events,
  loading,
  emptyMessage,
  variant,
  showTimeline,
  sx
}: ActivityFeedProps) {
  return (
    <Box sx={{ width: 500, p: 4 }}>
      <ActivityFeed 
        events={events}
        loading={loading}
        emptyMessage={emptyMessage}
        variant={variant}
        showTimeline={showTimeline}
        sx={sx}
      />
    </Box>
  )
}

export const LoadingState: Story = {
  args: {
    loading: true,
    events: [],
  },
  render: (args) => {
    const { events, loading, emptyMessage, variant, showTimeline, sx } = args
    return (
      <LoadingComponent 
        events={events}
        loading={loading}
        emptyMessage={emptyMessage}
        variant={variant}
        showTimeline={showTimeline}
        sx={sx}
      />
    )
  },
}

function EmptyComponent({
  events,
  loading,
  emptyMessage,
  variant,
  showTimeline,
  sx
}: ActivityFeedProps) {
  return (
    <Box sx={{ width: 500, p: 4 }}>
      <ActivityFeed 
        events={events}
        loading={loading}
        emptyMessage={emptyMessage}
        variant={variant}
        showTimeline={showTimeline}
        sx={sx}
      />
    </Box>
  )
}

export const Empty: Story = {
  args: {
    events: [],
    emptyMessage: 'Nothing to see yet',
  },
  render: (args) => {
    const { events, loading, emptyMessage, variant, showTimeline, sx } = args
    return (
      <EmptyComponent 
        events={events}
        loading={loading}
        emptyMessage={emptyMessage}
        variant={variant}
        showTimeline={showTimeline}
        sx={sx}
      />
    )
  },
}
