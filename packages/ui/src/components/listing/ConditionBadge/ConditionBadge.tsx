import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { ConditionBadgeProps } from './ConditionBadge.types'

const GRADE_MAP: Record<
  ConditionBadgeProps['grade'],
  { color: string; label: string; bgColor: string }
> = {
  A: {
    color: tokens.colors.white,
    bgColor: tokens.colors.green,
    label: 'Like new',
  },
  B: {
    color: tokens.colors.white,
    bgColor: tokens.colors.info,
    label: 'Good',
  },
  C: {
    color: tokens.colors.white,
    bgColor: tokens.colors.warning,
    label: 'Fair',
  },
}

/**
 * Premium Listing Condition Badge.
 * Reigned in to professional pill geometry with high-contrast typography.
 */
export function ConditionBadge({ grade, showLabel = false }: ConditionBadgeProps) {
  const config = GRADE_MAP[grade]

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: config.bgColor,
        borderRadius: tokens.radius.full, // Modern Pill
        color: config.color,
        display: 'inline-flex',
        fontSize: 10,
        fontWeight: 800,
        gap: 0.5,
        height: '20px', // Dense height
        paddingInline: tokens.spacing.sm,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: tokens.shadows.card,
        fontFamily: tokens.typography.fontFamily,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
      }}
      role="status"
      aria-label={`Condition: ${config.label}`}
    >
      <Box
        component="span"
        sx={{
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {grade}
      </Box>
      {showLabel && (
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            lineHeight: 1,
            borderLeft: `1px solid rgba(255, 255, 255, 0.3)`,
            paddingLeft: 0.8,
            marginLeft: 0.5,
          }}
        >
          {config.label}
        </Box>
      )}
    </Box>
  )
}

export default ConditionBadge
