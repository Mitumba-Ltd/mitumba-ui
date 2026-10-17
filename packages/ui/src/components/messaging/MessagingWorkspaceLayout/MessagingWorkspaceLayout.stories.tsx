import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { ConversationSummaryV2, ConversationThreadCard, MessagingWorkspacePane, ThreadTimelineItem } from '../../../types/messaging-v2';
import { ChatThreadV2 } from '../ChatThreadV2';
import { ConversationListV2 } from '../ConversationListV2';
import { ConversationThreadList } from '../ConversationThreadList';
import { MessagingWorkspaceLayout } from './MessagingWorkspaceLayout';

const buyer = { kind: 'user' as const, id: 'u1', displayName: 'Amina' };
const store = { kind: 'store' as const, id: 's1', displayName: 'Urban Thrift' };

const conversations: ConversationSummaryV2[] = [
  { id: 'c1', actingAs: buyer, counterparty: store, unreadCount: 3, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'Your order shipped this morning', createdAt: '10:30' } },
  { id: 'c2', actingAs: buyer, counterparty: { kind: 'store', id: 's2', displayName: 'Nairobi Vintage' }, unreadCount: 0, lastActivityAt: 'Yesterday', lastMessage: { authorName: 'You', body: 'Thank you', createdAt: 'Yesterday' } },
  { id: 'c3', actingAs: buyer, counterparty: { kind: 'store', id: 's3', displayName: 'Kisumu Kicks' }, unreadCount: 0, lastActivityAt: 'Monday' },
];

const threads: ConversationThreadCard[] = [
  { id: 'tg', conversationId: 'c1', subject: { kind: 'general' }, supportStatus: 'open', archived: false, pinned: true, muted: false, unreadCount: 0, lastActivityAt: 'Mon' },
  { id: 'tl', conversationId: 'c1', subject: { kind: 'listing', id: 'l1', title: 'Vintage Levi’s Jacket', status: 'Sold' }, supportStatus: 'resolved', archived: false, pinned: false, muted: false, unreadCount: 0, lastActivityAt: 'Tue', lastMessage: { authorName: 'You', body: 'Perfect, thanks', createdAt: 'Tue' } },
  { id: 'to', conversationId: 'c1', subject: { kind: 'order', id: 'o1', shortId: '#MTB-4821', title: 'Vintage Levi’s Jacket', status: 'Shipped' }, supportStatus: 'open', archived: false, pinned: false, muted: false, unreadCount: 3, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'Your order shipped this morning', createdAt: '10:30' } },
];

const timeline: ThreadTimelineItem[] = [
  { kind: 'message', message: { id: 'm1', threadId: 'to', author: buyer, direction: 'outgoing', body: 'Has this shipped?', createdAt: '10:00' } },
  { kind: 'message', message: { id: 'm2', threadId: 'to', author: store, direction: 'incoming', body: 'Yes — it left this morning. I’ll share the delivery update here.', createdAt: '10:30' } },
];

function getThreadTitle(thread: ConversationThreadCard): string {
  if (thread.subject.kind === 'order') return `Order ${thread.subject.shortId}`;
  if (thread.subject.kind === 'listing') return thread.subject.title;
  return 'General';
}

function IntegratedWorkspace({ initialPane = 'messages' }: { initialPane?: MessagingWorkspacePane }) {
  const [activePane, setActivePane] = React.useState<MessagingWorkspacePane>(initialPane);
  const [conversationId, setConversationId] = React.useState('c1');
  const [threadId, setThreadId] = React.useState('to');
  const [draft, setDraft] = React.useState('');
  const activeThread = threads.find((thread) => thread.id === threadId) ?? threads[0];
  const activeTimeline = threadId === 'to' ? timeline : [];

  return (
    <Box sx={{ height: '100vh', p: `${tokens.spacing.lg}px`, bgcolor: tokens.colors.background }}>
      <MessagingWorkspaceLayout
        activePane={activePane}
        conversationTitle="Messages"
        threadTitle={store.displayName}
        messageTitle={getThreadTitle(activeThread)}
        onBackToConversations={() => setActivePane('conversations')}
        onBackToThreads={() => setActivePane('threads')}
        conversationPane={(
          <ConversationListV2
            conversations={conversations}
            activeConversationId={conversationId}
            onSelectConversation={(id) => { setConversationId(id); setActivePane('threads'); }}
          />
        )}
        threadPane={(
          <ConversationThreadList
            conversationId={conversationId}
            threads={conversationId === 'c1' ? threads : []}
            activeThreadId={threadId}
            onSelectThread={(id) => { setThreadId(id); setActivePane('messages'); }}
          />
        )}
        messagePane={(
          <ChatThreadV2
            conversationId="c1"
            threadConversationId="c1"
            threadId={activeThread.id}
            subject={activeThread.subject}
            actingAs={buyer}
            counterparty={store}
            timeline={activeTimeline}
            draft={draft}
            onDraftChange={setDraft}
            onSend={() => setDraft('')}
            showHeader={false}
          />
        )}
      />
    </Box>
  );
}

const pane = (label: string) => <Box sx={{ p: `${tokens.spacing.lg}px` }}><Typography>{label}</Typography></Box>;

const meta: Meta<typeof MessagingWorkspaceLayout> = {
  title: 'Messaging/MessagingWorkspaceLayout',
  component: MessagingWorkspaceLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { conversationPane: pane('Conversation rail'), threadPane: pane('Thread cards'), messagePane: pane('Selected thread messages') },
};

export default meta;
type Story = StoryObj<typeof MessagingWorkspaceLayout>;

export const DesktopThreePane: Story = { render: () => <IntegratedWorkspace />, parameters: { viewport: { defaultViewport: 'desktop' }, chromatic: { viewports: [1280] } } };
export const MobileConversations: Story = { render: () => <IntegratedWorkspace initialPane="conversations" />, args: { activePane: 'conversations' }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const MobileThreads: Story = { render: () => <IntegratedWorkspace initialPane="threads" />, args: { activePane: 'threads', onBackToConversations: () => {} }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const MobileMessages: Story = { render: () => <IntegratedWorkspace initialPane="messages" />, args: { activePane: 'messages', onBackToThreads: () => {} }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const NoConversationSelection: Story = { args: { threadPane: pane('Select a conversation'), messagePane: pane('No thread selected') } };
export const NoThreadSelection: Story = { args: { messagePane: pane('Select a thread') } };
export const DeepLinkedThread: Story = { render: () => <IntegratedWorkspace initialPane="messages" />, args: { activePane: 'messages', onBackToThreads: () => {}, messageTitle: 'Order #MTB-4821', focusRequest: { pane: 'messages', key: 1 } } };
