// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { UnauthenticatedState } from './UnauthenticatedState';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

describe('UnauthenticatedState', () => {
  it('renders title and subtitle', () => {
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in to view orders" subtitle="Track your purchases" onSignIn={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Sign in to view orders')).toBeInTheDocument();
    expect(screen.getByText('Track your purchases')).toBeInTheDocument();
  });

  it('renders sign in button with default label', () => {
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in" subtitle="Please log in" onSignIn={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('calls onSignIn when button clicked', () => {
    const onSignIn = vi.fn();
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in" subtitle="Please" onSignIn={onSignIn} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });

  it('renders custom sign in label', () => {
    render(<MitumbaThemeProvider><UnauthenticatedState title="Login" subtitle="Please" onSignIn={vi.fn()} signInLabel="Log In" /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('renders secondary action when provided', () => {
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in" subtitle="Please" onSignIn={vi.fn()} secondaryAction={{ label: 'Create Account', onClick }} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Create Account'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in" subtitle="Please" onSignIn={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Sign in').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><UnauthenticatedState title="Sign in" subtitle="Please" onSignIn={vi.fn()} titleLevel={level} /></MitumbaThemeProvider>);
    const title = screen.getByText('Sign in');
    expect(title.tagName).toBe(`H${level}`);
    expect(title).toHaveStyle({ fontWeight: '800' });
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <UnauthenticatedState title="Sign in" subtitle="Please" onSignIn={vi.fn()} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Sign in').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <UnauthenticatedState title="Sign in to view orders" subtitle="Track your purchases" onSignIn={vi.fn()} titleLevel={1} secondaryAction={{ label: 'Create Account', onClick: vi.fn() }} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
