// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthPage } from './AuthPage';

describe('AuthPage', () => {
  it('renders signin view by default', () => {
    render(<AuthPage />);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('calls onLogin when sign in form is submitted', () => {
    const onLogin = vi.fn();
    render(<AuthPage onLogin={onLogin} />);

    // Use first form instance; button onClick directly calls handleLoginSubmit
    const form = screen.getAllByRole('form', { name: 'sign-in-form' })[0];
    fireEvent.change(within(form).getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(within(form).getByLabelText(/^Password/i), { target: { value: 'password123' } });
    fireEvent.click(within(form).getByRole('button', { name: /Sign In/i }));

    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
  });

  it('switches to signup view when Sign Up link is clicked', async () => {
    const onViewChange = vi.fn();
    render(<AuthPage onViewChange={onViewChange} />);

    const form = screen.getAllByRole('form', { name: 'sign-in-form' })[0];
    fireEvent.click(within(form).getByRole('link', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(onViewChange).toHaveBeenCalledWith('signup');
    }, { timeout: 2000 });
  });

  it('displays error message when error prop is provided', () => {
    render(<AuthPage error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
