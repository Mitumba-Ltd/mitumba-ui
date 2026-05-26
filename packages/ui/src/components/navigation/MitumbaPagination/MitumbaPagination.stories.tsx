import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MitumbaPagination } from './MitumbaPagination'
import type { MitumbaPaginationProps } from './MitumbaPagination'

const meta: Meta<typeof MitumbaPagination> = {
  title: 'Navigation/MitumbaPagination',
  component: MitumbaPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaPagination>

function InteractivePagination({ count = 10 }: Partial<MitumbaPaginationProps>) {
  const [page, setPage] = useState(1)
  return (
    <Box sx={{ width: 600 }}>
      <MitumbaPagination count={count} page={page} onChange={setPage} />
      <Box sx={{ p: 4, bgcolor: '#f9f9f9', mt: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="body2">Current Page: <strong>{page}</strong></Typography>
      </Box>
    </Box>
  )
}

export const Standard: Story = {
  render: () => <InteractivePagination count={10} />,
}

export const LongList: Story = {
  render: () => <InteractivePagination count={50} />,
}

export const Compact: Story = {
  render: () => <InteractivePagination count={5} />,
}
