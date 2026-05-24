import type { Meta, StoryObj } from '@storybook/react'
import { STIScoreChip } from './STIScoreChip'

const meta: Meta<typeof STIScoreChip> = {
  title: 'Seller/STIScoreChip',
  component: STIScoreChip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof STIScoreChip>

export const Trusted: Story = {
  args: {
    score: 92,
  },
}

export const Good: Story = {
  args: {
    score: 75,
  },
}

export const AtRisk: Story = {
  args: {
    score: 45,
  },
}

export const Flagged: Story = {
  args: {
    score: 25,
  },
}

export const Suspended: Story = {
  args: {
    score: 5,
  },
}

export const Compact: Story = {
  args: {
    score: 92,
    compact: true,
  },
}
