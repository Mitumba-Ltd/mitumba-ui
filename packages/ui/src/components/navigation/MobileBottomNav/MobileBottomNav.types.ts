import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { SemanticDestinationProps } from '../../../types/semantic';

export type BottomNavVariant = 'm3' | 'expansive' | 'bubble' | 'pill' | 'indicator' | 'pill-horizontal';

export interface MobileBottomNavItem extends SemanticDestinationProps {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Icon shown when inactive */
  icon: ReactNode;
  /** Icon shown when active (optional — uses icon if not provided) */
  activeIcon?: ReactNode;
  /**
   * Optional unread/notification count for this tab. When set (and > 0) a badge
   * is shown with accessible text (e.g. "3 unread") so it is announced.
   */
  badgeCount?: number;
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
  /**
   * Accessible label for the surrounding <nav> landmark.
   * @default 'Primary'
   */
  ariaLabel?: string;
  /** Optional sx overrides */
  sx?: SxProps<Theme>;
}
