import type { HeadingLevel } from '../../../types/semantic';

export interface DocumentSheetProps {
  /** Whether the sheet is open. */
  open: boolean;
  /** Called on Close, Escape, or a click on the backdrop. */
  onClose: () => void;
  /** The document's name, e.g. "Receipt" or "Invoice". Also labels the dialog. */
  title: string;
  /** A secondary line, e.g. the receipt or invoice number. */
  subtitle?: string;
  /** The document's URL: an object URL (blob:) or an https URL. Absent while loading or on error. */
  src?: string;
  /** The name the Download action saves the document under. */
  filename?: string;
  /** Shows a skeleton in place of the document. */
  loading?: boolean;
  /** Shown in place of the document, with a Retry button when `onRetry` is given. */
  error?: string;
  /** Called by the error state's Retry button. */
  onRetry?: () => void;
  /** The heading level of the title. Visual size is unchanged. */
  titleLevel?: HeadingLevel;
}
