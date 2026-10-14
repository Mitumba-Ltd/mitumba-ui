import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { MessagingWorkspacePane } from '../../../types/messaging-v2';
import type { MessagingWorkspaceLayoutProps } from './MessagingWorkspaceLayout.types';

/** Controlled three-pane desktop shell with progressive mobile navigation. */
export function MessagingWorkspaceLayout({
  conversationPane,
  threadPane,
  messagePane,
  activePane = 'conversations',
  conversationTitle = 'Conversations',
  threadTitle = 'Threads',
  messageTitle = 'Messages',
  conversationTitleLevel,
  threadTitleLevel,
  messageTitleLevel,
  onBackToConversations,
  onBackToThreads,
  focusRequest,
  conversationAriaLabel = 'Conversations',
  threadAriaLabel = 'Threads',
  messageAriaLabel = 'Messages',
}: MessagingWorkspaceLayoutProps): React.ReactElement {
  const conversationHeadingRef = React.useRef<HTMLElement>(null);
  const threadHeadingRef = React.useRef<HTMLElement>(null);
  const messageHeadingRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!focusRequest) return;
    const refs: Record<MessagingWorkspacePane, React.RefObject<HTMLElement | null>> = {
      conversations: conversationHeadingRef,
      threads: threadHeadingRef,
      messages: messageHeadingRef,
    };
    refs[focusRequest.pane].current?.focus();
  }, [focusRequest]);

  const conversationComponent = (conversationTitleLevel ? `h${conversationTitleLevel}` : 'h2') as React.ElementType;
  const threadComponent = (threadTitleLevel ? `h${threadTitleLevel}` : 'h2') as React.ElementType;
  const messageComponent = (messageTitleLevel ? `h${messageTitleLevel}` : 'h2') as React.ElementType;

  const sharedPaneSx = { flexDirection: 'column', minWidth: 0, minHeight: 0, bgcolor: tokens.colors.surface } as const;
  const headerSx = { display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, px: `${tokens.spacing.lg}px`, py: `${tokens.spacing.base}px`, borderBottom: `1px solid ${tokens.colors.divider}`, minHeight: 56 } as const;
  const headingSx = { m: 0, color: tokens.colors.textPrimary, fontWeight: 700, fontSize: tokens.typography.fontSizes.md, '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } } as const;

  return (
    <Paper elevation={0} data-active-pane={activePane} sx={{ display: 'flex', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', border: `1px solid ${tokens.colors.divider}`, borderRadius: `${tokens.radius.lg}px` }}>
      <Box
        component="section"
        aria-label={conversationAriaLabel}
        sx={{ ...sharedPaneSx, display: { xs: activePane === 'conversations' ? 'flex' : 'none', md: 'flex' }, width: { xs: '100%', md: 280, lg: 320 }, flexShrink: 0, borderRight: { md: `1px solid ${tokens.colors.divider}` } }}
      >
        <Box sx={headerSx}>
          <Typography ref={conversationHeadingRef} tabIndex={-1} component={conversationComponent} sx={headingSx}>{conversationTitle}</Typography>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0 }}>{conversationPane}</Box>
      </Box>

      <Box
        component="section"
        aria-label={threadAriaLabel}
        sx={{ ...sharedPaneSx, display: { xs: activePane === 'threads' ? 'flex' : 'none', md: 'flex' }, width: { xs: '100%', md: 320, lg: 380 }, flexShrink: 0, borderRight: { md: `1px solid ${tokens.colors.divider}` } }}
      >
        <Box sx={headerSx}>
          <IconButton type="button" onClick={onBackToConversations} aria-label="Back to conversations" sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <ArrowBackIcon aria-hidden />
          </IconButton>
          <Typography ref={threadHeadingRef} tabIndex={-1} component={threadComponent} sx={headingSx}>{threadTitle}</Typography>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0 }}>{threadPane}</Box>
      </Box>

      <Box
        component="section"
        aria-label={messageAriaLabel}
        sx={{ ...sharedPaneSx, display: { xs: activePane === 'messages' ? 'flex' : 'none', md: 'flex' }, flex: 1 }}
      >
        <Box sx={headerSx}>
          <IconButton type="button" onClick={onBackToThreads} aria-label="Back to threads" sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <ArrowBackIcon aria-hidden />
          </IconButton>
          <Typography ref={messageHeadingRef} tabIndex={-1} component={messageComponent} sx={headingSx}>{messageTitle}</Typography>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0 }}>{messagePane}</Box>
      </Box>
    </Paper>
  );
}

export default MessagingWorkspaceLayout;
