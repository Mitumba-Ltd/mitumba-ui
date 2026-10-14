import type React from 'react';
import type { HeadingLevel } from '../../../types/semantic';
import type { MessagingWorkspaceFocusRequest } from '../../../types/messaging-v2';

interface MessagingWorkspaceLayoutBaseProps {
  /** Controlled conversation-rail content. */
  conversationPane: React.ReactNode;
  /** Controlled thread-card content. */
  threadPane: React.ReactNode;
  /** Controlled selected-thread content. */
  messagePane: React.ReactNode;
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
  /** Explicit pane-heading focus request. */
  focusRequest?: MessagingWorkspaceFocusRequest;
  /** Accessible conversation region label. @default 'Conversations' */
  conversationAriaLabel?: string;
  /** Accessible thread region label. @default 'Threads' */
  threadAriaLabel?: string;
  /** Accessible message region label. @default 'Messages' */
  messageAriaLabel?: string;
}

/** Controlled workspace props that require every exposed mobile back path. */
export type MessagingWorkspaceLayoutProps = MessagingWorkspaceLayoutBaseProps & (
  | {
      /** Conversation rail is exposed at mobile widths. */
      activePane?: 'conversations';
      /** Not available from the root mobile pane. */
      onBackToConversations?: never;
      /** Not available from the root mobile pane. */
      onBackToThreads?: never;
    }
  | {
      /** Thread cards are exposed at mobile widths. */
      activePane: 'threads';
      /** Handles mobile Threads → Conversations navigation. */
      onBackToConversations: () => void;
      /** Not available from the thread-card pane. */
      onBackToThreads?: never;
    }
  | {
      /** Selected-thread messages are exposed at mobile widths. */
      activePane: 'messages';
      /** Optional direct return to conversations in host navigation. */
      onBackToConversations?: () => void;
      /** Handles mobile Messages → Threads navigation. */
      onBackToThreads: () => void;
    }
);
