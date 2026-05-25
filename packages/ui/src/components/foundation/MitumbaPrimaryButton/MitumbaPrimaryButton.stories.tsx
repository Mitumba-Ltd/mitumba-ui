import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { MitumbaPrimaryButton } from './MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaPrimaryButton> = {
  title: 'Foundation/MitumbaPrimaryButton',
  component: MitumbaPrimaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaPrimaryButton>

export const ScaleShowcase: Story = {
  render: () => (
    <Stack spacing={6} alignItems="center">
      <Box sx={{ borderBottom: '1px solid #eee', pb: 2, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4">Button Scale</Typography>
        <Typography variant="body2" color="text.secondary">Fulfilling the 32/42/52 standard</Typography>
      </Box>
      <Stack direction="row" spacing={4} alignItems="flex-end">
        <Stack spacing={1} alignItems="center">
          <MitumbaPrimaryButton label="Small Button" size="small" />
          <Typography variant="caption">Small (32px)</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <MitumbaPrimaryButton label="Medium Button" size="medium" />
          <Typography variant="caption">Medium (42px)</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <MitumbaPrimaryButton label="Large Button" size="large" />
          <Typography variant="caption">Large (52px)</Typography>
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const BasicStates: Story = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: '#fcfcfc', borderRadius: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Basic States & Variants</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
        <Box />
        <Typography variant="caption" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Solid</Typography>
        <Typography variant="caption" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Outline</Typography>
        <Typography variant="caption" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Ghost</Typography>

        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>Default</Typography>
        <MitumbaPrimaryButton label="Action" variant="primary" />
        <MitumbaPrimaryButton label="Action" variant="outline" />
        <MitumbaPrimaryButton label="Action" variant="ghost" />

        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>Hover (Lift)</Typography>
        <MitumbaPrimaryButton label="Hover" variant="primary" sx={{ transform: 'translateY(-2px) scale(1.02)' }} />
        <MitumbaPrimaryButton label="Hover" variant="outline" sx={{ transform: 'translateY(-2px) scale(1.02)' }} />
        <MitumbaPrimaryButton label="Hover" variant="ghost" sx={{ transform: 'translateY(-2px) scale(1.02)' }} />

        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>Pressed (Scale)</Typography>
        <MitumbaPrimaryButton label="Pressed" variant="primary" sx={{ transform: 'scale(0.98)' }} />
        <MitumbaPrimaryButton label="Pressed" variant="outline" sx={{ transform: 'scale(0.98)' }} />
        <MitumbaPrimaryButton label="Pressed" variant="ghost" sx={{ transform: 'scale(0.98)' }} />

        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>Disabled</Typography>
        <MitumbaPrimaryButton label="Disabled" variant="primary" disabled />
        <MitumbaPrimaryButton label="Disabled" variant="outline" disabled />
        <MitumbaPrimaryButton label="Disabled" variant="ghost" disabled />
      </Box>
    </Box>
  ),
}

export const IconCompositions: Story = {
  render: () => (
    <Stack spacing={4}>
      <Stack direction="row" spacing={3} alignItems="center">
         <MitumbaPrimaryButton label="Left Icon" icon={<CameraAltIcon />} />
         <MitumbaPrimaryButton label="Right Icon" icon={<ArrowForwardIcon />} iconPosition="right" />
         <MitumbaPrimaryButton icon={<AddIcon />} />
         <Typography variant="caption" color="text.secondary">Icon-only is perfectly square</Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
         <MitumbaPrimaryButton label="Add Member" icon={<AddIcon />} variant="outline" size="small" />
         <MitumbaPrimaryButton label="Settings" icon={<AddIcon />} variant="ghost" size="small" />
      </Stack>
    </Stack>
  ),
}

export const ColorVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <MitumbaPrimaryButton label="Primary" variant="primary" />
      <MitumbaPrimaryButton label="Earth" variant="earth" />
      <MitumbaPrimaryButton label="Success" variant="success" />
      <MitumbaPrimaryButton label="Error" variant="error" />
    </Stack>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <MitumbaPrimaryButton label="Saving..." loading size="small" />
      <MitumbaPrimaryButton label="Processing Transaction" loading size="medium" />
      <MitumbaPrimaryButton label="Onboarding Progress" loading size="large" />
    </Stack>
  ),
}

export const BenchmarkExamples: Story = {
  render: () => (
    <Box sx={{ p: 4, border: '1px solid #eee', borderRadius: 4 }}>
      <Typography variant="subtitle2" sx={{ mb: 3 }}>Real-world Compositions</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <MitumbaPrimaryButton 
          label="Continue" 
          icon={<ArrowForwardIcon />} 
          iconPosition="right" 
          size="medium"
          sx={{ width: 140 }}
        />
        <MitumbaPrimaryButton 
          label="Add to Favourite" 
          icon={<FavoriteBorderIcon />} 
          variant="outline"
          size="medium"
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <MitumbaPrimaryButton 
          label="Delete" 
          icon={<DeleteIcon />} 
          variant="outline"
          size="medium"
          sx={{ color: 'error.main', borderColor: 'divider' }}
        />
        <MitumbaPrimaryButton 
          label="Delete" 
          variant="error"
          size="medium"
        />
      </Stack>
    </Box>
  ),
}
