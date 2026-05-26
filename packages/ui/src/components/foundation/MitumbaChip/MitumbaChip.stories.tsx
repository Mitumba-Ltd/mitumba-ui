import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { MitumbaChip } from './MitumbaChip'

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

export const BenchmarkSystem: Story = {
  render: () => (
    <Stack spacing={8} sx={{ py: 4 }}>
      {/* STATUS SECTION */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, mb: 4, display: 'block', color: 'text.disabled' }}>↓ STATUS (BENCHMARK)</Typography>
        <Stack direction="row" spacing={6} alignItems="flex-start">
          <Stack spacing={2}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>Active</Typography>
             <MitumbaChip label="OPEN" status="active" variant="outline" />
             <MitumbaChip label="RUNNING" status="active" variant="outline" />
          </Stack>
          <Stack spacing={2}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>Incomplete</Typography>
             <MitumbaChip label="PENDING" status="incomplete" />
             <MitumbaChip label="SCHEDULED" status="incomplete" />
          </Stack>
          <Stack spacing={2}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>Danger</Typography>
             <MitumbaChip label="DELETED" status="danger" />
             <MitumbaChip label="ERROR" status="danger" />
          </Stack>
          <Stack spacing={2}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>Success</Typography>
             <MitumbaChip label="CLOSED" status="success" />
             <MitumbaChip label="DONE" status="success" />
          </Stack>
        </Stack>
      </Box>

      {/* SPECIAL SECTION */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, mb: 4, display: 'block', color: 'text.disabled' }}>↓ SPECIAL (BENCHMARK)</Typography>
        <Stack direction="row" spacing={4}>
           <MitumbaChip label="ALPHA" status="special" color="purple" variant="solid" />
           <MitumbaChip label="BETA" status="special" color="error" variant="solid" />
           <MitumbaChip label="EARLY ACCESS" status="special" color="info" variant="solid" />
        </Stack>
      </Box>

      {/* NON-ACTIONABLE SECTION */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, mb: 4, display: 'block', color: 'text.disabled' }}>↓ NON-ACTIONABLE</Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
           {['ADS', 'BOT', 'CATALOG', 'DYNAMIC', 'LIVE', 'PINNED'].map(l => (
             <MitumbaChip key={l} label={l} status="common" />
           ))}
        </Stack>
      </Box>
    </Stack>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <MitumbaChip label="Click Me" onClick={() => {}} />
      <MitumbaChip label="Removable" onDelete={() => {}} />
    </Stack>
  ),
}
