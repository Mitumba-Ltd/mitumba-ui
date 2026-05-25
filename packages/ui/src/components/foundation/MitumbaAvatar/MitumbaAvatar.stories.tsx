import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaAvatar } from './MitumbaAvatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const meta: Meta<typeof MitumbaAvatar> = {
  title: 'Foundation/MitumbaAvatar',
  component: MitumbaAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaAvatar>

export const Default: Story = {
  args: {
    name: 'Alice Mwangi',
    size: 'md',
  },
}

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    imageUrl: 'https://i.pravatar.cc/150?u=12',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <MitumbaAvatar name="X Small" size="xs" />
        <Typography variant="caption">XS (24px)</Typography>
      </Stack>
      <Stack spacing={1} alignItems="center">
        <MitumbaAvatar name="Small" size="sm" />
        <Typography variant="caption">SM (32px)</Typography>
      </Stack>
      <Stack spacing={1} alignItems="center">
        <MitumbaAvatar name="Medium" size="md" />
        <Typography variant="caption">MD (44px)</Typography>
      </Stack>
      <Stack spacing={1} alignItems="center">
        <MitumbaAvatar name="Large" size="lg" />
        <Typography variant="caption">LG (64px)</Typography>
      </Stack>
    </Stack>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>Physical Badge Tilt (Hover me)</Typography>
        <MitumbaAvatar
          name="Premium Seller"
          imageUrl="https://i.pravatar.cc/150?u=1"
          size="lg"
          badge="★"
        />
      </Box>
      
      <Stack direction="row" spacing={3}>
        <MitumbaAvatar
          name="Verified User"
          size="md"
          badge="✔"
        />
        <MitumbaAvatar
          name="Top Rated"
          size="sm"
          badge="TOP"
        />
      </Stack>
    </Stack>
  ),
}

export const Interaction: Story = {
  render: () => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" sx={{ mb: 3, fontStyle: 'italic', opacity: 0.7 }}>
        Demonstrating the 3D perspective spring transition and active state scaling.
      </Typography>
      <MitumbaAvatar
        name="Lead Engineer"
        imageUrl="https://i.pravatar.cc/150?u=8"
        size="lg"
      />
    </Box>
  ),
}
