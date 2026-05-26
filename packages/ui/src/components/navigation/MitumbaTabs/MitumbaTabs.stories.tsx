import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import { MitumbaTabs } from './MitumbaTabs'
import type { MitumbaTabsProps } from './MitumbaTabs.types'

const meta: Meta<typeof MitumbaTabs> = {
  title: 'Navigation/MitumbaTabs',
  component: MitumbaTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaTabs>

const tabOptions = [
  { label: 'Overview', value: 'home', icon: <HomeIcon /> },
  { label: 'Marketplace', value: 'search', icon: <SearchIcon /> },
  { label: 'Favorites', value: 'wishlist', icon: <FavoriteIcon /> },
  { label: 'Profile', value: 'account', icon: <PersonIcon /> },
  { label: 'Disabled', value: 'off', disabled: true },
]

function InteractiveTabs({ tabs = tabOptions, variant }: Partial<MitumbaTabsProps>) {
  const [value, setValue] = useState<string | number>(tabs[0].value)
  return (
    <Box sx={{ width: 600 }}>
      <MitumbaTabs 
        tabs={tabs} 
        variant={variant}
        value={value} 
        onChange={setValue} 
      />
      <Box sx={{ p: 4, bgcolor: '#f9f9f9', mt: 2, borderRadius: 2 }}>
        <Typography variant="body2">Current Section: <strong>{value}</strong></Typography>
      </Box>
    </Box>
  )
}

export const Primary: Story = {
  render: () => <InteractiveTabs tabs={tabOptions} variant="primary" />,
}

export const SecondaryIcon: Story = {
  render: () => <InteractiveTabs tabs={tabOptions} variant="secondary" />,
}

export const TextOnly: Story = {
  render: () => {
    const textTabs = tabOptions.map(({ icon: _icon, ...rest }) => rest)
    return (
      <Stack spacing={6}>
        <Box>
          <Typography variant="caption" gutterBottom sx={{ display: 'block', mb: 2, fontWeight: 800 }}>PRIMARY TEXT ONLY</Typography>
          <InteractiveTabs tabs={textTabs} variant="primary" />
        </Box>
        <Box>
          <Typography variant="caption" gutterBottom sx={{ display: 'block', mb: 2, fontWeight: 800 }}>SECONDARY TEXT ONLY</Typography>
          <InteractiveTabs tabs={textTabs} variant="secondary" />
        </Box>
      </Stack>
    )
  }
}
