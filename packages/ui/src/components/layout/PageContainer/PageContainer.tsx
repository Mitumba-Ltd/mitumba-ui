import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { PageContainerProps } from './PageContainer.types'

const maxWidthValues = {
  sm: 640,
  md: 900,
  lg: 1280,
  xl: 1536,
}

export function PageContainer({
  children,
  maxWidth = 'lg',
  noPadding = false,
}: PageContainerProps) {
  return (
    <Box
      sx={{
        mx: 'auto',
        maxWidth: maxWidthValues[maxWidth],
        px: noPadding
          ? 0
          : {
              xs: tokens.spacing.base,
              md: tokens.spacing.lg,
              lg: tokens.spacing.xl,
            },
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export default PageContainer
