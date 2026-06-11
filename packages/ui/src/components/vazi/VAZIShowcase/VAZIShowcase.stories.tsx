import type { Meta, StoryObj } from '@storybook/react';
import { VAZIShowcase } from './VAZIShowcase';
import type { VAZIShowcaseOutfit } from './VAZIShowcase.types';

const meta: Meta<typeof VAZIShowcase> = {
  title: 'VAZI/VAZIShowcase',
  component: VAZIShowcase,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    onIndexChange: { action: 'onIndexChange' },
    onItemClick: { action: 'onItemClick' },
    onShopAll: { action: 'onShopAll' },
  },
};

export default meta;
type Story = StoryObj<typeof VAZIShowcase>;

const SAMPLE_OUTFITS: VAZIShowcaseOutfit[] = [
  {
    id: 'outfit-1',
    modelMediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    modelMediaType: 'image',
    modelAlt: 'Model wearing casual streetwear outfit',
    totalPrice: 4200,
    items: [
      { id: 'l1', title: 'Oversized Denim Jacket', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&q=80' },
      { id: 'l2', title: 'White Crop Top', price: 600, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=100&q=80' },
      { id: 'l3', title: 'High-waist Mom Jeans', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=100&q=80' },
      { id: 'l4', title: 'White Sneakers', price: 600, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'outfit-2',
    modelMediaUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    modelMediaType: 'image',
    modelAlt: 'Model wearing elegant evening outfit',
    totalPrice: 8500,
    items: [
      { id: 'l5', title: 'Black Blazer', price: 3500, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=100&q=80' },
      { id: 'l6', title: 'Silk Camisole', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80' },
      { id: 'l7', title: 'Tailored Trousers', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=100&q=80' },
      { id: 'l8', title: 'Leather Heels', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'outfit-3',
    modelMediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    modelMediaType: 'image',
    modelAlt: 'Model wearing sporty casual outfit',
    totalPrice: 3800,
    items: [
      { id: 'l9', title: 'Track Jacket', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80' },
      { id: 'l10', title: 'Running Shorts', price: 800, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=100&q=80' },
      { id: 'l11', title: 'Retro Trainers', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'outfit-4',
    modelMediaUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    modelMediaType: 'image',
    modelAlt: 'Model wearing bohemian summer outfit',
    totalPrice: 5200,
    items: [
      { id: 'l12', title: 'Floral Maxi Dress', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=100&q=80' },
      { id: 'l13', title: 'Straw Hat', price: 400, imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=100&q=80' },
      { id: 'l14', title: 'Leather Sandals', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=100&q=80' },
      { id: 'l15', title: 'Crossbody Bag', price: 800, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80' },
    ],
  },
];

export const Default: Story = {
  args: { outfits: SAMPLE_OUTFITS },
};

export const SingleOutfit: Story = {
  args: { outfits: [SAMPLE_OUTFITS[0]] },
};

export const StartAtSecond: Story = {
  args: { outfits: SAMPLE_OUTFITS, activeIndex: 1 },
};
