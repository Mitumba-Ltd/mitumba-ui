import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { MitumbaBanner } from './MitumbaBanner'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaBanner> = {
  title: 'Feedback/MitumbaBanner',
  component: MitumbaBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaBanner>

export const PassiveAlerts: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 600, py: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Benchmark Showcase</Typography>
      
      <MitumbaBanner severity="success" title="Congratulations" onClose={() => {}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </MitumbaBanner>

      <MitumbaBanner severity="error" title="Error" onClose={() => {}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </MitumbaBanner>

      <MitumbaBanner severity="warning" title="Warning" onClose={() => {}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </MitumbaBanner>

      <MitumbaBanner severity="info" title="Information" onClose={() => {}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </MitumbaBanner>

      <MitumbaBanner severity="neutral" title="Neutral" onClose={() => {}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
      </MitumbaBanner>
    </Stack>
  )
}

export const WithAction: Story = {
  args: {
    severity: 'info',
    title: 'Update Available',
    children: 'A new version of the Mitumba UI library is available. Update now to get the latest features.',
    action: (
      <MitumbaPrimaryButton 
        label="Update" 
        size="small" 
        variant="primary" 
        sx={{ height: 28, borderRadius: tokens.radius.full }} 
      />
    ),
  },
}
