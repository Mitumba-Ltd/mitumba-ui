import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EmptyState>

export const CartPreset: Story = {
  args: {
    icon: <ShoppingCartIcon />,
    title: 'Your cart is empty',
    subtitle: 'It looks like you haven\'t added any items to your cart yet. Start exploring our latest listings!',
    action: {
      label: 'Start Shopping',
      onClick: () => alert('Redirect to shop'),
    },
  },
}

export const OrdersPreset: Story = {
  args: {
    icon: <LocalShippingIcon />,
    title: 'No orders yet',
    subtitle: 'When you buy items, they will appear here. Track your shipments in real-time.',
    action: {
      label: 'Explore Listings',
      onClick: () => alert('Explore'),
      variant: 'earth',
    },
  },
}

export const NotificationsPreset: Story = {
  args: {
    icon: <NotificationsNoneIcon />,
    title: 'All caught up!',
    subtitle: 'You don\'t have any unread notifications at the moment. We\'ll let you know when something happens.',
  },
}

export const SearchPreset: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    subtitle: 'We couldn\'t find any items matching your search. Try adjusting your filters or searching for something else.',
    action: {
      label: 'Clear Filters',
      onClick: () => alert('Clear'),
      variant: 'outline',
    },
  },
}

export const ElevatedCards: Story = {
  render: () => (
    <Box sx={{ bgcolor: '#F8FAFF', p: 8 }}>
      <Stack direction="row" spacing={4} sx={{ maxWidth: 900, flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ width: 280 }}>
          <EmptyState 
            variant="elevated"
            title="No favorites"
            subtitle="You have nothing on your list yet. It's never too late to change it :)"
            icon={<FavoriteBorderIcon sx={{ color: '#FF7D7D' }} />}
          />
        </Box>
        <Box sx={{ width: 280 }}>
          <EmptyState 
            variant="elevated"
            title="Inbox empty"
            subtitle="You have no messages yet. Be the first to start a conversation."
            icon={<MailOutlineIcon sx={{ color: '#A5A6FF' }} />}
          />
        </Box>
        <Box sx={{ width: 280 }}>
          <EmptyState 
            variant="elevated"
            title="No connection"
            subtitle="Oops! It seems you're currently offline. Check your settings."
            icon={<WifiOffIcon sx={{ color: '#7DAAFF' }} />}
          />
        </Box>
      </Stack>
    </Box>
  ),
}

export const Compact: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 400 }}>
       <EmptyState 
         variant="compact"
         icon={<NotificationsNoneIcon />}
         title="No Updates"
         subtitle="Stay tuned for news."
       />
       <EmptyState 
         variant="compact"
         icon={<ShoppingCartIcon />}
         title="Empty Basket"
         subtitle="Add items to proceed."
         action={{ label: 'Go Shop', onClick: () => {} }}
       />
    </Stack>
  )
}
