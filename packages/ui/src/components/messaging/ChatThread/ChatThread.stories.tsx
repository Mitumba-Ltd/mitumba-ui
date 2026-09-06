import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ChatThread } from './ChatThread';
import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';

const meta: Meta<typeof ChatThread> = {
  title: 'Messaging/ChatThread',
  component: ChatThread,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onSend: { action: 'onSend' }, onAttach: { action: 'onAttach' } },
  decorators: [(Story) => <Box sx={{ width: 500, height: 600, border: '1px solid #eee' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof ChatThread>;

const MESSAGES: MessageBubbleProps[] = [
  { body: 'Hi! Is the vintage denim jacket still available?', timestamp: '10:30 AM', isMine: true },
  { body: 'Yes it is! Size M, great condition. KES 2,500 firm.', timestamp: '10:32 AM', isMine: false, senderName: 'Wanjiku Muthoni' },
  { body: 'Can you do delivery to Kisii town?', timestamp: '10:33 AM', isMine: true },
  { body: 'Absolutely! Delivery via Sendy is KES 200 extra. I can ship today.', timestamp: '10:35 AM', isMine: false, senderName: 'Wanjiku Muthoni' },
  { body: "Perfect, I'll pay now via M-Pesa", timestamp: '10:36 AM', isMine: true },
];

export const Default: Story = {
  args: { messages: MESSAGES, partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', partnerStatus: 'online', onAttach: () => {} },
};

export const Loading: Story = {
  args: { messages: [], partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', loading: true },
};

export const Sending: Story = {
  args: { messages: MESSAGES, partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', sending: true },
};

export const WithHeadingLevel: Story = {
  args: { messages: MESSAGES, partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', partnerStatus: 'online', titleLevel: 2, announcement: 'New message from Wanjiku', onAttach: () => {} },
};

export const Desktop1280: Story = {
  args: { messages: MESSAGES, partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', partnerStatus: 'online', titleLevel: 2, onAttach: () => {} },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile375: Story = {
  args: { messages: MESSAGES, partnerName: 'Wanjiku Muthoni', partnerAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku', partnerStatus: 'online', titleLevel: 2, onAttach: () => {} },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
