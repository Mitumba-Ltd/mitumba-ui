import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaAvatar, MitumbaAvatarGroup } from './MitumbaAvatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

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

export const BasicTypes: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Stack direction="row" spacing={4} alignItems="center">
        <Box sx={{ textAlign: 'center' }}>
          <MitumbaAvatar name="" />
          <Typography variant="caption" display="block">Blank</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <MitumbaAvatar name="Isaac Stanley" />
          <Typography variant="caption" display="block">Initials</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <MitumbaAvatar name="Alice" imageUrl="https://i.pravatar.cc/150?u=12" />
          <Typography variant="caption" display="block">Image</Typography>
        </Box>
      </Stack>
    </Stack>
  ),
}

export const ActionToCall: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaAvatar name="Camera" actionIcon={<CameraAltIcon sx={{ fontSize: 14 }} />} size="lg" />
      <MitumbaAvatar name="Add" actionIcon={<AddIcon sx={{ fontSize: 14 }} />} size="lg" />
      <MitumbaAvatar name="Edit" actionIcon={<EditIcon sx={{ fontSize: 14 }} />} size="lg" />
    </Stack>
  ),
}

export const Notifications: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaAvatar name="N1" notificationCount={1} size="lg" />
      <MitumbaAvatar name="N2" notificationCount={3} notificationColor="#FF9800" size="lg" />
      <MitumbaAvatar name="N3" notificationCount="9+" size="lg" />
    </Stack>
  ),
}

export const Presence: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <MitumbaAvatar name="Online" status="online" size="lg" />
      <MitumbaAvatar name="Offline" status="offline" size="lg" />
    </Stack>
  ),
}

export const TextAlignment: Story = {
  render: () => (
    <Stack spacing={6}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Side Alignment</Typography>
        <MitumbaAvatar 
          name="Isaac Stanley" 
          subtitle="Online" 
          status="online" 
          textAlignment="side" 
          imageUrl="https://i.pravatar.cc/150?u=1"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Bottom Alignment</Typography>
        <MitumbaAvatar 
          name="Isaac Stanley" 
          textAlignment="bottom" 
          imageUrl="https://i.pravatar.cc/150?u=2"
        />
      </Box>
    </Stack>
  ),
}

export const EventsAndProgress: Story = {
  render: () => (
    <Stack direction="row" spacing={6}>
      <Box sx={{ textAlign: 'center' }}>
        <MitumbaAvatar name="Event" hasNewEvent size="lg" />
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>New Event (Spin)</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <MitumbaAvatar 
          name="Isaac" 
          progress={90} 
          textAlignment="bottom" 
          size="lg" 
          imageUrl="https://i.pravatar.cc/150?u=4"
        />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>90% Complete</Typography>
      </Box>
    </Stack>
  ),
}

export const SelectedState: Story = {
  args: {
    name: 'Selected User',
    selected: true,
    size: 'lg',
    imageUrl: 'https://i.pravatar.cc/150?u=5',
  },
}

export const Stacking: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>Simple Stack</Typography>
        <MitumbaAvatarGroup>
          <MitumbaAvatar name="A" imageUrl="https://i.pravatar.cc/150?u=11" />
          <MitumbaAvatar name="B" imageUrl="https://i.pravatar.cc/150?u=12" />
          <MitumbaAvatar name="C" imageUrl="https://i.pravatar.cc/150?u=13" />
        </MitumbaAvatarGroup>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>With CTA & Overflow</Typography>
        <MitumbaAvatarGroup max={3} total={10} onAdd={() => alert('Add clicked')}>
          <MitumbaAvatar name="A" imageUrl="https://i.pravatar.cc/150?u=21" />
          <MitumbaAvatar name="B" imageUrl="https://i.pravatar.cc/150?u=22" />
          <MitumbaAvatar name="C" imageUrl="https://i.pravatar.cc/150?u=23" />
        </MitumbaAvatarGroup>
      </Box>
    </Stack>
  ),
}
