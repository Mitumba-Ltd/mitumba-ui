/* eslint-disable no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

import { colors, spacing, radius } from '@mitumba/tokens';
import type { ConversationListProps } from './ConversationList.types';

function ConversationList({ conversations, activeId, onSelect, onSearch, onCompose, loading }: ConversationListProps) {
  if (loading) {
    return (
      <Box sx={{ p: `${spacing.lg}px` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={64} sx={{ borderRadius: `${radius.md}px`, mb: `${spacing.md}px` }} />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.md}px`, p: `${spacing.lg}px`, pb: `${spacing.md}px` }}>
        <TextField
          placeholder="Search conversations"
          size="small"
          fullWidth
          onChange={(e) => onSearch?.(e.target.value)}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: `${radius.full}px`, bgcolor: colors.background } }}
        />
        {onCompose && (
          <IconButton onClick={onCompose} aria-label="New message" size="small" sx={{ bgcolor: colors.green, color: colors.textOnGreen, '&:hover': { bgcolor: colors.greenDark } }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {conversations.map((conv) => (
          <Box
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            role="button"
            tabIndex={0}
            aria-label={`Conversation with ${conv.partnerName}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: `${spacing.base}px`,
              px: `${spacing.lg}px`,
              py: `${spacing.base}px`,
              cursor: 'pointer',
              bgcolor: activeId === conv.id ? colors.greenLight : 'transparent',
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { bgcolor: activeId === conv.id ? colors.greenLight : colors.background },
            }}
          >
            <Avatar src={conv.partnerAvatarUrl} alt={conv.partnerName} sx={{ width: 44, height: 44 }}>
              {conv.partnerName[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: conv.unread ? 700 : 500, color: colors.textPrimary }} noWrap>
                  {conv.partnerName}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary, flexShrink: 0, ml: `${spacing.md}px` }}>
                  {conv.lastMessageAt}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.xs}px` }}>
                {conv.unread && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.green, flexShrink: 0 }} />}
                <Typography variant="caption" sx={{ color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.lastMessage}
                </Typography>
              </Box>
              {conv.listingTitle && (
                <Chip label={conv.listingTitle} size="small" sx={{ mt: `${spacing.xs}px`, height: 20, fontSize: 11, bgcolor: colors.background }} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export { ConversationList };
