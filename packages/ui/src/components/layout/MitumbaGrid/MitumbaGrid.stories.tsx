import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaGrid } from './MitumbaGrid'

const meta: Meta<typeof MitumbaGrid> = {
  title: 'Layout/MitumbaGrid',
  component: MitumbaGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MitumbaGrid>

export const Default: Story = {
  args: {
    children: (
      <>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{ background: '#EAEAE7', padding: 16, textAlign: 'center' }}>
            Item {n}
          </div>
        ))}
      </>
    ),
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
