// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import { MessagingWorkspaceLayout } from './MessagingWorkspaceLayout';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

function workspace(props: Partial<React.ComponentProps<typeof MessagingWorkspaceLayout>> = {}) {
  return (
    <MitumbaThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <MessagingWorkspaceLayout conversationPane={<div>Conversation rail</div>} threadPane={<div>Thread cards</div>} messagePane={<div>Message stream</div>} {...props} />
    </MitumbaThemeProvider>
  );
}

describe('MessagingWorkspaceLayout', () => {
  it('renders three labelled regions rather than ARIA tabs', () => {
    render(workspace());
    expect(screen.getByRole('region', { name: 'Conversations' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Threads' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Messages' })).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('records the controlled active mobile pane', () => {
    const { container } = render(workspace({ activePane: 'threads' }));
    expect(container.querySelector('[data-active-pane="threads"]')).toBeInTheDocument();
  });

  it('handles both progressive mobile back actions', () => {
    const backConversations = vi.fn();
    const backThreads = vi.fn();
    render(workspace({ activePane: 'messages', onBackToConversations: backConversations, onBackToThreads: backThreads }));
    fireEvent.click(screen.getByRole('button', { name: 'Back to conversations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back to threads' }));
    expect(backConversations).toHaveBeenCalledOnce();
    expect(backThreads).toHaveBeenCalledOnce();
  });

  it('focuses only an explicitly requested pane heading', () => {
    const { rerender } = render(workspace({ focusRequest: { pane: 'threads', key: 1 } }));
    expect(screen.getByRole('heading', { name: 'Threads' })).toHaveFocus();
    rerender(workspace({ focusRequest: { pane: 'messages', key: 2 } }));
    expect(screen.getByRole('heading', { name: 'Messages' })).toHaveFocus();
  });

  it('emits configured heading levels', () => {
    render(workspace({ conversationTitleLevel: 1, threadTitleLevel: 2, messageTitleLevel: 3 }));
    expect(screen.getByRole('heading', { name: 'Conversations', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Threads', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Messages', level: 3 })).toBeInTheDocument();
  });

  it('does not move focus when no request is supplied', () => {
    render(workspace());
    expect(screen.getByRole('heading', { name: 'Conversations' })).not.toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = render(workspace({ activePane: 'messages', onBackToThreads: () => {}, onBackToConversations: () => {} }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
