import { useState, useCallback, KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSearchBarProps } from './MitumbaSearchBar.types'

/**
 * Search bar with optional suggestions dropdown.
 */
export function MitumbaSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  suggestions,
  onSuggestionClick,
}: MitumbaSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit(value)
      }
    },
    [value, onSubmit]
  )

  const handleClear = useCallback(() => {
    onChange('')
  }, [onChange])

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: isFocused ? tokens.colors.green : tokens.colors.border,
          borderWidth: isFocused ? '2px' : '1px',
          borderRadius: tokens.radius.lg,
          backgroundColor: tokens.colors.surface,
          paddingInline: tokens.spacing.base,
          paddingBlock: isFocused ? '11px' : '12px',
          gap: tokens.spacing.sm,
          transition: 'all 200ms ease',
          boxShadow: isFocused ? tokens.shadows.focus : 'none',
          '&:hover': {
            borderColor: isFocused ? tokens.colors.green : tokens.colors.textDisabled,
          },
        }}
      >
        <SearchIcon sx={{ color: tokens.colors.textSecondary, fontSize: 20 }} />
        <Box
          component="input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          aria-label="Search"
          sx={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: tokens.typography.fontSizes.base,
            fontFamily: tokens.typography.fontFamily,
            color: tokens.colors.textPrimary,
            width: '100%',
            height: '24px',
            '&::placeholder': {
              color: tokens.colors.textDisabled,
              opacity: 1,
            },
          }}
        />
        {value && (
          <Box
            component="button"
            onClick={handleClear}
            aria-label="Clear search"
            sx={{
              cursor: 'pointer',
              color: tokens.colors.textDisabled,
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              transition: 'all 200ms ease',
              '&:hover': {
                color: tokens.colors.error,
              },
              '&:focus-visible': {
                outline: `2px solid ${tokens.colors.greenLight}`,
                borderRadius: tokens.radius.xs,
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </Box>
        )}
      </Box>
      {isFocused && suggestions && suggestions.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: tokens.spacing.xs,
            backgroundColor: tokens.colors.surface,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens.radius.md,
            boxShadow: tokens.shadows.elevated,
            zIndex: 10,
            overflow: 'hidden',
            animation: 'fadeIn 200ms ease',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {suggestions.map((suggestion) => (
            <Box
              key={suggestion}
              onClick={() => {
                onSuggestionClick?.(suggestion)
                setIsFocused(false)
              }}
              sx={{
                paddingInline: tokens.spacing.base,
                paddingBlock: tokens.spacing.sm,
                cursor: 'pointer',
                transition: 'background-color 200ms ease',
                '&:hover': {
                  backgroundColor: tokens.colors.background,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: tokens.typography.fontSizes.base,
                  fontFamily: tokens.typography.fontFamily,
                  color: tokens.colors.textPrimary,
                }}
              >
                {suggestion}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default MitumbaSearchBar
