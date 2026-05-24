import type { Meta, StoryObj } from '@storybook/react'
import { VAZIBadge } from './VAZIBadge'

const meta: Meta<typeof VAZIBadge> = {
  title: 'VAZI/VAZIBadge',
  component: VAZIBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VAZIBadge>

export const Default: Story = {
  args: {
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Mobile: Story = {
  args: {
    size: 'medium',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
