import type { Meta, StoryObj } from '@storybook/react'
import { SellerDisputeResponseCard } from './SellerDisputeResponseCard'

const meta: Meta<typeof SellerDisputeResponseCard> = {
  title: 'Commerce/SellerDisputeResponseCard',
  component: SellerDisputeResponseCard,
  parameters: { layout: 'padded' },
  args: {
    reason: 'Item not as described',
    description: 'The dress has a large stain on the front that was not shown in the listing photos.',
    onAccept: () => new Promise<void>((r) => { setTimeout(r, 1000) }),
    onContest: () => new Promise<void>((r) => { setTimeout(r, 1000) }),
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SellerDisputeResponseCard>

export const Default: Story = {}

export const Submitting: Story = {
  args: { submitting: true },
}

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const WithHeadingDesktop: Story = {
  args: { titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const WithHeadingMobile: Story = {
  args: { titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
