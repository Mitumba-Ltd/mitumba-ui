import type { Meta, StoryObj } from '@storybook/react'
import { StatsCard } from './StatsCard'

const meta: Meta<typeof StatsCard> = {
  title: 'Data Display/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StatsCard>

export const Default: Story = {
  args: {
    label: 'Total Orders',
    value: 42,
  },
}

export const WithUnit: Story = {
  args: {
    label: 'Revenue',
    value: '12,500',
    unit: 'KES',
  },
}

export const WithTrend: Story = {
  args: {
    label: 'Sales Growth',
    value: '3,245',
    unit: 'KES',
    trend: {
      direction: 'up',
      percent: 12.5,
    },
  },
}

export const WithIcon: Story = {
  args: {
    label: 'New Orders',
    value: 12,
    trend: {
      direction: 'up',
      percent: 5.2,
    },
  },
}

export const DownTrend: Story = {
  args: {
    label: 'Returns',
    value: 3,
    trend: {
      direction: 'down',
      percent: 8.1,
    },
  },
}
