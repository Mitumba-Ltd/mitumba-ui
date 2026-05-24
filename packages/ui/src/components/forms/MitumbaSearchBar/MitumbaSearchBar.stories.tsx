import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaSearchBar } from './MitumbaSearchBar'

const meta: Meta<typeof MitumbaSearchBar> = {
  title: 'Forms/MitumbaSearchBar',
  component: MitumbaSearchBar,
  tags: ['autodocs'],
}

export default meta
export type Story = StoryObj<typeof MitumbaSearchBar>

const defaultArgs = {
  value: '',
  placeholder: 'Search for items...',
  onChange: (() => undefined) as (value: string) => void,
  onSubmit: (() => undefined) as (query: string) => void,
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithValue: Story = {
  args: {
    ...defaultArgs,
    value: 'vintage shoes',
  },
}

export const WithSuggestions: Story = {
  args: {
    ...defaultArgs,
    value: '',
    placeholder: 'Search for items...',
    suggestions: ['Vintage Shoes', 'Designer Bags', 'Denim Jackets', 'Sneakers'],
  },
}
