import type { Meta, StoryObj } from '@storybook/react'
import { EscrowStatusBanner } from './EscrowStatusBanner'

const meta: Meta<typeof EscrowStatusBanner> = {
  title: 'Commerce/EscrowStatusBanner',
  component: EscrowStatusBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EscrowStatusBanner>

export const Funded: Story = {
  args: {
    status: 'FUNDED',
  },
}

export const Shipped: Story = {
  args: {
    status: 'SHIPPED',
    onConfirmDelivery: () => {},
    onRaiseDispute: () => {},
  },
}

export const TimeoutWarning: Story = {
  args: {
    status: 'TIMEOUT_WARNING',
    hoursRemaining: 12,
    onConfirmDelivery: () => {},
    onRaiseDispute: () => {},
  },
}

export const Released: Story = {
  args: {
    status: 'RELEASED',
  },
}

export const Refunded: Story = {
  args: {
    status: 'REFUNDED',
  },
}
