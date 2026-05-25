import React, { useMemo } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import { tokens } from '@mitumba/tokens'
import type { MitumbaAvatarProps, MitumbaAvatarGroupProps } from './MitumbaAvatar.types'

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 80,
}

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
}

/**
 * Premium "Living" Avatar primitive with 3D physicality and comprehensive state indicators.
 * Fulfills all 12 professional requirements from the Mitumba UI Component Specification.
 */
export function MitumbaAvatar({
  name,
  imageUrl,
  size = 'md',
  badge,
  status,
  actionIcon,
  notificationCount,
  notificationColor,
  subtitle,
  textAlignment,
  hasNewEvent,
  progress,
  selected,
  isStacked,
  isCTA,
  overflowCount,
  onClick,
}: MitumbaAvatarProps) {
  const dimension = sizeMap[size]

  // Logic 1: Initials/Placeholder
  const initials = useMemo(() => {
    if (!name) return <PersonIcon sx={{ fontSize: dimension * 0.6 }} />
    const words = name.trim().split(/\s+/)
    if (words.length === 1 && words[0]) return words[0].slice(0, 2).toUpperCase()
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return <PersonIcon sx={{ fontSize: dimension * 0.6 }} />
  }, [name, dimension])

  const renderAvatarCircle = () => {
    // Requirement 11: Stacked CTA Button
    if (isCTA) {
      return (
        <Avatar
          sx={{
            width: dimension,
            height: dimension,
            bgcolor: tokens.colors.background,
            color: tokens.colors.textSecondary,
            border: `2px dashed ${tokens.colors.border}`,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor: tokens.colors.greenLight,
              borderColor: tokens.colors.green,
              color: tokens.colors.green,
            },
          }}
        >
          {actionIcon || <AddIcon />}
        </Avatar>
      )
    }

    // Requirement 12: Stacked Overflow Badge
    if (overflowCount !== undefined) {
      return (
        <Avatar
          sx={{
            width: dimension,
            height: dimension,
            bgcolor: tokens.colors.divider,
            color: tokens.colors.textPrimary,
            fontSize: fontSizeMap[size],
            fontWeight: 'bold',
            border: `2px solid ${tokens.colors.surface}`,
          }}
        >
          +{overflowCount}
        </Avatar>
      )
    }

    const hasBorderDecorator = hasNewEvent || progress !== undefined

    return (
      <Box sx={{ position: 'relative', width: dimension, height: dimension }}>
        {/* Requirement 7 & 8: Premium SVG Decorators (Animated Border & Progress) */}
        {hasBorderDecorator && (
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{
              position: 'absolute',
              inset: -5,
              width: dimension + 10,
              height: dimension + 10,
              transform: 'rotate(-90deg)',
              zIndex: 0,
            }}
          >
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={tokens.colors.divider}
              strokeWidth="4"
              opacity="0.5"
            />
            
            {/* Progress Stroke */}
            {progress !== undefined && (
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={tokens.colors.green}
                strokeWidth="4"
                strokeDasharray="289" // 2 * PI * r
                strokeDashoffset={289 - (289 * progress) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            )}

            {/* Event Animation (Spinning dots-to-solid) */}
            {hasNewEvent && (
              <Box
                component="circle"
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={tokens.colors.green}
                strokeWidth="4"
                strokeDasharray="10 15"
                sx={{
                  animation: 'dash-to-solid 2s ease-in-out forwards, spin 4s linear infinite',
                  '@keyframes dash-to-solid': {
                    '100%': { strokeDasharray: '289 0' },
                  },
                  '@keyframes spin': {
                    '100%': { transformOrigin: 'center', transform: 'rotate(360deg)' },
                  },
                }}
              />
            )}
          </Box>
        )}

        <Avatar
          alt={name}
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            fontSize: fontSizeMap[size],
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.fontWeights.extrabold,
            bgcolor: imageUrl ? 'transparent' : tokens.colors.green,
            color: tokens.colors.textOnGreen,
            border: selected 
              ? `3px solid ${tokens.colors.green}` 
              : `1px solid ${tokens.colors.divider}`,
            boxShadow: tokens.shadows.card,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            ...(isStacked && {
              border: `2px solid ${tokens.colors.surface}`,
            }),
          }}
        >
          {!imageUrl && initials}
        </Avatar>

        {/* Requirement 9: Selected State Tick */}
        {selected && (
          <Box
            sx={{
              position: 'absolute',
              top: -4,
              left: -4,
              width: dimension * 0.4,
              height: dimension * 0.4,
              minWidth: 16,
              minHeight: 16,
              bgcolor: tokens.colors.green,
              borderRadius: tokens.radius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.colors.white,
              boxShadow: tokens.shadows.card,
              zIndex: 2,
              transform: 'translateZ(20px)',
            }}
          >
            <CheckIcon sx={{ fontSize: dimension * 0.25 }} />
          </Box>
        )}

        {/* Requirement 3: Notification Labels */}
        {notificationCount !== undefined && (
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              right: -2,
              minWidth: 18,
              height: 18,
              bgcolor: notificationColor || tokens.colors.error,
              borderRadius: tokens.radius.full,
              color: tokens.colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 'bold',
              border: `2px solid ${tokens.colors.surface}`,
              zIndex: 2,
              px: 0.5,
              transform: 'translateZ(20px)',
            }}
          >
            {notificationCount}
          </Box>
        )}

        {/* Presence Indicator */}
        {status && !actionIcon && !badge && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: dimension * 0.25,
              height: dimension * 0.25,
              minWidth: 10,
              minHeight: 10,
              bgcolor: status === 'online' ? tokens.colors.success : tokens.colors.textDisabled,
              borderRadius: tokens.radius.full,
              border: `2px solid ${tokens.colors.surface}`,
              zIndex: 2,
              transform: 'translateZ(15px)',
            }}
          />
        )}

        {/* Requirement 2: Action To Call or Legacy Badge */}
        {(actionIcon || badge) && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: dimension * 0.4,
              height: dimension * 0.4,
              minWidth: 20,
              minHeight: 20,
              bgcolor: tokens.colors.surface,
              borderRadius: tokens.radius.full,
              color: tokens.colors.textPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${tokens.colors.divider}`,
              boxShadow: tokens.shadows.card,
              zIndex: 2,
              transform: 'translateZ(20px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: tokens.colors.background,
                color: tokens.colors.green,
                transform: 'translateZ(25px) scale(1.1)',
              },
            }}
          >
            {actionIcon || badge}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        flexDirection: textAlignment === 'bottom' ? 'column' : 'row',
        alignItems: 'center',
        gap: tokens.spacing.base,
        cursor: onClick ? 'pointer' : 'default',
        perspective: '1000px',
        '&:hover .avatar-main': {
          transform: 'rotateY(15deg) rotateX(-5deg) scale(1.1)',
          filter: 'brightness(1.05)',
        },
        '&:active .avatar-main': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        className="avatar-main"
        sx={{
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {renderAvatarCircle()}
      </Box>

      {/* Requirement 5, 6, 8: Meta Text */}
      {(name || subtitle || progress !== undefined) && textAlignment && (
        <Box
          sx={{
            textAlign: textAlignment === 'bottom' ? 'center' : 'left',
            minWidth: textAlignment === 'side' ? 140 : 'auto',
          }}
        >
          {name && (
            <Typography
              sx={{
                fontWeight: tokens.typography.fontWeights.bold,
                fontSize: tokens.typography.fontSizes.base,
                color: tokens.colors.textPrimary,
                lineHeight: 1.2,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              {name}
            </Typography>
          )}
          {(subtitle || (progress !== undefined && textAlignment === 'bottom')) && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: status === 'online' && textAlignment === 'side' ? tokens.colors.success : tokens.colors.textSecondary,
                fontWeight: status === 'online' ? 'bold' : 'normal',
                mt: '2px',
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              {progress !== undefined && textAlignment === 'bottom' ? `${progress}% complete` : subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

/**
 * Requirement 10-12: Avatar Group / Stack
 */
export function MitumbaAvatarGroup({
  children,
  max = 5,
  total,
  size = 'md',
  onAdd,
}: MitumbaAvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const showCount = Math.min(childrenArray.length, max)
  const totalCount = total || childrenArray.length
  const overflow = totalCount - showCount

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {childrenArray.slice(0, showCount).map((child, index) => {
        const key = (child as React.ReactElement).props?.name || `avatar-${index}`
        return (
          <Box
            key={key}
            sx={{
              marginLeft: index === 0 ? 0 : -(sizeMap[size] * 0.3),
              zIndex: totalCount - index,
            }}
          >
            {React.cloneElement(child as React.ReactElement, { size, isStacked: true })}
          </Box>
        )
      })}

      {overflow > 0 && (
        <Box sx={{ marginLeft: -(sizeMap[size] * 0.3), zIndex: 0 }}>
          <MitumbaAvatar size={size} overflowCount={overflow} isStacked />
        </Box>
      )}

      {onAdd && (
        <Box sx={{ marginLeft: tokens.spacing.sm, zIndex: 0 }}>
          <MitumbaAvatar size={size} isCTA onClick={onAdd} />
        </Box>
      )}
    </Box>
  )
}

export default MitumbaAvatar
