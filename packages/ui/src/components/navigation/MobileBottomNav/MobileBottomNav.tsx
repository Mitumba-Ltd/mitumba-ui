/* eslint-disable @typescript-eslint/no-use-before-define */
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
import type { BoxProps } from '@mui/material/Box';
import { tokens } from '@mitumba/tokens';
import type { MobileBottomNavProps, MobileBottomNavItem } from './MobileBottomNav.types';

const DEFAULT_ITEMS: MobileBottomNavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'vazi', label: 'VAZI', icon: <AutoAwesomeOutlinedIcon />, activeIcon: <AutoAwesomeIcon /> },
  { id: 'orders', label: 'Orders', icon: <LocalMallOutlinedIcon />, activeIcon: <LocalMallIcon /> },
  { id: 'profile', label: 'Profile', icon: <PersonOutlinedIcon />, activeIcon: <PersonIcon /> },
];

/** Base styles shared by every item surface so link/button reset cleanly. */
const RESET_SURFACE: BoxProps['sx'] = {
  appearance: 'none',
  border: 'none',
  background: 'transparent',
  font: 'inherit',
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  boxSizing: 'border-box',
};

/**
 * MobileBottomNav — fixed bottom navigation with 6 visual variants.
 * All variants share the same props and behavior, only styling differs.
 * The bar is a labelled <nav> landmark; each item is a native destination
 * (anchor when the item has an href, otherwise a button) so keyboard support
 * and `aria-current` come from the platform.
 */
export function MobileBottomNav({
  activeTab,
  onTabChange,
  variant = 'indicator',
  items = DEFAULT_ITEMS,
  ariaLabel = 'Primary',
  sx,
}: MobileBottomNavProps): React.ReactElement {
  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
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

function BadgeText({ count }: { count?: number }): React.ReactElement | null {
  if (!count || count <= 0) return null;
  return (
    <Box
      component="span"
      aria-hidden={false}
      sx={{
        position: 'absolute',
        top: 0,
        right: '20%',
        minWidth: 16,
        height: 16,
        px: '4px',
        borderRadius: `${tokens.radius.full}px`,
        bgcolor: tokens.colors.error,
        color: tokens.colors.white,
        fontSize: 9,
        fontWeight: 800,
        lineHeight: '16px',
        textAlign: 'center',
      }}
    >
      {count}
      <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {` unread`}
      </Box>
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
  const badge = <BadgeText count={item.badgeCount} />;

  // Accessible name folds in the badge count so it is announced.
  const accessibleName = item.badgeCount && item.badgeCount > 0 ? `${item.label}, ${item.badgeCount} unread` : item.label;
  // aria-current marks the active destination for assistive tech.
  const current: 'page' | undefined = isActive ? 'page' : undefined;

  let content: React.ReactNode;
  let containerSx: BoxProps['sx'];

  // ── Variant: m3 (Material 3 — pill behind icon) ──
  if (variant === 'm3') {
    containerSx = { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', position: 'relative', '&:active': { transform: 'scale(0.92)' } };
    content = (
      <>
        <Box sx={{ width: 56, height: 32, borderRadius: `${tokens.radius.full}px`, bgcolor: isActive ? `${green}18` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeColor, transition: 'all 0.25s ease', '& svg': { fontSize: 22 } }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor }}>{item.label}</Typography>
        {badge}
      </>
    );
  } else if (variant === 'expansive') {
    // ── Variant: expansive (large rounded bg fills active) ──
    containerSx = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '2px', position: 'relative', py: `${tokens.spacing.sm}px`, px: `${tokens.spacing.md}px`, borderRadius: `${tokens.radius.lg}px`, bgcolor: isActive ? green : 'transparent', color: isActive ? tokens.colors.white : grey, transition: 'all 0.25s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 22 } };
    content = (
      <>
        {icon}
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'inherit' }}>{item.label}</Typography>
        {badge}
      </>
    );
  } else if (variant === 'bubble') {
    // ── Variant: bubble (circular bg behind icon, label in chip below) ──
    containerSx = { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', position: 'relative', '&:active': { transform: 'scale(0.92)' } };
    content = (
      <>
        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: isActive ? `${green}18` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeColor, transition: 'all 0.25s ease', '& svg': { fontSize: 22 } }}>
          {icon}
        </Box>
        {isActive && (
          <Box sx={{ bgcolor: `${green}12`, borderRadius: `${tokens.radius.full}px`, px: `${tokens.spacing.sm}px`, py: '2px' }}>
            <Typography sx={{ fontSize: 9, fontWeight: 700, color: green }}>{item.label}</Typography>
          </Box>
        )}
        {badge}
      </>
    );
  } else if (variant === 'pill') {
    // ── Variant: pill (tall rounded rect, icon + label vertically) ──
    containerSx = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '2px', position: 'relative', py: `${tokens.spacing.sm}px`, px: `${tokens.spacing.base}px`, borderRadius: `${tokens.radius.xl}px`, bgcolor: isActive ? `${green}14` : 'transparent', color: activeColor, transition: 'all 0.25s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 24 } };
    content = (
      <>
        {icon}
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor }}>{item.label}</Typography>
        {badge}
      </>
    );
  } else if (variant === 'indicator') {
    // ── Variant: indicator (line below active — the reference #5) ──
    containerSx = { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', position: 'relative', pt: '6px', '&:active': { transform: 'scale(0.92)' } };
    content = (
      <>
        {/* Top indicator line */}
        <Box sx={{ position: 'absolute', top: 0, left: '25%', width: isActive ? '50%' : 0, height: 3, bgcolor: green, borderRadius: '0 0 3px 3px', transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
        <Box sx={{ color: activeColor, '& svg': { fontSize: 24 }, transition: 'color 0.2s' }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: activeColor }}>{item.label}</Typography>
        {badge}
      </>
    );
  } else {
    // ── Variant: pill-horizontal (inline icon + label pill) ──
    containerSx = { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: `${tokens.spacing.xs}px`, py: `${tokens.spacing.sm}px`, px: isActive ? `${tokens.spacing.lg}px` : `${tokens.spacing.md}px`, borderRadius: `${tokens.radius.full}px`, bgcolor: isActive ? `${green}14` : 'transparent', color: activeColor, transition: 'all 0.3s ease', '&:active': { transform: 'scale(0.92)' }, '& svg': { fontSize: 20 } };
    content = (
      <>
        {icon}
        {isActive && <Typography sx={{ fontSize: 12, fontWeight: 700, color: green }}>{item.label}</Typography>}
        {badge}
      </>
    );
  }

  const mergedSx: BoxProps['sx'] = { ...(RESET_SURFACE as object), ...(containerSx as object) };

  if (item.href) {
    const LinkComponent = item.linkComponent;
    if (LinkComponent) {
      return (
        <LinkComponent href={item.href}>
          <Box component="span" onClick={onTap} sx={mergedSx} aria-label={accessibleName} aria-current={current}>
            {content}
          </Box>
        </LinkComponent>
      );
    }
    return (
      <Box component="a" href={item.href} onClick={onTap} sx={mergedSx} aria-label={accessibleName} aria-current={current}>
        {content}
      </Box>
    );
  }

  return (
    <Box component="button" type="button" onClick={onTap} sx={mergedSx} aria-label={accessibleName} aria-current={current}>
      {content}
    </Box>
  );
}

export default MobileBottomNav;
