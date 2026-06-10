import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ListingCard } from './ListingCard';

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/ListingCard',
  component: ListingCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    onSaveToggle: { action: 'onSaveToggle' },
    onAddToCart: { action: 'onAddToCart' },
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 220 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof ListingCard>;

export const Default: Story = {
  args: {
    id: 'abc123',
    title: 'Nike Air Force 1 Low White',
    price: 2500,
    media: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'],
    storeName: 'NairobiKicks',
    condition: 'like_new',
  },
};

export const MultipleImages: Story = {
  args: {
    ...Default.args,
    media: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    ],
  },
};

export const WithVideo: Story = {
  args: {
    ...Default.args,
    title: 'Vintage Leather Jacket — See it move',
    media: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
    ],
  },
};

export const Saved: Story = {
  args: { ...Default.args, isSaved: true },
};

export const WithAddToCart: Story = {
  args: { ...Default.args },
};

export const NoCondition: Story = {
  args: { ...Default.args, condition: undefined },
};

export const NoStore: Story = {
  args: { ...Default.args, storeName: undefined },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: "Vintage Levi's 501 Original Fit Stonewash Blue Denim Jeans W32 L30 Made in USA — Classic American Heritage",
  },
};

export const ConditionNew: Story = { args: { ...Default.args, condition: 'new' } };
export const ConditionGood: Story = { args: { ...Default.args, condition: 'good' } };
export const ConditionFair: Story = { args: { ...Default.args, condition: 'fair' } };

export const HighPrice: Story = {
  args: { ...Default.args, price: 45000, title: 'Gucci Monogram Crossbody Bag' },
};

export const InGrid: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: '12px', maxWidth: 960, mx: 'auto' }}>
        <ListingCard id="1" title="Nike Air Force 1" price={2500} media={['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80']} storeName="NairobiKicks" condition="like_new" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="2" title="Vintage Denim Jacket — 90s Oversized" price={4500} media={['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80']} storeName="ThriftHub" condition="good" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="3" title="Leather Chelsea Boots" price={8500} media={['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=80']} storeName="KisumuStyles" condition="like_new" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="4" title="Retro Band Tee" price={1200} media={['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80']} storeName="VintageKE" condition="fair" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="5" title="Adidas Originals Track Pants" price={3200} media={['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80']} storeName="MombasaFinds" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="6" title="Canvas Tote Bag" price={900} media={['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80']} storeName="BagDeals" condition="new" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="7" title="Casio Vintage Watch" price={6800} media={['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80']} condition="good" onSaveToggle={() => {}} onAddToCart={() => {}} />
        <ListingCard id="8" title="Wool Overcoat — Camel" price={12000} media={['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=400&q=80']} storeName="LuxThrift" condition="like_new" onSaveToggle={() => {}} onAddToCart={() => {}} />
      </Box>
    ),
  ],
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [(Story) => <Box sx={{ maxWidth: 170 }}><Story /></Box>],
};
