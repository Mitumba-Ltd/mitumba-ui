import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { tokens } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import { ConversationActorLabel } from '../ConversationActorLabel';
import type { ConversationSubject } from '../../../types/messaging-v2';
import type { ThreadSubjectHeaderProps } from './ThreadSubjectHeader.types';

function getSubjectContent(subject: ConversationSubject): { title: string; subtitle: string; imageUrl?: string; icon: React.ReactNode } {
  if (subject.kind === 'listing') return { title: subject.title, subtitle: subject.status ? `Listing · ${subject.status}` : 'Listing', imageUrl: subject.imageUrl, icon: <Inventory2OutlinedIcon aria-hidden /> };
  if (subject.kind === 'order') return { title: `Order ${subject.shortId}`, subtitle: subject.status ? `${subject.title} · ${subject.status}` : subject.title, imageUrl: subject.imageUrl, icon: <ReceiptLongOutlinedIcon aria-hidden /> };
  return { title: 'General', subtitle: 'Store conversation', icon: <ForumOutlinedIcon aria-hidden /> };
}

/** Displays thread context while keeping commerce, support, and private states distinct. */
export function ThreadSubjectHeader({
  subject,
  contextActor,
  supportStatus,
  archived = false,
  pinned = false,
  muted = false,
  titleLevel,
  href,
  linkComponent,
  actionLabel = 'View details',
  size = 'medium',
}: ThreadSubjectHeaderProps): React.ReactElement {
  const compact = size === 'small';
  const content = getSubjectContent(subject);
  const LinkComponent = linkComponent ?? 'a';

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: `${tokens.spacing.md}px`, minWidth: 0 }}>
      <Avatar src={content.imageUrl} alt="" aria-hidden variant="rounded" sx={{ width: compact ? 36 : 48, height: compact ? 36 : 48, bgcolor: tokens.colors.background, color: tokens.colors.green, flexShrink: 0 }}>
        {!content.imageUrl && content.icon}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: `${tokens.spacing.md}px` }}>
          <Box sx={{ minWidth: 0 }}>
            <SemanticTitle titleLevel={titleLevel} variant={compact ? 'body2' : 'subtitle1'} sx={{ color: tokens.colors.textPrimary, fontWeight: 700, m: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {content.title}
            </SemanticTitle>
            <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textSecondary }} noWrap>
              {content.subtitle}
            </Typography>
          </Box>
          {href && subject.kind !== 'general' && (
            <Box component={LinkComponent} href={href} sx={{ color: tokens.colors.green, fontSize: tokens.typography.fontSizes.sm, fontWeight: 600, textDecoration: 'none', flexShrink: 0, '&:hover': { textDecoration: 'underline' }, '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>
              {actionLabel}
            </Box>
          )}
        </Box>
        {contextActor && (
          <Box sx={{ mt: `${tokens.spacing.sm}px` }}>
            <ConversationActorLabel actor={contextActor} size="small" />
          </Box>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${tokens.spacing.xs}px`, mt: `${tokens.spacing.sm}px` }}>
          {supportStatus && <Chip label={supportStatus === 'resolved' ? 'Resolved' : 'Open'} size="small" color={supportStatus === 'resolved' ? 'default' : 'success'} variant="outlined" />}
          {archived && <Chip label="Archived" size="small" variant="outlined" />}
          {pinned && <Chip label="Pinned" size="small" variant="outlined" />}
          {muted && <Chip label="Muted" size="small" variant="outlined" />}
        </Box>
      </Box>
    </Box>
  );
}

export default ThreadSubjectHeader;
