import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './SectionHeader'

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: { title: 'New Arrivals' },
}

export const WithSubtitle: Story = {
  args: { title: 'Shoes', subtitle: 'Latest styles just in' },
}

export const WithAction: Story = {
  args: { title: 'Collections', actionLabel: 'See all', onAction: () => {} },
}

export const Mobile: Story = {
  args: { title: 'Fresh Kicks' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
