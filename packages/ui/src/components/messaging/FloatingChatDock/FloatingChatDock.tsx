import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import MinimizeIcon from '@mui/icons-material/Remove'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { tokens } from '@mitumba/tokens'
import { SemanticTitle } from '../../../internal/SemanticTitle'
import type { FloatingChatDockProps } from './FloatingChatDock.types'

const DOCK_WIDTH = 360
const DOCK_HEIGHT = 520

/**
 * FloatingChatDock — persistent bottom-right chat window for desktop.
 * Pure presentation chrome; renders children (ChatThread) in expanded body.
 * Hidden on mobile (<md breakpoint).
 */
export function FloatingChatDock({
  open,
  title,
  subtitle,
  avatarUrl,
  minimized,
  onToggleMinimize,
  onClose,
  unreadCount,
  onBack,
  titleLevel,
  announcement,
  children,
}: FloatingChatDockProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (!open || isMobile) return null

  return (
    <Box
      role="dialog"
      aria-modal="false"
      aria-label={`Chat with ${title}`}
      sx={{
        position: 'fixed',
        bottom: `${tokens.spacing.lg}px`,
        right: `${tokens.spacing.lg}px`,
        width: DOCK_WIDTH,
        height: minimized ? 'auto' : DOCK_HEIGHT,
        zIndex: tokens.zIndex.modal,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px ${minimized ? `${tokens.radius.xl}px ${tokens.radius.xl}px` : '0 0'}`,
        overflow: 'hidden',
        boxShadow: tokens.shadows.deep,
        border: `1px solid ${tokens.colors.divider}`,
        bgcolor: tokens.colors.surface,
        transition: 'height 0.25s ease-in-out',
      }}
    >
      {/* Header */}
      <Box
        onClick={minimized ? onToggleMinimize : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.spacing.sm}px`,
          px: `${tokens.spacing.base}px`,
          py: `${tokens.spacing.md}px`,
          bgcolor: tokens.colors.green,
          cursor: minimized ? 'pointer' : 'default',
          flexShrink: 0,
        }}
      >
        {onBack && (
          <IconButton
            aria-label="Back"
            onClick={(e) => { e.stopPropagation(); onBack() }}
            size="small"
            sx={{ color: tokens.colors.textOnGreen, mr: '-4px', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        <Badge
          badgeContent={minimized ? unreadCount : 0}
          color="error"
          sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}
        >
          <Avatar src={avatarUrl} alt={title} sx={{ width: 32, height: 32 }}>
            {title[0]}
          </Avatar>
        </Badge>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SemanticTitle
            titleLevel={titleLevel}
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: tokens.typography.fontWeights.bold,
              color: tokens.colors.textOnGreen,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </SemanticTitle>
          {subtitle && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1,
                mt: '1px',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <IconButton
          aria-label={minimized ? 'Expand chat' : 'Minimize chat'}
          aria-expanded={!minimized}
          onClick={(e) => { e.stopPropagation(); onToggleMinimize() }}
          size="small"
          sx={{ color: tokens.colors.textOnGreen, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
        >
          {minimized ? <OpenInFullIcon sx={{ fontSize: 16 }} /> : <MinimizeIcon sx={{ fontSize: 18 }} />}
        </IconButton>

        <IconButton
          aria-label="Close chat"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          size="small"
          sx={{ color: tokens.colors.textOnGreen, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Body — expanded only */}
      {!minimized && (
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      )}

      {/* Single non-repeating polite live region for controlled announcements */}
      <Box
        role="status"
        aria-live="polite"
        sx={{ position: 'absolute', width: 1, height: 1, p: 0, m: '-1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {announcement ?? ''}
      </Box>
    </Box>
  )
}

export default FloatingChatDock
