import type { Meta, StoryObj } from '@storybook/react'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  title: 'Layout/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ProfileCard>

export const Default: Story = {
  args: {
    name: 'Stanley Isaac',
    avatarUrl: 'https://placehold.co/192',
    roles: [{ label: 'Buyer' }, { label: 'Seller', icon: <StorefrontIcon fontSize="small" />, color: 'secondary' }],
    actionLabel: 'Edit Profile',
    onAction: () => {},
    subtitle: 'Member since Jan 2024',
  },
}

export const BuyerOnly: Story = {
  args: { name: 'Jane Achieng', roles: [{ label: 'Buyer' }], actionLabel: 'Edit Profile', onAction: () => {} },
}

export const NoAction: Story = {
  args: { name: 'Anonymous', roles: [] },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
