import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { STIBreakdownPanel } from './STIBreakdownPanel';

const meta: Meta<typeof STIBreakdownPanel> = {
  title: 'Seller/STIBreakdownPanel',
  component: STIBreakdownPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ maxWidth: 380 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof STIBreakdownPanel>;

export const Trusted: Story = {
  args: {
    score: 92,
    fulfillmentRate: 0.97,
    accuracyRate: 0.95,
    avgResponseHours: 2,
    daysActive: 180,
    recentEvents: [
      { type: 'positive', reason: 'Order delivered on time', pointsChange: 2, timestamp: '2 hours ago' },
      { type: 'positive', reason: 'Positive buyer review', pointsChange: 3, timestamp: '1 day ago' },
      { type: 'positive', reason: '100th order completed', pointsChange: 5, timestamp: '3 days ago' },
    ],
  },
};

export const Good: Story = {
  args: {
    score: 72,
    fulfillmentRate: 0.88,
    accuracyRate: 0.82,
    avgResponseHours: 8,
    daysActive: 45,
    recentEvents: [
      { type: 'positive', reason: 'Dispute resolved in buyer favor', pointsChange: 1, timestamp: '5 hours ago' },
      { type: 'penalty', reason: 'Slow response to buyer message', pointsChange: -2, timestamp: '2 days ago' },
    ],
  },
};

export const AtRisk: Story = {
  args: {
    score: 48,
    fulfillmentRate: 0.65,
    accuracyRate: 0.7,
    avgResponseHours: 24,
    daysActive: 14,
    recentEvents: [
      { type: 'penalty', reason: 'Order cancelled by seller', pointsChange: -5, timestamp: '1 day ago' },
      { type: 'penalty', reason: 'Item not as described', pointsChange: -8, timestamp: '3 days ago' },
      { type: 'positive', reason: 'KYC verification completed', pointsChange: 10, timestamp: '5 days ago' },
    ],
  },
};

export const Flagged: Story = {
  args: {
    score: 22,
    fulfillmentRate: 0.4,
    accuracyRate: 0.5,
    avgResponseHours: 72,
    daysActive: 7,
    recentEvents: [
      { type: 'penalty', reason: 'Multiple buyer complaints', pointsChange: -15, timestamp: '12 hours ago' },
      { type: 'penalty', reason: 'Suspected counterfeit listing', pointsChange: -20, timestamp: '1 day ago' },
    ],
  },
};

export const NoEvents: Story = {
  args: {
    score: 65,
    fulfillmentRate: 0.85,
    accuracyRate: 0.9,
    avgResponseHours: 4,
    daysActive: 30,
    recentEvents: [],
  },
};

export const AllScores: Story = {
  decorators: [
    () => (
      <Stack spacing={3} sx={{ maxWidth: 380 }}>
        <STIBreakdownPanel score={92} fulfillmentRate={0.97} accuracyRate={0.95} avgResponseHours={2} daysActive={180} recentEvents={[]} />
        <STIBreakdownPanel score={68} fulfillmentRate={0.85} accuracyRate={0.8} avgResponseHours={6} daysActive={60} recentEvents={[]} />
        <STIBreakdownPanel score={42} fulfillmentRate={0.6} accuracyRate={0.65} avgResponseHours={18} daysActive={10} recentEvents={[]} />
        <STIBreakdownPanel score={18} fulfillmentRate={0.3} accuracyRate={0.4} avgResponseHours={48} daysActive={3} recentEvents={[]} />
      </Stack>
    ),
  ],
};

export const Mobile: Story = {
  args: Trusted.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
