import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaFormatProvider } from '../../../format'
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
    price: 2500,
    size: 'medium',
    color: 'default',
    strikethrough: false,
  },
}

export const Green: Story = {
  args: {
    price: 2500,
    size: 'medium',
    color: 'green',
    strikethrough: false,
  },
}

export const Earth: Story = {
  args: {
    price: 2500,
    size: 'medium',
    color: 'earth',
    strikethrough: false,
  },
}

export const Large: Story = {
  args: {
    price: 2500,
    size: 'large',
    color: 'default',
    strikethrough: false,
  },
}

export const Small: Story = {
  args: {
    price: 2500,
    size: 'small',
    color: 'default',
    strikethrough: false,
  },
}

export const Strikethrough: Story = {
  args: {
    price: 3500,
    size: 'medium',
    color: 'default',
    strikethrough: true,
  },
}

/** Inside a MitumbaFormatProvider the same props render in that market's currency. */
export const OtherCurrency: Story = {
  args: {
    price: 5000,
    size: 'medium',
    color: 'default',
  },
  decorators: [
    (StoryComponent) => (
      <MitumbaFormatProvider money={{ currencyCode: 'UGX', locale: 'en-UG' }}>
        <StoryComponent />
      </MitumbaFormatProvider>
    ),
  ],
}
