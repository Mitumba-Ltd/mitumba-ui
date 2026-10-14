// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import { ConversationActorLabel } from './ConversationActorLabel';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

describe('ConversationActorLabel', () => {
  it('labels store identity textually', () => {
    render(<MitumbaThemeProvider><ConversationActorLabel actor={{ kind: 'store', id: 's1', displayName: 'Urban Thrift' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Urban Thrift')).toBeInTheDocument();
    expect(screen.getByText('Store')).toBeInTheDocument();
  });

  it('renders a sent-as prefix without exposing another identity', () => {
    render(<MitumbaThemeProvider><ConversationActorLabel actor={{ kind: 'store', id: 's1', displayName: 'Urban Thrift' }} prefix="Sent as" /></MitumbaThemeProvider>);
    expect(screen.getByText('Sent as Urban Thrift')).toBeInTheDocument();
  });

  it('does not add a store badge to a user', () => {
    render(<MitumbaThemeProvider><ConversationActorLabel actor={{ kind: 'user', id: 'u1', displayName: 'Amina' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Amina')).toBeInTheDocument();
    expect(screen.queryByText('Store')).not.toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<MitumbaThemeProvider><ConversationActorLabel actor={{ kind: 'store', id: 's1', displayName: 'Urban Thrift' }} secondaryText="Online" /></MitumbaThemeProvider>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
