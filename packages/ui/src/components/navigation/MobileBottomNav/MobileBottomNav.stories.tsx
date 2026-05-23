import type { Meta, StoryObj } from '@storybook/react'
import { MobileBottomNav } from './MobileBottomNav'

const meta: Meta<typeof MobileBottomNav> = {
  title: 'Navigation/MobileBottomNav',
  component: MobileBottomNav,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MobileBottomNav>

export const Default: Story = {
  args: { activeTab: 'home', onTabChange: () => {} },
}

export const VaziActive: Story = {
  args: { activeTab: 'vazi', onTabChange: () => {} },
}

export const VaziDot: Story = {
  args: { activeTab: 'home', vaziDotActive: true, onTabChange: () => {} },
}

export const Mobile: Story = {
  args: { activeTab: 'home', onTabChange: () => {} },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
