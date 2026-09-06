import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { colors, spacing, radius } from '@mitumba/tokens';
import type { InboxLayoutProps } from './InboxLayout.types';

function InboxLayout({ conversationList, chatThread, title = 'Messages', showMobileBack, onMobileBack, titleLevel }: InboxLayoutProps) {
  // Preserve the existing <h6> element when no explicit level is supplied.
  const titleComponent = (titleLevel ? `h${titleLevel}` : 'h6') as React.ElementType;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: `${radius.lg}px`,
        border: `1px solid ${colors.divider}`,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mobile header with back */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: `${spacing.md}px`, px: `${spacing.lg}px`, py: `${spacing.base}px`, borderBottom: `1px solid ${colors.divider}` }}>
        {showMobileBack && (
          <IconButton onClick={onMobileBack} size="small" aria-label="Back to conversations">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography component={titleComponent} variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary, m: 0 }}>{title}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left panel — conversation list */}
        <Box
          component="section"
          aria-label="Conversations"
          sx={{ width: { xs: '100%', md: 340 }, borderRight: { md: `1px solid ${colors.divider}` }, display: { xs: showMobileBack ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', minHeight: 0 }}
        >
          {/* Desktop title */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, px: `${spacing.lg}px`, pt: `${spacing.lg}px` }}>
            <Typography component={titleComponent} variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary, m: 0 }}>{title}</Typography>
          </Box>
          {conversationList}
        </Box>

        {/* Right panel — active conversation */}
        <Box
          component="section"
          aria-label="Conversation"
          sx={{ flex: 1, display: { xs: showMobileBack ? 'flex' : 'none', md: 'flex' }, flexDirection: 'column', minHeight: 0 }}
        >
          {chatThread}
        </Box>
      </Box>
    </Paper>
  );
}

export { InboxLayout };
