import type { Meta, StoryObj } from '@storybook/react'
import { ListingCard } from './ListingCard'

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/ListingCard',
  component: ListingCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListingCard>

const baseArgs = {
  listingId: 'demo-1',
  imageUrl:
    'https://images.unsplash.com/photo-1520256862855-398mb796c819?auto=format&fit=crop&w=800&q=80',
  title: 'Vintage Leather Jacket — Nairobi',
  priceKes: 3500,
  sellerName: 'Wanjiku Thiongo',
  sellerSti: 94,
  city: 'Nairobi',
  conditionGrade: 'A' as const,
  isVaziEligible: true,
  onTap: () => {},
}

export const Default: Story = {
  args: baseArgs,
}

export const ConditionA: Story = {
  args: { ...baseArgs, conditionGrade: 'A', isVaziEligible: true },
}

export const ConditionB: Story = {
  args: { ...baseArgs, conditionGrade: 'B', isVaziEligible: false },
}

export const ConditionC: Story = {
  args: { ...baseArgs, conditionGrade: 'C', isVaziEligible: false },
}

export const STITrusted: Story = {
  args: { ...baseArgs, sellerSti: 94 },
}

export const STIGood: Story = {
  args: { ...baseArgs, sellerSti: 72 },
}

export const STIAtRisk: Story = {
  args: { ...baseArgs, sellerSti: 45 },
}

export const STIFlagged: Story = {
  args: { ...baseArgs, sellerSti: 30 },
}

export const STISuspended: Story = {
  args: { ...baseArgs, sellerSti: 12 },
}

export const NonVazi: Story = {
  args: { ...baseArgs, isVaziEligible: false },
}

export const Loading: Story = {
  args: { ...baseArgs },
}

export const Mobile: Story = {
  args: baseArgs,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
