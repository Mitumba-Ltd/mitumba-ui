import type { OrderMessageAttachmentProps } from '../OrderMessageAttachment/OrderMessageAttachment.types';

export interface FileAttachment {
  type: 'file' | 'image';
  name: string;
  size?: string;
  url: string;
}

export interface OrderAttachment {
  type: 'order';
  data: OrderMessageAttachmentProps;
}

export type MessageAttachment = FileAttachment | OrderAttachment;

export interface MessageBubbleProps {
  body: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
  senderAvatarUrl?: string;
  attachment?: MessageAttachment;
}
