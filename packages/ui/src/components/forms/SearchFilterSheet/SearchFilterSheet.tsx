/* eslint-disable react/jsx-no-bind, prefer-arrow-callback */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { colors, spacing, typography, radius } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { HeadingLevel } from '../../../types/semantic';
import type { SearchFilterSheetProps, FilterState } from './SearchFilterSheet.types';

const CATEGORIES = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Bags', 'Accessories', 'Kids'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];
const CITIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Nakuru', 'Kisii', 'All'];
const SORT_OPTIONS = [
  { value: 'relevant', label: 'Relevant' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
] as const;

function SectionHeader({
  children,
  id,
  titleLevel,
}: {
  children: React.ReactNode;
  id?: string;
  titleLevel?: HeadingLevel;
}): React.ReactElement {
  return (
    <SemanticTitle
      titleLevel={titleLevel}
      id={id}
      sx={{
        fontWeight: 700,
        color: colors.textPrimary,
        fontSize: typography.fontSizes.base,
        mb: `${String(spacing.md)}px`,
      }}
    >
      {children}
    </SemanticTitle>
  );
}

function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}): React.ReactElement {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${String(spacing.sm)}px` }}>
      {options.map(function renderChip(option) {
        const isSelected = selected.includes(option);
        return (
          <Chip
            key={option}
            label={option}
            variant={isSelected ? 'filled' : 'outlined'}
            color={isSelected ? 'primary' : 'default'}
            onClick={() => onToggle(option)}
          />
        );
      })}
    </Box>
  );
}

export function SearchFilterSheet({
  filters,
  onFiltersChange,
  onApply,
  onClear,
  onClose,
  open,
  resultCount,
  showVaziFilter = true,
  title,
  titleLevel,
  sectionTitleLevel,
}: SearchFilterSheetProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const baseId = React.useId();
  const regionLabel = title ?? 'Search filters';
  const sortId = `${baseId}-sort`;
  const categoriesId = `${baseId}-categories`;
  const conditionId = `${baseId}-condition`;
  const priceId = `${baseId}-price`;
  const locationId = `${baseId}-location`;

  function handleChipToggle(key: 'categories' | 'conditions', value: string) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  }

  function handleCitySelect(city: string) {
    onFiltersChange({ ...filters, city: city === 'All' ? null : city });
  }

  function handlePriceChange(_: Event, value: number | number[]) {
    onFiltersChange({ ...filters, priceRange: value as [number, number] });
  }

  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    onFiltersChange({ ...filters, sort: e.target.value as FilterState['sort'] });
  }

  function handleVaziToggle(e: React.ChangeEvent<HTMLInputElement>) {
    onFiltersChange({ ...filters, vaziOnly: e.target.checked });
  }

  const priceValue: [number, number] = filters.priceRange ?? [0, 20000];

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${String(spacing.xl)}px` }}>
      {title && (
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{
            fontWeight: 800,
            color: colors.textPrimary,
            fontSize: typography.fontSizes.lg,
          }}
        >
          {title}
        </SemanticTitle>
      )}

      {/* Sort By */}
      <Box role="group" aria-labelledby={sortId}>
        <SectionHeader id={sortId} titleLevel={sectionTitleLevel}>Sort By</SectionHeader>
        <RadioGroup value={filters.sort} onChange={handleSortChange}>
          {SORT_OPTIONS.map(function renderRadio(opt) {
            return <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />;
          })}
        </RadioGroup>
      </Box>

      {/* Categories */}
      <Box role="group" aria-labelledby={categoriesId}>
        <SectionHeader id={categoriesId} titleLevel={sectionTitleLevel}>Categories</SectionHeader>
        <ChipGroup
          options={CATEGORIES}
          selected={filters.categories}
          onToggle={(v) => handleChipToggle('categories', v)}
        />
      </Box>

      {/* Condition */}
      <Box role="group" aria-labelledby={conditionId}>
        <SectionHeader id={conditionId} titleLevel={sectionTitleLevel}>Condition</SectionHeader>
        <ChipGroup
          options={CONDITIONS}
          selected={filters.conditions}
          onToggle={(v) => handleChipToggle('conditions', v)}
        />
      </Box>

      {/* Price Range */}
      <Box role="group" aria-labelledby={priceId}>
        <SectionHeader id={priceId} titleLevel={sectionTitleLevel}>Price Range</SectionHeader>
        <Slider
          value={priceValue}
          onChange={handlePriceChange}
          min={0}
          max={20000}
          step={100}
          valueLabelDisplay="auto"
          getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
          sx={{ color: colors.green }}
        />
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          KES {priceValue[0].toLocaleString()} – KES {priceValue[1].toLocaleString()}
        </Typography>
      </Box>

      {/* Location */}
      <Box role="group" aria-labelledby={locationId}>
        <SectionHeader id={locationId} titleLevel={sectionTitleLevel}>Location</SectionHeader>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${String(spacing.sm)}px` }}>
          {CITIES.map(function renderCity(city) {
            const isSelected = city === 'All' ? filters.city === null : filters.city === city;
            return (
              <Chip
                key={city}
                label={city}
                variant={isSelected ? 'filled' : 'outlined'}
                color={isSelected ? 'primary' : 'default'}
                onClick={() => handleCitySelect(city)}
              />
            );
          })}
        </Box>
      </Box>

      {/* VAZI Eligible Only */}
      {showVaziFilter && (
        <Box>
          <FormControlLabel
            control={<Switch checked={filters.vaziOnly ?? false} onChange={handleVaziToggle} />}
            label="VAZI Eligible Only"
          />
        </Box>
      )}
    </Box>
  );

  if (isDesktop) {
    return (
      <Box component="section" role="region" aria-label={regionLabel} sx={{ p: `${String(spacing.xl)}px` }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: `${String(spacing.lg)}px` }}>
          <Button onClick={onClear} variant="text">Clear All</Button>
        </Box>
        {content}
        <Button
          variant="contained"
          fullWidth
          onClick={onApply}
          sx={{ mt: `${String(spacing.xl)}px` }}
        >
          Apply Filters
        </Button>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        'aria-label': regionLabel,
        sx: {
          maxHeight: '85vh',
          borderTopLeftRadius: `${String(radius.xxl)}px`,
          borderTopRightRadius: `${String(radius.xxl)}px`,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Drag handle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: `${String(spacing.md)}px`, pb: `${String(spacing.sm)}px` }}>
        <Box sx={{ width: 36, height: 4, borderRadius: radius.full, backgroundColor: colors.border }} />
      </Box>

      {/* Scrollable content */}
      <Box
        component="section"
        role="region"
        aria-label={regionLabel}
        sx={{ flex: 1, overflow: 'auto', px: `${String(spacing.lg)}px`, py: `${String(spacing.md)}px` }}
      >
        {content}
      </Box>

      {/* Sticky footer */}
      <Box
        sx={{
          display: 'flex',
          gap: `${String(spacing.md)}px`,
          p: `${String(spacing.lg)}px`,
          borderTop: `1px solid ${colors.divider}`,
        }}
      >
        <Button onClick={onClear} variant="text" sx={{ flex: 1 }}>Clear All</Button>
        <Button onClick={onApply} variant="contained" sx={{ flex: 2 }}>
          {resultCount !== undefined ? `Show ${String(resultCount)} Results` : 'Show Results'}
        </Button>
      </Box>
    </Drawer>
  );
}
