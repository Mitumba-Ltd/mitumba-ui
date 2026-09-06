import type { Meta, StoryObj } from '@storybook/react'
import { RaiseDisputeModal } from './RaiseDisputeModal'

const meta: Meta<typeof RaiseDisputeModal> = {
  title: 'Commerce/RaiseDisputeModal',
  component: RaiseDisputeModal,
  tags: ['autodocs'],
}

export default meta
export type Story = StoryObj<typeof RaiseDisputeModal>

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

export const Default: Story = {
  args: {
    open: true,
    orderShortId: 'MTB-7X2K',
    onSubmit: async () => {
      await delay(1500)
    },
    submitting: false,
  },
}

export const Submitting: Story = {
  args: {
    open: true,
    orderShortId: 'MTB-7X2K',
    onSubmit: async () => {
      await delay(5000)
    },
    submitting: true,
  },
}

export const Mobile: Story = {
  args: {
    open: true,
    orderShortId: 'MTB-7X2K',
    onSubmit: async () => {
      await delay(1500)
    },
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}

export const WithHeadingDesktop: Story = {
  args: {
    open: true,
    orderShortId: 'MTB-7X2K',
    titleLevel: 2,
    errorMessage: 'Something went wrong. Please try again.',
    onSubmit: async () => {
      await delay(1500)
    },
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}

export const WithHeadingMobile: Story = {
  args: {
    open: true,
    orderShortId: 'MTB-7X2K',
    titleLevel: 2,
    onSubmit: async () => {
      await delay(1500)
    },
  },
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
