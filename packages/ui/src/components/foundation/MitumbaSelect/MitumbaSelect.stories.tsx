import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LanguageIcon from '@mui/icons-material/Language'
import { MitumbaSelect } from './MitumbaSelect'
import { MitumbaAvatar } from '../MitumbaAvatar/MitumbaAvatar'

const meta: Meta<typeof MitumbaSelect> = {
  title: 'Foundation/MitumbaSelect',
  component: MitumbaSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaSelect>

const languageOptions = [
  { value: 'en', label: 'English', subtitle: 'Global Standard', icon: <Typography sx={{ fontSize: 18 }}>🇺🇸</Typography> },
  { value: 'es', label: 'Spanish', subtitle: 'Latin America', icon: <Typography sx={{ fontSize: 18 }}>🇪🇸</Typography> },
  { value: 'fr', label: 'French', subtitle: 'Europe', icon: <Typography sx={{ fontSize: 18 }}>🇫🇷</Typography> },
  { value: 'sw', label: 'Swahili', subtitle: 'East Africa', icon: <Typography sx={{ fontSize: 18 }}>🇰🇪</Typography> },
]

const memberOptions = [
  { value: '1', label: 'Robert Johnson', subtitle: 'Admin', icon: <MitumbaAvatar name="Robert Johnson" size="xs" /> },
  { value: '2', label: 'Emily Davis', subtitle: 'Editor', icon: <MitumbaAvatar name="Emily Davis" size="xs" /> },
  { value: '3', label: 'Michael Thompson', subtitle: 'Viewer', icon: <MitumbaAvatar name="Michael Thompson" size="xs" /> },
]

function ScaleShowcaseComponent() {
  const [val, setVal] = useState<string | number | (string | number)[]>('en')
  return (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaSelect 
        label="Small Select" 
        size="small" 
        value={val} 
        onChange={setVal} 
        options={languageOptions} 
      />
      <MitumbaSelect 
        label="Medium Select" 
        size="medium" 
        value={val} 
        onChange={setVal} 
        options={languageOptions} 
      />
      <MitumbaSelect 
        label="Large Select" 
        size="large" 
        value={val} 
        onChange={setVal} 
        options={languageOptions} 
      />
    </Stack>
  )
}

export const ScaleShowcase: Story = {
  render: () => <ScaleShowcaseComponent />
}

function AdvancedFeaturesComponent() {
  const [val1, setVal1] = useState<string | number | (string | number)[]>('')
  const [val2, setVal2] = useState<string | number | (string | number)[]>([])
  return (
    <Stack spacing={4} sx={{ width: 400 }}>
      <Box>
         <Typography variant="subtitle2" gutterBottom>Search Integration</Typography>
         <MitumbaSelect 
           placeholder="Search members..." 
           showSearch 
           value={val1} 
           onChange={setVal1} 
           options={memberOptions} 
         />
      </Box>
      
      <Box>
         <Typography variant="subtitle2" gutterBottom>Multi-Select with Checkboxes</Typography>
         <MitumbaSelect 
           multiple 
           placeholder="Pick languages" 
           value={val2} 
           onChange={setVal2} 
           options={languageOptions} 
         />
      </Box>

      <Box>
         <Typography variant="subtitle2" gutterBottom>Pill Geometry & Start Icon</Typography>
         <MitumbaSelect 
           rounding="pill" 
           startIcon={<LanguageIcon />} 
           placeholder="Select language" 
           value={val1} 
           onChange={setVal1} 
           options={languageOptions} 
         />
      </Box>
    </Stack>
  )
}

export const AdvancedFeatures: Story = {
  render: () => <AdvancedFeaturesComponent />
}

function InvertedMenuComponent() {
  const [val, setVal] = useState<string | number | (string | number)[]>('1')
  return (
    <Box sx={{ p: 4, bgcolor: '#111', borderRadius: 4, width: 400 }}>
       <Typography variant="subtitle2" sx={{ color: 'white', mb: 2 }}>High-Contrast Inverted Menu</Typography>
       <MitumbaSelect 
         inverted 
         value={val} 
         onChange={setVal} 
         options={memberOptions} 
         sx={{ color: 'white' }}
       />
    </Box>
  )
}

export const InvertedMenu: Story = {
  render: () => <InvertedMenuComponent />
}

export const States: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
      <MitumbaSelect 
        label="Disabled State" 
        disabled 
        value="en" 
        onChange={() => {}} 
        options={languageOptions} 
      />
      <MitumbaSelect 
        label="Error State" 
        error="Please select a valid option" 
        value="" 
        onChange={() => {}} 
        options={languageOptions} 
      />
      <MitumbaSelect 
        label="Loading State" 
        loading 
        value="" 
        onChange={() => {}} 
        options={languageOptions} 
      />
    </Stack>
  )
}
