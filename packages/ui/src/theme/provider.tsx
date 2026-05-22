import type { ReactNode } from 'react'

export interface MitumbaThemeProviderProps {
  children: ReactNode
}

export function MitumbaThemeProvider({ children }: MitumbaThemeProviderProps) {
  return children
}
