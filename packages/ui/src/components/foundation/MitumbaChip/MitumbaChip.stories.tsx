import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import { MitumbaChip } from './MitumbaChip'
import { MitumbaAvatar } from '../MitumbaAvatar/MitumbaAvatar'

const meta: Meta<typeof MitumbaChip> = {
  title: 'Foundation/MitumbaChip',
  component: MitumbaChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaChip>

export const GeometryVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Rounding & Geometry</Typography>
      <Stack direction="row" spacing={2}>
        <MitumbaChip label="Pill (Default)" rounding="pill" onClick={() => {}} />
        <MitumbaChip label="Rounded" rounding="rounded" onClick={() => {}} />
        <MitumbaChip label="Square" rounding="square" onClick={() => {}} />
      </Stack>
    </Stack>
  ),
}

export const ContentPermutations: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Content Compositions</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <MitumbaChip label="With Icon" icon={<StarIcon />} onClick={() => {}} />
        <MitumbaChip 
          label="Isaac Stanley" 
          avatar={<MitumbaAvatar name="Isaac Stanley" size="xs" />} 
          onDelete={() => {}} 
        />
        <MitumbaChip label="With Badge" badge={4} onClick={() => {}} />
        <MitumbaChip label="Delete Only" onDelete={() => {}} />
      </Stack>
    </Stack>
  ),
}

export const VisualVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Variants & Colors</Typography>
      <Stack direction="row" spacing={2}>
        <MitumbaChip label="Solid" variant="solid" onClick={() => {}} />
        <MitumbaChip label="Outline" variant="outline" onClick={() => {}} />
        <MitumbaChip label="Shaded" variant="shaded" color="success" onClick={() => {}} />
        <MitumbaChip label="Dashed" variant="dashed" onClick={() => {}} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <MitumbaChip label="Selected" selected onClick={() => {}} />
        <MitumbaChip label="Disabled" disabled onClick={() => {}} />
      </Stack>
    </Stack>
  ),
}

export const ElevationShowcase: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Elevation States</Typography>
      <Stack direction="row" spacing={4} sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 4 }}>
        <Stack spacing={1} alignItems="center">
          <MitumbaChip label="Flat" elevation="flat" onClick={() => {}} />
          <Typography variant="caption">Flat</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <MitumbaChip label="Tiny Shadow" elevation="tiny" onClick={() => {}} />
          <Typography variant="caption">Tiny</Typography>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <MitumbaChip label="Elevated" elevation="elevated" onClick={() => {}} />
          <Typography variant="caption">Elevated</Typography>
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <MitumbaChip label="Small Chip" size="small" onClick={() => {}} />
      <MitumbaChip label="Medium Chip" size="medium" onClick={() => {}} />
    </Stack>
  ),
}
