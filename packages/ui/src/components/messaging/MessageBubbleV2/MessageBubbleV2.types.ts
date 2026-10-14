import type { ThreadMessageAttachmentV2, ThreadMessageViewModel } from '../../../types/messaging-v2';

export interface MessageBubbleV2Props {
  /** Stable normalized message view model. */
  message: ThreadMessageViewModel;
  /** Retries a failed outgoing message with its existing client identity. */
  onRetry?: (message: ThreadMessageViewModel) => void;
  /** Selects a message as the current quoted reply. */
  onReply?: (messageId: string) => void;
  /** Activates an authorized attachment. */
  onAttachmentClick?: (attachment: ThreadMessageAttachmentV2) => void;
}
