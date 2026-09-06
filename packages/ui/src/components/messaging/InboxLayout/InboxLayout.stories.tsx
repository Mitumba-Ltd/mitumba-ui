import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { InboxLayout } from './InboxLayout';

const meta: Meta<typeof InboxLayout> = {
  title: 'Messaging/InboxLayout',
  component: InboxLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ height: '100vh', p: 2 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof InboxLayout>;

function MockList() { return <Box sx={{ p: 2 }}><Typography>Conversations go here</Typography></Box>}
function MockThread() { return <Box sx={{ p: 2 }}><Typography>Chat thread goes here</Typography></Box>}

export const Desktop: Story = {
  args: { conversationList: <MockList />, chatThread: <MockThread /> },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const DesktopWithHeadingLevel: Story = {
  args: { conversationList: <MockList />, chatThread: <MockThread />, titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const MobileWithHeadingLevel: Story = {
  args: { conversationList: <MockList />, chatThread: <MockThread />, titleLevel: 1 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const MobileList: Story = {
  args: { conversationList: <MockList />, chatThread: <MockThread />, showMobileBack: false },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const MobileThread: Story = {
  args: { conversationList: <MockList />, chatThread: <MockThread />, showMobileBack: true },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
