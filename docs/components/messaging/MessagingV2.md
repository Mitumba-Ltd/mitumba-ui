# Messaging v2 workspace

Messaging v2 models a conversation as a message-less relationship container whose General, Listing, and Order threads each own an isolated timeline.

```text
Inbox perspective → conversation → thread cards → messages
```

## Components

- `ConversationActorLabel` renders normalized user/store identity without owner-ID inference.
- `ConversationListV2` renders stable perspective-safe conversation rows.
- `ThreadSubjectHeader` keeps commerce status, support status, and private markers distinct.
- `ConversationThreadList` renders keyboard-operable General, Listing, and Order cards.
- `MessagingWorkspaceLayout` renders three desktop panes and one controlled mobile pane.
- `MessageBubbleV2` renders typed author, quote, attachment, and delivery state.
- `ChatThreadV2` renders a stable message/system-event timeline and controlled composer.
- `FloatingChatDock` accepts optional `threadId`, dialog labeling, and focus restoration.

## Application boundary

The package does not fetch data, import `@mitumba/sdk`, infer ownership, authorize stores, group API records, or manage URL state. Applications normalize their API data into the exported camelCase view models and control selection, loading, errors, pagination, drafts, pending sends, realtime state, and focus requests.

A store-authored message must receive a store actor. `direction` must already be normalized by the application. Components never compare the current user ID with seller/store owner IDs.

`ChatThreadV2` requires both the workspace `conversationId` and the selected record’s `threadConversationId`; it fails closed when they differ or when any timeline item has another `threadId`. Linked system events require a canonical `href`. Focus restoration uses explicit request keys so asynchronous loading can fulfill a request once without stealing focus again during pagination.

## Responsive composition

At desktop widths, compose the three panes simultaneously:

```tsx
<MessagingWorkspaceLayout
  conversationPane={<ConversationListV2 {...conversationProps} />}
  threadPane={<ConversationThreadList {...threadProps} />}
  messagePane={<ChatThreadV2 {...messageProps} />}
  activePane="messages"
/>
```

At mobile widths, `activePane` exposes only `conversations`, `threads`, or `messages`. The application updates route/history state and uses `focusRequest`, `restoreFocusConversationId`, and `restoreFocusThreadId` to move and restore focus intentionally.

## Backward compatibility

Legacy `ConversationList`, `MessageBubble`, `ChatThread`, and `InboxLayout` remain unchanged. V2 consumers opt into parallel components and view models. `FloatingChatDock` additions are optional and default to legacy behavior.
