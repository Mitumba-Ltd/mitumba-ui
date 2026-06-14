// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { StylePicker } from './StylePicker';

afterEach(() => { cleanup(); });

const options = [
  { id: 'a', label: 'Option A', description: 'First option', preview: <div>Preview A</div> },
  { id: 'b', label: 'Option B', preview: <div>Preview B</div> },
  { id: 'c', label: 'Option C', description: 'Third', preview: <div>Preview C</div> },
];

describe('StylePicker', () => {
  it('renders all options', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" subtitle="Choose one" /></MitumbaThemeProvider>);
    expect(screen.getByText('Pick style')).toBeInTheDocument();
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('calls onChange when option clicked', () => {
    const onChange = vi.fn();
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={onChange} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('shows checkmark on selected option', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="b" onChange={vi.fn()} /></MitumbaThemeProvider>);
    // CheckCircleIcon renders as svg with testid
    const optionB = screen.getByText('Option B').closest('div');
    expect(optionB?.parentElement?.querySelector('svg')).toBeInTheDocument();
  });
});
