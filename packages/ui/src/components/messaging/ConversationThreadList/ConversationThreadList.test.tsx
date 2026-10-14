// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import type { ConversationThreadCard } from '../../../types/messaging-v2';
import { ConversationThreadList } from './ConversationThreadList';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

const threads: ConversationThreadCard[] = [
  { id: 't-general', conversationId: 'c1', subject: { kind: 'general' }, supportStatus: 'open', archived: false, pinned: true, muted: false, unreadCount: 0, lastActivityAt: 'Yesterday' },
  { id: 't-listing', conversationId: 'c1', subject: { kind: 'listing', id: 'l1', title: 'Denim Jacket', status: 'Sold' }, supportStatus: 'resolved', archived: true, pinned: false, muted: true, unreadCount: 3, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'This is still available', createdAt: '10:30' } },
  { id: 't-order', conversationId: 'c1', subject: { kind: 'order', id: 'o1', shortId: '#MTB-1', title: 'Denim Jacket', status: 'Shipped' }, supportStatus: 'open', archived: false, pinned: false, muted: false, unreadCount: 1, lastActivityAt: 'Now' },
];

function renderList(props: Partial<React.ComponentProps<typeof ConversationThreadList>> = {}) {
  return render(
    <MitumbaThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ConversationThreadList conversationId="c1" threads={threads} contextActor={{ kind: 'store', id: 's1', displayName: 'Urban Thrift' }} {...props} />
    </MitumbaThemeProvider>,
  );
}

describe('ConversationThreadList', () => {
  it('renders General, Listing, and Order as distinct native cards', () => {
    renderList();
    expect(screen.getByRole('button', { name: /General/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Listing, Denim Jacket/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Order #MTB-1/ })).toBeInTheDocument();
  });

  it('selects by stable thread ID', () => {
    const onSelect = vi.fn();
    renderList({ onSelectThread: onSelect });
    fireEvent.click(screen.getByRole('button', { name: /Order #MTB-1/ }));
    expect(onSelect).toHaveBeenCalledWith('t-order');
  });

  it('renders semantic destinations and selected state', () => {
    renderList({ activeThreadId: 't-listing', getThreadHref: (thread) => `/inbox/c/c1/t/${thread.id}` });
    expect(screen.getByRole('link', { name: /Listing, Denim Jacket/ })).toHaveAttribute('href', '/inbox/c/c1/t/t-listing');
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('aria-current', 'true');
  });

  it('keeps subject, support, and private states distinct', () => {
    renderList();
    expect(screen.getByText('Listing · Sold')).toBeInTheDocument();
    expect(screen.getByText('Resolved')).toBeInTheDocument();
    expect(screen.getByText('Archived')).toBeInTheDocument();
    expect(screen.getByText('Muted')).toBeInTheDocument();
    expect(screen.getByText('3 unread')).toBeInTheDocument();
  });

  it('renders loading, empty, error, and forbidden states', () => {
    const { rerender } = render(<MitumbaThemeProvider><ConversationThreadList conversationId="c1" threads={[]} state="loading" /></MitumbaThemeProvider>);
    expect(screen.getByRole('status', { name: 'Loading conversation threads' })).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationThreadList conversationId="c1" threads={[]} /></MitumbaThemeProvider>);
    expect(screen.getByText('No threads yet')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationThreadList conversationId="c1" threads={[]} state="error" onRetry={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationThreadList conversationId="c1" threads={[]} state="forbidden" /></MitumbaThemeProvider>);
    expect(screen.getByText('Threads unavailable')).toBeInTheDocument();
  });

  it('loads another cursor page', () => {
    const onLoad = vi.fn();
    renderList({ hasNextPage: true, onLoadNextPage: onLoad });
    fireEvent.click(screen.getByRole('button', { name: 'Load more threads' }));
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it('restores focus to a requested thread card', () => {
    renderList({ restoreFocusThreadId: 't-order' });
    expect(screen.getByRole('button', { name: /Order #MTB-1/ })).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = renderList({ activeThreadId: 't-order', hasNextPage: true, onLoadNextPage: () => {} });
    expect(await axe(container)).toHaveNoViolations();
  });
});
