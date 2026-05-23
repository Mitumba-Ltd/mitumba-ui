import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { MitumbaBreadcrumbProps } from './MitumbaBreadcrumb.types'

export function MitumbaBreadcrumb({ items }: MitumbaBreadcrumbProps) {
  return (
    <Breadcrumbs
      separator="›"
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: tokens.colors.textSecondary,
          fontWeight: tokens.typography.fontWeights.bold,
          mx: tokens.spacing.sm,
        },
        color: tokens.colors.textSecondary,
        fontSize: tokens.typography.fontSizes.sm,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast) {
          return (
            <Typography
              key={item.label}
              sx={{
                color: tokens.colors.textPrimary,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.semibold,
              }}
            >
              {item.label}
            </Typography>
          )
        }

        return item.href ? (
          <Link
            key={item.label}
            color="inherit"
            href={item.href}
            sx={{
              '&:hover': {
                color: tokens.colors.green,
              },
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.sm,
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ) : (
          <span key={item.label}>{item.label}</span>
        )
      })}
    </Breadcrumbs>
  )
}

export default MitumbaBreadcrumb
