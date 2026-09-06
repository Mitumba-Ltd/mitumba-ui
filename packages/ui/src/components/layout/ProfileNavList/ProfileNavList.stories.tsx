import type { Meta, StoryObj } from '@storybook/react'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SettingsIcon from '@mui/icons-material/Settings'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { ProfileNavList } from './ProfileNavList'

const meta: Meta<typeof ProfileNavList> = {
  title: 'Layout/ProfileNavList',
  component: ProfileNavList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ProfileNavList>

export const Default: Story = {
  args: {
    items: [
      { label: 'My Orders', icon: <ReceiptLongIcon />, onClick: () => {}, badge: 2 },
      { label: 'Saved Items', icon: <FavoriteBorderIcon />, onClick: () => {} },
      { label: 'Following', icon: <PeopleAltIcon />, onClick: () => {} },
      { label: 'Seller Dashboard', icon: <StorefrontIcon />, onClick: () => {} },
      { label: 'Account Settings', icon: <SettingsIcon />, onClick: () => {} },
    ],
  },
}

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}

export const AsLinks: Story = {
  args: {
    ariaLabel: 'Account',
    items: [
      { label: 'My Orders', icon: <ReceiptLongIcon />, href: '/orders', active: true, badge: 2 },
      { label: 'Saved Items', icon: <FavoriteBorderIcon />, href: '/saved' },
      { label: 'Following', icon: <PeopleAltIcon />, href: '/following' },
      { label: 'Account Settings', icon: <SettingsIcon />, href: '/settings' },
    ],
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const AsLinksMobile: Story = {
  args: AsLinks.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
