import type { Meta, StoryObj } from '@storybook/react';
import { EmailVerificationPage } from './EmailVerificationPage';

const meta: Meta<typeof EmailVerificationPage> = {
  title: 'Layout/EmailVerificationPage',
  component: EmailVerificationPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    onVerify: { action: 'onVerify' },
    onResend: { action: 'onResend' },
    onGoBack: { action: 'onGoBack' },
  },
};

export default meta;
type Story = StoryObj<typeof EmailVerificationPage>;

export const Default: Story = {
  args: { email: 'amina.odhiambo@gmail.com' },
};

export const WithHeroImage: Story = {
  args: { email: 'brian.otieno@outlook.com', heroImageUrl: 'https://mitumba.stanl.ink/hero-aspect.png' },
};

export const WithError: Story = {
  args: { email: 'test@mitumba.co.ke', error: 'Invalid verification code. Please try again.' },
};

export const ResendSuccess: Story = {
  args: { email: 'seller@shop.co.ke', resendSuccess: true },
};

export const Loading: Story = {
  args: { email: 'user@example.com', loading: true },
};

export const Mobile: Story = {
  args: { email: 'mobile@user.ke' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const MobileWithHeading: Story = {
  args: { email: 'mobile@user.ke', titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const DesktopWithHeading: Story = {
  args: { email: 'amina.odhiambo@gmail.com', titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
