import { useId } from 'react'
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
      <InputLabel id={labelId} sx={{ color: tokens.colors.textSecondary }}>
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
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: `${tokens.spacing.xs}px`,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '& .MuiSelect-select': {
            paddingInline: tokens.spacing.base,
            paddingBlock: tokens.spacing.md,
          },
          ...(Boolean(error) && {
            '& .MuiInputLabel-root': {
              color: tokens.colors.error,
            },
          }),
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              '&:hover': {
                backgroundColor: tokens.colors.greenLight,
              },
              '&.Mui-selected': {
                backgroundColor: tokens.colors.greenLight,
                color: tokens.colors.green,
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <p
          style={{
            color: tokens.colors.error,
            fontSize: tokens.typography.fontSizes.sm,
            marginInlineStart: tokens.spacing.sm,
            marginTop: tokens.spacing.sm,
          }}
        >
          {error}
        </p>
      )}
    </FormControl>
  )
}

export default MitumbaSelect
