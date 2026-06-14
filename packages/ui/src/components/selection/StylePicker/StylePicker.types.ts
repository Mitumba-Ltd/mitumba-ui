import type { ReactNode } from 'react';

export interface StyleOption {
  /** Unique style identifier */
  id: string;
  /** Display label */
  label: string;
  /** Short description (optional) */
  description?: string;
  /** Live preview render — a miniature version of the component in this style */
  preview: ReactNode;
}

export interface StylePickerProps {
  /** Available style options with live previews */
  options: StyleOption[];
  /** Currently selected style ID */
  value: string;
  /** Called when a style is selected — fires immediately (no save needed) */
  onChange: (styleId: string) => void;
  /** Section title */
  title?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Grid columns on desktop — defaults to 2 */
  columns?: number;
}
