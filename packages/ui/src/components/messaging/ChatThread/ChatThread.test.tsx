// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { ChatThread } from './ChatThread';
import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';

afterEach(() => { cleanup(); });

const messages: MessageBubbleProps[] = [
  { body: 'Hi, is this still available?', timestamp: '10:30 AM', isMine: true },
  { body: 'Yes it is! KES 2,000', timestamp: '10:32 AM', isMine: false, senderName: 'Wanjiku' },
];

describe('ChatThread', () => {
  it('renders partner name in header', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('Wanjiku Muthoni')).toBeInTheDocument();
  });

  it('renders messages', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('Hi, is this still available?')).toBeInTheDocument();
    expect(screen.getByText('Yes it is! KES 2,000')).toBeInTheDocument();
  });

  it('calls onSend when send button clicked', () => {
    const onSend = vi.fn();
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={onSend} /></MitumbaThemeProvider>);
    const input = screen.getByLabelText('Message input').querySelector('input')!;
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('renders partner status', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" partnerStatus="online" onSend={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('online')).toBeInTheDocument();
  });

  it('renders attach button when onAttach provided', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} onAttach={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText('Attach file')).toBeInTheDocument();
  });
});
