import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { MitumbaSwitch } from './MitumbaSwitch'

const meta: Meta<typeof MitumbaSwitch> = {
  title: 'Selection/MitumbaSwitch',
  component: MitumbaSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaSwitch>

export const BasicStates: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#fcfcfc', borderRadius: 4, minWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>Switch States (Benchmark)</Typography>
      <Stack spacing={3}>
        <MitumbaSwitch label="On" on />
        <MitumbaSwitch label="Off" on={false} />
        <MitumbaSwitch label="Disabled On" disabled on />
        <MitumbaSwitch label="Disabled Off" disabled on={false} />
      </Stack>
    </Box>
  ),
}

function InteractiveComponent() {
  const [on, setOn] = useState(false)
  return (
    <MitumbaSwitch 
      label="Enable notifications" 
      on={on} 
      onChange={setOn} 
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}

export const WithoutLabel: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaSwitch on />
      <MitumbaSwitch on={false} />
    </Stack>
  ),
}
