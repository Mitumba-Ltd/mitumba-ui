import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { tokens } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { ConversationSubject } from '../../../types/messaging-v2';
import type { ThreadSubjectHeaderProps } from './ThreadSubjectHeader.types';

function getSubjectContent(subject: ConversationSubject): { title: string; type: string; status?: string; imageUrl?: string; icon: React.ReactNode } {
  if (subject.kind === 'listing') return { title: subject.title, type: 'Listing', status: subject.status, imageUrl: subject.imageUrl, icon: <Inventory2OutlinedIcon aria-hidden /> };
  if (subject.kind === 'order') return { title: `Order ${subject.shortId}`, type: subject.title, status: subject.status, imageUrl: subject.imageUrl, icon: <ReceiptLongOutlinedIcon aria-hidden /> };
  return { title: 'General', type: 'Store conversation', icon: <ForumOutlinedIcon aria-hidden /> };
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
  actionLabel = 'Open',
  size = 'medium',
}: ThreadSubjectHeaderProps): React.ReactElement {
  const compact = size === 'small';
  const content = getSubjectContent(subject);
  const LinkComponent = linkComponent ?? 'a';
  const supporting = [contextActor?.displayName, content.type, content.status].filter(Boolean).join(' · ');
  const state = [supportStatus === 'resolved' ? 'Resolved' : undefined, archived ? 'Archived' : undefined, pinned ? 'Pinned' : undefined, muted ? 'Muted' : undefined].filter(Boolean).join(' · ');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.base}px`, minWidth: 0 }}>
      <Avatar src={content.imageUrl} alt="" aria-hidden variant="rounded" sx={{ width: compact ? 36 : 44, height: compact ? 36 : 44, bgcolor: tokens.colors.background, color: tokens.colors.green, flexShrink: 0 }}>
        {!content.imageUrl && content.icon}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, minWidth: 0 }}>
          <SemanticTitle titleLevel={titleLevel} variant={compact ? 'body2' : 'subtitle1'} sx={{ flex: 1, minWidth: 0, color: tokens.colors.textPrimary, fontWeight: tokens.typography.fontWeights.semibold, m: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {content.title}
          </SemanticTitle>
          {href && subject.kind !== 'general' && (
            <Box component={LinkComponent} href={href} sx={{ color: tokens.colors.greenDark, fontSize: tokens.typography.fontSizes.sm, fontWeight: tokens.typography.fontWeights.semibold, textDecoration: 'none', flexShrink: 0, '&:hover': { textDecoration: 'underline' }, '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}>
              {actionLabel}
            </Box>
          )}
        </Box>
        <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textSecondary }} noWrap>{supporting}</Typography>
        {state && <Typography variant="caption" sx={{ display: 'block', color: supportStatus === 'resolved' ? tokens.colors.earth : tokens.colors.textSecondary }} noWrap>{state}</Typography>}
      </Box>
    </Box>
  );
}

export default ThreadSubjectHeader;
