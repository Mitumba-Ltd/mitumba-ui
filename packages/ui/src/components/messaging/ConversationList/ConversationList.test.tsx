// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { ConversationList } from './ConversationList';
import type { Conversation } from './ConversationList.types';

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
  }, 10000);

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

  it('renders skeletons when loading', () => {
    const { container } = render(<MitumbaThemeProvider><ConversationList conversations={[]} onSelect={() => {}} loading /></MitumbaThemeProvider>);
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(5);
  });
});
