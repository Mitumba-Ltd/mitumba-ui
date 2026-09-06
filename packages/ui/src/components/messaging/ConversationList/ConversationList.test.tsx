// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { ConversationList } from './ConversationList';
import type { Conversation } from './ConversationList.types';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

const conversations: Conversation[] = [
  { id: 'c1', partnerId: 'u1', partnerName: 'Amina Wafula', lastMessage: 'Is the jacket available?', lastMessageAt: '10:30 AM', unread: true, listingTitle: 'Denim Jacket' },
  { id: 'c2', partnerId: 'u2', partnerName: 'Brian Ochieng', lastMessage: 'Thanks, will pick up tomorrow', lastMessageAt: 'Yesterday' },
];

describe('ConversationList', () => {
  it('renders conversation names', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} onSelect={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('Amina Wafula')).toBeInTheDocument();
    expect(screen.getByText('Brian Ochieng')).toBeInTheDocument();
  });

  it('exposes a semantic list of conversation rows', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} onSelect={() => {}} /></MitumbaThemeProvider>);
    const list = screen.getByRole('list', { name: 'Conversations' });
    expect(list.tagName).toBe('UL');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    const rows = within(list).getAllByRole('button');
    expect(rows).toHaveLength(2);
  });

  it('marks the active conversation row with aria-current', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} activeId="c2" onSelect={() => {}} /></MitumbaThemeProvider>);
    const activeRow = screen.getByRole('button', { name: 'Conversation with Brian Ochieng' }).closest('li');
    const inactiveRow = screen.getByRole('button', { name: 'Conversation with Amina Wafula' }).closest('li');
    expect(activeRow).toHaveAttribute('aria-current', 'true');
    expect(inactiveRow).not.toHaveAttribute('aria-current');
  });

  it('calls onSelect when row clicked', () => {
    const onSelect = vi.fn();
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} onSelect={onSelect} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Amina Wafula'));
    expect(onSelect).toHaveBeenCalledWith('c1');
  });

  it('shows listing chip when listingTitle provided', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} onSelect={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('Denim Jacket')).toBeInTheDocument();
  });

  it('renders compose button when onCompose provided', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={conversations} onSelect={() => {}} onCompose={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText('New message')).toBeInTheDocument();
  });

  it('renders an accessible loading state', () => {
    const { container } = render(<MitumbaThemeProvider><ConversationList conversations={[]} onSelect={() => {}} loading /></MitumbaThemeProvider>);
    const status = screen.getByRole('status', { name: 'Loading conversations' });
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(5);
  });

  it('renders an accessible empty state', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={[]} onSelect={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
    expect(screen.getByText('Conversations with sellers and buyers show up here.')).toBeInTheDocument();
  });

  it('omits emptyTitleLevel by default, rendering a non-heading empty title', () => {
    render(<MitumbaThemeProvider><ConversationList conversations={[]} onSelect={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('No messages yet').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s empty title when emptyTitleLevel is set', (level) => {
    render(<MitumbaThemeProvider><ConversationList conversations={[]} onSelect={() => {}} emptyTitleLevel={level} /></MitumbaThemeProvider>);
    expect(screen.getByText('No messages yet').tagName).toBe(`H${level}`);
  });

  it('inherits the host theme typography.fontFamily on the empty title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <ConversationList conversations={[]} onSelect={() => {}} emptyTitleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('No messages yet').style.fontFamily).toBe('');
  });

  it('has no axe violations when populated', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ConversationList conversations={conversations} activeId="c1" onSelect={() => {}} onCompose={() => {}} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations in the empty state', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ConversationList conversations={[]} onSelect={() => {}} emptyTitleLevel={2} onCompose={() => {}} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
