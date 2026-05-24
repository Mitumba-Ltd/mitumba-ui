import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import { tokens } from '@mitumba/tokens'
import type { STIBreakdownPanelProps } from './STIBreakdownPanel.types'
import { STIScoreChip } from '../STIScoreChip'

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function STIBreakdownPanel({
  score,
  fulfillmentRate,
  accuracyRate,
  avgResponseHours,
  daysActive,
  recentEvents,
}: STIBreakdownPanelProps) {
  const factors: Array<{
    label: string
    display: string
    value?: number
  }> = [
    { label: 'Fulfillment Rate', value: fulfillmentRate, display: formatPercent(fulfillmentRate) },
    { label: 'Listing Accuracy', value: accuracyRate, display: formatPercent(accuracyRate) },
    { label: 'Avg Response Time', display: `${avgResponseHours}h` },
    { label: 'Days Active', display: `${daysActive}` },
  ]

  return (
    <Box
      sx={{
        p: tokens.spacing.base,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base, mb: tokens.spacing.lg }}>
        <STIScoreChip score={score} />
      </Box>

      <Box component="section" aria-label="Score factors" sx={{ mb: tokens.spacing.lg }}>
        {factors.map((factor) => (
          <Box key={factor.label} sx={{ mb: tokens.spacing.md }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: tokens.spacing.xs }}>
              <Typography
                variant="body2"
                sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm }}
              >
                {factor.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: tokens.typography.fontWeights.semibold, fontSize: tokens.typography.fontSizes.sm }}
              >
                {factor.display}
              </Typography>
            </Box>
            {factor.value !== undefined && (
              <LinearProgress
                variant="determinate"
                value={factor.value * 100}
                sx={{
                  height: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  bgcolor: tokens.colors.background,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: tokens.colors.green,
                    borderRadius: tokens.radius.full,
                  },
                }}
                aria-label={`${factor.label} progress`}
              />
            )}
          </Box>
        ))}
      </Box>

      {recentEvents.length > 0 && (
        <Box component="section" aria-label="Recent STI events">
          <Typography
            variant="body2"
            sx={{
              fontWeight: tokens.typography.fontWeights.semibold,
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textPrimary,
              mb: tokens.spacing.sm,
            }}
          >
            Recent Events
          </Typography>
          {recentEvents.map((event) => (
            <Box
              key={`${event.reason}-${event.timestamp}`}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                py: tokens.spacing.sm,
                borderBottom: `1px solid ${tokens.colors.divider}`,
              }}
            >
              {event.type === 'positive' ? (
                <AddOutlinedIcon sx={{ fontSize: 16, color: tokens.colors.success, mt: tokens.spacing.xs }} />
              ) : (
                <RemoveOutlinedIcon sx={{ fontSize: 16, color: tokens.colors.error, mt: tokens.spacing.xs }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: tokens.typography.fontSizes.sm,
                      color: tokens.colors.textPrimary,
                      fontWeight: tokens.typography.fontWeights.medium,
                    }}
                  >
                    {event.reason}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: tokens.typography.fontSizes.xs,
                      fontWeight: tokens.typography.fontWeights.bold,
                      color: event.type === 'positive' ? tokens.colors.success : tokens.colors.error,
                    }}
                  >
                    {event.type === 'positive' ? '+' : ''}{event.pointsChange}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
                  {event.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default STIBreakdownPanel
