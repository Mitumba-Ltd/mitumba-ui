import React from 'react';
import type { HeadingLevel } from '../../../types/semantic';

export interface AuthPageProps {
  /** Current active view/mode */
  view?: 'signin' | 'signup' | 'forgot' | 'reset';

  /**
   * Emits an h1-h6 element for each view's heading when provided. When omitted
   * the headings keep their current `<h4>` element and unchanged visual size.
   */
  titleLevel?: HeadingLevel;
  
  /** Handler for login submission */
  onLogin?: (email: string, password: string, remember: boolean) => void;
  
  /** Handler for sign up submission */
  onSignUp?: (email: string, password: string) => void;
  
  /** Handler for forgot password submission */
  onForgotPassword?: (email: string) => void;
  
  /** Handler for reset password submission */
  onResetPassword?: (password: string, confirmPassword: string) => void;
  
  /** Handler for social authentication */
  onSocialAuth?: (provider: string, mode: 'login' | 'signup', data?: unknown) => void;
  
  /** Handler when the user attempts to switch views */
  onViewChange?: (view: 'signin' | 'signup' | 'forgot' | 'reset') => void;
  
  /** Whether an authentication request is in progress */
  loading?: boolean;
  
  /** Error message to display */
  error?: string;
  
  /** Success message to display */
  success?: string;
  
  /** Info message to display */
  info?: string;
  
  /** Warning message to display */
  warning?: string;
  
  /** Array of social providers to render buttons for */
  socialProviders?: Array<{ name: string; icon: React.ReactNode }>;
  
  /** Optional theme variation */
  theme?: 'mitumba-light' | 'mitumba-dark';
  
  /** URL for the main illustration image shown on desktop */
  illustrationUrl?: string;

  /** URL for a full-bleed hero photo behind the gradient panel (desktop only) */
  heroImageUrl?: string;
  
  /** Additional actions to render in the footer area */
  footerActions?: React.ReactNode;
}
