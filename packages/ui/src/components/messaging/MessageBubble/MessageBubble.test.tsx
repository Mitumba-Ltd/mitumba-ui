// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { MessageBubble } from './MessageBubble';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

describe('MessageBubble', () => {
  it('renders message body', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Hello there" timestamp="10:30 AM" isMine={false} senderName="Amina" /></MitumbaThemeProvider>);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });

  it('renders timestamp', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Hi" timestamp="2:15 PM" isMine /></MitumbaThemeProvider>);
    expect(screen.getByText('2:15 PM')).toBeInTheDocument();
  });

  it('shows sender name for received messages', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Hey" timestamp="9:00 AM" isMine={false} senderName="Wanjiku" /></MitumbaThemeProvider>);
    expect(screen.getByText('Wanjiku')).toBeInTheDocument();
  });

  it('renders file attachment with name', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Check this" timestamp="11:00 AM" isMine attachment={{ type: 'file', name: 'receipt.pdf', size: '1.2 MB', url: '#' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('receipt.pdf')).toBeInTheDocument();
    expect(screen.getByText('1.2 MB')).toBeInTheDocument();
  });

  it('renders image attachment', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Photo" timestamp="11:05 AM" isMine={false} senderName="Otieno" attachment={{ type: 'image', name: 'item.jpg', url: 'https://placehold.co/200' }} /></MitumbaThemeProvider>);
    expect(screen.getByAltText('item.jpg')).toBeInTheDocument();
  });

  it('exposes each message as a labelled group carrying author and timestamp metadata', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Hey" timestamp="9:00 AM" isMine={false} senderName="Wanjiku" /></MitumbaThemeProvider>);
    expect(screen.getByRole('group', { name: 'Wanjiku, 9:00 AM' })).toBeInTheDocument();
  });

  it('labels own messages as "You" in the group metadata', () => {
    render(<MitumbaThemeProvider><MessageBubble body="Hi" timestamp="2:15 PM" isMine /></MitumbaThemeProvider>);
    expect(screen.getByRole('group', { name: 'You, 2:15 PM' })).toBeInTheDocument();
  });

  it('inherits the host theme typography.fontFamily on the body (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <MessageBubble body="Hello there" timestamp="10:30 AM" isMine={false} senderName="Amina" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Hello there').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <MessageBubble body="Check this" timestamp="11:00 AM" isMine attachment={{ type: 'file', name: 'receipt.pdf', size: '1.2 MB', url: '#' }} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
