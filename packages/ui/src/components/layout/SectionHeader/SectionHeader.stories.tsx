import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import { SectionHeader } from './SectionHeader'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton/MitumbaPrimaryButton'

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SectionHeader>

export const Standard: Story = {
  args: {
    title: 'Featured Listings',
    subtitle: 'Explore the most popular items from our top-rated sellers.',
    actionLabel: 'See All',
    onAction: () => console.log('Action clicked'),
  },
}

export const CenteredHero: Story = {
  args: {
    title: 'Quality Second-Hand, Redefined',
    subtitle: 'The best marketplace for vintage and unique finds in Kenya.',
    overline: 'Welcome to Mitumba',
    align: 'center',
    variant: 'large',
    action: <MitumbaPrimaryButton label="Explore Now" size="large" />,
  },
}

export const ModernWithAction: Story = {
  args: {
    title: 'Your Favorites',
    subtitle: 'Items you have bookmarked for later.',
    action: (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <MitumbaPrimaryButton label="Edit List" variant="outline" size="small" />
        <MitumbaPrimaryButton label="Share" variant="ghost" size="small" />
      </Box>
    ),
  },
}
