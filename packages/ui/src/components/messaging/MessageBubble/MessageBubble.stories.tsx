import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Messaging/MessageBubble',
  component: MessageBubble,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ maxWidth: 500, mx: 'auto' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const Sent: Story = {
  args: { body: 'Is the denim jacket still available?', timestamp: '10:30 AM', isMine: true },
};

export const Received: Story = {
  args: { body: "Yes! It's in great condition. KES 1,800 - delivery to Kisii available.", timestamp: '10:32 AM', isMine: false, senderName: 'Wanjiku Muthoni', senderAvatarUrl: 'https://i.pravatar.cc/40?u=wanjiku' },
};

export const WithFileAttachment: Story = {
  args: { body: "Here's the M-Pesa confirmation", timestamp: '11:00 AM', isMine: true, attachment: { type: 'file', name: 'mpesa_receipt.pdf', size: '245 KB', url: '#' } },
};

export const WithImageAttachment: Story = {
  args: { body: "Here's another photo of the listing", timestamp: '11:05 AM', isMine: false, senderName: 'Ochieng Otieno', senderAvatarUrl: 'https://i.pravatar.cc/40?u=ochieng', attachment: { type: 'image', name: 'jacket-detail.jpg', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80' } },
};
