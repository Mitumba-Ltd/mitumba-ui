import React from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'

export interface MitumbaPaginationProps {
  /** The total number of pages. */
  count: number
  /** The current page (1-indexed). */
  page: number
  /** Callback fired when the page changes. */
  onChange: (page: number) => void
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}

/**
 * Premium "Living" Pagination primitive.
 * Fulfills navigation standards with intelligent truncation and tactile hover states.
 */
export function MitumbaPagination({
  count,
  page,
  onChange,
  sx,
}: MitumbaPaginationProps) {
  return (
    <Stack spacing={2} sx={[{ width: '100%', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, val) => onChange(val)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
            sx={{
              fontFamily: tokens.typography.fontFamily,
              fontWeight: 700,
              fontSize: tokens.typography.fontSizes.sm,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              borderRadius: `${tokens.radius.md}px`,
              border: 'none',
              
              '&:hover': {
                backgroundColor: tokens.colors.background,
                transform: 'scale(1.1) translateY(-2px)',
                color: tokens.colors.green,
              },
              
              '&.Mui-selected': {
                backgroundColor: tokens.colors.green,
                color: tokens.colors.white,
                boxShadow: tokens.shadows.card,
                '&:hover': {
                  backgroundColor: tokens.colors.greenDark,
                },
              },

              '&.MuiPaginationItem-ellipsis': {
                color: tokens.colors.textDisabled,
                fontSize: 18,
              },

              // Icon buttons (Next/Prev)
              '&.MuiPaginationItem-previousNext': {
                backgroundColor: tokens.colors.surface,
                border: `1px solid ${tokens.colors.divider}`,
                '&:hover': {
                  borderColor: tokens.colors.green,
                }
              }
            }}
          />
        )}
      />
    </Stack>
  )
}

export default MitumbaPagination
