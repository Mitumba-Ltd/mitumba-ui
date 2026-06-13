import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type BottomNavVariant = 'm3' | 'expansive' | 'bubble' | 'pill' | 'indicator' | 'pill-horizontal';

export interface MobileBottomNavItem {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Icon shown when inactive */
  icon: ReactNode;
  /** Icon shown when active (optional — uses icon if not provided) */
  activeIcon?: ReactNode;
}

export interface MobileBottomNavProps {
  /** Currently active tab ID */
  activeTab: string;
  /** Called when a tab is selected */
  onTabChange: (id: string) => void;
  /** Visual variant. Defaults to 'indicator'. */
  variant?: BottomNavVariant;
  /** Navigation items — defaults to Home, Search, VAZI, Orders, Profile */
  items?: MobileBottomNavItem[];
  /** Optional sx overrides */
  sx?: SxProps<Theme>;
}
