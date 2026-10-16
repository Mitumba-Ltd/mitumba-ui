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
import type { ConversationSummaryV2 } from '../../../types/messaging-v2';
import type { ConversationListV2Props } from './ConversationListV2.types';

const rowSx = {
  display: 'block',
  width: 'calc(100% - 16px)',
  mx: `${tokens.spacing.md}px`,
  mb: `${tokens.spacing.xs}px`,
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

function getAccessibleName(conversation: ConversationSummaryV2): string {
  const unread = conversation.unreadCount > 0 ? `${conversation.unreadCount} unread` : 'No unread messages';
  const flags = [conversation.archived ? 'Archived' : undefined, conversation.muted ? 'Muted' : undefined].filter(Boolean);
  return [`Conversation with ${conversation.counterparty.displayName}`, conversation.counterparty.kind === 'store' ? 'Store' : 'User', unread, ...flags].join(', ');
}

/** Controlled v2 conversation rail using stable IDs and perspective-safe actors. */
export function ConversationListV2({
  conversations,
  activeConversationId,
  onSelectConversation,
  getConversationHref,
  linkComponent,
  state = 'ready',
  errorTitle = 'Could not load conversations',
  errorText = 'Try again to refresh your inbox.',
  onRetry,
  emptyTitle = 'No conversations yet',
  emptyText = 'Messages with stores and buyers will appear here.',
  hasNextPage = false,
  loadingNextPage = false,
  onLoadNextPage,
  restoreFocusConversationId,
  restoreFocusRequestKey,
  ariaLabel = 'Conversations',
}: ConversationListV2Props): React.ReactElement {
  const rowRefs = React.useRef(new Map<string, HTMLElement>());
  const handledFocusRequest = React.useRef<string | number | undefined>(undefined);
  const focusRequest = restoreFocusRequestKey ?? restoreFocusConversationId;

  React.useEffect(() => {
    if (state !== 'ready' || !restoreFocusConversationId || focusRequest === undefined || handledFocusRequest.current === focusRequest) return;
    const row = rowRefs.current.get(restoreFocusConversationId);
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
      <Box role="status" aria-busy="true" aria-label="Loading conversations" sx={{ p: `${tokens.spacing.md}px` }}>
        {[1, 2, 3, 4, 5].map((item) => <Skeleton key={item} aria-hidden variant="rounded" height={68} sx={{ borderRadius: `${tokens.radius.lg}px`, mb: `${tokens.spacing.xs}px` }} />)}
      </Box>
    );
  }

  if (state === 'error' || state === 'forbidden') {
    return <ErrorState title={state === 'forbidden' ? 'Conversation unavailable' : errorTitle} subtitle={state === 'forbidden' ? 'You no longer have access to this inbox.' : errorText} type={state === 'forbidden' ? 'forbidden' : 'network'} variant="compact" onRetry={state === 'error' ? onRetry : undefined} />;
  }

  if (conversations.length === 0) {
    return <EmptyState icon={<ForumOutlinedIcon aria-hidden />} title={emptyTitle} subtitle={emptyText} variant="compact" />;
  }

  const LinkComponent = linkComponent ?? 'a';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, py: `${tokens.spacing.md}px` }}>
      <Box component="ul" aria-label={ariaLabel} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', listStyle: 'none', m: 0, p: 0 }}>
        {conversations.map((conversation) => {
          const selected = activeConversationId === conversation.id;
          const href = getConversationHref?.(conversation);
          const statusText = [conversation.muted ? 'Muted' : undefined, conversation.archived ? 'Archived' : undefined].filter(Boolean).join(' · ');
          const content = (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', columnGap: `${tokens.spacing.md}px`, rowGap: `${tokens.spacing.xs}px`, alignItems: 'center' }}>
              <ConversationActorLabel actor={conversation.counterparty} size="medium" />
              <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, alignSelf: 'start', pt: `${tokens.spacing.xxs}px` }}>{conversation.lastActivityAt}</Typography>
              <Typography variant="caption" sx={{ ml: '52px', color: tokens.colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {conversation.lastMessage ? `${conversation.lastMessage.authorName}: ${conversation.lastMessage.body}` : statusText || 'No messages yet'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 22 }}>
                {conversation.unreadCount > 0 && (
                  <Box component="span" aria-hidden sx={{ minWidth: 20, height: 20, px: `${tokens.spacing.xs}px`, borderRadius: `${tokens.radius.full}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.green, color: tokens.colors.textOnGreen, fontSize: tokens.typography.fontSizes.xs, fontWeight: tokens.typography.fontWeights.bold }}>
                    {conversation.unreadCount}
                  </Box>
                )}
              </Box>
            </Box>
          );

          return (
            <Box component="li" key={conversation.id} aria-current={selected ? 'true' : undefined} sx={{ listStyle: 'none' }}>
              {href ? (
                <Box component={LinkComponent} href={href} ref={setRowRef(conversation.id)} aria-label={getAccessibleName(conversation)} onClick={() => onSelectConversation?.(conversation.id)} sx={{ ...rowSx, bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>{content}</Box>
              ) : (
                <Box component="button" type="button" ref={setRowRef(conversation.id)} aria-label={getAccessibleName(conversation)} onClick={() => onSelectConversation?.(conversation.id)} sx={{ ...rowSx, bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>{content}</Box>
              )}
            </Box>
          );
        })}
      </Box>
      {(hasNextPage || loadingNextPage) && (
        <Box sx={{ px: `${tokens.spacing.md}px`, pt: `${tokens.spacing.sm}px` }}>
          <Button fullWidth type="button" onClick={onLoadNextPage} disabled={loadingNextPage || !onLoadNextPage} sx={{ color: tokens.colors.green, borderRadius: `${tokens.radius.full}px`, textTransform: 'none' }}>
            {loadingNextPage ? 'Loading…' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ConversationListV2;
