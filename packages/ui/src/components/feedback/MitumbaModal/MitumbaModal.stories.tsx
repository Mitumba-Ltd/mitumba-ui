import type { Meta, StoryObj } from '@storybook/react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { MitumbaModal } from './MitumbaModal'

const meta: Meta<typeof MitumbaModal> = {
  title: 'Feedback/MitumbaModal',
  component: MitumbaModal,
  tags: ['autodocs'],
}

export default meta
export type Story = StoryObj<typeof MitumbaModal>

export const Default: Story = {
  args: {
    open: false,
    title: 'Confirm Action',
    children: <Typography>Are you sure you want to proceed with this action?</Typography>,
  },
}

export const WithActions: Story = {
  args: {
    open: false,
    title: 'Delete Item',
    children: (
      <Typography>Are you sure you want to delete this item? This action cannot be undone.</Typography>
    ),
    actions: (
      <>
        <Button>Cancel</Button>
        <Button variant="contained" color="error">Delete</Button>
      </>
    ),
  },
}
