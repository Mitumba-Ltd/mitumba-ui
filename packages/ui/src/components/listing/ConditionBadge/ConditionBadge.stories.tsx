import type { Meta, StoryObj } from '@storybook/react'
import { ConditionBadge } from './ConditionBadge'

const meta: Meta<typeof ConditionBadge> = {
  title: 'Seller/ConditionBadge',
  component: ConditionBadge,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConditionBadge>

export const Default: Story = {
  args: {
    grade: 'B',
    showLabel: false,
  },
}

export const WithLabel: Story = {
  args: {
    grade: 'A',
    showLabel: true,
  },
}

export const AllGrades: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ConditionBadge grade="A" showLabel />
      <ConditionBadge grade="B" showLabel />
      <ConditionBadge grade="C" showLabel />
    </div>
  ),
}
