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
    compact: false,
  },
}

export const Good: Story = {
  args: {
    score: 72,
    compact: false,
  },
}

export const AtRisk: Story = {
  args: {
    score: 45,
    compact: false,
  },
}

export const Flagged: Story = {
  args: {
    score: 28,
    compact: false,
  },
}

export const Suspended: Story = {
  args: {
    score: 5,
    compact: false,
  },
}

export const Compact: Story = {
  args: {
    score: 88,
    compact: true,
  },
}

export const CompactGood: Story = {
  args: {
    score: 65,
    compact: true,
  },
}

export const CompactAtRisk: Story = {
  args: {
    score: 50,
    compact: true,
  },
}

export const CompactFlagged: Story = {
  args: {
    score: 30,
    compact: true,
  },
}

export const CompactSuspended: Story = {
  args: {
    score: 10,
    compact: true,
  },
}

export const WithShowLabel: Story = {
  args: {
    score: 92,
    compact: true,
    showLabel: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    score: 92,
    compact: false,
    showLabel: false,
  },
}

export const BoundaryTrusted: Story = {
  args: {
    score: 85,
    compact: false,
  },
}

export const BoundaryGood: Story = {
  args: {
    score: 60,
    compact: false,
  },
}

export const BoundaryAtRisk: Story = {
  args: {
    score: 40,
    compact: false,
  },
}

export const BoundaryFlagged: Story = {
  args: {
    score: 20,
    compact: false,
  },
}

export const BoundarySuspended: Story = {
  args: {
    score: 0,
    compact: false,
  },
}

export const Mobile: Story = {
  args: {
    score: 78,
    compact: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
