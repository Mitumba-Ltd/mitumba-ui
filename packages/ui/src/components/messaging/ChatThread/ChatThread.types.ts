import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';
import type { OrderMessageAttachmentProps } from '../OrderMessageAttachment/OrderMessageAttachment.types';
import type { HeadingLevel } from '../../../types/semantic';

export interface ChatThreadDraftAttachment {
  type: 'order';
  data: OrderMessageAttachmentProps;
}

export interface ChatThreadProps {
  messages: MessageBubbleProps[];
  partnerName: string;
  /**
   * Emits the thread/partner heading as an h1-h6 element for document outline
   * wiring. Changes only the emitted element, never the visual styling. When
   * omitted the heading keeps its existing non-heading paragraph markup.
   */
  titleLevel?: HeadingLevel;
  /**
   * Controlled announcement text surfaced once through a single polite live
   * region (e.g. "New message from Wanjiku"). Update this string when a new
   * event should be announced; passing the same value will not re-announce.
   */
  announcement?: string;
  partnerAvatarUrl?: string;
  partnerStatus?: string;
  onSend: (message: string) => void;
  onAttach?: () => void;
  sending?: boolean;
  loading?: boolean;
  /** Draft attachment shown above the composer until sent/removed */
  attachment?: ChatThreadDraftAttachment;
  /** Called when the user removes the draft attachment */
  onRemoveAttachment?: () => void;
  /** Fired when the user starts/stops typing. Debounced internally — emits true on input, false after 2s idle or on send. */
  onTyping?: (isTyping: boolean) => void;
}
