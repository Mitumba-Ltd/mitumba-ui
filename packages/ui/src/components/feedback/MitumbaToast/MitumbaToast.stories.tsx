import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaToast } from './MitumbaToast'

const meta: Meta<typeof MitumbaToast> = {
  title: 'Feedback/MitumbaToast',
  component: MitumbaToast,
  tags: ['autodocs'],
}

export default meta
export type Story = StoryObj<typeof MitumbaToast>

const defaultArgs = {
  message: '',
  severity: 'success' as const,
  open: false,
  onClose: () => undefined,
  duration: 4000,
}

export const Success: Story = {
  args: {
    ...defaultArgs,
    message: 'Item saved successfully!',
    severity: 'success',
  },
}

export const Error: Story = {
  args: {
    ...defaultArgs,
    message: 'Something went wrong!',
    severity: 'error',
  },
}

export const Warning: Story = {
  args: {
    ...defaultArgs,
    message: 'Please check your connection.',
    severity: 'warning',
  },
}

export const Info: Story = {
  args: {
    ...defaultArgs,
    message: 'New features available!',
    severity: 'info',
  },
}
