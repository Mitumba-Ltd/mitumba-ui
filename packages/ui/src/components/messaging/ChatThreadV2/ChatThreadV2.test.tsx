/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import type { ThreadTimelineItem } from '../../../types/messaging-v2';
import { ChatThreadV2 } from './ChatThreadV2';

expect.extend(toHaveNoViolations);
afterEach(() => { cleanup(); vi.useRealTimers(); });

const store = { kind: 'store' as const, id: 's1', displayName: 'Urban Thrift' };
const buyer = { kind: 'user' as const, id: 'u1', displayName: 'Amina' };
const timeline: ThreadTimelineItem[] = [
  { kind: 'message', message: { id: 'm1', threadId: 't1', author: buyer, direction: 'outgoing', body: 'Has this shipped?', createdAt: '10:00' } },
  { kind: 'system', event: { id: 'e1', threadId: 't1', kind: 'thread-linked', label: 'Order #MTB-1 was created from this inquiry', createdAt: '10:10', href: '/inbox/c/c1/t/t-order', relatedThread: { id: 't-order', subject: { kind: 'order', id: 'o1', shortId: '#MTB-1', title: 'Jacket' } } } },
  { kind: 'message', message: { id: 'm2', threadId: 't1', author: store, direction: 'incoming', body: 'Yes, this morning.', createdAt: '10:30' } },
];

const required = { conversationId: 'c1', threadConversationId: 'c1', threadId: 't1', subject: { kind: 'listing' as const, id: 'l1', title: 'Jacket' }, actingAs: buyer, counterparty: store, timeline, draft: '', onDraftChange: () => {}, onSend: () => {} };

function renderThread(props: Partial<React.ComponentProps<typeof ChatThreadV2>> = {}) {
  return render(
    <MitumbaThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ChatThreadV2 {...required} {...props} />
    </MitumbaThemeProvider>,
  );
}

describe('ChatThreadV2', () => {
  it('renders stable human and system timeline items', () => {
    renderThread();
    expect(screen.getByText('Has this shipped?')).toBeInTheDocument();
    expect(screen.getByRole('note', { name: /Order #MTB-1 was created/ })).toBeInTheDocument();
    expect(screen.getByText('Yes, this morning.')).toBeInTheDocument();
  });

  it('sends trimmed text with stable conversation and thread IDs', () => {
    const onSend = vi.fn();
    const onDraftChange = vi.fn();
    renderThread({ draft: '  Hello  ', onSend, onDraftChange, quotedMessageId: 'm2' });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).toHaveBeenCalledWith({ conversationId: 'c1', threadId: 't1', body: 'Hello', quotedMessageId: 'm2' });
    expect(onDraftChange).toHaveBeenCalledWith('');
  });

  it('never forwards a missing or cross-thread quoted message ID', () => {
    const onSend = vi.fn();
    renderThread({ draft: 'Hello', quotedMessageId: 'missing-message', onSend });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).toHaveBeenCalledWith({ conversationId: 'c1', threadId: 't1', body: 'Hello', quotedMessageId: undefined });
  });

  it('does not send while an IME composition is active', () => {
    const onSend = vi.fn();
    renderThread({ draft: '入力', onSend });
    fireEvent.keyDown(screen.getByLabelText('Message input'), { key: 'Enter', isComposing: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('emits typing false for the old thread when switching IDs', async () => {
    const onTyping = vi.fn();
    const { rerender, container } = renderThread({ draft: 'H', onTyping, onDraftChange: () => {} });
    const input = container.querySelector('textarea');
    expect(input).not.toBeNull();
    fireEvent.change(input as HTMLTextAreaElement, { target: { value: 'Hi' } });
    expect(onTyping).toHaveBeenCalledWith('t1', true);
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} threadId="t2" timeline={[]} draft="" onTyping={onTyping} /></MitumbaThemeProvider>);
    await waitFor(() => expect(onTyping).toHaveBeenCalledWith('t1', false));
  });

  it('rejects mismatched timeline data instead of rendering it', () => {
    renderThread({ threadId: 't2' });
    expect(screen.getByText('Thread data mismatch')).toBeInTheDocument();
    expect(screen.queryByText('Has this shipped?')).not.toBeInTheDocument();
  });

  it('rejects a stale thread record from another selected conversation', () => {
    const onSend = vi.fn();
    renderThread({ conversationId: 'c2', draft: 'Stale draft', quotedMessageId: 'm2', onSend });
    expect(screen.getByText('Thread data mismatch')).toBeInTheDocument();
    expect(screen.getByLabelText('Message input')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables sending and hides stale draft, quote, and typing outside a ready matching thread', () => {
    const onSend = vi.fn();
    renderThread({ state: 'forbidden', draft: 'Stale draft', quotedMessageId: 'm2', typingActors: [store], onSend });
    expect(screen.getByLabelText('Message input')).toHaveValue('');
    expect(screen.queryByText('Replying to Urban Thrift')).not.toBeInTheDocument();
    expect(screen.queryByText('Urban Thrift typing…')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('renders linked system items as semantic destinations', () => {
    renderThread();
    expect(screen.getByRole('link', { name: /Order #MTB-1 was created/ })).toHaveAttribute('href', '/inbox/c/c1/t/t-order');
  });

  it('loads older timeline pages', () => {
    const onLoad = vi.fn();
    renderThread({ hasOlder: true, onLoadOlder: onLoad });
    fireEvent.click(screen.getByRole('button', { name: 'Load older messages' }));
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it('renders empty, error, forbidden, offline, reconnecting, and policy states', () => {
    const { rerender } = renderThread({ timeline: [] });
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} timeline={[]} state="error" onRetry={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} timeline={[]} state="forbidden" /></MitumbaThemeProvider>);
    expect(screen.getByText('Thread unavailable')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} timeline={[]} connectionState="offline" /></MitumbaThemeProvider>);
    expect(screen.getByText(/You’re offline/)).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} timeline={[]} connectionState="reconnecting" /></MitumbaThemeProvider>);
    expect(screen.getByText('Reconnecting…')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ChatThreadV2 {...required} timeline={[]} policyState="blocked" /></MitumbaThemeProvider>);
    expect(screen.getByText('Messaging is blocked for this thread.')).toBeInTheDocument();
  });

  it('focuses the header only on explicit request', () => {
    renderThread({ focusRequestKey: 1 });
    expect(screen.getByRole('group', { name: 'Thread header' })).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = renderThread({ onOpenLinkedThread: () => {}, onReplyToMessage: () => {} });
    expect(await axe(container)).toHaveNoViolations();
  });
});
