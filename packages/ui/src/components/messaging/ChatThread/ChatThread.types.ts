import type { MessageBubbleProps } from '../MessageBubble/MessageBubble.types';

export interface ChatThreadProps {
  messages: MessageBubbleProps[];
  partnerName: string;
  partnerAvatarUrl?: string;
  partnerStatus?: string;
  onSend: (message: string) => void;
  onAttach?: () => void;
  sending?: boolean;
  loading?: boolean;
}
