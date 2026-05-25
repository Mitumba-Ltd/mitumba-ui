import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaAvatarProps } from './MitumbaAvatar.types'

export function MitumbaAvatar({
  name,
  imageUrl,
  size = 'md',
  badge,
}: MitumbaAvatarProps) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 44,
    lg: 56,
  }

  const fontSizeMap = {
    xs: 10,
    sm: tokens.typography.fontSizes.xs,
    md: tokens.typography.fontSizes.base,
    lg: tokens.typography.fontSizes.md,
  }

  const dimension = sizeMap[size]
  const words = name.trim().split(/\s+/)
  let initials: string

  if (words.length === 0 || !words[0]) {
    initials = '??'
  } else if (words.length === 1) {
    initials = words[0].slice(0, 2).toUpperCase()
  } else {
    initials = (words[0][0] || '') + (words[1][0] || '')
    initials = initials.toUpperCase()
  }

  const avatar = (
    <Avatar
      alt={name}
      src={imageUrl}
      sx={{
        width: dimension,
        height: dimension,
        fontSize: fontSizeMap[size],
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeights.bold,
        bgcolor: imageUrl ? 'transparent' : tokens.colors.green,
        color: tokens.colors.textOnGreen,
        border: imageUrl ? `1px solid ${tokens.colors.divider}` : 'none',
        '&:focus-visible': {
          outline: `2px solid ${tokens.colors.greenLight}`,
          outlineOffset: '2px',
        },
      }}
    >
      {!imageUrl && initials}
    </Avatar>
  )

  if (badge !== undefined) {
    const badgeSize = Math.max(dimension / 2.5, 16)
    
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        badgeContent={
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: tokens.colors.earth,
              borderRadius: tokens.radius.full,
              color: tokens.colors.textOnEarth,
              display: 'flex',
              fontSize: badgeSize < 14 ? 8 : 10,
              fontWeight: tokens.typography.fontWeights.bold,
              height: badgeSize,
              justifyContent: 'center',
              minWidth: badgeSize,
              paddingInline: tokens.spacing.xs,
              border: `2px solid ${tokens.colors.surface}`,
              boxShadow: tokens.shadows.card,
            }}
          >
            {badge}
          </Box>
        }
      >
        {avatar}
      </Badge>
    )
  }

  return avatar
}

export default MitumbaAvatar
