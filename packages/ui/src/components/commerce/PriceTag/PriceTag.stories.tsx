import type { Meta, StoryObj } from '@storybook/react'
import { PriceTag } from './PriceTag'

const meta: Meta<typeof PriceTag> = {
  title: 'Commerce/PriceTag',
  component: PriceTag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PriceTag>

export const Default: Story = {
  args: {
    priceKes: 2500,
    size: 'medium',
    color: 'default',
    strikethrough: false,
  },
}

export const Green: Story = {
  args: {
    priceKes: 2500,
    size: 'medium',
    color: 'green',
    strikethrough: false,
  },
}

export const Earth: Story = {
  args: {
    priceKes: 2500,
    size: 'medium',
    color: 'earth',
    strikethrough: false,
  },
}

export const Large: Story = {
  args: {
    priceKes: 2500,
    size: 'large',
    color: 'default',
    strikethrough: false,
  },
}

export const Small: Story = {
  args: {
    priceKes: 2500,
    size: 'small',
    color: 'default',
    strikethrough: false,
  },
}

export const Strikethrough: Story = {
  args: {
    priceKes: 3500,
    size: 'medium',
    color: 'default',
    strikethrough: true,
  },
}
