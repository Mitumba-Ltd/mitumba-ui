import type { HeadingLevel } from '../../../types/semantic';

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatarUrl?: string;
  lastMessage: string;
  lastMessageAt: string;
  unread?: boolean;
  listingTitle?: string;
}

export interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onSearch?: (query: string) => void;
  onCompose?: () => void;
  loading?: boolean;
  /** Override empty state title. @default "No messages yet" */
  emptyText?: string;
  /** Override empty state subtitle. @default "Conversations with sellers and buyers show up here." */
  emptyHint?: string;
  /**
   * Emits the empty-state title as an h1-h6 element for document outline
   * wiring. Changes only the emitted element, never its visual styling. When
   * omitted the empty-state title keeps its existing non-heading paragraph
   * markup so nothing changes for current consumers.
   */
  emptyTitleLevel?: HeadingLevel;
}
