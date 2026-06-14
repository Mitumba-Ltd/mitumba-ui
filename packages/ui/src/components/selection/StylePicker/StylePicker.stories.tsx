import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { StylePicker } from './StylePicker';
import { MobileBottomNav } from '../../navigation/MobileBottomNav/MobileBottomNav';

const meta: Meta<typeof StylePicker> = {
  title: 'Selection/StylePicker',
  component: StylePicker,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StylePicker>;

const NAV_OPTIONS = [
  { id: 'indicator', label: 'Indicator', description: 'Line below active icon', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="indicator" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
  { id: 'm3', label: 'Material 3', description: 'Pill behind active icon', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="m3" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
  { id: 'expansive', label: 'Expansive', description: 'Filled active tab', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="expansive" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
  { id: 'bubble', label: 'Bubble', description: 'Circle + chip label', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="bubble" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
  { id: 'pill', label: 'Pill', description: 'Rounded background', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="pill" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
  { id: 'pill-horizontal', label: 'Pill Horizontal', description: 'Inline icon + label', preview: <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="pill-horizontal" sx={{ position: 'relative', boxShadow: 'none', borderTop: 'none', height: 56 }} /> },
];

function InteractivePicker() {
  const [selected, setSelected] = useState('indicator');
  return (
    <Box sx={{ maxWidth: 500 }}>
      <StylePicker
        title="Navigation Bar Style"
        subtitle="Choose how the bottom navigation looks on mobile"
        options={NAV_OPTIONS}
        value={selected}
        onChange={setSelected}
        columns={2}
      />
    </Box>
  );
}

export const NavBarStyles: Story = {
  render: () => <InteractivePicker />,
};

export const ThreeColumns: Story = {
  render: () => {
    const [val, setVal] = useState('indicator');
    return (
      <Box sx={{ maxWidth: 700 }}>
        <StylePicker options={NAV_OPTIONS} value={val} onChange={setVal} columns={3} title="Pick your style" />
      </Box>
    );
  },
};

export const SingleColumn: Story = {
  render: () => {
    const [val, setVal] = useState('m3');
    return (
      <Box sx={{ maxWidth: 320 }}>
        <StylePicker options={NAV_OPTIONS.slice(0, 3)} value={val} onChange={setVal} columns={1} title="Navigation" subtitle="Select a variant" />
      </Box>
    );
  },
};
