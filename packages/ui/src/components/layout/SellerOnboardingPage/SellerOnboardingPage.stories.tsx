import type { Meta, StoryObj } from '@storybook/react';
import { SellerOnboardingPage } from './SellerOnboardingPage';

const meta: Meta<typeof SellerOnboardingPage> = {
  title: 'Layout/SellerOnboardingPage',
  component: SellerOnboardingPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    onStepChange: { action: 'onStepChange' },
    onComplete: { action: 'onComplete' },
  },
};

export default meta;
type Story = StoryObj<typeof SellerOnboardingPage>;

export const Welcome: Story = { args: { currentStep: 0 } };

export const Identity: Story = {
  args: {
    currentStep: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onProfilePhotoUpload: async (_file: File) => {
      await new Promise<void>((r) => { setTimeout(r, 1500); });
      return 'https://placehold.co/100x100';
    },
  },
};

export const Business: Story = { args: { currentStep: 2, initialData: { sellerType: 'individual' } } };

export const BusinessRegistered: Story = { args: { currentStep: 2, initialData: { sellerType: 'business', businessName: 'Nairobi Threads Ltd' } } };

export const WhatYouSell: Story = { args: { currentStep: 3, initialData: { categories: ["Women's Wear", 'Shoes'], conditionGrades: ['A', 'B'], deliveryMethod: 'self' } } };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockUpload = async (_file: File): Promise<string> => {
  await new Promise<void>((r) => { setTimeout(r, 1200); });
  return 'https://placehold.co/400x400';
};

export const StoreSetup: Story = {
  args: {
    currentStep: 4,
    initialData: { storeName: 'NairobiKicks', storeTagline: 'Premium thrift in Nairobi' },
    onStoreLogoUpload: mockUpload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onStoreBannerUpload: async (_file: File) => { await new Promise<void>((r) => { setTimeout(r, 1500); }); return 'https://placehold.co/1200x300'; },
  },
};

export const Confirmation: Story = {
  args: {
    currentStep: 5,
    initialData: {
      fullName: 'Amina Odhiambo',
      phone: '0712 345 678',
      idNumber: '12345678',
      profilePhotoUrl: 'https://placehold.co/100x100',
      county: 'Nairobi',
      sellerType: 'individual',
      kraPin: 'A123456789B',
      categories: ["Women's Wear", 'Bags & Accessories'],
      conditionGrades: ['A', 'B'],
      deliveryMethod: 'self',
      storeName: 'AminaFinds',
      storeTagline: 'Curated secondhand fashion from Nairobi',
      storeLogoUrl: 'https://placehold.co/100x100',
    },
  },
};

export const WithHeroImage: Story = {
  args: {
    currentStep: 0,
    heroImageUrl: 'https://mitumba.stanl.ink/hero-aspect.png',
  },
};

export const LoadingState: Story = { args: { currentStep: 1, loading: true } };

export const WithError: Story = { args: { currentStep: 1, error: 'Phone number is already registered to another account.' } };

export const Mobile: Story = {
  args: { currentStep: 0 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const ResumedFlow: Story = {
  args: {
    currentStep: 3,
    initialData: {
      fullName: 'Brian Otieno',
      phone: '0722 111 222',
      idNumber: '87654321',
      county: 'Kisumu',
      sellerType: 'individual',
    },
  },
};

export const DarkMode: Story = {
  args: { currentStep: 0, theme: 'mitumba-dark' },
  parameters: { backgrounds: { default: 'dark' } },
};
