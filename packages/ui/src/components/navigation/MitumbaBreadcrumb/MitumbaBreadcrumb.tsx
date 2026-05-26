import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { MitumbaBreadcrumbProps } from './MitumbaBreadcrumb.types'

/**
 * Premium "Living" Breadcrumb primitive.
 * Fulfills high-end hierarchy standards with systematic dividers and tactile hover states.
 */
export function MitumbaBreadcrumb({ items }: MitumbaBreadcrumbProps) {
  return (
    <Breadcrumbs
      separator={
        <Typography 
          sx={{ 
            color: tokens.colors.divider, 
            mx: 0.5, 
            fontWeight: 400, 
            fontSize: 16,
            fontFamily: tokens.typography.fontFamily 
          }}
        >
          /
        </Typography>
      }
      sx={{
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap',
        },
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast) {
          return (
            <Typography
              key={item.label}
              sx={{
                color: tokens.colors.textPrimary,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: 800,
                fontFamily: tokens.typography.fontFamily,
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Typography>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href || '#'}
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: 600,
              fontFamily: tokens.typography.fontFamily,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: tokens.colors.green,
                transform: 'translateY(-1px)',
              },
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default MitumbaBreadcrumb
