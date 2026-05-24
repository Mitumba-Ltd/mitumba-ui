import type { Meta, StoryObj } from '@storybook/react'
import { PhoneInput } from './PhoneInput'

const meta: Meta<typeof PhoneInput> = {
  title: 'Forms/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PhoneInput>

const defaultArgs = () => ({
  value: '',
  onChange: (() => undefined) as (value: string) => void,
  error: undefined,
  disabled: false,
})

export const Default: Story = {
  args: defaultArgs(),
}

export const WithValue: Story = {
  args: {
    ...defaultArgs(),
    value: '712345678',
  },
}

export const WithError: Story = {
  args: {
    ...defaultArgs(),
    error: 'Please enter a valid phone number',
  },
}

export const Disabled: Story = {
  args: {
    ...defaultArgs(),
    value: '712345678',
    disabled: true,
  },
}
