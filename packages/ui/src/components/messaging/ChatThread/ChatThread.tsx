/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { colors, spacing, radius } from '@mitumba/tokens';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import type { ChatThreadProps } from './ChatThread.types';

function ChatThread({ messages, partnerName, partnerAvatarUrl, partnerStatus, onSend, onAttach, sending, loading }: ChatThreadProps) {
  const [input, setInput] = useState('');

  function handleSend() {
    if (!input.trim() || sending) return;
    onSend(input.trim());
    setInput('');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.base}px`, px: `${spacing.lg}px`, py: `${spacing.base}px`, borderBottom: `1px solid ${colors.divider}` }}>
        <Avatar src={partnerAvatarUrl} alt={partnerName} sx={{ width: 36, height: 36 }}>
          {partnerName[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary }}>{partnerName}</Typography>
          {partnerStatus && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.xs}px` }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: partnerStatus === 'online' ? colors.green : colors.textSecondary }} />
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>{partnerStatus}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: `${spacing.lg}px` }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} variant="rectangular" height={48} sx={{ borderRadius: `${radius.md}px`, mb: `${spacing.md}px`, width: i % 2 === 0 ? '60%' : '45%', ml: i % 2 === 0 ? 0 : 'auto' }} />)
        ) : (
          messages.map((msg, i) => <MessageBubble key={i} {...msg} />)
        )}
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.md}px`, px: `${spacing.lg}px`, py: `${spacing.base}px`, borderTop: `1px solid ${colors.divider}` }}>
        {onAttach && (
          <IconButton onClick={onAttach} size="small" aria-label="Attach file">
            <AttachFileIcon />
          </IconButton>
        )}
        <TextField
          placeholder="Type a message..."
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: `${radius.full}px` } }}
          aria-label="Message input"
        />
        <IconButton
          onClick={handleSend}
          disabled={!input.trim() || sending}
          aria-label="Send message"
          sx={{ bgcolor: input.trim() ? colors.green : 'transparent', color: input.trim() ? colors.textOnGreen : colors.textSecondary, '&:hover': { bgcolor: input.trim() ? colors.greenDark : undefined }, width: 36, height: 36 }}
        >
          {sending ? <CircularProgress size={18} color="inherit" /> : <SendIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
  );
}

export { ChatThread };
