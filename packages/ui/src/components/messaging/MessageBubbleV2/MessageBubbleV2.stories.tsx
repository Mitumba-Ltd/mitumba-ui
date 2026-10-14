import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubbleV2 } from './MessageBubbleV2';

const meta: Meta<typeof MessageBubbleV2> = { title: 'Messaging/MessageBubbleV2', component: MessageBubbleV2, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof MessageBubbleV2>;

const user = { kind: 'user' as const, id: 'u1', displayName: 'Amina' };
const store = { kind: 'store' as const, id: 's1', displayName: 'Urban Thrift' };
const base = { id: 'm1', threadId: 't1', author: user, direction: 'outgoing' as const, body: 'Is this still available?', createdAt: '10:30' };

export const UserOutgoing: Story = { args: { message: base } };
export const UserIncoming: Story = { args: { message: { ...base, direction: 'incoming', author: user } } };
export const StoreOutgoing: Story = { args: { message: { ...base, author: store } } };
export const StoreIncoming: Story = { args: { message: { ...base, direction: 'incoming', author: store, body: 'Yes, it is available.' } } };
export const QuotedReply: Story = { args: { message: { ...base, quotedReply: { messageId: 'm0', authorName: 'Urban Thrift', excerpt: 'It fits a 32-inch waist.' } } } };
export const Pending: Story = { args: { message: { ...base, deliveryStatus: 'pending', clientMessageId: 'client-pending' } } };
export const FailedWithRetry: Story = { args: { message: { ...base, deliveryStatus: 'failed', clientMessageId: 'client-failed' }, onRetry: () => {} } };
export const Attachment: Story = { args: { message: { ...base, attachments: [{ kind: 'file', id: 'a1', name: 'Receipt.pdf', url: '/receipt.pdf', size: '2 MB' }] } } };
export const LongContent: Story = { args: { message: { ...base, body: 'A-very-long-unbroken-message-value-that-demonstrates-wrapping-without-breaking-the-message-layout-or-overflowing-the-thread-pane.' } } };
