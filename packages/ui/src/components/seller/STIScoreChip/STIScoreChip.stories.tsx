import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { STIScoreChip } from './STIScoreChip';

const meta: Meta<typeof STIScoreChip> = {
  title: 'Seller/STIScoreChip',
  component: STIScoreChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof STIScoreChip>;

export const Trusted: Story = { args: { score: 92 } };
export const Good: Story = { args: { score: 68 } };
export const AtRisk: Story = { args: { score: 45 } };
export const Flagged: Story = { args: { score: 28 } };
export const Suspended: Story = { args: { score: 12 } };

export const Compact: Story = { args: { score: 85, compact: true } };
export const CompactWithLabel: Story = { args: { score: 85, compact: true, showLabel: true } };

export const AllScores: Story = {
  render: () => (
    <Stack spacing={2} alignItems="flex-start">
      <STIScoreChip score={95} />
      <STIScoreChip score={72} />
      <STIScoreChip score={48} />
      <STIScoreChip score={25} />
      <STIScoreChip score={8} />
    </Stack>
  ),
};

export const CompactRow: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <STIScoreChip score={95} compact />
      <STIScoreChip score={72} compact />
      <STIScoreChip score={48} compact />
      <STIScoreChip score={25} compact />
      <STIScoreChip score={8} compact />
    </Box>
  ),
};
