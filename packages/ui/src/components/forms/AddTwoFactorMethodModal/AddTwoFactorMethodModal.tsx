import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import SmsIcon from '@mui/icons-material/Sms'
import EmailIcon from '@mui/icons-material/Email'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { tokens } from '@mitumba/tokens'
import { MitumbaModal } from '../../feedback/MitumbaModal'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { AddTwoFactorMethodModalProps } from './AddTwoFactorMethodModal.types'
import type { TwoFactorMethodType } from '../TwoFactorMethodList/TwoFactorMethodList.types'

const METHOD_CONFIG: Record<TwoFactorMethodType, { icon: React.ReactNode; title: string; description: string; recommended?: boolean; badge?: string }> = {
  totp: { icon: <QrCode2Icon />, title: 'Authenticator App', description: 'Use Google Authenticator, Authy, 1Password, or similar', recommended: true },
  passkey: { icon: <FingerprintIcon />, title: 'Passkey', description: 'Face ID, Touch ID, or a security key', badge: 'Strongest' },
  sms: { icon: <SmsIcon />, title: 'SMS', description: 'Get a code by text message' },
  email: { icon: <EmailIcon />, title: 'Email', description: 'Get a code by email' },
}

/**
 * AddTwoFactorMethodModal — type selection step for adding a new 2FA method.
 */
const METHOD_ORDER: TwoFactorMethodType[] = ['totp', 'passkey', 'sms', 'email']

/**
 * AddTwoFactorMethodModal — type selection step for adding a new 2FA method.
 * Renders the choices as a real ARIA radiogroup with selected/disabled state
 * and keyboard selection (arrows + Space/Enter); activating a choice runs the
 * app's type-specific flow. Focus containment, Escape, and focus restoration
 * come from MitumbaModal.
 */
export function AddTwoFactorMethodModal({
  open,
  onClose,
  availableTypes,
  onSelectType,
  titleLevel,
}: AddTwoFactorMethodModalProps) {
  const [selected, setSelected] = React.useState<TwoFactorMethodType | null>(null)
  const groupLabelId = React.useId()
  const selectableTypes = METHOD_ORDER.filter((t) => availableTypes.includes(t))

  const choose = (type: TwoFactorMethodType) => {
    setSelected(type)
    onSelectType(type)
  }

  const move = (current: TwoFactorMethodType, direction: 1 | -1) => {
    if (selectableTypes.length === 0) return
    const idx = selectableTypes.indexOf(current)
    const from = idx === -1 ? 0 : idx
    const next = (from + direction + selectableTypes.length) % selectableTypes.length
    setSelected(selectableTypes[next])
  }

  return (
    <MitumbaModal
      open={open}
      onClose={onClose}
      title="Add 2FA Method"
      subtitle="Choose how you want to verify your identity"
      titleLevel={titleLevel}
      maxWidth={480}
    >
      <Typography
        id={groupLabelId}
        sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}
      >
        Choose a two-factor method
      </Typography>
      <Box role="radiogroup" aria-labelledby={groupLabelId} sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
        {METHOD_ORDER.map((type) => {
          const config = METHOD_CONFIG[type]
          const available = availableTypes.includes(type)
          const isSelected = selected === type
          const isTabbable = available && (isSelected || (!selected && type === selectableTypes[0]))

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              e.preventDefault()
              move(type, 1)
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              e.preventDefault()
              move(type, -1)
            } else if (available && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              choose(type)
            }
          }

          return (
            <Box
              key={type}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={available ? undefined : true}
              aria-label={config.title}
              tabIndex={isTabbable ? 0 : -1}
              onClick={available ? () => choose(type) : undefined}
              onKeyDown={handleKeyDown}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: `${tokens.spacing.base}px`,
                p: `${tokens.spacing.lg}px`,
                borderRadius: `${tokens.radius.lg}px`,
                border: `1px solid ${isSelected ? tokens.colors.green : tokens.colors.divider}`,
                bgcolor: isSelected ? tokens.colors.greenLight : tokens.colors.surface,
                cursor: available ? 'pointer' : 'not-allowed',
                opacity: available ? 1 : 0.5,
                transition: tokens.motion.transitions.interaction,
                '&:hover': available ? {
                  borderColor: tokens.colors.green,
                  transform: 'translateY(-1px)',
                  boxShadow: tokens.shadows.card,
                } : {},
              }}
            >
              <Box aria-hidden sx={{ color: available ? tokens.colors.green : tokens.colors.textDisabled, fontSize: 28, display: 'flex' }}>
                {config.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                  <Typography sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: tokens.typography.fontWeights.bold, color: tokens.colors.textPrimary }}>
                    {config.title}
                  </Typography>
                  {config.recommended && <MitumbaChip label="Recommended" status="success" size="small" variant="solid" rounding="pill" />}
                  {config.badge && !config.recommended && <MitumbaChip label={config.badge} status="special" size="small" variant="solid" rounding="pill" />}
                </Box>
                <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary, mt: '2px' }}>
                  {config.description}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </MitumbaModal>
  )
}

export default AddTwoFactorMethodModal
