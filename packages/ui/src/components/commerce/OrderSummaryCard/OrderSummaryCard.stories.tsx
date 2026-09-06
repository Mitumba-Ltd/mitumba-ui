import type { Meta, StoryObj } from '@storybook/react'
import { OrderSummaryCard } from './OrderSummaryCard'

const meta: Meta<typeof OrderSummaryCard> = {
  title: 'Commerce/OrderSummaryCard',
  component: OrderSummaryCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof OrderSummaryCard>

export const Default: Story = {
  args: {
    items: [
      { label: 'Subtotal', amountKes: 4500 },
      { label: 'Delivery', amountKes: 350 },
    ],
    totalKes: 4850,
    onAction: () => {},
    trustLine: 'Secure Checkout · M-Pesa Escrow',
  },
}

export const WithDiscount: Story = {
  args: {
    items: [
      { label: 'Subtotal', amountKes: 6000 },
      { label: 'Delivery', amountKes: 200 },
      { label: 'Promo Code', amountKes: 500, isDiscount: true },
    ],
    totalKes: 5700,
    onAction: () => {},
    trustLine: 'Secure Checkout · M-Pesa Escrow',
  },
}

export const Loading: Story = {
  args: { ...Default.args, loading: true },
}

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
}

export const NoAction: Story = {
  args: {
    items: [
      { label: 'Subtotal', amountKes: 2500 },
      { label: 'Delivery', amountKes: 150 },
    ],
    totalKes: 2650,
  },
}

export const Mobile: Story = {
  args: { ...Default.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const DesktopWithHeading: Story = {
  args: { ...Default.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}
