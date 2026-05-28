import React, { useState, useEffect } from 'react'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import { tokens } from '@mitumba/tokens'
import { MitumbaBanner } from '../MitumbaBanner'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { OfflineBannerProps } from './OfflineBanner.types'

/**
 * Premium Offline Status Banner.
 * Inherits the high-fidelity 'Passive Alert' architecture.
 * Automatically detects and responds to connection changes.
 */
export function OfflineBanner({ onRetry, sx }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true,
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <MitumbaBanner
      severity="warning"
      title="You are currently offline"
      icon={<WifiOffIcon />}
      action={
        <MitumbaPrimaryButton
          label="Retry"
          size="small"
          onClick={onRetry}
          variant="secondary"
          sx={{ height: 28, fontSize: 11, borderRadius: tokens.radius.full }}
        />
      }
      sx={sx}
    >
      Please check your internet connection to continue browsing the marketplace.
    </MitumbaBanner>
  )
}

export default OfflineBanner
