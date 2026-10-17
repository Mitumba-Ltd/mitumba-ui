import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { tokens } from '@mitumba/tokens';
import { EmptyState } from '../../feedback/EmptyState';
import { ErrorState } from '../../feedback/ErrorState';
import { ConversationActorLabel } from '../ConversationActorLabel';
import { ThreadSubjectHeader } from '../ThreadSubjectHeader';
import type { ConversationThreadCard } from '../../../types/messaging-v2';
import type { ConversationThreadListProps } from './ConversationThreadList.types';

const cardSx = {
  display: 'block',
  width: 'calc(100% - 16px)',
  mx: `${tokens.spacing.md}px`,
  mb: `${tokens.spacing.sm}px`,
  p: `${tokens.spacing.base}px`,
  border: 0,
  borderRadius: `${tokens.radius.lg}px`,
  bgcolor: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: tokens.motion.transitions.interaction,
  '&:hover': { bgcolor: tokens.colors.background },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: -2 },
} as const;

function getSubjectName(thread: ConversationThreadCard): string {
  if (thread.subject.kind === 'listing') return `Listing, ${thread.subject.title}`;
  if (thread.subject.kind === 'order') return `Order ${thread.subject.shortId}, ${thread.subject.title}`;
  return 'General';
}

function getAccessibleName(thread: ConversationThreadCard, actorName?: string): string {
  const unread = thread.unreadCount > 0 ? `${thread.unreadCount} unread` : 'No unread messages';
  const flags = [thread.archived ? 'Archived' : undefined, thread.pinned ? 'Pinned' : undefined, thread.muted ? 'Muted' : undefined].filter(Boolean);
  return [getSubjectName(thread), actorName, thread.supportStatus === 'resolved' ? 'Resolved' : 'Open', thread.subject.kind !== 'general' ? thread.subject.status : undefined, unread, ...flags].filter(Boolean).join(', ');
}

/** Renders stable General, Listing, and Order chat threads as native cards. */
export function ConversationThreadList({
  conversationId,
  threads,
  contextActor,
  activeThreadId,
  onSelectThread,
  getThreadHref,
  linkComponent,
  state = 'ready',
  errorTitle = 'Could not load threads',
  errorText = 'Try again to refresh this conversation.',
  onRetry,
  emptyTitle = 'No threads yet',
  emptyText = 'General, listing, and order chats will appear here.',
  hasNextPage = false,
  loadingNextPage = false,
  onLoadNextPage,
  restoreFocusThreadId,
  restoreFocusRequestKey,
  ariaLabel = 'Conversation threads',
}: ConversationThreadListProps): React.ReactElement {
  const rowRefs = React.useRef(new Map<string, HTMLElement>());
  const handledFocusRequest = React.useRef<string | number | undefined>(undefined);
  const focusRequest = restoreFocusRequestKey ?? restoreFocusThreadId;

  React.useEffect(() => {
    if (state !== 'ready' || !restoreFocusThreadId || focusRequest === undefined || handledFocusRequest.current === focusRequest) return;
    const row = rowRefs.current.get(restoreFocusThreadId);
    if (row) {
      row.focus();
      handledFocusRequest.current = focusRequest;
    }
  });

  const setRowRef = (id: string) => (node: HTMLElement | null) => {
    if (node) rowRefs.current.set(id, node);
    else rowRefs.current.delete(id);
  };

  if (state === 'loading') {
    return (
      <Box role="status" aria-busy="true" aria-label="Loading conversation threads" sx={{ p: `${tokens.spacing.md}px` }}>
        {[1, 2, 3, 4].map((item) => <Skeleton key={item} aria-hidden variant="rounded" height={88} sx={{ borderRadius: `${tokens.radius.lg}px`, mb: `${tokens.spacing.sm}px` }} />)}
      </Box>
    );
  }

  if (state === 'error' || state === 'forbidden') {
    return <ErrorState title={state === 'forbidden' ? 'Threads unavailable' : errorTitle} subtitle={state === 'forbidden' ? 'You no longer have access to this conversation.' : errorText} type={state === 'forbidden' ? 'forbidden' : 'network'} variant="compact" onRetry={state === 'error' ? onRetry : undefined} />;
  }

  if (threads.length === 0) {
    return <EmptyState icon={<ForumOutlinedIcon aria-hidden />} title={emptyTitle} subtitle={emptyText} variant="compact" />;
  }

  const LinkComponent = linkComponent ?? 'a';
  const mismatchedThread = threads.find((thread) => thread.conversationId !== conversationId);

  if (mismatchedThread) {
    return <ErrorState title="Conversation data mismatch" subtitle="Refresh this conversation before selecting a thread." type="network" variant="compact" onRetry={onRetry} />;
  }

  return (
    <Box data-conversation-id={conversationId} sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {contextActor && (
        <Box sx={{ px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.base}px`, borderBottom: `1px solid ${tokens.colors.divider}` }}>
          <ConversationActorLabel actor={contextActor} size="small" secondaryText="Conversation" />
        </Box>
      )}
      <Box component="ul" aria-label={ariaLabel} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', listStyle: 'none', m: 0, p: `${tokens.spacing.md}px 0` }}>
        {threads.map((thread) => {
          const selected = activeThreadId === thread.id;
          const href = getThreadHref?.(thread);
          const content = (
            <>
              <ThreadSubjectHeader subject={thread.subject} supportStatus={thread.supportStatus} archived={thread.archived} pinned={thread.pinned} muted={thread.muted} size="small" />
              <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: `${tokens.spacing.md}px`, alignItems: 'center', mt: `${tokens.spacing.md}px`, ml: '48px' }}>
                <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {thread.lastMessage ? `${thread.lastMessage.authorName}: ${thread.lastMessage.body}` : 'No messages yet'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                  <Typography variant="caption" sx={{ color: tokens.colors.textSecondary }}>{thread.lastActivityAt}</Typography>
                  {thread.unreadCount > 0 && (
                    <Box component="span" aria-hidden sx={{ minWidth: 20, height: 20, px: `${tokens.spacing.xs}px`, borderRadius: `${tokens.radius.full}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.green, color: tokens.colors.textOnGreen, fontSize: tokens.typography.fontSizes.xs, fontWeight: tokens.typography.fontWeights.bold }}>{thread.unreadCount}</Box>
                  )}
                </Box>
              </Box>
            </>
          );

          return (
            <Box component="li" key={thread.id} aria-current={selected ? 'true' : undefined} sx={{ listStyle: 'none' }}>
              {href ? (
                <Box component={LinkComponent} href={href} ref={setRowRef(thread.id)} aria-label={getAccessibleName(thread, contextActor?.displayName)} onClick={() => onSelectThread?.(thread.id)} sx={{ ...cardSx, bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>{content}</Box>
              ) : (
                <Box component="button" type="button" ref={setRowRef(thread.id)} aria-label={getAccessibleName(thread, contextActor?.displayName)} onClick={() => onSelectThread?.(thread.id)} sx={{ ...cardSx, bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>{content}</Box>
              )}
            </Box>
          );
        })}
      </Box>
      {(hasNextPage || loadingNextPage) && (
        <Box sx={{ px: `${tokens.spacing.md}px`, pb: `${tokens.spacing.md}px` }}>
          <Button fullWidth type="button" onClick={onLoadNextPage} disabled={loadingNextPage || !onLoadNextPage} sx={{ color: tokens.colors.green, borderRadius: `${tokens.radius.full}px`, textTransform: 'none' }}>{loadingNextPage ? 'Loading…' : 'Load more'}</Button>
        </Box>
      )}
    </Box>
  );
}

export default ConversationThreadList;
