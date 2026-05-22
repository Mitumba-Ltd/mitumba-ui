import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaTextField } from './MitumbaTextField'

const meta: Meta<typeof MitumbaTextField> = {
  title: 'Foundation/MitumbaTextField',
  component: MitumbaTextField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MitumbaTextField>

export const Default: Story = {
  args: {
    label: 'Full name',
    hint: 'John Doe',
    value: '',
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    hint: 'you@example.com',
    value: 'john@example.com',
    onChange: () => {},
  },
}

export const WithError: Story = {
  args: {
    label: 'Phone number',
    hint: '07XXXXXXXX',
    value: '12',
    onChange: () => {},
    error: 'Please enter a valid Kenyan phone number',
  },
}

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Price',
    hint: '2500',
    value: '',
    onChange: () => {},
    prefix: <span style={{ color: '#6B6B65' }}>KES</span>,
    suffix: <span style={{ color: '#6B6B65' }}>.00</span>,
  },
}

export const Multiline: Story = {
  args: {
    label: 'Description',
    hint: 'Describe your item...',
    value:
      'This is a vintage Nike Air Max 95 in great condition. Original box included.',
    onChange: () => {},
    multiline: true,
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Referral code',
    hint: 'MITUMBA20',
    value: 'MITUMBA20',
    onChange: () => {},
    disabled: true,
  },
}

export const Mobile: Story = {
  args: {
    label: 'Search',
    hint: 'Search for items...',
    value: '',
    onChange: () => {},
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
