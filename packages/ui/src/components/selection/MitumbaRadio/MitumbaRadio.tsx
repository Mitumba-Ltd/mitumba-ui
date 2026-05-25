import React from 'react'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import { tokens } from '@mitumba/tokens'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import type { MitumbaRadioProps } from './MitumbaRadio.types'

/**
 * Premium "Living" Radio primitive with concentric spring physics.
 * Fulfills the "Selections" design benchmark with custom icons and interaction scaling.
 */
export function MitumbaRadio({
  selected,
  value,
  label,
  onChange,
  disabled = false,
  sx,
}: MitumbaRadioProps) {
  const handleToggle = (newValue: string | number) => {
    if (disabled) return
    onChange?.(newValue)
  }

  const radio = (
    <Radio
      checked={selected}
      value={value}
      disabled={disabled}
      onChange={(e) => handleToggle(e.target.value)}
      icon={<RadioButtonUncheckedIcon sx={{ fontSize: 24 }} />}
      checkedIcon={<RadioButtonCheckedIcon sx={{ fontSize: 24 }} />}
      disableRipple
      sx={[
        {
          color: tokens.colors.divider,
          padding: tokens.spacing.xs / 4,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring transition
          
          '&:hover': {
            bgcolor: 'transparent',
            color: tokens.colors.textDisabled,
            transform: 'scale(1.1)',
          },
          
          '&.Mui-checked': {
            color: tokens.colors.green,
            '&:hover': {
              color: tokens.colors.greenDark,
            },
            // Concentric expansion simulation
            '& svg': {
              animation: 'radio-expand 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
          },
          
          '@keyframes radio-expand': {
            '0%': { transform: 'scale(0.5)' },
            '100%': { transform: 'scale(1)' },
          },

          '&.Mui-disabled': {
            color: tokens.colors.divider,
            opacity: 0.5,
          },

          '&:active': {
            transform: 'scale(0.9)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )

  if (!label) return radio

  return (
    <FormControlLabel
      control={radio}
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

export default MitumbaRadio
