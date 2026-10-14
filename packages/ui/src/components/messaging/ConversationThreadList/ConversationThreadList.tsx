import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { tokens } from '@mitumba/tokens';
import { EmptyState } from '../../feedback/EmptyState';
import { ErrorState } from '../../feedback/ErrorState';
import { ThreadSubjectHeader } from '../ThreadSubjectHeader';
import type { ConversationThreadCard } from '../../../types/messaging-v2';
import type { ConversationThreadListProps } from './ConversationThreadList.types';

const cardSx = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: `${tokens.spacing.md}px`,
  p: `${tokens.spacing.lg}px`,
  border: 0,
  borderBottom: `1px solid ${tokens.colors.divider}`,
  bgcolor: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
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
  ariaLabel = 'Conversation threads',
}: ConversationThreadListProps): React.ReactElement {
  const rowRefs = React.useRef(new Map<string, HTMLElement>());

  React.useEffect(() => {
    if (restoreFocusThreadId) rowRefs.current.get(restoreFocusThreadId)?.focus();
  }, [restoreFocusThreadId]);

  const setRowRef = (id: string) => (node: HTMLElement | null) => {
    if (node) rowRefs.current.set(id, node);
    else rowRefs.current.delete(id);
  };

  if (state === 'loading') {
    return (
      <Box role="status" aria-busy="true" aria-label="Loading conversation threads" sx={{ p: `${tokens.spacing.lg}px` }}>
        {[1, 2, 3, 4].map((item) => <Skeleton key={item} aria-hidden variant="rectangular" height={112} sx={{ borderRadius: `${tokens.radius.md}px`, mb: `${tokens.spacing.md}px` }} />)}
      </Box>
    );
  }

  if (state === 'error' || state === 'forbidden') {
    return (
      <ErrorState
        title={state === 'forbidden' ? 'Threads unavailable' : errorTitle}
        subtitle={state === 'forbidden' ? 'You no longer have access to this conversation.' : errorText}
        type={state === 'forbidden' ? 'forbidden' : 'network'}
        variant="compact"
        onRetry={state === 'error' ? onRetry : undefined}
      />
    );
  }

  if (threads.length === 0) {
    return <EmptyState icon={<ForumOutlinedIcon aria-hidden />} title={emptyTitle} subtitle={emptyText} variant="compact" />;
  }

  const LinkComponent = linkComponent ?? 'a';

  return (
    <Box data-conversation-id={conversationId} sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box component="ul" aria-label={ariaLabel} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', listStyle: 'none', m: 0, p: 0 }}>
        {threads.map((thread) => {
          const selected = activeThreadId === thread.id;
          const href = getThreadHref?.(thread);
          const content = (
            <>
              <ThreadSubjectHeader subject={thread.subject} contextActor={contextActor} supportStatus={thread.supportStatus} archived={thread.archived} pinned={thread.pinned} muted={thread.muted} size="small" />
              {thread.lastMessage && (
                <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {thread.lastMessage.authorName}: {thread.lastMessage.body}
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: `${tokens.spacing.md}px` }}>
                {thread.unreadCount > 0 ? <Chip label={`${thread.unreadCount} unread`} size="small" sx={{ bgcolor: tokens.colors.greenLight, color: tokens.colors.greenDark, fontWeight: 700 }} /> : <Box />}
                <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, flexShrink: 0 }}>{thread.lastActivityAt}</Typography>
              </Box>
            </>
          );

          return (
            <Box component="li" key={thread.id} aria-current={selected ? 'true' : undefined} sx={{ listStyle: 'none', bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>
              {href ? (
                <Box component={LinkComponent} href={href} ref={setRowRef(thread.id)} aria-label={getAccessibleName(thread, contextActor?.displayName)} onClick={() => onSelectThread?.(thread.id)} sx={cardSx}>
                  {content}
                </Box>
              ) : (
                <Box component="button" type="button" ref={setRowRef(thread.id)} aria-label={getAccessibleName(thread, contextActor?.displayName)} onClick={() => onSelectThread?.(thread.id)} sx={cardSx}>
                  {content}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      {(hasNextPage || loadingNextPage) && (
        <Box sx={{ p: `${tokens.spacing.md}px`, borderTop: `1px solid ${tokens.colors.divider}` }}>
          <Button fullWidth type="button" onClick={onLoadNextPage} disabled={loadingNextPage || !onLoadNextPage} sx={{ color: tokens.colors.green }}>
            {loadingNextPage ? 'Loading threads…' : 'Load more threads'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ConversationThreadList;
