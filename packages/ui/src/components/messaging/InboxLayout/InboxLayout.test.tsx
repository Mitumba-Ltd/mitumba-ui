// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { InboxLayout } from './InboxLayout';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

describe('InboxLayout', () => {
  it('renders title', () => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} /></MitumbaThemeProvider>);
    expect(screen.getAllByText('Messages').length).toBeGreaterThan(0);
  });

  it('renders custom title', () => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} title="Inbox" /></MitumbaThemeProvider>);
    expect(screen.getAllByText('Inbox').length).toBeGreaterThan(0);
  });

  it('renders both panels', () => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>Conversations</div>} chatThread={<div>Chat</div>} /></MitumbaThemeProvider>);
    expect(screen.getByText('Conversations')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders back button when showMobileBack is true', () => {
    const onMobileBack = vi.fn();
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} showMobileBack onMobileBack={onMobileBack} /></MitumbaThemeProvider>);
    const backBtn = screen.getByLabelText('Back to conversations');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(onMobileBack).toHaveBeenCalled();
  });

  it('labels the two panes as regions', () => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} /></MitumbaThemeProvider>);
    expect(screen.getByRole('region', { name: 'Conversations' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Conversation' })).toBeInTheDocument();
  });

  it('keeps the title as an h6 element by default', () => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} /></MitumbaThemeProvider>);
    screen.getAllByText('Messages').forEach((node) => {
      expect(node.tagName).toBe('H6');
    });
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} titleLevel={level} /></MitumbaThemeProvider>);
    screen.getAllByText('Messages').forEach((node) => {
      expect(node.tagName).toBe(`H${level}`);
    });
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} titleLevel={2} />
      </ThemeProvider>,
    );
    screen.getAllByText('Messages').forEach((node) => {
      expect(node.style.fontFamily).toBe('');
    });
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <InboxLayout conversationList={<div>List</div>} chatThread={<div>Thread</div>} title="Messages" titleLevel={2} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
