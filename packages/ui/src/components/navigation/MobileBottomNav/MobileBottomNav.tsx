/* eslint-disable react/jsx-no-bind, @typescript-eslint/no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { tokens } from '@mitumba/tokens';
import type { MobileBottomNavProps, MobileBottomNavItem } from './MobileBottomNav.types';

const DEFAULT_ITEMS: MobileBottomNavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'vazi', label: 'VAZI', icon: <AutoAwesomeOutlinedIcon />, activeIcon: <AutoAwesomeIcon /> },
  { id: 'orders', label: 'Orders', icon: <LocalMallOutlinedIcon />, activeIcon: <LocalMallIcon /> },
  { id: 'profile', label: 'Profile', icon: <PersonOutlinedIcon />, activeIcon: <PersonIcon /> },
];

/**
 * MobileBottomNav — fixed bottom navigation with 6 visual variants.
 * All variants share the same props and behavior, only styling differs.
 */
export function MobileBottomNav({
  activeTab,
  onTabChange,
  variant = 'indicator',
  items = DEFAULT_ITEMS,
  sx,
}: MobileBottomNavProps): React.ReactElement {
  return (
    <Box
      sx={[
        {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          backgroundColor: tokens.colors.surface,
          borderTop: `1px solid ${tokens.colors.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: `${tokens.spacing.md}px`,
          zIndex: 1200,
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        ...(Array.isArray(sx) ? sx : [sx].filter(Boolean)),
      ]}
    >
      {items.map((item) => {
        const isActive = activeTab === item.id;
        const icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

        return (
          <NavItem
            key={item.id}
            item={item}
            icon={icon}
            isActive={isActive}
            variant={variant}
            onTap={() => onTabChange(item.id)}
          />
        );
      })}
    </Box>
  );
}

function NavItem({ item, icon, isActive, variant, onTap }: {
  item: MobileBottomNavItem;
  icon: React.ReactNode;
  isActive: boolean;
  variant: string;
  onTap: () => void;
}): React.ReactElement {
  const { green } = tokens.colors;
  const { textSecondary: grey } = tokens.colors;
  const activeColor = isActive ? green : grey;

  // ── Variant: m3 (Material 3 — pill behind icon) ──
  if (variant === 'm3') {
    return (
      <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1, gap: '4px', '&:active': { transform: 'scale(0.92)' } }}>
        <Box sx={{ width: 56, height: 32, borderRadius: `${tokens.radius.full}px`, bgcolor: isActive ? `${green}18` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeColor, transition: 'all 0.25s ease', '& svg': { fontSize: 22 } }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>
      </Box>
    );
  }

  // ── Variant: expansive (large rounded bg fills active) ──
  if (variant === 'expansive') {
    return (
      <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 1, gap: '2px', py: `${tokens.spacing.sm}px`, px: `${tokens.spacing.md}px`, borderRadius: `${tokens.radius.lg}px`, bgcolor: isActive ? green : 'transparent', color: isActive ? tokens.colors.white : grey, transition: 'all 0.25s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 22 } }}>
        {icon}
        <Typography sx={{ fontSize: 10, fontWeight: 700, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>
      </Box>
    );
  }

  // ── Variant: bubble (circular bg behind icon, label in chip below) ──
  if (variant === 'bubble') {
    return (
      <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1, gap: '4px', '&:active': { transform: 'scale(0.92)' } }}>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: isActive ? `${green}18` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeColor, transition: 'all 0.25s ease', '& svg': { fontSize: 22 } }}>
          {icon}
        </Box>
        {isActive && (
          <Box sx={{ bgcolor: `${green}12`, borderRadius: `${tokens.radius.full}px`, px: `${tokens.spacing.sm}px`, py: '2px' }}>
            <Typography sx={{ fontSize: 9, fontWeight: 700, color: green, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  // ── Variant: pill (tall rounded rect, icon + label vertically) ──
  if (variant === 'pill') {
    return (
      <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 1, gap: '2px', py: `${tokens.spacing.sm}px`, px: `${tokens.spacing.base}px`, borderRadius: `${tokens.radius.xl}px`, bgcolor: isActive ? `${green}14` : 'transparent', color: activeColor, transition: 'all 0.25s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 24 } }}>
        {icon}
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>
      </Box>
    );
  }

  // ── Variant: indicator (line below active — the reference #5) ──
  if (variant === 'indicator') {
    return (
      <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: 1, gap: '4px', position: 'relative', pt: '6px', '&:active': { transform: 'scale(0.92)' } }}>
        {/* Top indicator line */}
        <Box sx={{ position: 'absolute', top: 0, left: '25%', width: isActive ? '50%' : 0, height: 3, bgcolor: green, borderRadius: '0 0 3px 3px', transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
        <Box sx={{ color: activeColor, '& svg': { fontSize: 24 }, transition: 'color 0.2s' }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>
      </Box>
    );
  }

  // ── Variant: pill-horizontal (inline icon + label pill) ──
  return (
    <Box onClick={onTap} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: `${tokens.spacing.xs}px`, py: `${tokens.spacing.sm}px`, px: isActive ? `${tokens.spacing.lg}px` : `${tokens.spacing.md}px`, borderRadius: `${tokens.radius.full}px`, bgcolor: isActive ? `${green}14` : 'transparent', color: activeColor, transition: 'all 0.3s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 20 } }}>
      {icon}
      {isActive && <Typography sx={{ fontSize: 12, fontWeight: 700, color: green, fontFamily: tokens.typography.fontFamily }}>{item.label}</Typography>}
    </Box>
  );
}

export default MobileBottomNav;
