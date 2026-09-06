/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading, react/jsx-no-bind, no-use-before-define */
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
import CloseIcon from '@mui/icons-material/Close';

import { colors, spacing, radius } from '@mitumba/tokens';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { OrderMessageAttachment } from '../OrderMessageAttachment';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { ChatThreadProps } from './ChatThread.types';

function ChatThread({ messages, partnerName, partnerAvatarUrl, partnerStatus, onSend, onAttach, sending, loading, attachment, onRemoveAttachment, onTyping, titleLevel, announcement }: ChatThreadProps) {
  const [input, setInput] = useState('');
  const typingTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = React.useRef(false);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const userScrolledUp = React.useRef(false);

  // Auto-scroll to bottom on new messages (unless user scrolled up)
  React.useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || userScrolledUp.current) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, loading]);

  function handleScroll() {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    userScrolledUp.current = distanceFromBottom > 80;
  }

  function emitTyping(typing: boolean) {
    if (!onTyping || isTypingRef.current === typing) return;
    isTypingRef.current = typing;
    onTyping(typing);
  }

  function handleInputChange(value: string) {
    setInput(value);
    if (value.trim()) {
      emitTyping(true);
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => emitTyping(false), 2000);
    } else {
      emitTyping(false);
    }
  }

  function handleSend() {
    if (!input.trim() || sending) return;
    onSend(input.trim());
    setInput('');
    emitTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    userScrolledUp.current = false;
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  }

  return (
    <Box component="section" aria-label={`Conversation with ${partnerName}`} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.base}px`, px: `${spacing.lg}px`, py: `${spacing.base}px`, borderBottom: `1px solid ${colors.divider}` }}>
        <Avatar src={partnerAvatarUrl} alt={partnerName} sx={{ width: 36, height: 36 }}>
          {partnerName[0]}
        </Avatar>
        <Box>
          <SemanticTitle titleLevel={titleLevel} variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary }}>{partnerName}</SemanticTitle>
          {partnerStatus && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.xs}px` }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: partnerStatus === 'online' ? colors.green : colors.textSecondary }} />
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>{partnerStatus}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Messages */}
      <Box
        ref={messagesContainerRef}
        onScroll={handleScroll}
        role="log"
        aria-label="Messages"
        aria-busy={loading || undefined}
        sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: `${spacing.lg}px` }}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={48} sx={{ borderRadius: `${radius.md}px`, mb: `${spacing.md}px`, width: i % 2 === 0 ? '60%' : '45%', ml: i % 2 === 0 ? 0 : 'auto' }} />
          ))
        ) : (
          messages.map((msg, i) => <MessageBubble key={i} {...msg} />)
        )}
      </Box>

      {/* Single non-repeating polite live region for controlled announcements */}
      <Box
        role="status"
        aria-live="polite"
        sx={{ position: 'absolute', width: 1, height: 1, p: 0, m: '-1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {announcement ?? ''}
      </Box>

      {/* Draft attachment */}
      {attachment?.type === 'order' && (
        <Box sx={{ px: `${spacing.lg}px`, pt: `${spacing.sm}px`, position: 'relative' }}>
          <OrderMessageAttachment
            orderId={attachment.data.orderId}
            orderShortId={attachment.data.orderShortId}
            listingTitle={attachment.data.listingTitle}
            listingImageUrl={attachment.data.listingImageUrl}
            amount={attachment.data.amount}
            status={attachment.data.status}
            createdAt={attachment.data.createdAt}
          />
          {onRemoveAttachment && (
            <IconButton
              aria-label="Remove attachment"
              onClick={onRemoveAttachment}
              size="small"
              sx={{ position: 'absolute', top: 4, right: `${spacing.lg}px`, bgcolor: colors.background, '&:hover': { bgcolor: colors.errorLight, color: colors.error } }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Box>
      )}

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
          onChange={(e) => handleInputChange(e.target.value)}
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
