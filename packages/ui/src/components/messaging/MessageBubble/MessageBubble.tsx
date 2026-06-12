/* eslint-disable no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { colors, spacing, radius } from '@mitumba/tokens';
import type { MessageBubbleProps } from './MessageBubble.types';

function MessageBubble({ body, timestamp, isMine, senderName, senderAvatarUrl, attachment }: MessageBubbleProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: `${spacing.md}px`, mb: `${spacing.md}px` }}>
      {!isMine && (
        <Avatar src={senderAvatarUrl} alt={senderName} sx={{ width: 28, height: 28 }}>
          {senderName?.[0]}
        </Avatar>
      )}
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isMine ? colors.green : '#f5f5f5',
          color: isMine ? colors.textOnGreen : colors.textPrimary,
          borderRadius: isMine ? `${radius.xl}px ${radius.xl}px ${radius.xs}px ${radius.xl}px` : `${radius.xl}px ${radius.xl}px ${radius.xl}px ${radius.xs}px`,
          px: `${spacing.lg}px`,
          py: `${spacing.base}px`,
        }}
      >
        {!isMine && senderName && (
          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: `${spacing.xs}px`, color: colors.textSecondary }}>
            {senderName}
          </Typography>
        )}
        {attachment?.type === 'image' && (
          <Box component="img" src={attachment.url} alt={attachment.name} sx={{ width: '100%', borderRadius: `${radius.md}px`, mb: `${spacing.md}px` }} />
        )}
        {attachment?.type === 'file' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.md}px`, bgcolor: isMine ? 'rgba(255,255,255,0.15)' : colors.background, borderRadius: `${radius.md}px`, p: `${spacing.md}px`, mb: `${spacing.md}px` }}>
            <InsertDriveFileIcon fontSize="small" />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap>{attachment.name}</Typography>
              {attachment.size && <Typography variant="caption" sx={{ color: isMine ? 'rgba(255,255,255,0.7)' : colors.textSecondary }}>{attachment.size}</Typography>}
            </Box>
            <IconButton size="small" href={attachment.url} aria-label="Download">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        <Typography variant="body2">{body}</Typography>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: `${spacing.xs}px`, opacity: 0.7, fontSize: 11 }}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
}

export { MessageBubble };
