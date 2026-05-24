import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff'
import { tokens } from '@mitumba/tokens'

/**
 * Banner that displays when the user goes offline.
 * Detects navigator.onLine internally and shows/hides automatically.
 */
export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isOnline) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: tokens.colors.warning,
        color: tokens.colors.white,
        paddingInline: tokens.spacing.base,
        paddingBlock: tokens.spacing.sm,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.sm,
        boxShadow: tokens.shadows.elevated,
      }}
    >
      <SignalWifiOffIcon sx={{ fontSize: 20 }} />
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.base,
          fontWeight: tokens.typography.fontWeights.semibold,
          color: tokens.colors.white,
        }}
      >
        No connection — showing cached content
      </Typography>
    </Box>
  )
}

export default OfflineBanner
