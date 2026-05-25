import React from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSwitchProps } from './MitumbaSwitch.types'

/**
 * Premium "Living" Switch primitive with smooth handle physics.
 * Fulfills the "Selections" design benchmark with custom track and bounce animations.
 */
export function MitumbaSwitch({
  on,
  onChange,
  label,
  disabled = false,
  sx,
}: MitumbaSwitchProps) {
  const handleToggle = (newValue: boolean) => {
    if (disabled) return
    onChange?.(newValue)
  }

  const toggle = (
    <Switch
      checked={on}
      disabled={disabled}
      onChange={(e) => handleToggle(e.target.checked)}
      disableRipple
      sx={[
        {
          width: 44,
          height: 24,
          padding: 0,
          display: 'flex',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '& .MuiSwitch-switchBase': {
            padding: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(20px)',
              color: tokens.colors.white,
              '& + .MuiSwitch-track': {
                backgroundColor: tokens.colors.green,
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: tokens.colors.green,
              border: `6px solid ${tokens.colors.white}`,
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: tokens.colors.divider,
            },
          },
          
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 20,
            height: 20,
            boxShadow: tokens.shadows.card,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bounce effect
          },
          
          '& .MuiSwitch-track': {
            borderRadius: 24 / 2,
            backgroundColor: tokens.colors.divider,
            opacity: 1,
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          },

          '&:hover': {
            '& .MuiSwitch-track': {
              backgroundColor: tokens.colors.textDisabled,
            }
          },

          '&:active': {
            '& .MuiSwitch-thumb': {
              width: 24, // Handle stretch on active
            },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )

  if (!label) return toggle

  return (
    <FormControlLabel
      control={toggle}
      label={label}
      sx={{
        ml: 0,
        mr: 0,
        gap: tokens.spacing.sm,
        '& .MuiFormControlLabel-label': {
          fontSize: tokens.typography.fontSizes.base,
          fontWeight: 600,
          fontFamily: tokens.typography.fontFamily,
          color: disabled ? tokens.colors.textDisabled : tokens.colors.textPrimary,
          userSelect: 'none',
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed',
        }
      }}
    />
  )
}

export default MitumbaSwitch
