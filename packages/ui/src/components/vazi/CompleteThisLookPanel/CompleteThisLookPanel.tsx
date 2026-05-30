import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { tokens } from '@mitumba/tokens'
import { MitumbaGrid } from '../../layout/MitumbaGrid'
import { VAZIOutfitCard } from '../VAZIOutfitCard'
import { VAZIOutfitCardSkeleton } from '../VAZIOutfitCardSkeleton'
import type { CompleteThisLookPanelProps } from './CompleteThisLookPanel.types'

/**
 * Extraordinary "Pinterest-Level" Complete This Look Panel.
 * Engineered for high-fidelity recommendation display with systematic grid logic.
 */
export function CompleteThisLookPanel({ outfits, loading = false }: CompleteThisLookPanelProps) {
  if (!loading && outfits.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
      }}
    >
      <Stack spacing={1} sx={{ paddingInline: { xs: 2, md: 0 } }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AutoAwesomeIcon sx={{ fontSize: 16, color: tokens.colors.earth }} />
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 900,
              color: tokens.colors.earth,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            AI Recommendations
          </Typography>
        </Stack>
        <Typography
          component="h2"
          sx={{
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSizes.xl,
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
          }}
        >
          Complete this look
        </Typography>
      </Stack>

      <MitumbaGrid columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} gap={3}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <VAZIOutfitCardSkeleton key={`vazi-skel-${i + 1}`} />
          ))
        ) : (
          outfits.map((outfit) => (
            <VAZIOutfitCard
              key={outfit.outfitName}
              outfitName={outfit.outfitName}
              items={outfit.items}
              totalPriceKes={outfit.totalPriceKes}
              sellersCount={outfit.sellersCount}
              isMultiCity={outfit.isMultiCity}
              onTap={outfit.onTap}
              onBuyAll={outfit.onBuyAll}
            />
          ))
        )}
      </MitumbaGrid>
    </Box>
  )
}

export default CompleteThisLookPanel
