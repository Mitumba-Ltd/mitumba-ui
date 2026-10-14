import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { MessagingWorkspaceLayout } from './MessagingWorkspaceLayout';

const pane = (label: string) => <Box sx={{ p: `${tokens.spacing.lg}px` }}><Typography>{label}</Typography></Box>;

const meta: Meta<typeof MessagingWorkspaceLayout> = {
  title: 'Messaging/MessagingWorkspaceLayout',
  component: MessagingWorkspaceLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    conversationPane: pane('Conversation rail'),
    threadPane: pane('General, Listing, and Order thread cards'),
    messagePane: pane('Selected thread messages'),
  },
};

export default meta;
type Story = StoryObj<typeof MessagingWorkspaceLayout>;

export const DesktopThreePane: Story = { parameters: { viewport: { defaultViewport: 'desktop' }, chromatic: { viewports: [1280] } } };
export const MobileConversations: Story = { args: { activePane: 'conversations' }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const MobileThreads: Story = { args: { activePane: 'threads', onBackToConversations: () => {} }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const MobileMessages: Story = { args: { activePane: 'messages', onBackToThreads: () => {} }, parameters: { viewport: { defaultViewport: 'mobile' }, chromatic: { viewports: [375] } } };
export const NoConversationSelection: Story = { args: { threadPane: pane('Select a conversation'), messagePane: pane('No thread selected') } };
export const NoThreadSelection: Story = { args: { messagePane: pane('Select a thread') } };
export const DeepLinkedThread: Story = { args: { activePane: 'messages', messageTitle: 'Order #MTB-4821', focusRequest: { pane: 'messages', key: 1 } } };
