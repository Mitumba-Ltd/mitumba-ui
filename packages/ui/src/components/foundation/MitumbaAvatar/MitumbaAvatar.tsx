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

const overlapFactorMap = {
  tight: 0.5,
  standard: 0.35,
  relaxed: 0.2,
}

/**
 * Premium "Living" Avatar primitive with 3D physicality and high-end animations.
 * Fulfills all professional requirements and refinements from Stanley.
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

  const initials = useMemo(() => {
    if (!name) return <PersonIcon sx={{ fontSize: dimension * 0.6 }} />
    const words = name.trim().split(/\s+/)
    if (words.length === 1 && words[0]) return words[0].slice(0, 2).toUpperCase()
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return <PersonIcon sx={{ fontSize: dimension * 0.6 }} />
  }, [name, dimension])

  const renderAvatarCircle = () => {
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
        {/* Issue 2 & 3: High-End SVG Animations (Event & Progress) */}
        {hasBorderDecorator && (
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{
              position: 'absolute',
              // Perfect centering: -10% of dimension usually works well for the stroke width
              top: '-10%',
              left: '-10%',
              width: '120%',
              height: '120%',
              transform: 'rotate(-90deg)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            {/* Track */}
            <circle cx="50" cy="50" r="46" fill="none" stroke={tokens.colors.divider} strokeWidth="4" opacity="0.3" />
            
            {progress !== undefined && (
              <Box
                component="circle"
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={tokens.colors.green}
                strokeWidth="4"
                strokeDasharray="289"
                strokeLinecap="round"
                sx={{
                  transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  strokeDashoffset: 289 - (289 * progress) / 100,
                  // Anime effect: dots moving to point then solidifying
                  animation: 'anime-progress 2s ease-out forwards',
                  '@keyframes anime-progress': {
                    '0%': { strokeDasharray: '1 10' },
                    '50%': { strokeDasharray: '10 5' },
                    '100%': { strokeDasharray: '289 0' },
                  },
                }}
              />
            )}

            {hasNewEvent && (
              <Box
                component="circle"
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={tokens.colors.green}
                strokeWidth="4"
                strokeDasharray="289"
                sx={{
                  animation: 'event-spin 3s linear infinite, event-dash 2s ease-in-out forwards',
                  '@keyframes event-spin': {
                    '100%': { transformOrigin: 'center', transform: 'rotate(360deg)' },
                  },
                  '@keyframes event-dash': {
                    '0%': { strokeDasharray: '5 20' },
                    '50%': { strokeDasharray: '50 10' },
                    '100%': { strokeDasharray: '289 0' },
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
              ? `2px solid ${tokens.colors.green}` 
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

        {/* Issue 4: Relocated & Polished Selected State Tick */}
        {selected && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: Math.max(16, dimension * 0.35),
              height: Math.max(16, dimension * 0.35),
              bgcolor: tokens.colors.green,
              borderRadius: tokens.radius.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.colors.white,
              boxShadow: tokens.shadows.deep,
              border: `2px solid ${tokens.colors.surface}`,
              zIndex: 3,
              transform: 'translateZ(25px)',
            }}
          >
            <CheckIcon sx={{ fontSize: '70%' }} />
          </Box>
        )}

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

        {status && !actionIcon && !selected && (
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

        {actionIcon && !selected && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: dimension * 0.4,
              height: dimension * 0.4,
              minWidth: 24,
              minHeight: 24,
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
            {React.cloneElement(actionIcon as React.ReactElement, { sx: { fontSize: dimension * 0.2 } })}
          </Box>
        )}

        {badge && !selected && !actionIcon && !status && (
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
            }}
          >
            {badge}
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
        // Issue 1: Tightened spatial rhythm
        gap: tokens.spacing.xs, 
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

      {(name || subtitle || progress !== undefined) && textAlignment && (
        <Box
          sx={{
            textAlign: textAlignment === 'bottom' ? 'center' : 'left',
            minWidth: textAlignment === 'side' ? 120 : 'auto',
            // Additional tightening for side text
            ml: textAlignment === 'side' ? tokens.spacing.xxs : 0,
            mt: textAlignment === 'bottom' ? tokens.spacing.xxs : 0,
          }}
        >
          {name && (
            <Typography
              sx={{
                fontWeight: tokens.typography.fontWeights.bold,
                fontSize: tokens.typography.fontSizes.base,
                color: tokens.colors.textPrimary,
                lineHeight: 1.1, // Tighter line height
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
                mt: '1px', // Tighter vertical gap
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
 * Issue 5 & 6: Fixed Stacking, CTA layering, and Overlap Variants
 */
export function MitumbaAvatarGroup({
  children,
  max = 5,
  total,
  size = 'md',
  overlap = 'relaxed', // Small overlap by default as requested
  onAdd,
}: MitumbaAvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const showCount = Math.min(childrenArray.length, max)
  const totalCount = total || childrenArray.length
  const overflow = totalCount - showCount
  
  const dimension = sizeMap[size]
  const overlapValue = -(dimension * overlapFactorMap[overlap])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {childrenArray.slice(0, showCount).map((child, index) => {
        const key = (child as React.ReactElement).props?.name || `avatar-${index}`
        return (
          <Box
            key={key}
            sx={{
              marginLeft: index === 0 ? 0 : overlapValue,
              zIndex: index, // Reverse z-index so first is on bottom, last on top
            }}
          >
            {React.cloneElement(child as React.ReactElement, { size, isStacked: true })}
          </Box>
        )
      })}

      {overflow > 0 && (
        <Box sx={{ marginLeft: overlapValue, zIndex: showCount }}>
          <MitumbaAvatar size={size} overflowCount={overflow} isStacked />
        </Box>
      )}

      {onAdd && (
        <Box sx={{ marginLeft: overlapValue, zIndex: showCount + 1 }}>
          <MitumbaAvatar size={size} isCTA onClick={onAdd} />
        </Box>
      )}
    </Box>
  )
}

export default MitumbaAvatar
