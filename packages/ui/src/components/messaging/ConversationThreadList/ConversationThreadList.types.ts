import type { ConversationActor, ConversationThreadCard, MessagingLinkComponent, MessagingLoadState } from '../../../types/messaging-v2';

export interface ConversationThreadListProps {
  /** Stable parent conversation identifier. */
  conversationId: string;
  /** Perspective-safe thread cards supplied by the application. */
  threads: ConversationThreadCard[];
  /** Optional actor that gives the thread list conversation context. */
  contextActor?: ConversationActor;
  /** Currently selected stable thread ID. */
  activeThreadId?: string;
  /** Selects a thread by stable ID. */
  onSelectThread?: (threadId: string) => void;
  /** Returns a semantic destination for a thread card. */
  getThreadHref?: (thread: ConversationThreadCard) => string | undefined;
  /** Optional host-router link renderer. */
  linkComponent?: MessagingLinkComponent;
  /** Controlled load/error state. @default 'ready' */
  state?: MessagingLoadState;
  /** Recoverable error heading. */
  errorTitle?: string;
  /** Recoverable error guidance. */
  errorText?: string;
  /** Retries a recoverable load error. */
  onRetry?: () => void;
  /** Empty-state heading. */
  emptyTitle?: string;
  /** Empty-state guidance. */
  emptyText?: string;
  /** Whether another cursor page exists. */
  hasNextPage?: boolean;
  /** Whether another cursor page is loading. */
  loadingNextPage?: boolean;
  /** Loads the next cursor page. */
  onLoadNextPage?: () => void;
  /** Thread card to focus when this value changes. */
  restoreFocusThreadId?: string;
  /** Accessible list label. @default 'Conversation threads' */
  ariaLabel?: string;
}
