import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { MitumbaSlider } from './MitumbaSlider'

const meta: Meta<typeof MitumbaSlider> = {
  title: 'Selection/MitumbaSlider',
  component: MitumbaSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaSlider>

function SingleSliderComponent() {
  const [val, setVal] = useState<number | number[]>(40)
  return (
    <Box sx={{ width: 400, p: 4 }}>
      <MitumbaSlider 
        label="Single Value" 
        value={val} 
        onChange={setVal} 
      />
    </Box>
  )
}

export const SingleSlider: Story = {
  render: () => <SingleSliderComponent />,
}

function RangeSliderComponent() {
  const [val, setVal] = useState<number | number[]>([20, 80])
  return (
    <Box sx={{ width: 400, p: 4 }}>
      <MitumbaSlider 
        label="Price Range (KES)" 
        value={val} 
        onChange={setVal} 
        min={0}
        max={10000}
        step={500}
      />
    </Box>
  )
}

export const RangeSlider: Story = {
  render: () => <RangeSliderComponent />,
}

export const States: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400, p: 4 }}>
      <MitumbaSlider label="Disabled State" value={50} onChange={() => {}} disabled />
      <Box>
        <Typography variant="body2" sx={{ mb: 4 }}>Hover / Drag Physics (Interactive)</Typography>
        <MitumbaSlider value={30} onChange={() => {}} />
      </Box>
    </Stack>
  ),
}
