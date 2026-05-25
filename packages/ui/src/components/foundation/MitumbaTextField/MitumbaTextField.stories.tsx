import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import LockIcon from '@mui/icons-material/Lock'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchIcon from '@mui/icons-material/Search'
import { MitumbaTextField } from './MitumbaTextField'
import { MitumbaPrimaryButton } from '../MitumbaPrimaryButton/MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaTextField> = {
  title: 'Foundation/MitumbaTextField',
  component: MitumbaTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaTextField>

function ScaleShowcaseComponent() {
  const [val, setVal] = useState('')
  return (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaTextField 
        label="Small Input" 
        size="small" 
        hint="Type something..."
        value={val} 
        onChange={setVal} 
      />
      <MitumbaTextField 
        label="Medium Input" 
        size="medium" 
        hint="Type something..."
        value={val} 
        onChange={setVal} 
      />
      <MitumbaTextField 
        label="Large Input" 
        size="large" 
        hint="Type something..."
        value={val} 
        onChange={setVal} 
      />
    </Stack>
  )
}

export const ScaleShowcase: Story = {
  render: () => <ScaleShowcaseComponent />
}

function StatusShowcaseComponent() {
  return (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaTextField 
        label="Success State" 
        status="success"
        hint="Enter name"
        value="Isaac Stanley" 
        onChange={() => {}} 
        helperText="Username is available"
      />
      <MitumbaTextField 
        label="Error State" 
        error="Invalid email address"
        hint="Enter email"
        value="isaac@invalid" 
        onChange={() => {}} 
      />
      <MitumbaTextField 
        label="Warning State" 
        status="warning"
        hint="Enter password"
        value="123" 
        onChange={() => {}} 
        helperText="Password is too weak"
      />
    </Stack>
  )
}

export const StatusShowcase: Story = {
  render: () => <StatusShowcaseComponent />
}

function AdornmentShowcaseComponent() {
  const [pass, setPass] = useState('password123')
  return (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaTextField 
        label="Password Toggle (Auto)" 
        type="password"
        prefix={<LockIcon />}
        hint="Password"
        value={pass} 
        onChange={setPass} 
      />
      <MitumbaTextField 
        label="Right Side Icon" 
        suffix={<VisibilityIcon />}
        hint="Password"
        value="••••••••" 
        onChange={() => {}} 
      />
      <MitumbaTextField 
        label="Integrated Search (Benchmark)" 
        hint="Search items..."
        value="" 
        onChange={() => {}} 
        endButton={
          <MitumbaPrimaryButton 
            icon={<SearchIcon />} 
            size="medium" 
          />
        }
      />
      <MitumbaTextField 
        label="Seamless Submit (Benchmark)" 
        prefix={<MailIcon />}
        hint="Email address"
        value="" 
        onChange={() => {}} 
        endButton={
          <MitumbaPrimaryButton 
            label="Submit" 
            size="medium" 
          />
        }
      />
    </Stack>
  )
}

export const AdornmentShowcase: Story = {
  render: () => <AdornmentShowcaseComponent />
}

export const TextArea: Story = {
  args: {
    label: 'Description',
    multiline: true,
    rows: 4,
    hint: 'Enter a detailed description of the item...',
    value: '',
  },
}

export const States: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaTextField 
        label="Disabled State" 
        disabled 
        hint="Cannot type here"
        value="" 
        onChange={() => {}} 
      />
      <MitumbaTextField 
        label="Read Only State" 
        readOnly 
        hint="View only"
        value="This is read only content" 
        onChange={() => {}} 
      />
    </Stack>
  )
}
