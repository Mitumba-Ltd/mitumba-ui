import { useId } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSelectProps } from './MitumbaSelect.types'

export function MitumbaSelect({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
}: MitumbaSelectProps) {
  const labelId = useId()

  return (
    <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
      <InputLabel
        id={labelId}
        sx={{
          color: tokens.colors.textSecondary,
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSizes.base,
          '&.Mui-focused': {
            color: tokens.colors.green,
          },
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        label={label}
        labelId={labelId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          transition: 'all 200ms ease',
          fontFamily: tokens.typography.fontFamily,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
            borderWidth: '1px',
            transition: 'all 200ms ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.textDisabled,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: '2px',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '& .MuiSelect-select': {
            paddingInline: tokens.spacing.base,
            paddingBlock: '12px',
            fontSize: tokens.typography.fontSizes.base,
            color: tokens.colors.textPrimary,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSizes.base,
              '&:hover': {
                backgroundColor: tokens.colors.greenLight,
              },
              '&.Mui-selected': {
                backgroundColor: tokens.colors.greenLight,
                color: tokens.colors.green,
                fontWeight: tokens.typography.fontWeights.semibold,
                '&:hover': {
                  backgroundColor: tokens.colors.greenLight,
                },
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Box
          component="p"
          sx={{
            color: tokens.colors.error,
            fontSize: tokens.typography.fontSizes.sm,
            fontFamily: tokens.typography.fontFamily,
            marginTop: tokens.spacing.xs,
            marginInline: 0,
          }}
        >
          {error}
        </Box>
      )}
    </FormControl>
  )
}

export default MitumbaSelect
