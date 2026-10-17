// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import type { ThreadMessageViewModel } from '../../../types/messaging-v2';
import { MessageBubbleV2 } from './MessageBubbleV2';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

const storeMessage: ThreadMessageViewModel = { id: 'm1', threadId: 't1', author: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, direction: 'outgoing', body: 'Your order shipped.', createdAt: '10:30', deliveryStatus: 'sent' };

describe('MessageBubbleV2', () => {
  it('shows explicit sent-as store identity', () => {
    render(<MitumbaThemeProvider><MessageBubbleV2 message={storeMessage} /></MitumbaThemeProvider>);
    expect(screen.getByText('Sent as Urban Thrift')).toBeInTheDocument();
    expect(screen.queryByText('You')).not.toBeInTheDocument();
  });

  it('exposes incoming store identity without adding visual noise', () => {
    render(<MitumbaThemeProvider><MessageBubbleV2 message={{ id: 'm2', threadId: 't1', author: { kind: 'store', id: 's1', displayName: 'Urban Thrift' }, direction: 'incoming', body: 'Your order shipped.', createdAt: '10:30' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Urban Thrift')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Sent as Urban Thrift/ })).toBeInTheDocument();
  });

  it('renders a quoted reply in the same message', () => {
    render(<MitumbaThemeProvider><MessageBubbleV2 message={{ ...storeMessage, quotedReply: { messageId: 'm0', authorName: 'Amina', excerpt: 'Has this shipped?' } }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Amina')).toBeInTheDocument();
    expect(screen.getByText('Has this shipped?')).toBeInTheDocument();
  });

  it('retries a failed message with the stable view model', () => {
    const onRetry = vi.fn();
    const failed = { ...storeMessage, deliveryStatus: 'failed' as const, clientMessageId: 'client-1' };
    render(<MitumbaThemeProvider><MessageBubbleV2 message={failed} onRetry={onRetry} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledWith(failed);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to send');
  });

  it('selects a message to quote', () => {
    const onReply = vi.fn();
    render(<MitumbaThemeProvider><MessageBubbleV2 message={storeMessage} onReply={onReply} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Reply to message from Sent as Urban Thrift' }));
    expect(onReply).toHaveBeenCalledWith('m1');
  });

  it('renders authorized image and file attachments', () => {
    render(<MitumbaThemeProvider><MessageBubbleV2 message={{ ...storeMessage, attachments: [{ kind: 'image', id: 'a1', name: 'Condition photo', url: '/condition.jpg' }, { kind: 'file', id: 'a2', name: 'Receipt.pdf', url: '/receipt.pdf', size: '2 MB' }] }} /></MitumbaThemeProvider>);
    expect(screen.getByRole('img', { name: 'Condition photo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open attachment Receipt.pdf' })).toHaveAttribute('href', '/receipt.pdf');
  });

  it('has no axe violations', async () => {
    const { container } = render(<MitumbaThemeProvider><MessageBubbleV2 message={storeMessage} onReply={() => {}} /></MitumbaThemeProvider>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
