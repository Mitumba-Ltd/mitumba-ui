import type { ReactNode } from 'react';

export type ErrorType = 'general' | '404' | '500' | 'network' | 'forbidden';
export type ErrorVariant = 'standard' | 'elevated' | 'compact';

export interface ErrorStateProps {
  /** Main heading — defaults to "Something went wrong" */
  title?: string;
  /** Supporting message — explains what happened and how to recover */
  subtitle?: string;
  /** Error type — determines icon and accent color */
  type?: ErrorType;
  /** Layout variant */
  variant?: ErrorVariant;
  /** Primary action — retry/refresh/reconnect */
  onRetry?: () => void;
  /** Label for retry button — defaults to "Try again" */
  retryLabel?: string;
  /** Secondary action — go back/home */
  onBack?: () => void;
  /** Custom icon/illustration — overrides type-based icon */
  illustration?: ReactNode;
}
