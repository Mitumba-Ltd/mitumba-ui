import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { ErrorState } from './ErrorState'

const meta: Meta<typeof ErrorState> = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ErrorState>

export const General: Story = {
  args: {
    onRetry: () => alert('Retry'),
  },
}

export const PageNotFound: Story = {
  args: {
    type: '404',
    title: 'Page Not Found',
    subtitle: 'The page you are looking for might have been moved or deleted.',
    onBack: () => alert('Go Back'),
    onRetry: () => alert('Refresh'),
    retryLabel: 'Refresh Page',
  },
}

export const NetworkError: Story = {
  args: {
    type: 'network',
    title: 'No Connection',
    subtitle: 'Check your internet connection and try again.',
    onRetry: () => alert('Reconnect'),
    variant: 'elevated',
  },
}

export const ServerError: Story = {
  args: {
    type: '500',
    title: 'System Malfunction',
    subtitle: 'Our engineers are on it. Please bear with us while we fix the issue.',
    onBack: () => alert('Home'),
  },
}

export const Compact: Story = {
  render: () => (
    <Box sx={{ width: 320 }}>
      <ErrorState 
        variant="compact"
        title="Session Expired"
        subtitle="Please log in again."
        onRetry={() => {}}
        retryLabel="Login"
      />
    </Box>
  )
}
