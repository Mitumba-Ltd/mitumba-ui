import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../types/semantic';

export interface InboxLayoutProps {
  /** The conversation/thread list pane content. */
  conversationList: ReactNode;
  /** The active chat thread pane content. */
  chatThread: ReactNode;
  /** Inbox title. @default 'Messages' */
  title?: string;
  /** Whether the mobile back affordance and single-pane mode are shown. */
  showMobileBack?: boolean;
  /** Called when the mobile back button is pressed. */
  onMobileBack?: () => void;
  /**
   * Emits an h1-h6 element for the inbox title when provided. When omitted the
   * title keeps its current `<h6>` element and unchanged visual size/weight.
   */
  titleLevel?: HeadingLevel;
}
