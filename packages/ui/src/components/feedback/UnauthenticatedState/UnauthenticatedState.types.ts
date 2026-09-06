import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../types/semantic';

export interface UnauthenticatedStateProps {
  /** Page-specific title, e.g. "Sign in to view your orders" */
  title: string;
  /** Brief description */
  subtitle: string;
  /** Optional icon/illustration — defaults to a lock icon */
  icon?: ReactNode;
  /** Label for the sign-in button. Defaults to "Sign In" */
  signInLabel?: string;
  /** Called when sign-in button is clicked */
  onSignIn: () => void;
  /** Optional secondary action (e.g. "Create Account") */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Emits an h1-h6 element for the title when provided. When omitted the title
   * keeps its current non-heading paragraph element and unchanged visual size.
   */
  titleLevel?: HeadingLevel;
}
