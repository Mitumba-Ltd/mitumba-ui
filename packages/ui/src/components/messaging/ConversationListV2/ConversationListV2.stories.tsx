import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { tokens } from '@mitumba/tokens';
import { ConversationListV2 } from './ConversationListV2';
import type { ConversationSummaryV2 } from '../../../types/messaging-v2';

const DATA: ConversationSummaryV2[] = [
  { id: 'c1', actingAs: { kind: 'user', id: 'u1', displayName: 'Amina' }, counterparty: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, unreadCount: 12, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'Your order shipped this morning', createdAt: '10:30' } },
  { id: 'c2', actingAs: { kind: 'user', id: 'u1', displayName: 'Amina' }, counterparty: { kind: 'store', id: 's2', displayName: 'Nairobi Vintage House with a long store name' }, unreadCount: 0, lastActivityAt: 'Yesterday', muted: true },
];

const meta: Meta<typeof ConversationListV2> = {
  title: 'Messaging/ConversationListV2',
  component: ConversationListV2,
  tags: ['autodocs'],
  args: { conversations: DATA },
  decorators: [(Story) => <Box sx={{ width: 360, height: 560, bgcolor: tokens.colors.surface }}><Story /></Box>],
};
export default meta;
type Story = StoryObj<typeof ConversationListV2>;

export const BuyerDefault: Story = { args: { activeConversationId: 'c1' } };
export const StorePerspective: Story = { args: { conversations: [{ id: 'c3', actingAs: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, counterparty: { kind: 'user', id: 'u2', displayName: 'Brian Otieno' }, unreadCount: 3, lastActivityAt: 'Now' }] } };
export const MultipleStores: Story = { args: { conversations: [...DATA, { ...DATA[0], id: 'c4', counterparty: { kind: 'store', id: 's4', displayName: 'Urban Thrift' } }] } };
export const Loading: Story = { args: { conversations: [], state: 'loading' } };
export const Empty: Story = { args: { conversations: [] } };
export const RecoverableError: Story = { args: { conversations: [], state: 'error', onRetry: () => {} } };
export const Forbidden: Story = { args: { conversations: [], state: 'forbidden' } };
export const LoadingNextPage: Story = { args: { hasNextPage: true, loadingNextPage: true } };
export const PaginationEnd: Story = { args: { hasNextPage: false } };
export const Mobile375: Story = { parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const Desktop1280: Story = { parameters: { viewport: { defaultViewport: 'desktop' }, chromatic: { viewports: [1280] } } };
