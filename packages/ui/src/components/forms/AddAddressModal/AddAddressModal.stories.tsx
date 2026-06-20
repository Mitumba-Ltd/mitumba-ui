import type { Meta, StoryObj } from '@storybook/react'
import { AddAddressModal } from './AddAddressModal'

const meta: Meta<typeof AddAddressModal> = {
  title: 'Forms/AddAddressModal',
  component: AddAddressModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof AddAddressModal>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
  },
}

export const FirstAddress: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
    isFirstAddress: true,
  },
}

export const Saving: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
    saving: true,
  },
}

export const WithError: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
    error: 'Failed to save address. Please try again.',
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
