import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SellerCard } from './SellerCard';

const meta: Meta<typeof SellerCard> = {
  title: 'Seller/SellerCard',
  component: SellerCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onTap: { action: 'onTap' } },
  decorators: [(Story) => <Box sx={{ maxWidth: 380 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof SellerCard>;

export const Trusted: Story = {
  args: {
    name: 'NairobiKicks',
    sellerId: "seller-1",
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    city: 'Nairobi',
    stiScore: 92,
    totalListings: 48,
  },
};

export const Good: Story = {
  args: {
    name: 'ThriftHub Kisumu',
    sellerId: "seller-2",
    city: 'Kisumu',
    stiScore: 68,
    totalListings: 15,
  },
};

export const AtRisk: Story = {
  args: {
    name: 'QuickSells',
    sellerId: "seller-3",
    city: 'Mombasa',
    stiScore: 42,
    totalListings: 3,
  },
};

export const VaziFeatured: Story = {
  args: {
    name: 'AminaFinds',
    sellerId: "seller-4",
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    city: 'Nakuru',
    stiScore: 88,
    totalListings: 72,
    isVaziFeatured: true,
  },
};

export const LongName: Story = {
  args: {
    name: 'Premium Vintage Clothing & Accessories Kenya',
    sellerId: "seller-5",
    city: 'Eldoret',
    stiScore: 75,
    totalListings: 120,
  },
};

export const ListOfSellers: Story = {
  decorators: [
    () => (
      <Stack spacing={2} sx={{ maxWidth: 380 }}>
        <SellerCard sellerId="s1" name="NairobiKicks" city="Nairobi" stiScore={92} totalListings={48} avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" onTap={() => {}} />
        <SellerCard sellerId="s2" name="ThriftHub" city="Kisumu" stiScore={68} totalListings={15} onTap={() => {}} />
        <SellerCard sellerId="s3" name="AminaFinds" city="Nakuru" stiScore={88} totalListings={72} isVaziFeatured onTap={() => {}} />
        <SellerCard sellerId="s4" name="MombasaStyles" city="Mombasa" stiScore={45} totalListings={8} onTap={() => {}} />
      </Stack>
    ),
  ],
};

export const Mobile: Story = {
  args: Trusted.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const AsLinkWithHeading: Story = {
  args: {
    ...Trusted.args,
    href: '/sellers/seller-1',
    titleLevel: 2,
    actionLabel: 'Visit Store',
    onAction: () => {},
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const MobileAsLink: Story = {
  args: {
    ...Trusted.args,
    href: '/sellers/seller-1',
    titleLevel: 2,
    actionLabel: 'Visit Store',
    onAction: () => {},
  },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
