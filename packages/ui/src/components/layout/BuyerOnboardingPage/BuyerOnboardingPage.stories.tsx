import type { Meta, StoryObj } from '@storybook/react';
import { BuyerOnboardingPage } from './BuyerOnboardingPage';


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
  args: {},
};

export const WithHeroImage: Story = {
  args: {
    heroImageUrl: 'https://mitumba.stanl.ink/hero-aspect.png',
  },
};

export const WithInitialData: Story = {
  args: {
    initialData: { display_name: 'Amina K.', county: 'Nairobi', phone: '712345678' },
  },
};

export const LoadingState: Story = {
};

export const WithError: Story = {
};

export const Mobile: Story = {
  args: {},
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
