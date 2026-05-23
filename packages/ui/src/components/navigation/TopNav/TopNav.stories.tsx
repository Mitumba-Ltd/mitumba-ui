import type { Meta, StoryObj } from '@storybook/react'
import { TopNav } from './TopNav'

const meta: Meta<typeof TopNav> = {
  title: 'Navigation/TopNav',
  component: TopNav,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TopNav>

export const Default: Story = {
  args: {
    searchValue: '',
    onSearchChange: () => {},
    onSearchSubmit: () => {},
    onCartClick: () => {},
    cartCount: 2,
    onAuthClick: () => {},
  },
}

export const LoggedIn: Story = {
  args: {
    isAuthenticated: true,
    user: { name: 'Alice Mwangi', avatarUrl: 'https://placehold.co/40x40' },
    onProfileClick: () => {},
    onCartClick: () => {},
    cartCount: 5,
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
