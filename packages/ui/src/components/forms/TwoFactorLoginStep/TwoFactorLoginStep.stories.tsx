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
