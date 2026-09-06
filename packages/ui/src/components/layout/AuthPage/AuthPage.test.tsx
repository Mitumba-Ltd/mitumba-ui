// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { AuthPage } from './AuthPage';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

describe('AuthPage', () => {
  it('renders signin view by default', () => {
    render(<MitumbaThemeProvider><AuthPage /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('calls onLogin when sign in form is submitted', () => {
    const onLogin = vi.fn();
    render(<MitumbaThemeProvider><AuthPage onLogin={onLogin} /></MitumbaThemeProvider>);

    const form = screen.getAllByRole('form', { name: 'sign-in-form' })[0];
    fireEvent.change(within(form).getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(within(form).getByLabelText(/^Password/i), { target: { value: 'password123' } });
    fireEvent.click(within(form).getByRole('button', { name: /Sign In/i }));

    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
  });

  it('switches to signup view when Sign Up link is clicked', async () => {
    const onViewChange = vi.fn();
    render(<MitumbaThemeProvider><AuthPage onViewChange={onViewChange} /></MitumbaThemeProvider>);

    const form = screen.getAllByRole('form', { name: 'sign-in-form' })[0];
    fireEvent.click(within(form).getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(onViewChange).toHaveBeenCalledWith('signup');
    }, { timeout: 2000 });
  });

  it('displays error message when error prop is provided', () => {
    render(<MitumbaThemeProvider><AuthPage error="Invalid credentials" /></MitumbaThemeProvider>);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('announces urgent errors via role="alert"', () => {
    render(<MitumbaThemeProvider><AuthPage error="Invalid credentials" /></MitumbaThemeProvider>);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('announces non-urgent feedback via role="status" (no alert)', () => {
    render(<MitumbaThemeProvider><AuthPage success="Signed in" /></MitumbaThemeProvider>);
    expect(screen.getByRole('status')).toHaveTextContent('Signed in');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps view headings as h4 elements by default', () => {
    render(<MitumbaThemeProvider><AuthPage /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'Sign In', level: 4 })).toBeInTheDocument();
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element for view headings when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><AuthPage titleLevel={level} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'Sign In', level })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sign Up', level })).toBeInTheDocument();
  });

  it('preserves the sign-in / sign-up / forgot / reset views', () => {
    render(<MitumbaThemeProvider><AuthPage /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Forgot Password' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Reset Password' })).toBeInTheDocument();
  });

  it('inherits the host theme typography.fontFamily on headings (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <AuthPage titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Sign In' })).toHaveStyle({ fontFamily: '' });
  });

  it('has no axe violations in the signin view', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <AuthPage titleLevel={2} onLogin={vi.fn()} onSocialAuth={vi.fn()} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
