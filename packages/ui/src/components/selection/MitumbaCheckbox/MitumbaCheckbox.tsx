import React, { useEffect, useRef } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { tokens } from '@mitumba/tokens'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import type { MitumbaCheckboxProps } from './MitumbaCheckbox.types'

/**
 * Premium "Living" Checkbox primitive with tactile interaction and precision geometry.
 * Fulfills the "Selections" design benchmark with custom icons and spring physics.
 */
export function MitumbaCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  sx,
}: MitumbaCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleToggle = (newValue: boolean) => {
    if (disabled) return
    onChange?.(newValue)
  }

  const checkbox = (
    <Checkbox
      inputRef={inputRef}
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      onChange={(e) => handleToggle(e.target.checked)}
      icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 24 }} />}
      checkedIcon={<CheckBoxIcon sx={{ fontSize: 24 }} />}
      indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ fontSize: 24 }} />}
      disableRipple
      sx={[
        {
          color: tokens.colors.divider,
          padding: tokens.spacing.xs / 4,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&:hover': {
            bgcolor: 'transparent',
            color: tokens.colors.textDisabled,
            transform: 'scale(1.1)',
          },
          
          '&.Mui-checked, &.MuiCheckbox-indeterminate': {
            color: tokens.colors.green,
            '&:hover': {
              color: tokens.colors.greenDark,
            },
          },
          
          '&.Mui-disabled': {
            color: tokens.colors.divider,
            opacity: 0.5,
          },

          '&:active': {
            transform: 'scale(0.9)',
          },

          '& svg': {
            borderRadius: tokens.radius.xs,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )

  if (!label) return checkbox

  return (
    <FormControlLabel
      control={checkbox}
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

export default MitumbaCheckbox
