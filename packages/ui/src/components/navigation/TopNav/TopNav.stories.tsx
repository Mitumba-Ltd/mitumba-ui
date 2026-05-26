import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Typography from '@mui/material/Typography'
import { TopNav } from './TopNav'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton/MitumbaPrimaryButton'

const meta: Meta<typeof TopNav> = {
  title: 'Navigation/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TopNav>

const sampleLinks = [
  { label: 'Marketplace', href: '#', active: true },
  { label: 'Sell Item', href: '#' },
  { label: 'How it works', href: '#' },
  { label: 'Community', href: '#' },
]

export const Classic: Story = {
  args: {
    links: sampleLinks,
    cartCount: 2,
    onSearchSubmit: () => {},
  },
}

export const WithAnnouncement: Story = {
  args: {
    announcement: '🎉 New Year Sale: Get 20% off on all vintage denim! Shop now →',
    links: sampleLinks,
    cartCount: 5,
    onSearchSubmit: () => {},
  },
}

export const ModernWithCTA: Story = {
  args: {
    links: sampleLinks,
    cta: <MitumbaPrimaryButton label="Get Started" size="medium" />,
    cartCount: 0,
  },
}

export const Authenticated: Story = {
  args: {
    links: sampleLinks,
    isAuthenticated: true,
    user: { name: 'Isaac Stanley', avatarUrl: '' },
    cartCount: 12,
  },
}

function CustomLogo() {
  return (
    <Typography variant="h5" sx={{ fontWeight: 900, color: '#A06235', letterSpacing: '-0.05em' }}>
      STANO.LINK
    </Typography>
  )
}

export const CustomBranding: Story = {
  args: {
    logo: <CustomLogo />,
    links: sampleLinks,
    cta: <MitumbaPrimaryButton label="Join Now" variant="earth" size="medium" />,
  },
}
