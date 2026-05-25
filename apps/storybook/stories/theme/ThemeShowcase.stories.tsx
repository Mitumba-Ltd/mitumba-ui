import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton, MitumbaTextField } from '@mitumba/ui'

const meta: Meta = {
  title: 'Theme/ThemeShowcase',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ borderBottom: `2px solid ${tokens.colors.green}`, pb: 2, mb: 4 }}>
        <Typography variant="h2" color="primary">Mitumba UI: Vision-Led Redesign</Typography>
        <Typography variant="body1" color="text.secondary">100% Token-Driven | Benchmark: StaNLink UI | Professional Sizing</Typography>
      </Box>

      {/* Spacing & Proportions */}
      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3 }}>Spatial Baseline (4px Factor)</Typography>
        <Stack spacing={2} sx={{ p: 3, bgcolor: tokens.colors.background, borderRadius: 2 }}>
           <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>Demonstrating tight, granular spacing from the expanded token set.</Typography>
          {['xxs', 'xs', 'sm', 'md', 'base', 'lg'].map((name) => (
            <Stack key={name} direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: tokens.spacing[name as keyof typeof tokens.spacing], height: 20, backgroundColor: tokens.colors.green, borderRadius: '2px' }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 60 }}>{name}</Typography>
              <Typography variant="caption" color="text.secondary">{tokens.spacing[name as keyof typeof tokens.spacing]}px</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Buttons */}
      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3 }}>Premium Buttons (Tactile & Sane)</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Variants</Typography>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <MitumbaPrimaryButton label="Primary" variant="primary" />
              <MitumbaPrimaryButton label="Earth" variant="earth" />
              <MitumbaPrimaryButton label="Ghost" variant="ghost" />
            </Stack>
          </Card>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sizes & States</Typography>
            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
              <MitumbaPrimaryButton label="Small" size="small" />
              <MitumbaPrimaryButton label="Large" size="large" />
              <MitumbaPrimaryButton label="Loading" loading />
            </Stack>
          </Card>
        </Box>
        <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic', opacity: 0.7 }}>
          Note: fullWidth is now false by default. Content is perfectly centered with 10px 24px padding.
        </Typography>
      </Box>

      {/* Form Elements */}
      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3 }}>Professional Inputs</Typography>
        <Stack spacing={3}>
           <MitumbaTextField label="Standard" hint="Enter text..." value="" onChange={() => {}} />
           <MitumbaTextField label="Error State" hint="Invalid data" error="This field is required" value="Bad data" onChange={() => {}} />
           <MitumbaTextField label="Disabled" hint="Cannot edit" disabled value="Locked content" onChange={() => {}} />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic', opacity: 0.7 }}>
          Redesigned with 12px padding and clean 2px green focus strokes.
        </Typography>
      </Box>

      {/* Interactive Depth */}
      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3 }}>Interactive Depth & Physicality</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Living Avatars</Typography>
            <Stack direction="row" spacing={3}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: tokens.colors.green }}>JD</Avatar>
              <Avatar src="https://i.pravatar.cc/150?u=12" sx={{ width: 56, height: 56 }} />
            </Stack>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>Hover for 3D tilt and spring scale.</Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">Professional Surfaces</Typography>
            <Card sx={{ p: 2 }}>
              <Typography variant="body2">Shadow Index 1 (Standard)</Typography>
            </Card>
            <Card sx={{ p: 2, boxShadow: 2 }}>
              <Typography variant="body2">Shadow Index 2 (Elevated)</Typography>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  ),
}
