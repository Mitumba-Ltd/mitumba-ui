import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QuietHoursField } from './QuietHoursField'
import type { QuietHoursValue } from './QuietHoursField.types'

const meta: Meta<typeof QuietHoursField> = {
  title: 'Notifications/QuietHoursField',
  component: QuietHoursField,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    value: { enabled: true, start: '21:00', end: '07:00' },
    onChange: () => undefined,
    timeZoneLabel: 'Africa/Nairobi',
    description: 'Push, WhatsApp, Telegram and SMS wait until the end. Security alerts still arrive.',
  },
}

export default meta

type Story = StoryObj<typeof QuietHoursField>

function Interactive({ value, timeZoneLabel, description }: { value: QuietHoursValue; timeZoneLabel?: string; description?: string }) {
  const [current, setCurrent] = useState(value)
  return <QuietHoursField value={current} onChange={setCurrent} timeZoneLabel={timeZoneLabel} description={description} />
}

export const Overnight: Story = {
  render: ({ value, timeZoneLabel, description }) => <Interactive value={value} timeZoneLabel={timeZoneLabel} description={description} />,
}

export const SameDay: Story = { args: { value: { enabled: true, start: '13:00', end: '14:30' } } }

export const Off: Story = { args: { value: { enabled: false, start: '21:00', end: '07:00' } } }

export const Disabled: Story = { args: { disabled: true } }

export const Mobile: Story = {
  render: ({ value, timeZoneLabel, description }) => <Interactive value={value} timeZoneLabel={timeZoneLabel} description={description} />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
