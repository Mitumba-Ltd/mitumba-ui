import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const General: Story = {
  args: {
    title: 'Something went wrong',
    subtitle: 'An unexpected error occurred. Our team has been notified.',
    onRetry: () => {},
    retryLabel: 'Try again',
  },
};

export const PageNotFound: Story = {
  args: {
    type: '404',
    title: 'Page not found',
    subtitle: 'The page you\'re looking for doesn\'t exist or has been moved.',
    onBack: () => {},
    onRetry: () => {},
    retryLabel: 'Go home',
  },
};

export const NetworkError: Story = {
  args: {
    type: 'network',
    title: 'You\'re offline',
    subtitle: 'Check your internet connection and try again. Your data is safe.',
    onRetry: () => {},
    retryLabel: 'Reconnect',
  },
};

export const ServerError: Story = {
  args: {
    type: '500',
    title: 'Server error',
    subtitle: 'Our systems are experiencing issues. We\'re working on a fix — try again in a few minutes.',
    onBack: () => {},
    onRetry: () => {},
    retryLabel: 'Refresh',
  },
};

export const Forbidden: Story = {
  args: {
    type: 'forbidden',
    title: 'Access denied',
    subtitle: 'You don\'t have permission to view this page. Contact the store owner if you think this is a mistake.',
    onBack: () => {},
  },
};

export const Elevated: Story = {
  args: {
    ...NetworkError.args,
    variant: 'elevated',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    title: 'Failed to load',
    subtitle: 'Tap to retry.',
    onRetry: () => {},
  },
};

export const AllTypes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <ErrorState type="general" title="General error" subtitle="Something unexpected happened." onRetry={() => {}} />
      <ErrorState type="404" title="Not found" subtitle="This listing may have been removed." onBack={() => {}} />
      <ErrorState type="network" title="No connection" subtitle="Check your internet." onRetry={() => {}} />
      <ErrorState type="500" title="Server error" subtitle="We're fixing it." onRetry={() => {}} />
      <ErrorState type="forbidden" title="Access denied" subtitle="You need permission." onBack={() => {}} />
    </Stack>
  ),
};

export const SideBySide: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ maxWidth: 700 }}>
      <Box sx={{ width: 320 }}>
        <ErrorState variant="elevated" type="network" title="Offline" subtitle="Your cart is saved. Reconnect to checkout." onRetry={() => {}} retryLabel="Retry" />
      </Box>
      <Box sx={{ width: 320 }}>
        <ErrorState variant="elevated" type="404" title="Listing removed" subtitle="This item is no longer available." onBack={() => {}} />
      </Box>
    </Stack>
  ),
};

export const Mobile: Story = {
  args: General.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
