import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchFilterSheet } from './SearchFilterSheet';
import type { FilterState } from './SearchFilterSheet.types';

const meta: Meta<typeof SearchFilterSheet> = {
  title: 'Forms/SearchFilterSheet',
  component: SearchFilterSheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchFilterSheet>;

const defaultFilters: FilterState = {
  categories: [],
  conditions: [],
  priceRange: null,
  city: null,
  sort: 'relevant',
  vaziOnly: false,
};

export const Default: Story = {
  args: {
    open: true,
    filters: defaultFilters,
    onFiltersChange: () => {},
    onApply: () => {},
    onClear: () => {},
    onClose: () => {},
    resultCount: 128,
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
};

export const WithFiltersApplied: Story = {
  args: {
    ...Default.args,
    filters: {
      categories: ['Tops', 'Dresses'],
      conditions: ['New'],
      priceRange: [500, 8000],
      city: 'Nairobi',
      sort: 'price_asc',
      vaziOnly: true,
    },
    resultCount: 23,
  },
};

export const Desktop: Story = {
  args: { ...Default.args },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    chromatic: { viewports: [1280] },
  },
};
