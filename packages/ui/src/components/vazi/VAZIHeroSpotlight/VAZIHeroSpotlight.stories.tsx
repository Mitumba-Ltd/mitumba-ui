import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { VAZIHeroSpotlight } from './VAZIHeroSpotlight';
import type { VAZIHeroOutfit } from './VAZIHeroSpotlight.types';

const meta: Meta<typeof VAZIHeroSpotlight> = {
  title: 'VAZI/VAZIHeroSpotlight',
  component: VAZIHeroSpotlight,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onShopLook: { action: 'onShopLook' },
    onItemClick: { action: 'onItemClick' },
    onSeeAll: { action: 'onSeeAll' },
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 1100, mx: 'auto' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof VAZIHeroSpotlight>;

const OUTFITS: VAZIHeroOutfit[] = [
  {
    id: 'hero-1',
    modelMediaUrl: 'https://github.com/Mitumba-Ltd/assets/raw/main/lab/vazi/p-webm/webm-video-of-a-guy-001.webm',
    modelMediaType: 'video',
    modelAlt: 'Model in earth tone outfit',
    name: 'Earth Tone Minimalist',
    totalPrice: 4200,
    items: [
      { id: 'h1', title: 'Oversized Denim Jacket', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&q=80' },
      { id: 'h2', title: 'White Crop Top', price: 600, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=100&q=80' },
      { id: 'h3', title: 'High-waist Jeans', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=100&q=80' },
      { id: 'h4', title: 'White Sneakers', price: 600, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'hero-2',
    modelMediaUrl: 'https://github.com/Mitumba-Ltd/assets/raw/main/lab/vazi/p-webm/webm-video-of-a-guy-001.webm',
    modelMediaType: 'video',
    modelAlt: 'Model in streetwear',
    name: 'Streetwear Fusion',
    totalPrice: 6800,
    items: [
      { id: 'h5', title: 'Black Blazer', price: 3500, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=100&q=80' },
      { id: 'h6', title: 'Tailored Trousers', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=100&q=80' },
      { id: 'h7', title: 'Leather Heels', price: 800, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'hero-3',
    modelMediaUrl: 'https://github.com/Mitumba-Ltd/assets/raw/main/lab/vazi/p-webm/webm-video-of-a-guy-001.webm',
    modelMediaType: 'video',
    modelAlt: 'Model in casual outfit',
    name: 'Weekend Casual',
    totalPrice: 3200,
    items: [
      { id: 'h8', title: 'Track Jacket', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80' },
      { id: 'h9', title: 'Running Shorts', price: 800, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=100&q=80' },
      { id: 'h10', title: 'Retro Trainers', price: 900, imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=100&q=80' },
    ],
  },
  {
    id: 'hero-4',
    modelMediaUrl: 'https://github.com/Mitumba-Ltd/assets/raw/main/lab/vazi/p-webm/webm-video-of-a-guy-001.webm',
    modelMediaType: 'video',
    modelAlt: 'Model in vintage look',
    name: 'Vintage Revival',
    totalPrice: 5100,
    items: [
      { id: 'h11', title: 'Vintage Leather Jacket', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&q=80' },
      { id: 'h12', title: 'Band Tee', price: 900, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=100&q=80' },
      { id: 'h13', title: 'Chelsea Boots', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=100&q=80' },
    ],
  },
];

export const Default: Story = {
  args: { outfits: OUTFITS },
};

export const TwoModels: Story = {
  args: { outfits: OUTFITS.slice(0, 2) },
};

export const Mobile: Story = {
  args: { outfits: OUTFITS },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

/**
 * Journey — Desktop (1280px). Semantic h2 title + native "See all" link
 * (renders as an anchor when `seeAllHref` is set). Each model is a native
 * `<button>`; Tab to a model and press Enter/Space to open the labelled dialog
 * popover, which closes on Escape or an outside click and returns focus to the
 * triggering model. Exercises responsive heading typography under the host
 * theme.
 */
export const JourneyDesktop1280: Story = {
  args: { outfits: OUTFITS, titleLevel: 2, seeAllHref: '/vazi/featured' },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

/**
 * Journey — Mobile (375px). Horizontally scrollable model row with the same
 * keyboard-accessible native model buttons and labelled popover (Escape /
 * outside-close / focus-return). Title emitted as h2 for correct document
 * outline on small screens.
 */
export const JourneyMobile375: Story = {
  args: { outfits: OUTFITS, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
