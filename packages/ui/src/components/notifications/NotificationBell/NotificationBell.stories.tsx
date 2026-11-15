import type { Meta, StoryObj } from '@storybook/react'
import { NotificationBell } from './NotificationBell'

const meta: Meta<typeof NotificationBell> = {
  title: 'Notifications/NotificationBell',
  component: NotificationBell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: () => undefined },
}

export default meta

type Story = StoryObj<typeof NotificationBell>

export const None: Story = { args: { count: 0 } }
export const Some: Story = { args: { count: 7 } }
export const Many: Story = { args: { count: 120 } }
export const AsLink: Story = { args: { count: 2, href: '/notifications', size: 'small' } }
