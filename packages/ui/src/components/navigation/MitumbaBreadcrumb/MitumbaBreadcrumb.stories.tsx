import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaBreadcrumb } from './MitumbaBreadcrumb'

const meta: Meta<typeof MitumbaBreadcrumb> = {
  title: 'Navigation/MitumbaBreadcrumb',
  component: MitumbaBreadcrumb,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MitumbaBreadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Shoes', href: '/shoes' },
      { label: 'Nike Air 1' },
    ],
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
