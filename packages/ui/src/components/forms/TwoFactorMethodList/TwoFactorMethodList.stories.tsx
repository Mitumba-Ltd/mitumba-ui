import type { Meta, StoryObj } from '@storybook/react'
import { TwoFactorMethodList } from './TwoFactorMethodList'
import type { TwoFactorMethodView } from './TwoFactorMethodList.types'

const meta: Meta<typeof TwoFactorMethodList> = {
  title: 'Forms/TwoFactorMethodList',
  component: TwoFactorMethodList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof TwoFactorMethodList>

const methods: TwoFactorMethodView[] = [
  { id: '1', type: 'totp', label: 'Google Authenticator', enabled: true, isPrimary: true, pending: false, lastUsedAt: '2 hours ago' },
  { id: '2', type: 'sms', label: null, enabled: true, isPrimary: false, pending: false, lastUsedAt: '3 days ago' },
  { id: '3', type: 'email', label: null, enabled: false, isPrimary: false, pending: true },
]

export const Default: Story = {
  args: { methods, onAdd: () => {}, onEnable: () => {}, onDisable: () => {}, onDelete: () => {}, onSetPrimary: () => {} },
}

export const Empty: Story = {
  args: { methods: [], onAdd: () => {}, onEnable: () => {}, onDisable: () => {}, onDelete: () => {}, onSetPrimary: () => {} },
}

export const Loading: Story = {
  args: { ...Default.args, loading: true },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const WithHeadingDesktop: Story = {
  args: { ...Default.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const WithHeadingMobile: Story = {
  args: { ...Default.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
