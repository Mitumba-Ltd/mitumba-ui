/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatThreadV2 } from './ChatThreadV2';
import type { ThreadTimelineItem } from '../../../types/messaging-v2';

const buyer = { kind: 'user' as const, id: 'u1', displayName: 'Amina' };
const store = { kind: 'store' as const, id: 's1', displayName: 'Urban Thrift' };
const timeline: ThreadTimelineItem[] = [
  { kind: 'message', message: { id: 'm1', threadId: 't1', author: buyer, direction: 'outgoing', body: 'Has this shipped?', createdAt: '10:00' } },
  { kind: 'system', event: { id: 'e1', threadId: 't1', kind: 'thread-linked', label: 'Order #MTB-4821 was created from this inquiry', createdAt: '10:10', href: '/orders/o1', relatedThread: { id: 'to', subject: { kind: 'order', id: 'o1', shortId: '#MTB-4821', title: 'Vintage Levi’s Jacket' } } } },
  { kind: 'message', message: { id: 'm2', threadId: 't1', author: store, direction: 'incoming', body: 'Yes, this morning.', createdAt: '10:30' } },
];

function Interactive(args: React.ComponentProps<typeof ChatThreadV2>) {
  const { draft: initialDraft } = args;
  const [draft, setDraft] = React.useState(initialDraft);
  return <ChatThreadV2 {...args} draft={draft} onDraftChange={setDraft} />;
}

const meta: Meta<typeof ChatThreadV2> = { title: 'Messaging/ChatThreadV2', component: ChatThreadV2, tags: ['autodocs'], parameters: { layout: 'fullscreen' }, render: (args) => <Interactive {...args} />, args: { conversationId: 'c1', threadConversationId: 'c1', threadId: 't1', subject: { kind: 'listing', id: 'l1', title: 'Vintage Levi’s Jacket', status: 'Sold' }, actingAs: buyer, counterparty: store, timeline, draft: '', onDraftChange: () => {}, onSend: () => {} } };
export default meta;
type Story = StoryObj<typeof ChatThreadV2>;

export const MixedTimeline: Story = {};
export const NoMessages: Story = { args: { timeline: [] } };
export const Loading: Story = { args: { timeline: [], state: 'loading' } };
export const RecoverableError: Story = { args: { timeline: [], state: 'error', onRetry: () => {} } };
export const Forbidden: Story = { args: { timeline: [], state: 'forbidden' } };
export const Offline: Story = { args: { connectionState: 'offline' } };
export const Reconnecting: Story = { args: { connectionState: 'reconnecting' } };
export const Archived: Story = { args: { policyState: 'archived' } };
export const Resolved: Story = { args: { policyState: 'resolved' } };
export const Blocked: Story = { args: { policyState: 'blocked' } };
export const LoadingOlder: Story = { args: { hasOlder: true, loadingOlder: true } };
export const PendingSend: Story = { args: { timeline: [...timeline, { kind: 'message', message: { id: 'm3', threadId: 't1', author: buyer, direction: 'outgoing', body: 'Thank you', createdAt: 'Now', deliveryStatus: 'pending', clientMessageId: 'client-pending' } }] } };
export const Mobile375: Story = { parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const Desktop1280: Story = { parameters: { viewport: { defaultViewport: 'desktop' }, chromatic: { viewports: [1280] } } };
