import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NotificationPreferencesGrid } from './NotificationPreferencesGrid'
import type { NotificationChannel, NotificationPreferenceChange, NotificationPreferenceRow } from './NotificationPreferencesGrid.types'

const CATEGORIES: NotificationPreferenceRow[] = [
  {
    id: 'account', label: 'Account and security', description: 'Sign-ins, passwords, two-factor and changes to your account.', required: true,
    channels: [{ channel: 'in_app', enabled: true }, { channel: 'email', enabled: true }, { channel: 'push', enabled: true }, { channel: 'sms', enabled: false }],
  },
  {
    id: 'orders', label: 'Orders', description: 'Orders you placed or received, shipping, delivery and disputes.',
    channels: [{ channel: 'in_app', enabled: true }, { channel: 'email', enabled: true }, { channel: 'push', enabled: true }, { channel: 'whatsapp', enabled: false }],
  },
  {
    id: 'messages', label: 'Messages', description: 'New messages and offers.',
    channels: [{ channel: 'in_app', enabled: true }, { channel: 'email', enabled: false }, { channel: 'push', enabled: true }],
  },
  {
    id: 'deals', label: 'Deals and recommendations', description: 'Price drops, items back in stock and digests. Only if you opt in.',
    channels: [{ channel: 'in_app', enabled: false }, { channel: 'email', enabled: false }, { channel: 'push', enabled: false }, { channel: 'whatsapp', enabled: false }],
  },
]

const meta: Meta<typeof NotificationPreferencesGrid> = {
  title: 'Notifications/NotificationPreferencesGrid',
  component: NotificationPreferencesGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { categories: CATEGORIES, onChange: () => undefined },
}

export default meta

type Story = StoryObj<typeof NotificationPreferencesGrid>

/** Toggles update the grid, as a settings page would after the server answers. */
function Interactive({ categories, unavailable }: { categories: NotificationPreferenceRow[]; unavailable?: NotificationChannel[] }) {
  const [rows, setRows] = useState(categories)
  const change = ({ category, channel, enabled }: NotificationPreferenceChange) => setRows((current) => current.map((row) => (
    row.id === category ? { ...row, channels: row.channels.map((entry) => (entry.channel === channel ? { ...entry, enabled } : entry)) } : row
  )))
  return <NotificationPreferencesGrid categories={rows} unavailable={unavailable} onChange={change} />
}

export const Default: Story = { render: ({ categories, unavailable }) => <Interactive categories={categories} unavailable={unavailable} /> }

export const UnavailableChannel: Story = {
  args: { unavailable: ['whatsapp', 'sms'], unavailableHint: 'Not connected' },
}

export const SavingACell: Story = {
  args: { pending: [{ category: 'orders', channel: 'email' }] },
}

export const Loading: Story = { args: { loading: true } }

export const Mobile: Story = {
  render: ({ categories, unavailable }) => <Interactive categories={categories} unavailable={unavailable} />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
