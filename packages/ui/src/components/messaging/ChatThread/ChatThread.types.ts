import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';
import type { OrderMessageAttachmentProps } from '../OrderMessageAttachment/OrderMessageAttachment.types';

export interface ChatThreadDraftAttachment {
  type: 'order';
  data: OrderMessageAttachmentProps;
}

export interface ChatThreadProps {
  messages: MessageBubbleProps[];
  partnerName: string;
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
