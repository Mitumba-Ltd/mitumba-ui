// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import type { ConversationSummaryV2 } from '../../../types/messaging-v2';
import { ConversationListV2 } from './ConversationListV2';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

const conversations: ConversationSummaryV2[] = [
  {
    id: 'c1', actingAs: { kind: 'user', id: 'u1', displayName: 'Amina' }, counterparty: { kind: 'store', id: 's1', displayName: 'Urban Thrift' },
    unreadCount: 12, lastActivityAt: '10:30', lastMessage: { authorName: 'Urban Thrift', body: 'Your order shipped', createdAt: '10:30' },
  },
  {
    id: 'c2', actingAs: { kind: 'user', id: 'u1', displayName: 'Amina' }, counterparty: { kind: 'store', id: 's2', displayName: 'Urban Thrift' },
    unreadCount: 0, lastActivityAt: 'Yesterday', archived: true,
  },
];

function renderList(props: Partial<React.ComponentProps<typeof ConversationListV2>> = {}) {
  return render(
    <MitumbaThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ConversationListV2 conversations={conversations} {...props} />
    </MitumbaThemeProvider>,
  );
}

describe('ConversationListV2', () => {
  it('keeps same-named stores distinct by stable conversation ID', () => {
    renderList();
    expect(screen.getAllByText('Urban Thrift')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /Conversation with Urban Thrift/ })).toHaveLength(2);
  });

  it('selects a native button by conversation ID', () => {
    const onSelect = vi.fn();
    renderList({ onSelectConversation: onSelect });
    fireEvent.click(screen.getAllByRole('button', { name: /Conversation with Urban Thrift/ })[1]);
    expect(onSelect).toHaveBeenCalledWith('c2');
  });

  it('renders semantic links when destinations are supplied', () => {
    renderList({ getConversationHref: (conversation) => `/inbox/c/${conversation.id}` });
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/inbox/c/c1');
  });

  it('shows exact unread count and selected state', () => {
    renderList({ activeConversationId: 'c1' });
    expect(screen.getByText('12 unread')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('aria-current', 'true');
  });

  it('renders loading, empty, recoverable error, and forbidden states', () => {
    const { rerender } = render(<MitumbaThemeProvider><ConversationListV2 conversations={[]} state="loading" /></MitumbaThemeProvider>);
    expect(screen.getByRole('status', { name: 'Loading conversations' })).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationListV2 conversations={[]} /></MitumbaThemeProvider>);
    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationListV2 conversations={[]} state="error" onRetry={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ConversationListV2 conversations={[]} state="forbidden" /></MitumbaThemeProvider>);
    expect(screen.getByText('Conversation unavailable')).toBeInTheDocument();
  });

  it('loads another cursor page', () => {
    const onLoad = vi.fn();
    renderList({ hasNextPage: true, onLoadNextPage: onLoad });
    fireEvent.click(screen.getByRole('button', { name: 'Load more conversations' }));
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it('restores focus to a requested row', () => {
    renderList({ restoreFocusConversationId: 'c2' });
    expect(screen.getAllByRole('button', { name: /Conversation with Urban Thrift/ })[1]).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = renderList({ activeConversationId: 'c1', hasNextPage: true, onLoadNextPage: () => {} });
    expect(await axe(container)).toHaveNoViolations();
  });
});
