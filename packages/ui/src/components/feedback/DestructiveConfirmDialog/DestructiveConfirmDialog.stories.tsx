import type { Meta, StoryObj } from '@storybook/react'
import { DestructiveConfirmDialog } from './DestructiveConfirmDialog'

const meta: Meta<typeof DestructiveConfirmDialog> = {
  title: 'Feedback/DestructiveConfirmDialog',
  component: DestructiveConfirmDialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof DestructiveConfirmDialog>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Delete this store',
    description: 'This will permanently delete your store, all listings, and order history. This action cannot be undone.',
    confirmPhrase: 'KisumuKicks',
    onConfirm: () => new Promise<void>((r) => { setTimeout(r, 1000) }),
  },
}

export const WithBlockers: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Delete your account',
    description: 'Your account and all associated data will be permanently removed.',
    blockers: ['You have 2 active stores — delete them first', 'You have pending orders that must be completed'],
    onConfirm: () => Promise.resolve(),
  },
}

export const WithTotp: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Delete your account',
    description: 'This will permanently delete your account. All data will be lost.',
    confirmPhrase: 'DELETE',
    requireTotp: true,
    onConfirm: () => new Promise<void>((r) => { setTimeout(r, 1000) }),
  },
}

export const Submitting: Story = {
  args: { ...Default.args, submitting: true },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
