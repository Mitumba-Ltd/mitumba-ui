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
    xs: tokens.spacing.xl,
    sm: tokens.spacing.xxl,
    md: tokens.spacing.xxxl,
    lg: 64,
  }

  const fontSizeMap = {
    xs: tokens.typography.fontSizes.sm,
    sm: tokens.typography.fontSizes.base,
    md: tokens.typography.fontSizes.lg,
    lg: tokens.typography.fontSizes.xxl,
  }

  const dimension = sizeMap[size]
  const words = name.split(' ')
  let initials: string

  if (words.length === 1) {
    initials = words[0]!.slice(0, 2).toUpperCase()
  } else {
    initials = words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  const avatar = (
    <Avatar
      alt={name}
      src={imageUrl}
      sx={{
        width: dimension,
        height: dimension,
        fontSize: fontSizeMap[size],
        fontWeight: tokens.typography.fontWeights.bold,
        bgcolor: imageUrl ? undefined : tokens.colors.green,
        color: tokens.colors.textOnGreen,
        '&:focus-visible': {
          outline: `${tokens.spacing.xs}px solid transparent`,
          boxShadow: tokens.shadows.focus,
        },
      }}
      tabIndex={-1}
    >
      {!imageUrl && initials}
    </Avatar>
  )

  if (badge) {
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
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.bold,
              height: `${Math.max(dimension / 3, 16)}px`,
              justifyContent: 'center',
              minWidth: `${Math.max(dimension / 3, 16)}px`,
              paddingInline: tokens.spacing.xs,
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
