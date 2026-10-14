import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { ConversationActorLabelProps } from './ConversationActorLabel.types';

/** Renders a normalized user or store identity without inferring ownership. */
export function ConversationActorLabel({ actor, prefix, secondaryText, size = 'medium', ariaLabel }: ConversationActorLabelProps): React.ReactElement {
  const compact = size === 'small';
  const label = ariaLabel ?? [prefix, actor.displayName, actor.kind === 'store' ? 'Store' : undefined, secondaryText].filter(Boolean).join(', ');

  return (
    <Box aria-label={label} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, minWidth: 0 }}>
      <Avatar src={actor.avatarUrl} alt="" aria-hidden sx={{ width: compact ? 28 : 40, height: compact ? 28 : 40, bgcolor: tokens.colors.greenLight, color: tokens.colors.green, flexShrink: 0 }}>
        {actor.displayName.slice(0, 1).toUpperCase()}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, minWidth: 0 }}>
          <Typography variant={compact ? 'caption' : 'body2'} sx={{ color: tokens.colors.textPrimary, fontWeight: 600 }} noWrap>
            {prefix ? `${prefix} ${actor.displayName}` : actor.displayName}
          </Typography>
          {actor.kind === 'store' && (
            <Chip label="Store" size="small" sx={{ height: 18, fontSize: tokens.typography.fontSizes.xs, bgcolor: tokens.colors.greenLight, color: tokens.colors.greenDark, flexShrink: 0 }} />
          )}
        </Box>
        {secondaryText && (
          <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textSecondary }} noWrap>
            {secondaryText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ConversationActorLabel;
