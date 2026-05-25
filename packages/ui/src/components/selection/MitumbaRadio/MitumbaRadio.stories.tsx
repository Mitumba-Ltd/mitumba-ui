import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import RadioGroup from '@mui/material/RadioGroup'
import { MitumbaRadio } from './MitumbaRadio'

const meta: Meta<typeof MitumbaRadio> = {
  title: 'Selection/MitumbaRadio',
  component: MitumbaRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaRadio>

export const BasicStates: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#fcfcfc', borderRadius: 4, minWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>Radio States (Benchmark)</Typography>
      <Stack spacing={3}>
        <MitumbaRadio label="Unselected" selected={false} value="1" />
        <MitumbaRadio label="Hover (Animated)" selected={false} value="2" sx={{ color: 'text.disabled', transform: 'scale(1.1)' }} />
        <MitumbaRadio label="Selected" selected value="3" />
        <MitumbaRadio label="Disabled Unselected" disabled selected={false} value="4" />
        <MitumbaRadio label="Disabled Selected" disabled selected value="5" />
      </Stack>
    </Box>
  ),
}

function InteractiveGroupComponent() {
  const [value, setValue] = useState('option1')
  return (
    <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
      <MitumbaRadio label="Option 1: Basic" value="option1" selected={value === 'option1'} />
      <MitumbaRadio label="Option 2: Advanced" value="option2" selected={value === 'option2'} />
      <MitumbaRadio label="Option 3: Enterprise" value="option3" selected={value === 'option3'} />
    </RadioGroup>
  )
}

export const InteractiveGroup: Story = {
  render: () => <InteractiveGroupComponent />,
}

export const WithoutLabel: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaRadio selected={false} value="1" />
      <MitumbaRadio selected value="2" />
    </Stack>
  ),
}
