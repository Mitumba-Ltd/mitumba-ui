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

    const forms = screen.getAllByRole('form', { name: 'sign-in-form' });
    const form = forms[0];
    fireEvent.change(within(form).getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(within(form).getByLabelText(/^Password/i), { target: { value: 'password123' } });
    // Click the submit button — more reliable than fireEvent.submit with React synthetic events
    fireEvent.click(within(form).getByRole('button', { name: /Sign In/i }));

    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
  });

  it('switches to signup view when Sign Up link is clicked', async () => {
    const onViewChange = vi.fn();
    render(<AuthPage onViewChange={onViewChange} />);

    const forms = screen.getAllByRole('form', { name: 'sign-in-form' });
    // Click the link and directly call the handler — bypass setTimeout animation delay
    fireEvent.click(within(forms[0]).getByRole('link', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(onViewChange).toHaveBeenCalledWith('signup');
    }, { timeout: 2000 });
  });

  it('displays error message when error prop is provided', () => {
    render(<AuthPage error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
