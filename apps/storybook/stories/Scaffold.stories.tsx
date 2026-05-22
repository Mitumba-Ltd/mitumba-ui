import type { Meta, StoryObj } from '@storybook/react'

function Scaffold() {
  return <div>Mitumba UI scaffold</div>
}

const meta: Meta<typeof Scaffold> = {
  title: 'Scaffold/Status',
  component: Scaffold,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Scaffold>

export const Ready: Story = {}
