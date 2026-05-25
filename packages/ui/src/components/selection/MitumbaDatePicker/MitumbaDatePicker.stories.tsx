import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { MitumbaDatePicker } from './MitumbaDatePicker'

const meta: Meta<typeof MitumbaDatePicker> = {
  title: 'Selection/MitumbaDatePicker',
  component: MitumbaDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaDatePicker>

function DefaultComponent() {
  const [date, setDate] = useState<Date | null>(new Date())
  return (
    <Box sx={{ width: 400 }}>
      <MitumbaDatePicker 
        label="Select Appointment Date" 
        value={date} 
        onChange={setDate} 
      />
    </Box>
  )
}

export const Default: Story = {
  render: () => <DefaultComponent />,
}

export const Sizes: Story = {
  render: () => (
    <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <MitumbaDatePicker size="small" label="Small Picker" value={null} onChange={() => {}} />
      <MitumbaDatePicker size="medium" label="Medium Picker" value={null} onChange={() => {}} />
      <MitumbaDatePicker size="large" label="Large Picker" value={null} onChange={() => {}} />
    </Box>
  ),
}
