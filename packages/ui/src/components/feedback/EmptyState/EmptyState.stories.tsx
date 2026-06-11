import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InventoryIcon from '@mui/icons-material/Inventory';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Cart: Story = {
  args: {
    icon: <ShoppingCartIcon />,
    title: 'Your cart is empty',
    subtitle: 'Browse listings and add items you love. They\'ll show up here when you\'re ready to checkout.',
    action: { label: 'Browse listings', onClick: () => {} },
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: <SearchOffIcon />,
    title: 'No results found',
    subtitle: 'Try different keywords or remove some filters to see more listings.',
    action: { label: 'Clear filters', onClick: () => {}, variant: 'outline' },
  },
};

export const Orders: Story = {
  args: {
    icon: <LocalShippingIcon />,
    title: 'No orders yet',
    subtitle: 'When you purchase items, your orders and tracking info will appear here.',
    action: { label: 'Start shopping', onClick: () => {}, variant: 'earth' },
  },
};

export const Notifications: Story = {
  args: {
    icon: <NotificationsNoneIcon />,
    title: 'You\'re all caught up',
    subtitle: 'No new notifications. We\'ll let you know when something needs your attention.',
  },
};

export const Wishlist: Story = {
  args: {
    icon: <FavoriteBorderIcon />,
    title: 'Your wishlist is empty',
    subtitle: 'Tap the heart on any listing to save it here for later.',
    action: { label: 'Explore trending', onClick: () => {} },
  },
};

export const SellerInventory: Story = {
  args: {
    icon: <InventoryIcon />,
    title: 'No listings yet',
    subtitle: 'Create your first listing and start reaching buyers across Kenya.',
    action: { label: 'Create listing', onClick: () => {} },
  },
};

export const Elevated: Story = {
  args: {
    ...Cart.args,
    variant: 'elevated',
  },
};

export const Compact: Story = {
  args: {
    icon: <NotificationsNoneIcon />,
    title: 'No updates',
    subtitle: 'Check back later for new activity.',
    variant: 'compact',
  },
};

export const GridOfStates: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3, maxWidth: 900 }}>
      <Box sx={{ width: 260 }}>
        <EmptyState variant="elevated" icon={<ShoppingCartIcon />} title="Empty cart" subtitle="Add items to get started." action={{ label: 'Shop now', onClick: () => {} }} />
      </Box>
      <Box sx={{ width: 260 }}>
        <EmptyState variant="elevated" icon={<FavoriteBorderIcon />} title="No favorites" subtitle="Save listings you love." />
      </Box>
      <Box sx={{ width: 260 }}>
        <EmptyState variant="elevated" icon={<LocalShippingIcon />} title="No orders" subtitle="Your purchases appear here." />
      </Box>
    </Stack>
  ),
};

export const Mobile: Story = {
  args: Cart.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
