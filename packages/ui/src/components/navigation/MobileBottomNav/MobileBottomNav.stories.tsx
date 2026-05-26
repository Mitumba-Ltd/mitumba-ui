import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { MobileBottomNav } from './MobileBottomNav'
import type { MobileBottomNavProps, BottomNavVariant } from './MobileBottomNav.types'

const meta: Meta<typeof MobileBottomNav> = {
  title: 'Navigation/MobileBottomNav',
  component: MobileBottomNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MobileBottomNav>

function InteractiveNav({ variant = 'm3' as BottomNavVariant }: Partial<MobileBottomNavProps>) {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <Box sx={{ height: 200, width: '100%', position: 'relative', bgcolor: '#f5f5f5' }}>
      <Box sx={{ p: 4 }}>
         <Typography variant="subtitle2" color="text.secondary">
           Variant: <strong>{variant}</strong>
         </Typography>
      </Box>
      <MobileBottomNav 
        variant={variant}
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        sx={{ position: 'absolute' }}
      />
    </Box>
  )
}

export const M3Style: Story = {
  render: () => <InteractiveNav variant="m3" />,
}

export const Expansive: Story = {
  render: () => <InteractiveNav variant="expansive" />,
}

export const IndicatorLine: Story = {
  render: () => <InteractiveNav variant="indicator" />,
}

export const PillTransition: Story = {
  render: () => <InteractiveNav variant="pill" />,
}

export const Standalone: Story = {
  render: () => <InteractiveNav variant="standalone" />,
}

export const MultiShowcase: Story = {
  render: () => (
    <Stack spacing={20} sx={{ p: 4, pb: 40, width: '100%' }}>
       <Box sx={{ height: 80, position: 'relative' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>MATERIAL 3 (VARIANT 1)</Typography>
          <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="m3" sx={{ position: 'absolute' }} />
       </Box>
       
       <Box sx={{ height: 80, position: 'relative' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>EXPANSIVE (VARIANT 2)</Typography>
          <MobileBottomNav activeTab="vazi" onTabChange={() => {}} variant="expansive" sx={{ position: 'absolute' }} />
       </Box>

       <Box sx={{ height: 80, position: 'relative' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>INDICATOR (VARIANT 5)</Typography>
          <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="indicator" sx={{ position: 'absolute' }} />
       </Box>

       <Box sx={{ height: 80, position: 'relative' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>PILL (VARIANT 3/4)</Typography>
          <MobileBottomNav activeTab="search" onTabChange={() => {}} variant="pill" sx={{ position: 'absolute' }} />
       </Box>

       <Box sx={{ height: 80, position: 'relative' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>STANDALONE (VARIANT 6)</Typography>
          <MobileBottomNav activeTab="search" onTabChange={() => {}} variant="standalone" sx={{ position: 'absolute' }} />
       </Box>
    </Stack>
  )
}
