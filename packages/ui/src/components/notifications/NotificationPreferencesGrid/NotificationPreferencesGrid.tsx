import React, { useId } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { tokens } from '@mitumba/tokens'
import { MitumbaSwitch } from '../../selection/MitumbaSwitch/MitumbaSwitch'
import type { NotificationChannel, NotificationPreferenceRow, NotificationPreferencesGridProps } from './NotificationPreferencesGrid.types'

/** Every channel, in the order settings pages list them. */
export const DEFAULT_NOTIFICATION_COLUMNS: Array<{ channel: NotificationChannel; label: string }> = [
  { channel: 'in_app', label: 'In-app' },
  { channel: 'email', label: 'Email' },
  { channel: 'push', label: 'Push' },
  { channel: 'whatsapp', label: 'WhatsApp' },
  { channel: 'telegram', label: 'Telegram' },
  { channel: 'sms', label: 'SMS' },
]

const DEFAULT_REQUIRED_HINT = 'Some messages here are required, such as security alerts.'
const DEFAULT_UNAVAILABLE_HINT = 'Not connected'
const SKELETON_ROWS = 4

const VISUALLY_HIDDEN = { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' } as const

const key = (category: string, channel: NotificationChannel) => `${category}\u0000${channel}`

function RowText({ row, headingId, requiredHint, component }: { row: NotificationPreferenceRow; headingId?: string; requiredHint: string; component: 'h3' | 'span' }) {
  return (
    <>
      <Typography
        id={headingId}
        component={component}
        sx={{ m: 0, display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, fontSize: tokens.typography.fontSizes.md, fontWeight: 700, color: tokens.colors.textPrimary }}
      >
        {row.label}
        {row.required ? <LockOutlinedIcon aria-hidden sx={{ fontSize: tokens.typography.fontSizes.md, color: tokens.colors.textSecondary }} /> : null}
      </Typography>
      {row.description ? (
        <Typography component="span" sx={{ display: 'block', mt: `${tokens.spacing.xxs}px`, fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary }}>
          {row.description}
        </Typography>
      ) : null}
      {row.required ? (
        <Typography component="span" sx={{ display: 'block', mt: `${tokens.spacing.xxs}px`, fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
          {requiredHint}
        </Typography>
      ) : null}
    </>
  )
}

/**
 * Notification settings as a category × channel grid: one switch per channel a category uses,
 * a lock on required categories, and channels that can't reach the person shown disabled.
 * One card per category on phones; a table with sticky channel headers from 600px.
 */
export function NotificationPreferencesGrid({
  categories,
  columns = DEFAULT_NOTIFICATION_COLUMNS,
  unavailable = [],
  onChange,
  pending = [],
  requiredHint = DEFAULT_REQUIRED_HINT,
  unavailableHint = DEFAULT_UNAVAILABLE_HINT,
  loading = false,
  sx,
}: NotificationPreferencesGridProps): React.ReactElement {
  const baseId = useId()

  if (loading) {
    return (
      <Box aria-busy="true" aria-label="Loading notification settings" sx={sx}>
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <Skeleton key={index} variant="rounded" height={64} sx={{ mb: `${tokens.spacing.md}px`, borderRadius: `${tokens.radius.lg}px` }} />
        ))}
      </Box>
    )
  }

  const used = new Set(categories.flatMap((row) => row.channels.map((entry) => entry.channel)))
  const shown = columns.filter((column) => used.has(column.channel))
  const off = new Set(unavailable)
  const saving = new Set(pending.map((cell) => key(cell.category, cell.channel)))

  const toggle = (row: NotificationPreferenceRow, column: { channel: NotificationChannel; label: string }) => {
    const entry = row.channels.find((candidate) => candidate.channel === column.channel)
    if (!entry) return null
    const busy = saving.has(key(row.id, column.channel))
    const name = `${row.label} by ${column.label}`
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
        {busy ? <CircularProgress size={16} aria-label={`Saving ${name}`} sx={{ color: tokens.colors.green }} /> : null}
        <MitumbaSwitch
          on={entry.enabled}
          ariaLabel={name}
          disabled={busy || off.has(column.channel)}
          onChange={(enabled) => onChange({ category: row.id, channel: column.channel, enabled })}
        />
      </Box>
    )
  }

  return (
    <Box sx={sx}>
      {/* Phones: one card per category. */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: `${tokens.spacing.base}px` }}>
        {categories.map((row, index) => {
          const headingId = `${baseId}-card-${index}`
          return (
            <Box
              key={row.id}
              component="section"
              aria-labelledby={headingId}
              sx={{ p: `${tokens.spacing.lg}px`, border: `1px solid ${tokens.colors.border}`, borderRadius: `${tokens.radius.lg}px`, backgroundColor: tokens.colors.surface }}
            >
              <RowText row={row} headingId={headingId} requiredHint={requiredHint} component="h3" />
              <Box sx={{ mt: `${tokens.spacing.base}px`, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
                {shown.filter((column) => row.channels.some((entry) => entry.channel === column.channel)).map((column) => (
                  <Box key={column.channel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${tokens.spacing.base}px`, minHeight: 44 }}>
                    <Box>
                      <Typography component="span" sx={{ display: 'block', fontSize: tokens.typography.fontSizes.base, color: off.has(column.channel) ? tokens.colors.textDisabled : tokens.colors.textPrimary }}>
                        {column.label}
                      </Typography>
                      {off.has(column.channel) ? (
                        <Typography component="span" sx={{ display: 'block', fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
                          {unavailableHint}
                        </Typography>
                      ) : null}
                    </Box>
                    {toggle(row, column)}
                  </Box>
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* From 600px: a table, channels as columns. */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, overflowX: 'auto', border: `1px solid ${tokens.colors.border}`, borderRadius: `${tokens.radius.lg}px`, backgroundColor: tokens.colors.surface }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" sx={{ position: 'sticky', top: 0, backgroundColor: tokens.colors.surface, zIndex: 1, textAlign: 'left', p: `${tokens.spacing.base}px ${tokens.spacing.lg}px`, borderBottom: `1px solid ${tokens.colors.divider}` }}>
                <Box component="span" sx={VISUALLY_HIDDEN}>Category</Box>
              </Box>
              {shown.map((column) => (
                <Box
                  key={column.channel}
                  component="th"
                  scope="col"
                  sx={{ position: 'sticky', top: 0, backgroundColor: tokens.colors.surface, zIndex: 1, p: `${tokens.spacing.base}px`, borderBottom: `1px solid ${tokens.colors.divider}`, textAlign: 'center', whiteSpace: 'nowrap', fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: off.has(column.channel) ? tokens.colors.textDisabled : tokens.colors.textPrimary }}
                >
                  {column.label}
                  {off.has(column.channel) ? (
                    <Box component="span" sx={{ display: 'block', fontWeight: 400, fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>{unavailableHint}</Box>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {categories.map((row) => (
              <Box key={row.id} component="tr" sx={{ '&:not(:last-of-type) > *': { borderBottom: `1px solid ${tokens.colors.divider}` } }}>
                <Box component="th" scope="row" sx={{ textAlign: 'left', fontWeight: 'inherit', p: `${tokens.spacing.base}px ${tokens.spacing.lg}px`, verticalAlign: 'top' }}>
                  <RowText row={row} requiredHint={requiredHint} component="span" />
                </Box>
                {shown.map((column) => (
                  <Box key={column.channel} component="td" sx={{ textAlign: 'center', p: `${tokens.spacing.base}px`, verticalAlign: 'middle' }}>
                    {toggle(row, column)}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NotificationPreferencesGrid
