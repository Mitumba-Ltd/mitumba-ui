import type { Meta, StoryObj } from '@storybook/react';
import { ConversationActorLabel } from './ConversationActorLabel';

const meta: Meta<typeof ConversationActorLabel> = {
  title: 'Messaging/ConversationActorLabel',
  component: ConversationActorLabel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConversationActorLabel>;

export const Store: Story = { args: { actor: { kind: 'store', id: 's1', displayName: 'Urban Thrift' } } };
export const User: Story = { args: { actor: { kind: 'user', id: 'u1', displayName: 'Amina Otieno' } } };
export const SentAsStore: Story = { args: { actor: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, prefix: 'Sent as', secondaryText: 'Store identity', size: 'small' } };
