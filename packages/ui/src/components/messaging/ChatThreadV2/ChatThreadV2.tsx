import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { tokens } from '@mitumba/tokens';
import { EmptyState } from '../../feedback/EmptyState';
import { ErrorState } from '../../feedback/ErrorState';
import { ConversationActorLabel } from '../ConversationActorLabel';
import { MessageBubbleV2 } from '../MessageBubbleV2';
import { ThreadSubjectHeader } from '../ThreadSubjectHeader';
import type { ThreadTimelineItem } from '../../../types/messaging-v2';
import type { ChatThreadV2Props } from './ChatThreadV2.types';

function getItemId(item: ThreadTimelineItem): string {
  return item.kind === 'message' ? item.message.id : item.event.id;
}

/** Controlled thread timeline with stable identity, composer, paging, and policy states. */
export function ChatThreadV2({
  conversationId,
  threadId,
  subject,
  actingAs,
  counterparty,
  timeline,
  draft,
  onDraftChange,
  onSend,
  state = 'ready',
  errorTitle = 'Could not load messages',
  errorText = 'Try again to refresh this thread.',
  onRetry,
  hasOlder = false,
  loadingOlder = false,
  onLoadOlder,
  connectionState = 'online',
  policyState = 'active',
  typingActors = [],
  announcement,
  onTyping,
  sending = false,
  quotedMessageId,
  onClearQuote,
  onReplyToMessage,
  onRetryMessage,
  onOpenLinkedThread,
  linkComponent,
  onAttach,
  onAttachmentClick,
  titleLevel,
  focusRequestKey,
  ariaLabel,
}: ChatThreadV2Props): React.ReactElement {
  const typingTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingActive = React.useRef(false);
  const previousThreadId = React.useRef(threadId);
  const onTypingRef = React.useRef(onTyping);
  const messagesRef = React.useRef<HTMLDivElement>(null);
  const userScrolledUp = React.useRef(false);
  const previousFirstId = React.useRef<string | null>(null);
  const previousScrollHeight = React.useRef(0);
  const headerRef = React.useRef<HTMLDivElement>(null);

  onTypingRef.current = onTyping;

  const stopTyping = React.useCallback((targetThreadId: string) => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = null;
    if (typingActive.current) onTypingRef.current?.(targetThreadId, false);
    typingActive.current = false;
  }, []);

  React.useEffect(() => {
    const previous = previousThreadId.current;
    if (previous !== threadId) {
      stopTyping(previous);
      previousThreadId.current = threadId;
      userScrolledUp.current = false;
      previousFirstId.current = null;
      previousScrollHeight.current = 0;
    }
  }, [stopTyping, threadId]);

  React.useEffect(() => () => stopTyping(previousThreadId.current), [stopTyping]);

  React.useEffect(() => {
    if (focusRequestKey !== undefined) headerRef.current?.focus();
  }, [focusRequestKey]);

  React.useLayoutEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    const firstId = timeline[0] ? getItemId(timeline[0]) : null;
    const prepended = previousFirstId.current !== null && firstId !== previousFirstId.current;
    if (prepended && userScrolledUp.current) {
      container.scrollTop += container.scrollHeight - previousScrollHeight.current;
    } else if (!userScrolledUp.current) {
      container.scrollTop = container.scrollHeight;
    }
    previousFirstId.current = firstId;
    previousScrollHeight.current = container.scrollHeight;
  }, [threadId, timeline]);

  const canSend = policyState === 'active' && connectionState === 'online';
  const LinkComponent = linkComponent ?? 'a';
  const quotedMessage = quotedMessageId
    ? timeline.find((item) => item.kind === 'message' && item.message.id === quotedMessageId)
    : undefined;
  const mismatchedItem = timeline.find((item) => (item.kind === 'message' ? item.message.threadId : item.event.threadId) !== threadId);

  const handleScroll = () => {
    const container = messagesRef.current;
    if (!container) return;
    const distance = container.scrollHeight - container.scrollTop - container.clientHeight;
    userScrolledUp.current = distance > 80;
  };

  const handleDraftChange = (value: string) => {
    onDraftChange(value);
    if (!onTyping || !canSend) return;
    if (value.trim()) {
      if (!typingActive.current) {
        typingActive.current = true;
        onTyping(threadId, true);
      }
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => stopTyping(threadId), 2000);
    } else {
      stopTyping(threadId);
    }
  };

  const handleSend = () => {
    const body = draft.trim();
    if (!body || sending || !canSend) return;
    onSend({ conversationId, threadId, body, quotedMessageId });
    onDraftChange('');
    onClearQuote?.();
    stopTyping(threadId);
    userScrolledUp.current = false;
  };

  const policyMessage = (() => {
    if (policyState === 'blocked') return 'Messaging is blocked for this thread.';
    if (policyState === 'archived') return 'This thread is archived.';
    if (policyState === 'resolved') return 'This thread is resolved.';
    return undefined;
  })();

  const failureState = (() => {
    if (mismatchedItem) return { title: 'Thread data mismatch', text: 'Refresh this thread before continuing.', type: 'network' as const, retry: onRetry };
    if (state === 'forbidden') return { title: 'Thread unavailable', text: 'You no longer have access to this thread.', type: 'forbidden' as const, retry: undefined };
    return { title: errorTitle, text: errorText, type: 'network' as const, retry: onRetry };
  })();

  const renderSystemEvent = (item: Extract<ThreadTimelineItem, { kind: 'system' }>): React.ReactElement => {
    const eventContent = <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, fontWeight: 600 }}>{item.event.label}</Typography>;
    let eventSurface: React.ReactNode = eventContent;
    if (item.event.href) {
      eventSurface = <Box component={LinkComponent} href={item.event.href} sx={{ p: `${tokens.spacing.sm}px ${tokens.spacing.base}px`, bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.full}px`, textDecoration: 'none', '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>{eventContent}</Box>;
    } else if (onOpenLinkedThread) {
      eventSurface = <Box component="button" type="button" onClick={() => onOpenLinkedThread(item.event.relatedThread.id)} sx={{ p: `${tokens.spacing.sm}px ${tokens.spacing.base}px`, border: 0, bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.full}px`, cursor: 'pointer', '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>{eventContent}</Box>;
    }
    return <Box key={item.event.id} role="note" aria-label={`System update: ${item.event.label}`} sx={{ display: 'flex', justifyContent: 'center', my: `${tokens.spacing.lg}px` }}>{eventSurface}</Box>;
  };

  return (
    <Box component="section" aria-label={ariaLabel ?? `Thread with ${counterparty.displayName}`} data-conversation-id={conversationId} data-thread-id={threadId} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, bgcolor: tokens.colors.surface }}>
      <Box ref={headerRef} tabIndex={-1} role="group" aria-label="Thread header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${tokens.spacing.lg}px`, px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.base}px`, borderBottom: `1px solid ${tokens.colors.divider}`, '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: -2 } }}>
        <ThreadSubjectHeader subject={subject} contextActor={counterparty} titleLevel={titleLevel} size="small" />
        <ConversationActorLabel actor={actingAs} prefix="Acting as" size="small" />
      </Box>

      {connectionState !== 'online' && (
        <Alert severity={connectionState === 'offline' ? 'warning' : 'info'} sx={{ borderRadius: 0 }}>
          {connectionState === 'offline' ? 'You’re offline. Reconnect to send messages.' : 'Reconnecting…'}
        </Alert>
      )}
      {policyMessage && <Alert severity={policyState === 'blocked' ? 'error' : 'info'} sx={{ borderRadius: 0 }}>{policyMessage}</Alert>}

      <Box ref={messagesRef} onScroll={handleScroll} role="log" aria-label="Thread messages" aria-busy={state === 'loading' || undefined} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: `${tokens.spacing.lg}px` }}>
        {state === 'loading' && [1, 2, 3, 4].map((item) => <Skeleton key={item} aria-hidden variant="rectangular" height={56} sx={{ borderRadius: `${tokens.radius.md}px`, mb: `${tokens.spacing.md}px` }} />)}
        {(state === 'error' || state === 'forbidden' || mismatchedItem) && (
          <ErrorState
            title={failureState.title}
            subtitle={failureState.text}
            type={failureState.type}
            variant="compact"
            onRetry={state === 'error' || mismatchedItem ? failureState.retry : undefined}
          />
        )}
        {state === 'ready' && !mismatchedItem && (
          <>
            {hasOlder && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: `${tokens.spacing.lg}px` }}>
                <Button type="button" onClick={onLoadOlder} disabled={loadingOlder || !onLoadOlder} startIcon={loadingOlder ? <CircularProgress size={14} /> : <ArrowUpwardIcon aria-hidden />}>
                  {loadingOlder ? 'Loading older messages…' : 'Load older messages'}
                </Button>
              </Box>
            )}
            {timeline.length === 0 ? (
              <EmptyState title="No messages yet" subtitle="Start this thread when you’re ready." variant="compact" />
            ) : timeline.map((item) => {
              if (item.kind === 'message') {
                return <MessageBubbleV2 key={item.message.id} message={item.message} onReply={onReplyToMessage} onRetry={onRetryMessage} onAttachmentClick={onAttachmentClick} />;
              }
              return renderSystemEvent(item);
            })}
          </>
        )}
      </Box>

      {typingActors.length > 0 && <Typography role="status" variant="caption" sx={{ px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.xs}px`, color: tokens.colors.textSecondary }}>{typingActors.map((actor) => actor.displayName).join(', ')} typing…</Typography>}

      {quotedMessage?.kind === 'message' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.sm}px`, bgcolor: tokens.colors.background, borderTop: `1px solid ${tokens.colors.divider}` }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textPrimary, fontWeight: 700 }}>Replying to {quotedMessage.message.author.displayName}</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textSecondary }} noWrap>{quotedMessage.message.body}</Typography>
          </Box>
          <IconButton type="button" size="small" aria-label="Clear quoted reply" onClick={onClearQuote}><CloseIcon aria-hidden fontSize="small" /></IconButton>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: `${tokens.spacing.md}px`, px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.base}px`, borderTop: `1px solid ${tokens.colors.divider}` }}>
        {onAttach && <IconButton type="button" aria-label="Attach file" onClick={onAttach} disabled={!canSend}><AttachFileIcon aria-hidden /></IconButton>}
        <TextField multiline maxRows={4} fullWidth size="small" value={draft} onChange={(event) => handleDraftChange(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSend(); } }} disabled={!canSend} placeholder="Write a message" slotProps={{ htmlInput: { 'aria-label': 'Message input' } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: `${tokens.radius.lg}px` } }} />
        <IconButton type="button" aria-label="Send message" onClick={handleSend} disabled={!draft.trim() || sending || !canSend} sx={{ bgcolor: draft.trim() && canSend ? tokens.colors.green : 'transparent', color: draft.trim() && canSend ? tokens.colors.textOnGreen : tokens.colors.textSecondary, '&:hover': { bgcolor: draft.trim() && canSend ? tokens.colors.greenDark : undefined } }}>
          {sending ? <CircularProgress size={18} color="inherit" /> : <ArrowUpwardIcon aria-hidden />}
        </IconButton>
      </Box>

      <Box role="status" aria-live="polite" sx={{ position: 'absolute', width: 1, height: 1, p: 0, m: '-1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>{announcement ?? ''}</Box>
    </Box>
  );
}

export default ChatThreadV2;
