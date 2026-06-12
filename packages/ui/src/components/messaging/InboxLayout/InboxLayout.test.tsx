// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { InboxLayout } from './InboxLayout';

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
});
