import type { ConversationActor } from '../../../types/messaging-v2';

export interface ConversationActorLabelProps {
  /** Perspective-safe user or store identity. */
  actor: ConversationActor;
  /** Optional text shown before the actor name, for example "Sent as". */
  prefix?: string;
  /** Optional secondary text below the actor name. */
  secondaryText?: string;
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium';
  /** Optional accessible label for the complete identity. */
  ariaLabel?: string;
}
