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
}
