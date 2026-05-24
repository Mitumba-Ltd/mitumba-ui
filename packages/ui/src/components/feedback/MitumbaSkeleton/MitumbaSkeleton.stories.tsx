import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { MitumbaSkeleton } from './MitumbaSkeleton'

const meta: Meta<typeof MitumbaSkeleton> = {
  title: 'Feedback/MitumbaSkeleton',
  component: MitumbaSkeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MitumbaSkeleton>

export const Rectangular: Story = {
  args: {
    width: 200,
    height: 20,
    variant: 'rectangular',
  },
}

export const Rounded: Story = {
  args: {
    width: 200,
    height: 20,
    variant: 'rounded',
  },
}

export const Circular: Story = {
  args: {
    width: 60,
    height: 60,
    variant: 'circular',
  },
}

export const CardExample: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <MitumbaSkeleton width={300} height={200} variant="rounded" borderRadius={16} />
      <MitumbaSkeleton width={200} height={20} variant="rounded" />
      <MitumbaSkeleton width={150} height={16} variant="rounded" />
    </Box>
  ),
}
