import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaDivider } from './MitumbaDivider'

const meta: Meta<typeof MitumbaDivider> = {
  title: 'Layout/MitumbaDivider',
  component: MitumbaDivider,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MitumbaDivider>

export const Default: Story = {}
