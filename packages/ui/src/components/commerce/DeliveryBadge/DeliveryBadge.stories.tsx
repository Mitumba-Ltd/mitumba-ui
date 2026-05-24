import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryBadge } from './DeliveryBadge'

const meta: Meta<typeof DeliveryBadge> = {
  title: 'Commerce/DeliveryBadge',
  component: DeliveryBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DeliveryBadge>

export const SameCity: Story = {
  args: {
    type: 'same-city',
    estimatedDays: 'Today',
  },
}

export const Intercity: Story = {
  args: {
    type: 'intercity',
    estimatedDays: '3–5 business days',
    feeKes: 299,
  },
}
