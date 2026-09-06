import type { Meta, StoryObj } from '@storybook/react'
import { AddTwoFactorMethodModal } from './AddTwoFactorMethodModal'

const meta: Meta<typeof AddTwoFactorMethodModal> = {
  title: 'Forms/AddTwoFactorMethodModal',
  component: AddTwoFactorMethodModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof AddTwoFactorMethodModal>

export const AllAvailable: Story = {
  args: {
    open: true,
    onClose: () => {},
    availableTypes: ['totp', 'sms', 'email'],
    onSelectType: () => {},
  },
}

export const TotpOnly: Story = {
  args: { ...AllAvailable.args, availableTypes: ['totp'] },
}

export const Mobile: Story = {
  args: AllAvailable.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const WithHeadingDesktop: Story = {
  args: { ...AllAvailable.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const WithHeadingMobile: Story = {
  args: { ...AllAvailable.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
