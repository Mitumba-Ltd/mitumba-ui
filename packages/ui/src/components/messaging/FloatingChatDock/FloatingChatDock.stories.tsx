import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FloatingChatDock } from './FloatingChatDock'

const meta: Meta<typeof FloatingChatDock> = {
  title: 'Messaging/FloatingChatDock',
  component: FloatingChatDock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof FloatingChatDock>

function MockChat() {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Typography color="text.secondary" variant="body2">ChatThread goes here</Typography>
    </Box>
  )
}

export const Expanded: Story = {
  args: {
    open: true,
    title: 'KisumuKicks',
    subtitle: 'online',
    avatarUrl: 'https://placehold.co/64',
    minimized: false,
    onToggleMinimize: () => {},
    onClose: () => {},
    children: <MockChat />,
  },
}

export const Minimized: Story = {
  args: {
    ...Expanded.args,
    minimized: true,
    unreadCount: 3,
  },
}

export const WithSubtitle: Story = {
  args: {
    ...Expanded.args,
    subtitle: 'typing…',
  },
}

export const NoUnread: Story = {
  args: {
    ...Expanded.args,
    minimized: true,
    unreadCount: 0,
  },
}

export const WithHeadingAndBack: Story = {
  args: {
    ...Expanded.args,
    titleLevel: 2,
    onBack: () => {},
    announcement: '3 new messages',
  },
}

export const Desktop1280: Story = {
  args: { ...Expanded.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const Mobile375: Story = {
  args: { ...Expanded.args, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
