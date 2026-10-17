import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { tokens } from '@mitumba/tokens';
import { ConversationThreadList } from './ConversationThreadList';
import type { ConversationThreadCard } from '../../../types/messaging-v2';

const THREADS: ConversationThreadCard[] = [
  { id: 'tg', conversationId: 'c1', subject: { kind: 'general' }, supportStatus: 'open', archived: false, pinned: true, muted: false, unreadCount: 0, lastActivityAt: 'Yesterday' },
  { id: 'tl', conversationId: 'c1', subject: { kind: 'listing', id: 'l1', title: 'Vintage Levi’s Jacket', imageUrl: 'https://placehold.co/100', status: 'Sold' }, supportStatus: 'resolved', archived: true, pinned: false, muted: true, unreadCount: 3, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'This is still available', createdAt: '10:30' } },
  { id: 'to', conversationId: 'c1', subject: { kind: 'order', id: 'o1', shortId: '#MTB-4821', title: 'Vintage Levi’s Jacket', status: 'Shipped' }, supportStatus: 'open', archived: false, pinned: false, muted: false, unreadCount: 1, lastActivityAt: 'Now' },
];

const meta: Meta<typeof ConversationThreadList> = {
  title: 'Messaging/ConversationThreadList',
  component: ConversationThreadList,
  tags: ['autodocs'],
  args: { conversationId: 'c1', threads: THREADS, contextActor: { kind: 'store', id: 's1', displayName: 'Urban Thrift' } },
  decorators: [(Story) => <Box sx={{ width: 400, height: 620, bgcolor: tokens.colors.surface }}><Story /></Box>],
};
export default meta;
type Story = StoryObj<typeof ConversationThreadList>;

export const AllKinds: Story = {};
export const Selected: Story = { args: { activeThreadId: 'to' } };
export const PrivateFlags: Story = { args: { activeThreadId: 'tl' } };
export const Loading: Story = { args: { threads: [], state: 'loading' } };
export const NoThreads: Story = { args: { threads: [] } };
export const RecoverableError: Story = { args: { threads: [], state: 'error', onRetry: () => {} } };
export const Forbidden: Story = { args: { threads: [], state: 'forbidden' } };
export const LoadingNextPage: Story = { args: { hasNextPage: true, loadingNextPage: true } };
export const Mobile375: Story = { parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const Desktop1280: Story = { parameters: { viewport: { defaultViewport: 'desktop' }, chromatic: { viewports: [1280] } } };
