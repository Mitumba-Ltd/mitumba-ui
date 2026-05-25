import React, { useState, useMemo } from 'react'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { tokens } from '@mitumba/tokens'
import { MitumbaTextField } from '../../foundation/MitumbaTextField/MitumbaTextField'
import type { MitumbaDatePickerProps } from './MitumbaDatePicker.types'

/**
 * Premium "Living" DatePicker primitive with custom calendar atoms.
 * Fulfills the "Selections" design benchmark with Today/Selected/Hover states.
 */
export function MitumbaDatePicker({
  value,
  onChange,
  label,
  hint = 'Select date',
  disabled = false,
  size = 'medium',
  sx,
}: MitumbaDatePickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  // Calendar logic helpers (Fix: arrow-body-style)
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(newDate)
    handleClose()
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()
  }

  const isSelected = (day: number) => value && day === value.getDate() && currentMonth.getMonth() === value.getMonth() && currentMonth.getFullYear() === value.getFullYear()

  const formattedValue = useMemo(() => value ? value.toLocaleDateString('en-KE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '', [value])

  const emptyCells = useMemo(() => {
    const count = (firstDayOfMonth(currentMonth) + 6) % 7
    return Array.from({ length: count }, (_, i) => i)
  }, [currentMonth])

  const days = useMemo(() => {
    const count = daysInMonth(currentMonth)
    return Array.from({ length: count }, (_, i) => i + 1)
  }, [currentMonth])

  return (
    <Box sx={sx}>
      <Box onClick={handleOpen}>
        <MitumbaTextField
          label={label}
          hint={hint}
          value={formattedValue}
          onChange={() => {}} // Read-only for now
          readOnly
          disabled={disabled}
          size={size}
          suffix={<CalendarTodayIcon sx={{ cursor: 'pointer' }} />}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
            width: 320,
            borderRadius: `${tokens.radius.md}px`,
            boxShadow: tokens.shadows.deep,
            border: `1px solid ${tokens.colors.divider}`,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton size="small" onClick={handlePrevMonth}><ChevronLeftIcon /></IconButton>
          <Typography sx={{ fontWeight: 800, fontSize: 14, fontFamily: tokens.typography.fontFamily }}>
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Typography>
          <IconButton size="small" onClick={handleNextMonth}><ChevronRightIcon /></IconButton>
        </Box>

        {/* Days Header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1, textAlign: 'center' }}>
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
            <Typography key={d} variant="caption" sx={{ color: tokens.colors.textDisabled, fontWeight: 700, fontSize: 10 }}>
              {d}
            </Typography>
          ))}
        </Box>

        {/* Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {emptyCells.map((i) => (
            <Box key={`calendar-empty-${i}`} />
          ))}
          {days.map((day) => {
            const today = isToday(day)
            const selected = isSelected(day)

            return (
              <Box
                key={`calendar-day-${day}`}
                onClick={() => handleDateClick(day)}
                sx={{
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: tokens.radius.full,
                  fontSize: 12,
                  fontFamily: tokens.typography.fontFamily,
                  fontWeight: today || selected ? 800 : 500,
                  transition: 'all 0.2s ease',
                  
                  // Benchmark Atom States
                  ...(today && !selected && {
                    color: tokens.colors.green,
                    bgcolor: `${tokens.colors.green}10`,
                  }),
                  ...(selected && {
                    color: tokens.colors.white,
                    bgcolor: tokens.colors.green,
                    boxShadow: tokens.shadows.card,
                  }),
                  
                  '&:hover': {
                    bgcolor: selected ? tokens.colors.greenDark : tokens.colors.background,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {day}
              </Box>
            )
          })}
        </Box>
      </Popover>
    </Box>
  )
}

export default MitumbaDatePicker
