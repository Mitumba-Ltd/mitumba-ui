import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthPage } from './AuthPage';

const meta: Meta<typeof AuthPage> = {
  title: 'Layout/AuthPage',
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onLogin: { action: 'onLogin' },
    onSignUp: { action: 'onSignUp' },
    onForgotPassword: { action: 'onForgotPassword' },
    onResetPassword: { action: 'onResetPassword' },
    onSocialAuth: { action: 'onSocialAuth' },
    onViewChange: { action: 'onViewChange' },
  },
};

export default meta;
type Story = StoryObj<typeof AuthPage>;

export const SignIn: Story = {
  args: {
    view: 'signin',
    theme: 'mitumba-light',
  },
};

export const SignUp: Story = {
  args: {
    view: 'signup',
    theme: 'mitumba-light',
  },
};

export const ForgotPassword: Story = {
  args: {
    view: 'forgot',
    theme: 'mitumba-light',
  },
};

export const ResetPassword: Story = {
  args: {
    view: 'reset',
    theme: 'mitumba-light',
  },
};

export const DarkMode: Story = {
  args: {
    view: 'signin',
    theme: 'mitumba-dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const WithIllustration: Story = {
  args: {
    view: 'signin',
    theme: 'mitumba-light',
    illustrationUrl: 'https://placehold.co/400x200/png?text=Mitumba+Illustration',
  },
};

export const LoadingState: Story = {
  args: {
    view: 'signin',
    loading: true,
  },
};

export const WithError: Story = {
  args: {
    view: 'signin',
    error: 'Invalid email or password.',
  },
};
