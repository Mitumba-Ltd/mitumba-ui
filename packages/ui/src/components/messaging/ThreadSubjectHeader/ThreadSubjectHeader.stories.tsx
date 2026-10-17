import type { Meta, StoryObj } from '@storybook/react';
import { ThreadSubjectHeader } from './ThreadSubjectHeader';

const meta: Meta<typeof ThreadSubjectHeader> = { title: 'Messaging/ThreadSubjectHeader', component: ThreadSubjectHeader, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof ThreadSubjectHeader>;

export const General: Story = { args: { subject: { kind: 'general' }, contextActor: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, supportStatus: 'open' } };
export const Listing: Story = { args: { subject: { kind: 'listing', id: 'l1', title: 'Vintage Levi’s Jacket', imageUrl: 'https://placehold.co/100', status: 'Available' }, contextActor: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, supportStatus: 'open', href: '/p/l1' } };
export const Order: Story = { args: { subject: { kind: 'order', id: 'o1', shortId: '#MTB-4821', title: 'Vintage Levi’s Jacket', status: 'Shipped' }, supportStatus: 'open', href: '/orders/o1' } };
export const PrivateFlags: Story = { args: { subject: { kind: 'listing', id: 'l1', title: 'Vintage Levi’s Jacket', status: 'Sold' }, supportStatus: 'resolved', archived: true, pinned: true, muted: true } };
