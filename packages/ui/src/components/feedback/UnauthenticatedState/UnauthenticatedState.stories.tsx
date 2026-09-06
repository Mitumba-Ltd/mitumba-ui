import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { UnauthenticatedState } from './UnauthenticatedState';

const meta: Meta<typeof UnauthenticatedState> = {
  title: 'Feedback/UnauthenticatedState',
  component: UnauthenticatedState,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    onSignIn: { action: 'onSignIn' },
  },
};

export default meta;
type Story = StoryObj<typeof UnauthenticatedState>;

export const Orders: Story = {
  args: {
    title: 'Sign in to view your orders',
    subtitle: 'Track your purchases, manage returns, and see your order history.',
    signInLabel: 'Sign In',
    secondaryAction: { label: 'Create Account', onClick: () => {} },
  },
};

export const Wishlist: Story = {
  args: {
    title: 'Sign in to see your wishlist',
    subtitle: 'Save items you love and get notified when prices drop.',
    icon: <FavoriteBorderIcon />,
    secondaryAction: { label: 'Create Account', onClick: () => {} },
  },
};

export const Cart: Story = {
  args: {
    title: 'Sign in to view your cart',
    subtitle: 'Your saved items are waiting for you.',
    icon: <ShoppingCartOutlinedIcon />,
  },
};

export const Inbox: Story = {
  args: {
    title: 'Sign in to view messages',
    subtitle: 'Chat with sellers, negotiate prices, and track deliveries.',
    icon: <InboxOutlinedIcon />,
    secondaryAction: { label: 'Create Account', onClick: () => {} },
  },
};

export const Notifications: Story = {
  args: {
    title: 'Sign in to see notifications',
    subtitle: 'Stay updated on price drops, new listings, and order updates.',
    icon: <NotificationsNoneIcon />,
  },
};

export const CustomLabel: Story = {
  args: {
    title: 'Welcome to Mitumba',
    subtitle: 'Sign in or create an account to start shopping.',
    signInLabel: 'Get Started',
    secondaryAction: { label: 'I already have an account', onClick: () => {} },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 500, mx: 'auto', py: 4 }}>
      <Box sx={{ border: '1px dashed #ddd', borderRadius: 2 }}>
        <UnauthenticatedState title="Sign in to view orders" subtitle="Track purchases and manage returns." onSignIn={() => {}} />
      </Box>
      <Box sx={{ border: '1px dashed #ddd', borderRadius: 2 }}>
        <UnauthenticatedState title="Sign in for wishlist" subtitle="Save items you love." icon={<FavoriteBorderIcon />} onSignIn={() => {}} secondaryAction={{ label: 'Create Account', onClick: () => {} }} />
      </Box>
    </Stack>
  ),
};

export const Mobile: Story = {
  args: Orders.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const MobileWithHeading: Story = {
  args: { ...Orders.args, titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const DesktopWithHeading: Story = {
  args: { ...Orders.args, titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
