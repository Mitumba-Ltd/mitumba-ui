import type { ConversationActor, ConversationSubject, MessagingLinkComponent } from '../../../types/messaging-v2';
import type { HeadingLevel } from '../../../types/semantic';

export interface ThreadSubjectHeaderProps {
  /** General, Listing, or Order context. */
  subject: ConversationSubject;
  /** Optional conversation identity shown below the subject. */
  contextActor?: ConversationActor;
  /** Shared support status. */
  supportStatus?: 'open' | 'resolved';
  /** Perspective-private archive marker. */
  archived?: boolean;
  /** Perspective-private pin marker. */
  pinned?: boolean;
  /** Perspective-private mute marker. */
  muted?: boolean;
  /** Emits an h1-h6 title without changing visual size. */
  titleLevel?: HeadingLevel;
  /** Optional canonical subject destination. */
  href?: string;
  /** Optional host-router link renderer. */
  linkComponent?: MessagingLinkComponent;
  /** Link label. @default 'View details' */
  actionLabel?: string;
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium';
}
