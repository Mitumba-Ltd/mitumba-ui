// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { UnauthenticatedState } from './UnauthenticatedState';

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
});
