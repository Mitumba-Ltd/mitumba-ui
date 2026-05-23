import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaChip } from './MitumbaChip'

const meta: Meta<typeof MitumbaChip> = {
  title: 'Foundation/MitumbaChip',
  component: MitumbaChip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaChip>

export const Default: Story = {
  args: {
    label: 'Trusted',
    color: 'green',
    variant: 'filled',
    size: 'medium',
  },
}

export const Earth: Story = {
  args: {
    label: 'VAZI Featured',
    color: 'earth',
    variant: 'filled',
    size: 'medium',
  },
}

export const Neutral: Story = {
  args: {
    label: 'Pending',
    color: 'neutral',
    variant: 'filled',
    size: 'medium',
  },
}

export const Outlined: Story = {
  args: {
    label: 'Draft',
    color: 'green',
    variant: 'outlined',
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    label: 'XS',
    color: 'green',
    variant: 'filled',
    size: 'small',
  },
}

export const WithDelete: Story = {
  args: {
    label: 'Kisumu',
    color: 'neutral',
    variant: 'outlined',
    size: 'medium',
    onDelete: () => {},
  },
}

export const Clickable: Story = {
  args: {
    label: 'Click me',
    color: 'green',
    variant: 'filled',
    size: 'medium',
    onClick: () => {},
  },
}

export const Mobile: Story = {
  args: {
    label: 'Filtered',
    color: 'green',
    variant: 'filled',
    size: 'medium',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
