import type React from 'react';
import type { HeadingLevel } from '../../../types/semantic';
import type { MessagingWorkspaceFocusRequest, MessagingWorkspacePane } from '../../../types/messaging-v2';

export interface MessagingWorkspaceLayoutProps {
  /** Controlled conversation-rail content. */
  conversationPane: React.ReactNode;
  /** Controlled thread-card content. */
  threadPane: React.ReactNode;
  /** Controlled selected-thread content. */
  messagePane: React.ReactNode;
  /** Pane exposed at mobile widths. @default 'conversations' */
  activePane?: MessagingWorkspacePane;
  /** Conversation-pane heading. @default 'Conversations' */
  conversationTitle?: string;
  /** Thread-pane heading. @default 'Threads' */
  threadTitle?: string;
  /** Message-pane heading. @default 'Messages' */
  messageTitle?: string;
  /** Conversation heading element. */
  conversationTitleLevel?: HeadingLevel;
  /** Thread heading element. */
  threadTitleLevel?: HeadingLevel;
  /** Message heading element. */
  messageTitleLevel?: HeadingLevel;
  /** Handles mobile Threads → Conversations navigation. */
  onBackToConversations?: () => void;
  /** Handles mobile Messages → Threads navigation. */
  onBackToThreads?: () => void;
  /** Explicit pane-heading focus request. */
  focusRequest?: MessagingWorkspaceFocusRequest;
  /** Accessible conversation region label. @default 'Conversations' */
  conversationAriaLabel?: string;
  /** Accessible thread region label. @default 'Threads' */
  threadAriaLabel?: string;
  /** Accessible message region label. @default 'Messages' */
  messageAriaLabel?: string;
}
