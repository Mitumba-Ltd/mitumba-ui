import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { ConversationActorLabel } from '../ConversationActorLabel';
import type { ThreadMessageAttachmentV2 } from '../../../types/messaging-v2';
import type { MessageBubbleV2Props } from './MessageBubbleV2.types';

/** Renders one stable v2 message with explicit actor, quote, and delivery state. */
export function MessageBubbleV2({ message, onRetry, onReply, onAttachmentClick }: MessageBubbleV2Props): React.ReactElement {
  const outgoing = message.direction === 'outgoing';
  const authorLabel = outgoing && message.author.kind === 'user' ? 'You' : message.author.displayName;
  const status = message.deliveryStatus ?? 'sent';
  const deliveryLabel = (() => {
    if (status === 'pending') return 'Sending…';
    if (status === 'failed') return 'Failed to send';
    return 'Sent';
  })();

  const renderAttachment = (attachment: ThreadMessageAttachmentV2) => {
    const content = attachment.kind === 'image' ? (
      <Box component="img" src={attachment.url} alt={attachment.name} loading="lazy" sx={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: `${tokens.radius.md}px` }} />
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, minWidth: 0 }}>
        <AttachFileIcon aria-hidden sx={{ color: tokens.colors.green }} />
        <Box sx={{ minWidth: 0, textAlign: 'left' }}>
          <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textPrimary, fontWeight: tokens.typography.fontWeights.semibold }} noWrap>{attachment.name}</Typography>
          {attachment.size && <Typography variant="caption" sx={{ color: tokens.colors.textSecondary }}>{attachment.size}</Typography>}
        </Box>
      </Box>
    );

    if (onAttachmentClick) {
      return (
        <ButtonBase key={attachment.id} onClick={() => onAttachmentClick(attachment)} aria-label={`Open attachment ${attachment.name}`} sx={{ display: 'block', width: '100%', p: `${tokens.spacing.sm}px`, borderRadius: `${tokens.radius.md}px`, bgcolor: tokens.colors.surface, textAlign: 'left', '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>
          {content}
        </ButtonBase>
      );
    }

    return (
      <Box key={attachment.id} component="a" href={attachment.url} target="_blank" rel="noreferrer" aria-label={`Open attachment ${attachment.name}`} sx={{ display: 'block', p: `${tokens.spacing.sm}px`, borderRadius: `${tokens.radius.md}px`, bgcolor: tokens.colors.surface, color: 'inherit', textDecoration: 'none', '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>
        {content}
      </Box>
    );
  };

  return (
    <Box role="group" aria-label={`${authorLabel}, ${message.createdAt}`} data-message-id={message.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: outgoing ? 'flex-end' : 'flex-start', mb: `${tokens.spacing.lg}px` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, mb: `${tokens.spacing.xs}px`, maxWidth: '82%' }}>
        {outgoing && message.author.kind === 'user' ? (
          <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, fontWeight: tokens.typography.fontWeights.semibold }}>You</Typography>
        ) : (
          <ConversationActorLabel actor={message.author} prefix={message.author.kind === 'store' ? 'Sent as' : undefined} size="small" />
        )}
        <Typography variant="caption" sx={{ color: tokens.colors.textSecondary }}>{message.createdAt}</Typography>
      </Box>

      <Box sx={{ maxWidth: '82%', minWidth: 0, p: `${tokens.spacing.base}px`, borderRadius: `${tokens.radius.lg}px`, bgcolor: outgoing ? tokens.colors.green : tokens.colors.background, color: outgoing ? tokens.colors.textOnGreen : tokens.colors.textPrimary, border: status === 'failed' ? `1px solid ${tokens.colors.error}` : 'none' }}>
        {message.quotedReply && (
          <Box sx={{ mb: `${tokens.spacing.sm}px`, pl: `${tokens.spacing.sm}px`, borderLeft: `3px solid ${outgoing ? tokens.colors.textOnGreen : tokens.colors.green}` }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'inherit', fontWeight: tokens.typography.fontWeights.bold }}>{message.quotedReply.authorName}</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'inherit', opacity: 0.85, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.quotedReply.excerpt}</Typography>
          </Box>
        )}
        <Typography variant="body2" sx={{ color: 'inherit', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>{message.body}</Typography>
        {message.attachments && message.attachments.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px`, mt: `${tokens.spacing.sm}px` }}>
            {message.attachments.map(renderAttachment)}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, mt: `${tokens.spacing.xs}px`, maxWidth: '82%' }}>
        {outgoing && <Typography variant="caption" role={status === 'failed' ? 'alert' : undefined} sx={{ color: status === 'failed' ? tokens.colors.error : tokens.colors.textSecondary }}>{deliveryLabel}</Typography>}
        {status === 'failed' && onRetry && <Button type="button" size="small" onClick={() => onRetry(message)} sx={{ minWidth: 0, color: tokens.colors.error }}>Retry</Button>}
        {onReply && status !== 'pending' && (
          <IconButton type="button" size="small" aria-label={`Reply to message from ${authorLabel}`} onClick={() => onReply(message.id)}>
            <ReplyOutlinedIcon aria-hidden fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default MessageBubbleV2;
