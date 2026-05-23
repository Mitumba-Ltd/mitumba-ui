import type { Meta, StoryObj } from '@storybook/react'
import { PageContainer } from './PageContainer'

const meta: Meta<typeof PageContainer> = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PageContainer>

export const Default: Story = {
  args: {
    children: <div style={{ background: '#EAEAE7', padding: 16 }}>Container content</div>,
    maxWidth: 'lg',
  },
}

export const NoPadding: Story = {
  args: {
    children: <div style={{ background: '#EAEAE7', padding: 16 }}>No padding</div>,
    noPadding: true,
  },
}

export const Mobile: Story = {
  args: {
    children: <div style={{ background: '#EAEAE7', padding: 16 }}>Mobile view</div>,
  },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
