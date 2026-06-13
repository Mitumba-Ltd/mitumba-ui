import type { Meta, StoryObj } from '@storybook/react';
import { TwoFactorSetupModal } from './TwoFactorSetupModal';

const meta: Meta<typeof TwoFactorSetupModal> = {
  title: 'Forms/TwoFactorSetupModal',
  component: TwoFactorSetupModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TwoFactorSetupModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    otpauthUri: 'otpauth://totp/Mitumba:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Mitumba',
    secret: 'JBSWY3DPEHPK3PXP',
    onVerify: () => new Promise((r) => setTimeout(r, 1500)),
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Invalid verification code. Please try again.',
  },
};

export const WithBackupCodes: Story = {
  args: {
    ...Default.args,
    backupCodes: ['a1b2c3d4', 'e5f6g7h8', 'i9j0k1l2', 'm3n4o5p6', 'q7r8s9t0', 'u1v2w3x4', 'y5z6a7b8', 'c9d0e1f2'],
  },
};

export const Verifying: Story = {
  args: {
    ...Default.args,
    verifying: true,
  },
};
