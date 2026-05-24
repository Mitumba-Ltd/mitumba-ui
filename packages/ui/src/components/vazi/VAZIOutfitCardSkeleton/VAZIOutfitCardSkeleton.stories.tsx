import type { Meta, StoryObj } from '@storybook/react'
import { VAZIOutfitCardSkeleton } from './VAZIOutfitCardSkeleton'

const meta: Meta<typeof VAZIOutfitCardSkeleton> = {
  title: 'VAZI/VAZIOutfitCardSkeleton',
  component: VAZIOutfitCardSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VAZIOutfitCardSkeleton>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
