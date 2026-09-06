import type { Meta, StoryObj } from '@storybook/react';
import { TwoFactorLoginStep } from './TwoFactorLoginStep';

const meta: Meta<typeof TwoFactorLoginStep> = {
  title: 'Forms/TwoFactorLoginStep',
  component: TwoFactorLoginStep,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TwoFactorLoginStep>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onUseBackupCode: () => {},
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Invalid code. Please try again.',
  },
};

export const WithoutBackupOption: Story = {
  args: {
    onSubmit: () => {},
  },
};

export const Mobile: Story = {
  args: {
    onSubmit: () => {},
    onUseBackupCode: () => {},
    titleLevel: 1,
  },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const DesktopWithHeading: Story = {
  args: {
    onSubmit: () => {},
    onUseBackupCode: () => {},
    titleLevel: 1,
    methods: [
      { id: 'totp', type: 'totp', label: 'Authenticator' },
      { id: 'sms', type: 'sms', label: 'SMS' },
    ],
    activeMethodId: 'totp',
    onMethodChange: () => {},
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
