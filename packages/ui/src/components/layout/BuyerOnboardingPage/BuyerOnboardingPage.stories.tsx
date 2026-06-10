import type { Meta, StoryObj } from '@storybook/react';
import { BuyerOnboardingPage } from './BuyerOnboardingPage';

const KENYA_CITIES = [
  { id: 'nairobi', name: 'Nairobi' },
  { id: 'mombasa', name: 'Mombasa' },
  { id: 'kisumu', name: 'Kisumu' },
  { id: 'nakuru', name: 'Nakuru' },
  { id: 'eldoret', name: 'Eldoret' },
  { id: 'thika', name: 'Thika' },
  { id: 'malindi', name: 'Malindi' },
  { id: 'kitale', name: 'Kitale' },
  { id: 'garissa', name: 'Garissa' },
  { id: 'nyeri', name: 'Nyeri' },
  { id: 'machakos', name: 'Machakos' },
  { id: 'meru', name: 'Meru' },
  { id: 'lamu', name: 'Lamu' },
  { id: 'nanyuki', name: 'Nanyuki' },
  { id: 'naivasha', name: 'Naivasha' },
  { id: 'kilifi', name: 'Kilifi' },
  { id: 'kakamega', name: 'Kakamega' },
  { id: 'bungoma', name: 'Bungoma' },
  { id: 'migori', name: 'Migori' },
  { id: 'homabay', name: 'Homa Bay' },
];

const meta: Meta<typeof BuyerOnboardingPage> = {
  title: 'Layout/BuyerOnboardingPage',
  component: BuyerOnboardingPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'onComplete' },
  },
};

export default meta;
type Story = StoryObj<typeof BuyerOnboardingPage>;

export const Default: Story = {
  args: { cities: KENYA_CITIES },
};

export const WithHeroImage: Story = {
  args: {
    cities: KENYA_CITIES,
    heroImageUrl: 'https://mitumba.stanl.ink/hero-aspect.png',
  },
};

export const WithInitialData: Story = {
  args: {
    cities: KENYA_CITIES,
    initialData: { display_name: 'Amina K.', city: 'nairobi', phone: '712345678' },
  },
};

export const LoadingState: Story = {
  args: { cities: KENYA_CITIES, loading: true },
};

export const WithError: Story = {
  args: { cities: KENYA_CITIES, error: 'Phone number is already registered to another account.' },
};

export const Mobile: Story = {
  args: { cities: KENYA_CITIES },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
