import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MitumbaGrid } from './MitumbaGrid'

const meta: Meta<typeof MitumbaGrid> = {
  title: 'Layout/MitumbaGrid',
  component: MitumbaGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaGrid>

function GridCell({ index }: { index: number }) {
  return (
    <Box
      sx={{
        height: 120,
        backgroundColor: 'rgba(61, 154, 82, 0.1)',
        border: '1px dashed rgba(61, 154, 82, 0.3)',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3D9A52',
        fontWeight: 800,
      }}
    >
      {index}
    </Box>
  )
}

export const BenchmarkSystem: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Standard 12-Column Responsive Grid (Benchmark)
      </Typography>
      <MitumbaGrid>
        {Array.from({ length: 12 }).map((_, i) => (
          <GridCell key={`cell-${i + 1}`} index={i + 1} />
        ))}
      </MitumbaGrid>
    </Box>
  ),
}

export const CustomColumns: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Forced 3 Columns (All Breakpoints)
      </Typography>
      <MitumbaGrid columns={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <GridCell key={`custom-cell-${i + 1}`} index={i + 1} />
        ))}
      </MitumbaGrid>
    </Box>
  ),
}
