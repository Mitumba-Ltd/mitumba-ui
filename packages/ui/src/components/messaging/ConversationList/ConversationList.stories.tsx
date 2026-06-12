import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ConversationList } from './ConversationList';
import type { Conversation } from './ConversationList.types';

const meta: Meta<typeof ConversationList> = {
  title: 'Messaging/ConversationList',
  component: ConversationList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onSelect: { action: 'onSelect' }, onSearch: { action: 'onSearch' }, onCompose: { action: 'onCompose' } },
  decorators: [(Story) => <Box sx={{ width: 340, height: 500, border: '1px solid #eee' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof ConversationList>;

const CONVERSATIONS: Conversation[] = [
  { id: '1', partnerId: 'u1', partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', lastMessage: 'The leather jacket is still available, size M', lastMessageAt: '10:30 AM', unread: true, listingTitle: 'Leather Jacket - KES 2,500' },
  { id: '2', partnerId: 'u2', partnerName: 'Ochieng Otieno', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=ochieng', lastMessage: 'Delivery will be Thursday via Sendy', lastMessageAt: '9:15 AM', unread: true },
  { id: '3', partnerId: 'u3', partnerName: 'Fatuma Hassan', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=fatuma', lastMessage: 'Thanks! Payment confirmed', lastMessageAt: 'Yesterday', listingTitle: 'Nike Air Max - KES 3,800' },
  { id: '4', partnerId: 'u4', partnerName: 'Kamau Njoroge', lastMessage: 'Can you do KES 1,500?', lastMessageAt: 'Mon' },
  { id: '5', partnerId: 'u5', partnerName: 'Aisha Mohammed', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=aisha', lastMessage: "Perfect, I'll take it", lastMessageAt: 'Jun 8' },
];

export const Default: Story = {
  args: { conversations: CONVERSATIONS, onCompose: () => {} },
};

export const WithActive: Story = {
  args: { conversations: CONVERSATIONS, activeId: '2', onCompose: () => {} },
};

export const Loading: Story = {
  args: { conversations: [], loading: true },
};
