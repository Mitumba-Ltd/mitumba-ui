import type { Meta, StoryObj } from '@storybook/react'
import { NotificationItem } from './NotificationItem'

const NOW = new Date('2026-11-15T10:00:00Z')

const meta: Meta<typeof NotificationItem> = {
  title: 'Notifications/NotificationItem',
  component: NotificationItem,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { now: NOW, onNavigate: () => undefined },
}

export default meta

type Story = StoryObj<typeof NotificationItem>

export const UnreadWithActions: Story = {
  args: {
    title: 'Your order is on its way',
    body: 'Gikomba Finds shipped order A1B2C3D4. Expected in 3-5 days.',
    createdAt: '2026-11-15T09:55:00Z',
    unread: true,
    category: 'orders',
    link: { route: '/orders/A1B2C3D4' },
    actions: [
      { label: 'Track order', link: { route: '/orders/A1B2C3D4' } },
      { label: 'Message seller', link: { route: '/messages' } },
    ],
  },
}

export const Read: Story = {
  args: {
    title: 'Payout sent',
    body: 'KES 4,200 is on its way to your M-Pesa.',
    createdAt: '2026-11-14T08:00:00Z',
    unread: false,
    category: 'payments',
  },
}

export const Collapsed: Story = {
  args: {
    title: 'New message report',
    body: 'Reported for spam.',
    createdAt: '2026-11-15T09:30:00Z',
    unread: true,
    category: 'operations',
    count: 3,
    link: { route: '/message-reports' },
  },
}

export const NoLink: Story = {
  args: {
    title: 'Service update',
    body: 'M-Pesa payments are slower than usual this morning.',
    createdAt: '2026-11-15T07:00:00Z',
    unread: false,
    category: 'announcements',
  },
}

export const LongTitleMobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
  args: {
    title: 'A dispute was opened on order A1B2C3D4 and the payout is on hold until it is resolved',
    body: 'Reason: item not as described. The payout is on hold until it\'s resolved.',
    createdAt: '2026-11-15T09:59:30Z',
    unread: true,
    category: 'orders',
    link: { route: '/orders/A1B2C3D4' },
    actions: [{ label: 'View dispute', link: { route: '/orders/A1B2C3D4/dispute' } }, { label: 'Get help', link: { url: 'https://help.mitumba.africa' } }],
  },
}
