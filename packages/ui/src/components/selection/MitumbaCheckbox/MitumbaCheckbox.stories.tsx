import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { MitumbaCheckbox } from './MitumbaCheckbox'

const meta: Meta<typeof MitumbaCheckbox> = {
  title: 'Selection/MitumbaCheckbox',
  component: MitumbaCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaCheckbox>

export const BasicStates: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#fcfcfc', borderRadius: 4, minWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>Checkbox States (Benchmark)</Typography>
      <Stack spacing={3}>
        <MitumbaCheckbox label="Unchecked" checked={false} />
        <MitumbaCheckbox label="Hover (Animated)" checked={false} sx={{ color: 'text.disabled', transform: 'scale(1.1)' }} />
        <MitumbaCheckbox label="Checked" checked />
        <MitumbaCheckbox label="Indeterminate" indeterminate />
        <MitumbaCheckbox label="Disabled Unchecked" disabled checked={false} />
        <MitumbaCheckbox label="Disabled Checked" disabled checked />
      </Stack>
    </Box>
  ),
}

function InteractiveComponent() {
  const [checked, setChecked] = useState(false)
  return (
    <MitumbaCheckbox 
      label="Accept terms and conditions" 
      checked={checked} 
      onChange={setChecked} 
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}

export const WithoutLabel: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaCheckbox checked={false} />
      <MitumbaCheckbox checked />
      <MitumbaCheckbox indeterminate />
    </Stack>
  ),
}
