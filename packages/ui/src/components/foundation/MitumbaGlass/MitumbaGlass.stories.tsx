import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MitumbaGlass } from './MitumbaGlass'
import { MitumbaPrimaryButton } from '../MitumbaPrimaryButton/MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaGlass> = {
  title: 'Foundation/MitumbaGlass',
  component: MitumbaGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaGlass>

function BackgroundInspo() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(45deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: 300, height: 300, borderRadius: '50%', backgroundColor: '#3D9A52', opacity: 0.5, filter: 'blur(40px)' }} />
    </Box>
  )
}

export const Default: Story = {
  render: () => (
    <Box sx={{ position: 'relative', width: 600, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BackgroundInspo />
      <MitumbaGlass sx={{ p: 6, width: 400 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>Extraordinary Depth</Typography>
        <Typography variant="body2" sx={{ mb: 4 }}>
          This glass primitive uses high-end backdrop filters to create &quot;out of this world&quot; visual hierarchy.
        </Typography>
        <MitumbaPrimaryButton label="Explore More" size="medium" />
      </MitumbaGlass>
    </Box>
  ),
}

export const LargeRounding: Story = {
  render: () => (
    <Box sx={{ position: 'relative', width: 600, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BackgroundInspo />
      <MitumbaGlass rounding="huge" sx={{ p: 4, width: 300 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, textAlign: 'center' }}>
          Smooth Large Radius (xl)
        </Typography>
      </MitumbaGlass>
    </Box>
  ),
}

export const FloatingMenu: Story = {
  render: () => (
    <Box sx={{ position: 'relative', width: 600, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BackgroundInspo />
      <MitumbaGlass rounding="full" sx={{ p: 1, display: 'flex', gap: 1 }}>
        <MitumbaPrimaryButton label="🏠" variant="ghost" size="medium" sx={{ borderRadius: '50%', minWidth: 44 }} />
        <MitumbaPrimaryButton label="🔍" variant="ghost" size="medium" sx={{ borderRadius: '50%', minWidth: 44 }} />
        <MitumbaPrimaryButton label="👤" variant="ghost" size="medium" sx={{ borderRadius: '50%', minWidth: 44 }} />
      </MitumbaGlass>
    </Box>
  ),
}
