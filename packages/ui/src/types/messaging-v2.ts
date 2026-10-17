import type React from 'react'

/** A person acting in their own identity. */
export interface UserConversationActor {
  /** Discriminator for a personal actor. */
  kind: 'user'
  /** Stable application-owned actor identifier. */
  id: string
  /** Recipient-safe display name. */
  displayName: string
  /** Optional avatar URL. */
  avatarUrl?: string
}

/** A store acting as the recipient-facing identity. */
export interface StoreConversationActor {
  /** Discriminator for a store actor. */
  kind: 'store'
  /** Stable application-owned store identifier. */
  id: string
  /** Recipient-safe store name. */
  displayName: string
  /** Optional store avatar or logo URL. */
  avatarUrl?: string
}

/** Normalized identity rendered by messaging components. */
export type ConversationActor = UserConversationActor | StoreConversationActor

/** General store-level discussion. */
export interface GeneralConversationSubject {
  /** Discriminator for the permanent General thread. */
  kind: 'general'
}

/** Listing-specific discussion. */
export interface ListingConversationSubject {
  /** Discriminator for a listing thread. */
  kind: 'listing'
  /** Stable listing identifier. */
  id: string
  /** Listing title snapshot. */
  title: string
  /** Optional listing image URL. */
  imageUrl?: string
  /** Optional display-ready listing status. */
  status?: string
}

/** Order-specific support discussion. */
export interface OrderConversationSubject {
  /** Discriminator for an order thread. */
  kind: 'order'
  /** Stable order identifier. */
  id: string
  /** Human-friendly short order identifier. */
  shortId: string
  /** Order/listing title snapshot. */
  title: string
  /** Optional order/listing image URL. */
  imageUrl?: string
  /** Optional display-ready order status. */
  status?: string
}

/** Commerce context represented by a thread card and message header. */
export type ConversationSubject = GeneralConversationSubject | ListingConversationSubject | OrderConversationSubject

/** Display-ready latest-message preview. */
export interface ConversationMessagePreview {
  /** Recipient-safe author label. */
  authorName: string
  /** Preview body. */
  body: string
  /** Display-ready activity timestamp. */
  createdAt: string
}

/** Perspective-safe conversation rail item. */
export interface ConversationSummaryV2 {
  /** Stable conversation identifier. */
  id: string
  /** Identity represented by the current inbox perspective. */
  actingAs: ConversationActor
  /** Identity shown as the conversation counterparty. */
  counterparty: ConversationActor
  /** Exact unread count across visible threads. */
  unreadCount: number
  /** Display-ready last-activity timestamp. */
  lastActivityAt: string
  /** Optional latest human-message preview. */
  lastMessage?: ConversationMessagePreview
  /** Perspective-private archive marker. */
  archived?: boolean
  /** Perspective-private mute marker. */
  muted?: boolean
}

/** Perspective-safe thread card. */
export interface ConversationThreadCard {
  /** Stable thread identifier. */
  id: string
  /** Stable parent conversation identifier. */
  conversationId: string
  /** General, Listing, or Order context. */
  subject: ConversationSubject
  /** Shared support lifecycle, separate from commerce status. */
  supportStatus: 'open' | 'resolved'
  /** Perspective-private archive marker. */
  archived: boolean
  /** Perspective-private pin marker. */
  pinned: boolean
  /** Perspective-private mute marker. */
  muted: boolean
  /** Exact unread count for the thread. */
  unreadCount: number
  /** Display-ready last-activity timestamp. */
  lastActivityAt: string
  /** Optional latest human-message preview. */
  lastMessage?: ConversationMessagePreview
}

/** Display direction already normalized by the application. */
export type ThreadMessageDirection = 'incoming' | 'outgoing'

/** Optimistic delivery state for an outgoing message. */
export type ThreadMessageDeliveryStatus = 'pending' | 'sent' | 'failed'

/** Quoted-message preview within the same thread. */
export interface ThreadQuotedReply {
  /** Stable quoted message identifier. */
  messageId: string
  /** Recipient-safe quoted author label. */
  authorName: string
  /** Display-safe quoted excerpt. */
  excerpt: string
}

/** Image or file attachment rendered inside a v2 message. */
export type ThreadMessageAttachmentV2 =
  | {
      /** Image attachment discriminator. */
      kind: 'image'
      /** Stable attachment identifier. */
      id: string
      /** Display file name. */
      name: string
      /** Authorized image URL. */
      url: string
    }
  | {
      /** File attachment discriminator. */
      kind: 'file'
      /** Stable attachment identifier. */
      id: string
      /** Display file name. */
      name: string
      /** Authorized file URL. */
      url: string
      /** Optional display-ready file size. */
      size?: string
    }

/** Shared fields for normalized human messages. */
export interface ThreadMessageViewModelBase {
  /** Stable message identifier. */
  id: string
  /** Stable parent thread identifier. */
  threadId: string
  /** Recipient-safe author identity. */
  author: ConversationActor
  /** Display-safe body. */
  body: string
  /** Display-ready timestamp. */
  createdAt: string
  /** Optional quoted reply within the same thread. */
  quotedReply?: ThreadQuotedReply
  /** Optional authorized attachments. */
  attachments?: ThreadMessageAttachmentV2[]
}

/** Normalized human message rendered in a v2 thread. */
export type ThreadMessageViewModel =
  | (ThreadMessageViewModelBase & {
      /** Incoming messages never expose local delivery state. */
      direction: 'incoming'
      /** Incoming messages cannot be retried locally. */
      deliveryStatus?: never
      /** Incoming messages do not carry a local client identity. */
      clientMessageId?: never
    })
  | (ThreadMessageViewModelBase & {
      /** Accepted outgoing message. */
      direction: 'outgoing'
      /** Accepted state. @default 'sent' */
      deliveryStatus?: 'sent'
      /** Optional original optimistic identifier. */
      clientMessageId?: string
    })
  | (ThreadMessageViewModelBase & {
      /** Optimistic or failed outgoing message. */
      direction: 'outgoing'
      /** Pending and failed messages require a retry identity. */
      deliveryStatus: 'pending' | 'failed'
      /** Caller-owned identity retained across retries. */
      clientMessageId: string
    })

/** Cross-thread link emitted as a system timeline item. */
export interface ThreadLinkedEventViewModel {
  /** Stable system-event identifier. */
  id: string
  /** Stable parent thread identifier. */
  threadId: string
  /** System-event discriminator. */
  kind: 'thread-linked'
  /** Human-readable event label. */
  label: string
  /** Display-ready timestamp. */
  createdAt: string
  /** Related thread and its commerce context. */
  relatedThread: {
    /** Stable related thread identifier. */
    id: string
    /** Related thread subject. */
    subject: ConversationSubject
  }
  /** Canonical semantic destination for the related thread. */
  href: string
}

/** Stable timeline item rendered by ChatThreadV2. */
export type ThreadTimelineItem =
  | { kind: 'message'; message: ThreadMessageViewModel }
  | { kind: 'system'; event: ThreadLinkedEventViewModel }

/** Controlled collection load state. */
export type MessagingLoadState = 'ready' | 'loading' | 'error' | 'forbidden'

/** Controlled realtime connection state. */
export type MessagingConnectionState = 'online' | 'offline' | 'reconnecting'

/** Controlled policy state for an active thread. */
export type ThreadPolicyState = 'active' | 'archived' | 'resolved' | 'blocked'

/** Active responsive workspace pane. */
export type MessagingWorkspacePane = 'conversations' | 'threads' | 'messages'

/** Explicit focus request; changing key repeats a request for the same pane. */
export interface MessagingWorkspaceFocusRequest {
  /** Pane whose heading should receive focus. */
  pane: MessagingWorkspacePane
  /** Application-owned request key. */
  key: string | number
}

/** Router-compatible link component accepted by v2 messaging surfaces. */
export type MessagingLinkComponent = React.ElementType<{ href: string; children?: React.ReactNode }>
