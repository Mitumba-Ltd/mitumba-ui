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
    lg: 64,
  }

  const fontSizeMap = {
    xs: 10,
    sm: tokens.typography.fontSizes.xs,
    md: tokens.typography.fontSizes.base,
    lg: tokens.typography.fontSizes.lg,
  }

  const dimension = sizeMap[size]
  const words = name.trim().split(/\s+/)
  let initials = '??'

  if (words.length === 1 && words[0]) {
    initials = words[0].slice(0, 2).toUpperCase()
  } else if (words.length >= 2) {
    initials = (words[0][0] || '') + (words[1][0] || '')
    initials = initials.toUpperCase()
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: dimension,
        height: dimension,
        perspective: '1000px', // Standard 3D perspective
        '&:hover .avatar-content': {
          transform: 'rotateY(15deg) rotateX(-5deg) scale(1.1)',
          boxShadow: tokens.shadows.deep,
          filter: 'brightness(1.05)',
        },
        '&:active .avatar-content': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        className="avatar-content"
        sx={{
          width: '100%',
          height: '100%',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', // Premium spring
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: tokens.radius.full,
          cursor: 'pointer',
        }}
      >
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
            border: `1px solid ${tokens.colors.divider}`,
            boxShadow: tokens.shadows.card,
          }}
        >
          {initials}
        </Avatar>

        {badge !== undefined && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              minWidth: dimension / 2.5,
              height: dimension / 2.5,
              backgroundColor: tokens.colors.earth,
              borderRadius: tokens.radius.full,
              color: tokens.colors.textOnEarth,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: dimension < 40 ? 8 : 10,
              fontWeight: tokens.typography.fontWeights.extrabold,
              border: `2px solid ${tokens.colors.surface}`,
              boxShadow: tokens.shadows.card,
              transform: 'translateZ(10px)', // Lift badge in 3D space
              paddingInline: '4px',
            }}
          >
            {badge}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MitumbaAvatar
