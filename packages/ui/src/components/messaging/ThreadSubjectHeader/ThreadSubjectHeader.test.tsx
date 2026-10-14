// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import { ThreadSubjectHeader } from './ThreadSubjectHeader';

expect.extend(toHaveNoViolations);
afterEach(cleanup);

describe('ThreadSubjectHeader', () => {
  it('renders General, Listing, and Order subjects', () => {
    const { rerender } = render(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'general' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('General')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'listing', id: 'l1', title: 'Denim Jacket', status: 'Sold' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Denim Jacket')).toBeInTheDocument();
    expect(screen.getByText('Listing · Sold')).toBeInTheDocument();
    rerender(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'order', id: 'o1', shortId: '#MTB-1', title: 'Denim Jacket', status: 'Shipped' }} /></MitumbaThemeProvider>);
    expect(screen.getByText('Order #MTB-1')).toBeInTheDocument();
  });

  it('keeps support and private states separate', () => {
    render(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'listing', id: 'l1', title: 'Jacket', status: 'Sold' }} supportStatus="resolved" archived pinned muted /></MitumbaThemeProvider>);
    expect(screen.getByText('Listing · Sold')).toBeInTheDocument();
    expect(screen.getByText('Resolved')).toBeInTheDocument();
    expect(screen.getByText('Archived')).toBeInTheDocument();
    expect(screen.getByText('Pinned')).toBeInTheDocument();
    expect(screen.getByText('Muted')).toBeInTheDocument();
  });

  it('renders a semantic canonical destination', () => {
    render(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'order', id: 'o1', shortId: '#1', title: 'Jacket' }} href="/orders/o1" /></MitumbaThemeProvider>);
    expect(screen.getByRole('link', { name: 'View details' })).toHaveAttribute('href', '/orders/o1');
  });

  it('emits the requested heading level', () => {
    render(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'general' }} titleLevel={2} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'General', level: 2 })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<MitumbaThemeProvider><ThreadSubjectHeader subject={{ kind: 'listing', id: 'l1', title: 'Jacket' }} contextActor={{ kind: 'store', id: 's1', displayName: 'Urban Thrift' }} supportStatus="open" /></MitumbaThemeProvider>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
