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
export function AddTwoFactorMethodModal({
  open,
  onClose,
  availableTypes,
  onSelectType,
}: AddTwoFactorMethodModalProps) {
  return (
    <MitumbaModal
      open={open}
      onClose={onClose}
      title="Add 2FA Method"
      subtitle="Choose how you want to verify your identity"
      maxWidth={480}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
        {(['totp', 'passkey', 'sms', 'email'] as TwoFactorMethodType[]).map((type) => {
          const config = METHOD_CONFIG[type]
          const available = availableTypes.includes(type)

          return (
            <Box
              key={type}
              onClick={available ? () => onSelectType(type) : undefined}
              role="button"
              tabIndex={available ? 0 : -1}
              onKeyDown={(e) => { if (available && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelectType(type) } }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: `${tokens.spacing.base}px`,
                p: `${tokens.spacing.lg}px`,
                borderRadius: `${tokens.radius.lg}px`,
                border: `1px solid ${tokens.colors.divider}`,
                bgcolor: tokens.colors.surface,
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
              <Box sx={{ color: available ? tokens.colors.green : tokens.colors.textDisabled, fontSize: 28, display: 'flex' }}>
                {config.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                  <Typography sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: tokens.typography.fontWeights.bold, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
                    {config.title}
                  </Typography>
                  {config.recommended && <MitumbaChip label="Recommended" status="success" size="small" variant="solid" rounding="pill" />}
                  {config.badge && !config.recommended && <MitumbaChip label={config.badge} status="special" size="small" variant="solid" rounding="pill" />}
                </Box>
                <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily, mt: '2px' }}>
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
