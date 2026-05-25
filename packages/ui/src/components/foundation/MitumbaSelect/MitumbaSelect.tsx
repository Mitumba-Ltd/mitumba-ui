import React, { useMemo, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import ListSubheader from '@mui/material/ListSubheader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import CheckIcon from '@mui/icons-material/Check'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSelectProps } from './MitumbaSelect.types'

/**
 * Premium "Living" Select primitive with precision scaling and rich menu metadata.
 * Fulfills the 32/42/52 height standard and incorporates benchmark menu physics.
 */
export function MitumbaSelect({
  value,
  name,
  label,
  placeholder,
  options,
  onChange,
  size = 'medium',
  rounding = 'rounded',
  multiple = false,
  loading = false,
  error,
  disabled = false,
  showSearch = false,
  inverted = false,
  startIcon,
  displayValue,
  sx,
}: MitumbaSelectProps) {
  const [searchTerm, setSearchIcon] = useState('')
  const labelId = useMemo(() => `select-label-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).substr(2, 9)}`, [label])

  // Scale Mapping (Fulfilling Button standard)
  const sizeConfig = {
    small: { height: 32, fontSize: tokens.typography.fontSizes.sm, iconSize: 16 },
    medium: { height: 42, fontSize: tokens.typography.fontSizes.base, iconSize: 20 },
    large: { height: 52, fontSize: tokens.typography.fontSizes.md, iconSize: 24 },
  }

  const radiusMap = {
    pill: tokens.radius.full,
    rounded: tokens.radius.md,
    square: tokens.radius.xs,
  }

  const currentSize = sizeConfig[size]
  const borderRadius = radiusMap[rounding]
  
  // Fix: Dropdown list should have standard radius to prevent clipping items
  const menuBorderRadius = tokens.radius.md

  // Filter options if search is enabled
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchTerm) return options
    return options.filter((opt) => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      opt.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm, showSearch])

  return (
    <FormControl fullWidth error={!!error} disabled={disabled || loading}>
      {label && (
        <InputLabel
          id={labelId}
          shrink
          sx={{
            position: 'relative',
            transform: 'none',
            mb: 0.5,
            ml: rounding === 'pill' ? 2 : 1,
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: 700,
            color: error ? `${tokens.colors.error} !important` : `${tokens.colors.textSecondary} !important`,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {label}
        </InputLabel>
      )}

      <Select
        labelId={labelId}
        id={name}
        name={name}
        multiple={multiple}
        value={value}
        onChange={(e) => onChange(e.target.value as string | number | (string | number)[])}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        renderValue={(selected) => {
          if (displayValue) return displayValue
          if (selected === '' || (Array.isArray(selected) && selected.length === 0)) {
            return <Typography sx={{ color: tokens.colors.textDisabled, fontSize: 'inherit' }}>{placeholder || 'Select option'}</Typography>
          }
          
          if (multiple && Array.isArray(selected)) {
            return `Selected ${selected.length} items`
          }

          const selectedOpt = options.find((opt) => opt.value === selected)
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {selectedOpt?.icon}
              {selectedOpt?.label || selected}
            </Box>
          )
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              borderRadius: `${menuBorderRadius}px`,
              boxShadow: tokens.shadows.deep,
              border: `1px solid ${tokens.colors.divider}`,
              bgcolor: inverted ? tokens.colors.textPrimary : tokens.colors.surface,
              color: inverted ? tokens.colors.white : tokens.colors.textPrimary,
              overflow: 'hidden', // Ensure no overflow from subheaders
              '& .MuiMenuItem-root': {
                py: 1.5,
                px: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: inverted ? 'rgba(255,255,255,0.1)' : tokens.colors.background,
                },
                '&.Mui-selected': {
                  bgcolor: inverted ? 'rgba(255,255,255,0.15)' : `${tokens.colors.green}15`,
                  color: inverted ? tokens.colors.white : tokens.colors.green,
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: inverted ? 'rgba(255,255,255,0.2)' : `${tokens.colors.green}25`,
                  },
                },
              },
            },
          },
        }}
        sx={[
          {
            height: currentSize.height,
            borderRadius: `${borderRadius}px`,
            bgcolor: tokens.colors.surface,
            fontFamily: tokens.typography.fontFamily,
            fontSize: currentSize.fontSize,
            fontWeight: 600,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.colors.divider,
              borderWidth: '1px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.colors.textDisabled,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.colors.green,
              borderWidth: '2px',
            },
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              pl: startIcon ? 0 : 2,
            },
            '& .MuiSelect-icon': {
              color: tokens.colors.textSecondary,
              right: 12,
              transition: 'transform 0.3s ease',
            },
            '&.Mui-focused .MuiSelect-icon': {
              transform: 'rotate(180deg)',
              color: tokens.colors.green,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        startAdornment={startIcon && (
          <InputAdornment position="start" sx={{ ml: 1.5, color: tokens.colors.textSecondary }}>
            {React.cloneElement(startIcon as React.ReactElement, { sx: { fontSize: currentSize.iconSize } })}
          </InputAdornment>
        )}
      >
        {showSearch && (
          <Box sx={{ px: 2, py: 1, position: 'sticky', top: 0, bgcolor: 'inherit', zIndex: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchIcon(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: tokens.colors.textDisabled }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: `${menuBorderRadius / 2}px`, bgcolor: 'rgba(0,0,0,0.03)' }
              }}
            />
          </Box>
        )}

        {filteredOptions.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">No options found</Typography>
          </MenuItem>
        )}

        {(() => {
          let lastGroup = ''
          const elements: React.ReactNode[] = []

          filteredOptions.forEach((option) => {
            if (option.group && option.group !== lastGroup) {
              elements.push(
                <ListSubheader
                  key={`group-${option.group}`}
                  sx={{
                    bgcolor: 'transparent',
                    color: tokens.colors.textSecondary,
                    fontWeight: 800,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    lineHeight: '32px',
                    fontFamily: tokens.typography.fontFamily,
                  }}
                >
                  {option.group}
                </ListSubheader>
              )
              lastGroup = option.group
            }

            elements.push(
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                  {multiple && (
                    <Checkbox
                      checked={Array.isArray(value) && value.includes(option.value)}
                      size="small"
                      sx={{ p: 0 }}
                    />
                  )}

                  {option.icon && (
                    <Box sx={{ display: 'flex', color: tokens.colors.textSecondary }}>
                      {React.cloneElement(option.icon as React.ReactElement, { sx: { fontSize: 20 } })}
                    </Box>
                  )}

                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit' }}>
                      {option.label}
                    </Typography>
                    {option.subtitle && (
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                        {option.subtitle}
                      </Typography>
                    )}
                  </Box>

                  {!multiple && value === option.value && (
                    <CheckIcon sx={{ fontSize: 18, color: tokens.colors.green }} />
                  )}
                </Box>
              </MenuItem>
            )
          })

          return elements
        })()}
      </Select>
      {error && <FormHelperText sx={{ ml: 1, fontWeight: 600 }}>{error}</FormHelperText>}
    </FormControl>
  )
}

export default MitumbaSelect
