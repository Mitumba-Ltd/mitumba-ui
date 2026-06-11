import type { ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icon or illustration element displayed above/beside the text */
  illustration?: ReactNode;
  /** Legacy alias for illustration */
  icon?: ReactNode;
  /** Primary headline — short, human, contextual */
  title: string;
  /** Supporting description — explains why it's empty and what to do */
  subtitle: string;
  /** Single CTA action — one path forward, never multiple */
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'earth' | 'outline';
  };
  /** Layout variant — standard (centered), compact (inline row), elevated (card with shadow) */
  variant?: 'standard' | 'compact' | 'elevated';
}
