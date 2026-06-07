// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    
    // We get the first button that has name 'Sign In' which is the primary button in SignIn view
    const submitBtn = screen.getAllByRole('button', { name: /Sign In/i })[0];
    const emailInput = screen.getAllByLabelText(/Email/i)[0];
    const passwordInput = screen.getAllByLabelText(/Password/i)[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
  });

  it('switches to signup view when Sign Up link is clicked', async () => {
    const onViewChange = vi.fn();
    render(<AuthPage onViewChange={onViewChange} />);
    
    // The link is inside a Typography component that says "Don't have an account?"
    // To be precise, it's the anchor element matching the text exactly.
    const signUpLink = screen.getAllByText('Sign Up', { selector: 'a' })[0];
    fireEvent.click(signUpLink);

    // After animation delay it calls onViewChange
    await waitFor(() => {
      expect(onViewChange).toHaveBeenCalledWith('signup');
    }, { timeout: 2000 });
  });

  it('displays error message when error prop is provided', () => {
    render(<AuthPage error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
