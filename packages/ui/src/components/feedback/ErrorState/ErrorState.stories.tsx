import type { Meta, StoryObj } from '@storybook/react'
import { ErrorState } from './ErrorState'

const meta: Meta<typeof ErrorState> = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ErrorState>

export const Default: Story = {
  args: {},
}

export const CustomMessage: Story = {
  args: {
    title: 'Network Error',
    subtitle: 'Unable to connect to the server. Please check your internet connection.',
  },
}

export const WithRetry: Story = {
  args: {
    title: 'Failed to load data',
    subtitle: 'Something went wrong while fetching your data.',
    onRetry: () => undefined,
  },
}
