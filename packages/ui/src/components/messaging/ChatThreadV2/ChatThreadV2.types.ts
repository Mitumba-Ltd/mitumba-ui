import type { ConversationActor, ConversationSubject, MessagingConnectionState, MessagingLinkComponent, MessagingLoadState, ThreadMessageAttachmentV2, ThreadMessageViewModel, ThreadPolicyState, ThreadTimelineItem } from '../../../types/messaging-v2';
import type { HeadingLevel } from '../../../types/semantic';

export interface ChatThreadV2SendInput {
  /** Stable parent conversation ID. */
  conversationId: string;
  /** Stable active thread ID. */
  threadId: string;
  /** Trimmed message body. */
  body: string;
  /** Optional quoted message ID in the same thread. */
  quotedMessageId?: string;
}

export interface ChatThreadV2Props {
  /** Stable parent conversation ID. */
  conversationId: string;
  /** Stable active thread ID. */
  threadId: string;
  /** General, Listing, or Order thread context. */
  subject: ConversationSubject;
  /** Identity represented by the active inbox perspective. */
  actingAs: ConversationActor;
  /** Recipient-facing conversation counterparty. */
  counterparty: ConversationActor;
  /** Stable message/system-event timeline. */
  timeline: ThreadTimelineItem[];
  /** Controlled composer draft, keyed by the parent to threadId. */
  draft: string;
  /** Updates the controlled composer draft. */
  onDraftChange: (value: string) => void;
  /** Sends into the active stable thread. */
  onSend: (input: ChatThreadV2SendInput) => void;
  /** Controlled load/error state. @default 'ready' */
  state?: MessagingLoadState;
  /** Recoverable error heading. */
  errorTitle?: string;
  /** Recoverable error guidance. */
  errorText?: string;
  /** Retries a recoverable timeline error. */
  onRetry?: () => void;
  /** Whether older timeline items exist. */
  hasOlder?: boolean;
  /** Whether older timeline items are loading. */
  loadingOlder?: boolean;
  /** Loads the next older cursor page. */
  onLoadOlder?: () => void;
  /** Controlled connection state. @default 'online' */
  connectionState?: MessagingConnectionState;
  /** Controlled active-thread policy state. @default 'active' */
  policyState?: ThreadPolicyState;
  /** Actors currently typing in this thread. */
  typingActors?: ConversationActor[];
  /** Controlled polite announcement. */
  announcement?: string;
  /** Emits thread-scoped typing state. */
  onTyping?: (threadId: string, isTyping: boolean) => void;
  /** Whether a send is in progress. */
  sending?: boolean;
  /** Parent-controlled quoted message ID. */
  quotedMessageId?: string;
  /** Clears the selected quote. */
  onClearQuote?: () => void;
  /** Selects a human message to quote. */
  onReplyToMessage?: (messageId: string) => void;
  /** Retries a failed outgoing message. */
  onRetryMessage?: (message: ThreadMessageViewModel) => void;
  /** Opens a related thread from a system timeline event. */
  onOpenLinkedThread?: (threadId: string) => void;
  /** Optional router-aware renderer for system-event links. */
  linkComponent?: MessagingLinkComponent;
  /** Shows an attachment action when implemented by the application. */
  onAttach?: () => void;
  /** Activates an authorized attachment. */
  onAttachmentClick?: (attachment: ThreadMessageAttachmentV2) => void;
  /** Emits an h1-h6 thread title without changing visual size. */
  titleLevel?: HeadingLevel;
  /** Changing this key explicitly focuses the thread header. */
  focusRequestKey?: string | number;
  /** Accessible region label override. */
  ariaLabel?: string;
}
