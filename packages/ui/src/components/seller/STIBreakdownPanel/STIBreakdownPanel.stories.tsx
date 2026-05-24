import type { Meta, StoryObj } from '@storybook/react'
import { STIBreakdownPanel } from './STIBreakdownPanel'
import type { STIEvent } from './STIBreakdownPanel.types'

const meta: Meta<typeof STIBreakdownPanel> = {
  title: 'Seller/STIBreakdownPanel',
  component: STIBreakdownPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof STIBreakdownPanel>

const defaultEvents: STIEvent[] = [
  { type: 'positive', reason: 'Fast shipping', pointsChange: 5, timestamp: '2024-01-01' },
  { type: 'penalty', reason: 'Late response', pointsChange: -3, timestamp: '2024-01-02' },
]

export const Default: Story = {
  args: {
    score: 85,
    fulfillmentRate: 0.95,
    accuracyRate: 0.88,
    avgResponseHours: 2.5,
    daysActive: 180,
    recentEvents: defaultEvents,
  },
}

export const NoEvents: Story = {
  args: {
    ...Default.args,
    recentEvents: [],
  },
}

export const LowScore: Story = {
  args: {
    ...Default.args,
    score: 45,
    fulfillmentRate: 0.6,
    accuracyRate: 0.55,
    avgResponseHours: 48,
    recentEvents: [
      { type: 'penalty', reason: 'Item not as described', pointsChange: -10, timestamp: '2024-01-03' },
    ],
  },
}
