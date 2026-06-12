export interface MessageAttachment {
  type: 'file' | 'image';
  name: string;
  size?: string;
  url: string;
}

export interface MessageBubbleProps {
  body: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
  senderAvatarUrl?: string;
  attachment?: MessageAttachment;
}
