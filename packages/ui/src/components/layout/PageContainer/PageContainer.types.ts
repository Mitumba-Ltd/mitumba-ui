import type { ReactNode } from 'react'

export interface PageContainerProps {
  /** Content rendered inside the container. */
  children: ReactNode
  /** Maximum width constraint. Defaults to 'lg'. */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  /** If true, removes horizontal padding. */
  noPadding?: boolean
}
