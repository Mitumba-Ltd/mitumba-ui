import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaSelect } from './MitumbaSelect'

const meta: Meta<typeof MitumbaSelect> = {
  title: 'Foundation/MitumbaSelect',
  component: MitumbaSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaSelect>

const cities = [
  { value: 'nairobi', label: 'Nairobi' },
  { value: 'kisumu', label: 'Kisumu' },
  { value: 'mombasa', label: 'Mombasa' },
  { value: 'nakuru', label: 'Nakuru' },
]

export const Default: Story = {
  args: {
    label: 'City',
    options: cities,
    value: '',
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    label: 'City',
    options: cities,
    value: 'kisumu',
    onChange: () => {},
  },
}

export const WithError: Story = {
  args: {
    label: 'City',
    options: cities,
    value: '',
    onChange: () => {},
    error: 'Please select a valid city',
  },
}

export const Disabled: Story = {
  args: {
    label: 'City',
    options: cities,
    value: 'nairobi',
    onChange: () => {},
    disabled: true,
  },
}

export const Mobile: Story = {
  args: {
    label: 'City',
    options: cities,
    value: '',
    onChange: () => {},
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
