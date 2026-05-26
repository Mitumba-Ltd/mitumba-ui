import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { SectionHeaderProps } from './SectionHeader.types'

/**
 * Premium "Living" Section Header primitive.
 * Fulfills high-end layout standards with flexible alignment and benchmarked typography.
 */
export function SectionHeader({
  title,
  subtitle,
  overline,
  action,
  align = 'left',
  variant = 'standard',
  sx,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  const isCentered = align === 'center'
  const isLarge = variant === 'large'

  return (
    <Box
      sx={[
        {
          width: '100%',
          display: 'flex',
          flexDirection: isCentered ? 'column' : 'row',
          alignItems: isCentered ? 'center' : 'flex-end',
          justifyContent: isCentered ? 'center' : 'space-between',
          textAlign: isCentered ? 'center' : 'left',
          gap: tokens.spacing.base,
          mb: isLarge ? tokens.spacing.xxxl : tokens.spacing.xxl,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ flex: 1 }}>
        {overline && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 800,
              color: tokens.colors.green,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: tokens.typography.fontFamily,
              mb: 0.5,
            }}
          >
            {overline}
          </Typography>
        )}
        
        <Typography
          component="h2"
          sx={{
            color: tokens.colors.textPrimary,
            fontSize: isLarge ? tokens.typography.fontSizes.display : tokens.typography.fontSizes.xxl,
            fontWeight: 900,
            lineHeight: 1.1,
            fontFamily: tokens.typography.fontFamily,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: isLarge ? tokens.typography.fontSizes.md : tokens.typography.fontSizes.base,
              mt: 1,
              fontFamily: tokens.typography.fontFamily,
              maxWidth: 560,
              marginInline: isCentered ? 'auto' : 'unset',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Action Section */}
      {(action || actionLabel) && (
        <Box sx={{ flexShrink: 0, mb: isCentered ? 0 : 0.5 }}>
          {action || (
            <MitumbaPrimaryButton
              label={actionLabel!}
              onClick={onAction || (() => {})}
              variant="ghost"
              size="small"
              fullWidth={false}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default SectionHeader
