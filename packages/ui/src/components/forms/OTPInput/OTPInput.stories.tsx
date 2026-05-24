import type { Meta, StoryObj } from '@storybook/react'
import { OTPInput } from './OTPInput'

const meta: Meta<typeof OTPInput> = {
  title: 'Forms/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OTPInput>

const defaultArgs = () => ({
  value: '',
  onChange: (() => undefined) as (value: string) => void,
  onComplete: (() => undefined) as (otp: string) => void,
  error: false,
  loading: false,
})

export const Default: Story = {
  args: defaultArgs(),
}

export const WithError: Story = {
  args: {
    ...defaultArgs(),
    error: true,
  },
}

export const Loading: Story = {
  args: {
    ...defaultArgs(),
    loading: true,
  },
}
