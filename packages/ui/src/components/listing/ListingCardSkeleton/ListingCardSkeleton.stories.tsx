import type { Meta, StoryObj } from '@storybook/react'
import { ListingCardSkeleton } from './ListingCardSkeleton'

const meta: Meta<typeof ListingCardSkeleton> = {
  title: 'Listing/ListingCardSkeleton',
  component: ListingCardSkeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListingCardSkeleton>

export const Default: Story = {}
