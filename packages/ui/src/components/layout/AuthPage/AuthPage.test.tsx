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

    const form = screen.getByRole('form', { name: 'sign-in-form' });
    fireEvent.change(within(form).getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(within(form).getByLabelText(/^Password/i), { target: { value: 'password123' } });
    fireEvent.click(within(form).getByRole('button', { name: /Sign In/i }));

    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
  });

  it('switches views, unmounts inactive forms, and moves focus into the active form', async () => {
    const onViewChange = vi.fn();
    render(<MitumbaThemeProvider><AuthPage onViewChange={onViewChange} titleLevel={1} /></MitumbaThemeProvider>);

    const form = screen.getByRole('form', { name: 'sign-in-form' });
    fireEvent.click(within(form).getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(onViewChange).toHaveBeenCalledWith('signup');
      expect(screen.getByRole('heading', { name: 'Sign Up', level: 1 })).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.queryByRole('heading', { name: 'Sign In' })).not.toBeInTheDocument();
    expect(screen.queryByRole('form', { name: 'sign-in-form' })).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText(/Email/i)).toHaveFocus();
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

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits one active h%s view heading when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><AuthPage titleLevel={level} /></MitumbaThemeProvider>);
    expect(screen.getAllByRole('heading', { name: 'Sign In', level })).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Sign In', level })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign Up' })).not.toBeInTheDocument();
  });

  it.each([
    ['signin', 'Sign In', 'sign-in-form'],
    ['signup', 'Sign Up', 'sign-up-form'],
    ['forgot', 'Forgot Password', 'forgot-password-form'],
    ['reset', 'Reset Password', 'reset-password-form'],
  ] as const)('mounts only the active %s view', (view, heading, formName) => {
    render(
      <MitumbaThemeProvider><AuthPage view={view} titleLevel={1} /></MitumbaThemeProvider>,
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { name: heading, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('form')).toHaveLength(1);
    expect(screen.getByRole('form', { name: formName })).toBeInTheDocument();
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

  it.each(['signin', 'signup', 'forgot', 'reset'] as const)('has no axe violations in the %s view', async (view) => {
    const { container } = render(
      <MitumbaThemeProvider>
        <AuthPage view={view} titleLevel={2} onLogin={vi.fn()} onSocialAuth={vi.fn()} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
