import type { Meta, StoryObj } from '@storybook/react'
import { MitumbaPrimaryButton } from './MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaPrimaryButton> = {
  title: 'Foundation/MitumbaPrimaryButton',
  component: MitumbaPrimaryButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    label: 'Sell now',
    fullWidth: true,
    size: 'medium',
    variant: 'primary',
  },
}

export default meta

type Story = StoryObj<typeof MitumbaPrimaryButton>

export const Default: Story = {}

export const Earth: Story = {
  args: {
    label: 'Buy this look',
    variant: 'earth',
  },
}

export const Ghost: Story = {
  args: {
    label: 'Save for later',
    variant: 'ghost',
  },
}

export const Small: Story = {
  args: {
    label: 'Apply',
    fullWidth: false,
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    label: 'Start selling',
    size: 'large',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <span aria-hidden="true">+</span>,
    label: 'Add listing',
  },
}

export const Loading: Story = {
  args: {
    label: 'Publishing listing',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Complete profile first',
    disabled: true,
  },
}

export const Mobile: Story = {
  args: {
    label: 'Continue',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const EdgeCaseContent: Story = {
  args: {
    label: 'Publish this listing after checking seller trust, delivery coverage, and VAZI eligibility',
  },
}
