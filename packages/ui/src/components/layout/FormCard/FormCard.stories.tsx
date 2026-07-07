import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { FormCard } from './FormCard'

const meta: Meta<typeof FormCard> = {
  title: 'Layout/FormCard',
  component: FormCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof FormCard>

function MockFields() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ height: 48, borderRadius: 1, bgcolor: '#f5f5f5' }} />
      <Box sx={{ height: 48, borderRadius: 1, bgcolor: '#f5f5f5' }} />
      <Box sx={{ height: 80, borderRadius: 1, bgcolor: '#f5f5f5' }} />
      <Box sx={{ height: 40, borderRadius: 1, bgcolor: '#3D9A52', width: 140, ml: 'auto' }} />
    </Box>
  )
}

export const Default: Story = {
  args: {
    icon: <StorefrontIcon />,
    title: 'Create a New Store',
    subtitle: 'Set up your storefront in minutes',
    children: <MockFields />,
  },
}

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'This store name is already taken. Try a different name.',
  },
}

export const NoIcon: Story = {
  args: {
    title: 'Edit Profile',
    children: <MockFields />,
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
