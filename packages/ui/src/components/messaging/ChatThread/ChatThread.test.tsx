// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { ChatThread } from './ChatThread';
import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

const messages: MessageBubbleProps[] = [
  { body: 'Hi, is this still available?', timestamp: '10:30 AM', isMine: true },
  { body: 'Yes it is! KES 2,000', timestamp: '10:32 AM', isMine: false, senderName: 'Wanjiku' },
];

describe('ChatThread', () => {
  it('exposes a labelled conversation region', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByRole('region', { name: 'Conversation with Wanjiku Muthoni' })).toBeInTheDocument();
  });

  it('renders partner name in header', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('Wanjiku Muthoni')).toBeInTheDocument();
  });

  it('renders messages inside a labelled log with per-message metadata groups', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} /></MitumbaThemeProvider>);
    const log = screen.getByRole('log', { name: 'Messages' });
    const groups = within(log).getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(within(log).getByRole('group', { name: 'You, 10:30 AM' })).toBeInTheDocument();
    expect(within(log).getByRole('group', { name: 'Wanjiku, 10:32 AM' })).toBeInTheDocument();
    expect(screen.getByText('Hi, is this still available?')).toBeInTheDocument();
    expect(screen.getByText('Yes it is! KES 2,000')).toBeInTheDocument();
  });

  it('renders an accessible loading state', () => {
    const { container } = render(<MitumbaThemeProvider><ChatThread messages={[]} partnerName="Wanjiku" onSend={() => {}} loading /></MitumbaThemeProvider>);
    expect(screen.getByRole('log', { name: 'Messages' })).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(4);
  });

  it('renders an empty message log without messages', () => {
    render(<MitumbaThemeProvider><ChatThread messages={[]} partnerName="Wanjiku" onSend={() => {}} /></MitumbaThemeProvider>);
    const log = screen.getByRole('log', { name: 'Messages' });
    expect(within(log).queryAllByRole('group')).toHaveLength(0);
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

  it('surfaces a controlled live update once via a single status region', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} announcement="New message from Wanjiku" /></MitumbaThemeProvider>);
    const statuses = screen.getAllByRole('status');
    expect(statuses).toHaveLength(1);
    expect(statuses[0]).toHaveTextContent('New message from Wanjiku');
  });

  it('does not duplicate the live region on re-render with the same announcement', () => {
    const { rerender } = render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} announcement="New message" /></MitumbaThemeProvider>);
    rerender(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku" onSend={() => {}} announcement="New message" /></MitumbaThemeProvider>);
    expect(screen.getAllByRole('status')).toHaveLength(1);
  });

  it('omits titleLevel by default, rendering a non-heading partner title', () => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} /></MitumbaThemeProvider>);
    const title = screen.getByText('Wanjiku Muthoni');
    expect(title.tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s partner title (with unchanged body2 variant) when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} titleLevel={level} /></MitumbaThemeProvider>);
    const title = screen.getByText('Wanjiku Muthoni');
    expect(title.tagName).toBe(`H${level}`);
    expect(title).toHaveClass('MuiTypography-body2');
  });

  it('inherits the host theme typography.fontFamily on the partner title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <ChatThread messages={messages} partnerName="Wanjiku Muthoni" onSend={() => {}} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Wanjiku Muthoni').style.fontFamily).toBe('');
  });

  it('has no axe violations when populated', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ChatThread messages={messages} partnerName="Wanjiku Muthoni" partnerStatus="online" onSend={() => {}} onAttach={() => {}} titleLevel={2} announcement="New message" />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
