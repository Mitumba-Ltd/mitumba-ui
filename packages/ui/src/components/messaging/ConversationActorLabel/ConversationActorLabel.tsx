import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { ConversationActorLabelProps } from './ConversationActorLabel.types';

/** Renders a normalized user or store identity without inferring ownership. */
export function ConversationActorLabel({ actor, prefix, secondaryText, size = 'medium', ariaLabel }: ConversationActorLabelProps): React.ReactElement {
  const compact = size === 'small';
  const kindLabel = actor.kind === 'store' ? 'Store' : undefined;
  const supportingText = secondaryText ?? kindLabel;
  const label = ariaLabel ?? [prefix, actor.displayName, kindLabel, secondaryText].filter(Boolean).join(', ');

  return (
    <Box aria-label={label} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.base}px`, minWidth: 0 }}>
      <Avatar src={actor.avatarUrl} alt="" aria-hidden sx={{ width: compact ? 28 : 40, height: compact ? 28 : 40, bgcolor: tokens.colors.background, color: tokens.colors.green, flexShrink: 0, fontSize: compact ? tokens.typography.fontSizes.sm : tokens.typography.fontSizes.base, fontWeight: tokens.typography.fontWeights.semibold }}>
        {actor.displayName.slice(0, 1).toUpperCase()}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant={compact ? 'caption' : 'body2'} sx={{ display: 'block', color: tokens.colors.textPrimary, fontWeight: tokens.typography.fontWeights.semibold, lineHeight: tokens.typography.lineHeights.snug }} noWrap>
          {prefix ? `${prefix} ${actor.displayName}` : actor.displayName}
        </Typography>
        {supportingText && (
          <Typography variant="caption" sx={{ display: 'block', color: tokens.colors.textSecondary, lineHeight: tokens.typography.lineHeights.snug }} noWrap>
            {supportingText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ConversationActorLabel;
