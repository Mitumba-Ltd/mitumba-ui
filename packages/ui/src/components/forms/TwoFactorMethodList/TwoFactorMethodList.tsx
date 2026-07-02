import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import SmsIcon from '@mui/icons-material/Sms'
import EmailIcon from '@mui/icons-material/Email'
import StarIcon from '@mui/icons-material/Star'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { TwoFactorMethodListProps, TwoFactorMethodView, TwoFactorMethodType } from './TwoFactorMethodList.types'

const TYPE_ICONS: Record<TwoFactorMethodType, React.ReactNode> = {
  totp: <QrCode2Icon />,
  sms: <SmsIcon />,
  email: <EmailIcon />,
}

const TYPE_LABELS: Record<TwoFactorMethodType, string> = {
  totp: 'Authenticator App',
  sms: 'SMS',
  email: 'Email',
}

/**
 * TwoFactorMethodList — displays and manages 2FA methods.
 */
export function TwoFactorMethodList({
  methods,
  loading = false,
  onAdd,
  onEnable,
  onDisable,
  onDelete,
  onSetPrimary,
  onVerifyPending,
}: TwoFactorMethodListProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [menuMethodId, setMenuMethodId] = useState<string | null>(null)

  const openMenu = (e: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(e.currentTarget)
    setMenuMethodId(id)
  }

  const closeMenu = () => {
    setMenuAnchor(null)
    setMenuMethodId(null)
  }

  const activeMethod = methods.find((m) => m.id === menuMethodId)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px` }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={`skel-${String(i)}`} variant="rectangular" height={64} sx={{ borderRadius: `${tokens.radius.lg}px` }} />
        ))}
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: `${tokens.spacing.lg}px` }}>
        <Typography sx={{ fontSize: tokens.typography.fontSizes.md, fontWeight: tokens.typography.fontWeights.bold, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
          Two-Factor Methods
        </Typography>
        <MitumbaPrimaryButton label="Add method" size="small" icon={<AddIcon sx={{ fontSize: 16 }} />} onClick={onAdd} />
      </Box>

      {/* Empty state */}
      {methods.length === 0 && (
        <Box sx={{ textAlign: 'center', py: `${tokens.spacing.xxl}px`, px: `${tokens.spacing.lg}px`, bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.lg}px` }}>
          <Typography sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm, fontFamily: tokens.typography.fontFamily }}>
            No 2FA methods yet. Add one to protect your account.
          </Typography>
        </Box>
      )}

      {/* Method rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px` }}>
        {methods.map((method) => (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <MethodRow key={method.id} method={method} onMenuOpen={openMenu} onVerifyPending={onVerifyPending} />
        ))}
      </Box>

      {/* Overflow menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        {activeMethod && !activeMethod.isPrimary && activeMethod.enabled && (
          <MenuItem onClick={() => { onSetPrimary(activeMethod.id); closeMenu() }}>
            <ListItemIcon><StarIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Set as primary</ListItemText>
          </MenuItem>
        )}
        {activeMethod && activeMethod.enabled && (
          <MenuItem onClick={() => { onDisable(activeMethod.id); closeMenu() }}>
            <ListItemIcon><ToggleOffIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Disable</ListItemText>
          </MenuItem>
        )}
        {activeMethod && !activeMethod.enabled && (
          <MenuItem onClick={() => { onEnable(activeMethod.id); closeMenu() }}>
            <ListItemIcon><ToggleOnIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Enable</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => { if (activeMethod) onDelete(activeMethod.id); closeMenu() }} sx={{ color: tokens.colors.error }}>
          <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: tokens.colors.error }} /></ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

function MethodRow({ method, onMenuOpen, onVerifyPending }: { method: TwoFactorMethodView; onMenuOpen: (e: React.MouseEvent<HTMLElement>, id: string) => void; onVerifyPending?: (id: string) => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.base}px`,
        p: `${tokens.spacing.base}px`,
        borderRadius: `${tokens.radius.lg}px`,
        border: `1px solid ${tokens.colors.divider}`,
        bgcolor: tokens.colors.surface,
      }}
    >
      {/* Icon */}
      <Box sx={{ color: method.enabled ? tokens.colors.green : tokens.colors.textDisabled, fontSize: 24, display: 'flex' }}>
        {TYPE_ICONS[method.type]}
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: tokens.typography.fontWeights.bold, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
          {method.label || TYPE_LABELS[method.type]}
        </Typography>
        {method.lastUsedAt && (
          <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
            Last used {method.lastUsedAt}
          </Typography>
        )}
      </Box>

      {/* Status chips */}
      {method.isPrimary && <MitumbaChip label="Primary" status="active" size="small" variant="solid" rounding="pill" />}
      {method.pending && (
        <MitumbaChip label="Pending" status="incomplete" size="small" variant="solid" rounding="pill" onClick={onVerifyPending ? () => onVerifyPending(method.id) : undefined} />
      )}
      {!method.enabled && !method.pending && <MitumbaChip label="Off" status="common" size="small" variant="solid" rounding="pill" />}

      {/* Menu trigger */}
      <IconButton aria-label={`Options for ${method.label || TYPE_LABELS[method.type]}`} onClick={(e) => onMenuOpen(e, method.id)} size="small">
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}

export default TwoFactorMethodList
