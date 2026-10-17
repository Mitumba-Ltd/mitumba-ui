import type { ConversationSummaryV2, MessagingLinkComponent, MessagingLoadState } from '../../../types/messaging-v2';

export interface ConversationListV2Props {
  /** Perspective-safe conversation summaries. */
  conversations: ConversationSummaryV2[];
  /** Currently selected conversation ID. */
  activeConversationId?: string;
  /** Selects a conversation by stable ID. */
  onSelectConversation?: (conversationId: string) => void;
  /** Returns a semantic destination for a conversation row. */
  getConversationHref?: (conversation: ConversationSummaryV2) => string | undefined;
  /** Optional host-router link renderer. */
  linkComponent?: MessagingLinkComponent;
  /** Controlled load/error state. @default 'ready' */
  state?: MessagingLoadState;
  /** Error-state heading. */
  errorTitle?: string;
  /** Error-state recovery guidance. */
  errorText?: string;
  /** Retries a recoverable load error. */
  onRetry?: () => void;
  /** Empty-state heading. */
  emptyTitle?: string;
  /** Empty-state guidance. */
  emptyText?: string;
  /** Whether another cursor page exists. */
  hasNextPage?: boolean;
  /** Whether the next cursor page is loading. */
  loadingNextPage?: boolean;
  /** Loads the next cursor page. */
  onLoadNextPage?: () => void;
  /** Conversation row to focus when a new restoration request is made. */
  restoreFocusConversationId?: string;
  /** Request identity; change it to repeat restoration for the same conversation. */
  restoreFocusRequestKey?: string | number;
  /** Accessible list label. @default 'Conversations' */
  ariaLabel?: string;
}
