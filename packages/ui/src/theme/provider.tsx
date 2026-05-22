import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { mitumbaTheme } from './theme'

export interface MitumbaThemeProviderProps {
  /** Application or story content rendered inside the Mitumba theme. */
  children: ReactNode
  /** Disable CssBaseline when embedding inside an already-normalized host app. */
  disableCssBaseline?: boolean
}

export function MitumbaThemeProvider({
  children,
  disableCssBaseline = false,
}: MitumbaThemeProviderProps) {
  return (
    <ThemeProvider theme={mitumbaTheme}>
      {!disableCssBaseline && <CssBaseline />}
      {children}
    </ThemeProvider>
  )
}
