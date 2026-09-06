// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { StylePicker } from './StylePicker';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

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

  it('exposes a radiogroup with real radios', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" /></MitumbaThemeProvider>);
    expect(screen.getByRole('radiogroup', { name: 'Pick style' })).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(screen.getByRole('radio', { name: 'Option A' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Option B' })).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when option clicked', () => {
    const onChange = vi.fn();
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={onChange} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('selects the next option with ArrowRight', () => {
    const onChange = vi.fn();
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={onChange} /></MitumbaThemeProvider>);
    const first = screen.getByRole('radio', { name: 'Option A' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('wraps to the first option from the last with ArrowRight', () => {
    const onChange = vi.fn();
    render(<MitumbaThemeProvider><StylePicker options={options} value="c" onChange={onChange} /></MitumbaThemeProvider>);
    const last = screen.getByRole('radio', { name: 'Option C' });
    fireEvent.keyDown(last, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('selects with Space/Enter', () => {
    const onChange = vi.fn();
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={onChange} /></MitumbaThemeProvider>);
    const b = screen.getByRole('radio', { name: 'Option B' });
    fireEvent.keyDown(b, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('marks disabled options and skips them in keyboard traversal', () => {
    const onChange = vi.fn();
    const withDisabled = [
      options[0],
      { ...options[1], disabled: true },
      options[2],
    ];
    render(<MitumbaThemeProvider><StylePicker options={withDisabled} value="a" onChange={onChange} /></MitumbaThemeProvider>);
    const disabled = screen.getByRole('radio', { name: 'Option B' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    // Disabled options are not clickable
    fireEvent.click(disabled);
    expect(onChange).not.toHaveBeenCalled();
    // ArrowRight from A skips B and lands on C
    const a = screen.getByRole('radio', { name: 'Option A' });
    fireEvent.keyDown(a, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('shows checkmark on selected option', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="b" onChange={vi.fn()} /></MitumbaThemeProvider>);
    const optionB = screen.getByText('Option B').closest('div');
    expect(optionB?.parentElement?.querySelector('svg')).toBeInTheDocument();
  });

  it('omits titleLevel by default (non-heading title)', () => {
    render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" /></MitumbaThemeProvider>);
    expect(screen.getByText('Pick style').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      render(<MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" titleLevel={level} /></MitumbaThemeProvider>);
      expect(screen.getByText('Pick style').tagName).toBe(`H${level}`);
    }
  );

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" titleLevel={2} />
      </ThemeProvider>
    );
    expect(screen.getByText('Pick style').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider><StylePicker options={options} value="a" onChange={vi.fn()} title="Pick style" titleLevel={2} /></MitumbaThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
