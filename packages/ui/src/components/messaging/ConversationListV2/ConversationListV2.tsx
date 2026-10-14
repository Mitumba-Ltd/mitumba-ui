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
import { ConversationActorLabel } from '../ConversationActorLabel';
import type { ConversationSummaryV2 } from '../../../types/messaging-v2';
import type { ConversationListV2Props } from './ConversationListV2.types';

const rowSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: `${tokens.spacing.sm}px`,
  width: '100%',
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
  ariaLabel = 'Conversations',
}: ConversationListV2Props): React.ReactElement {
  const rowRefs = React.useRef(new Map<string, HTMLElement>());

  React.useEffect(() => {
    if (restoreFocusConversationId) rowRefs.current.get(restoreFocusConversationId)?.focus();
  }, [restoreFocusConversationId]);

  const setRowRef = (id: string) => (node: HTMLElement | null) => {
    if (node) rowRefs.current.set(id, node);
    else rowRefs.current.delete(id);
  };

  if (state === 'loading') {
    return (
      <Box role="status" aria-busy="true" aria-label="Loading conversations" sx={{ p: `${tokens.spacing.lg}px` }}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} aria-hidden variant="rectangular" height={72} sx={{ borderRadius: `${tokens.radius.md}px`, mb: `${tokens.spacing.md}px` }} />
        ))}
      </Box>
    );
  }

  if (state === 'error' || state === 'forbidden') {
    return (
      <ErrorState
        title={state === 'forbidden' ? 'Conversation unavailable' : errorTitle}
        subtitle={state === 'forbidden' ? 'You no longer have access to this inbox.' : errorText}
        type={state === 'forbidden' ? 'forbidden' : 'network'}
        variant="compact"
        onRetry={state === 'error' ? onRetry : undefined}
      />
    );
  }

  if (conversations.length === 0) {
    return <EmptyState icon={<ForumOutlinedIcon aria-hidden />} title={emptyTitle} subtitle={emptyText} variant="compact" />;
  }

  const LinkComponent = linkComponent ?? 'a';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box component="ul" aria-label={ariaLabel} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', listStyle: 'none', m: 0, p: 0 }}>
        {conversations.map((conversation) => {
          const selected = activeConversationId === conversation.id;
          const href = getConversationHref?.(conversation);
          const content = (
            <>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: `${tokens.spacing.md}px`, minWidth: 0 }}>
                <ConversationActorLabel actor={conversation.counterparty} size="medium" />
                <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, flexShrink: 0 }}>
                  {conversation.lastActivityAt}
                </Typography>
              </Box>
              {conversation.lastMessage && (
                <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conversation.lastMessage.authorName}: {conversation.lastMessage.body}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, flexWrap: 'wrap' }}>
                {conversation.unreadCount > 0 && <Chip label={`${conversation.unreadCount} unread`} size="small" sx={{ bgcolor: tokens.colors.greenLight, color: tokens.colors.greenDark, fontWeight: 700 }} />}
                {conversation.archived && <Chip label="Archived" size="small" variant="outlined" />}
                {conversation.muted && <Chip label="Muted" size="small" variant="outlined" />}
              </Box>
            </>
          );

          return (
            <Box component="li" key={conversation.id} aria-current={selected ? 'true' : undefined} sx={{ listStyle: 'none', bgcolor: selected ? tokens.colors.greenLight : 'transparent' }}>
              {href ? (
                <Box
                  component={LinkComponent}
                  href={href}
                  ref={setRowRef(conversation.id)}
                  aria-label={getAccessibleName(conversation)}
                  onClick={() => onSelectConversation?.(conversation.id)}
                  sx={rowSx}
                >
                  {content}
                </Box>
              ) : (
                <Box
                  component="button"
                  type="button"
                  ref={setRowRef(conversation.id)}
                  aria-label={getAccessibleName(conversation)}
                  onClick={() => onSelectConversation?.(conversation.id)}
                  sx={rowSx}
                >
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
            {loadingNextPage ? 'Loading conversations…' : 'Load more conversations'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ConversationListV2;
