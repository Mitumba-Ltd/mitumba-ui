import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { tokens } from '@mitumba/tokens'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { ChipStatus } from '../../foundation/MitumbaChip/MitumbaChip.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { SemanticSurface } from '../../../internal/SemanticSurface'
import { SemanticTitle } from '../../../internal/SemanticTitle'
import type { OrderCardProps, OrderCardStatus } from './OrderCard.types'
import { formatMoney, useMitumbaFormat } from '../../../format'

const STATUS_CONFIG: Record<OrderCardStatus, { label: string; chipStatus: ChipStatus }> = {
  pending: { label: 'Pending', chipStatus: 'incomplete' },
  paid: { label: 'Paid', chipStatus: 'active' },
  confirmed: { label: 'Confirmed', chipStatus: 'active' },
  shipped: { label: 'Shipped', chipStatus: 'active' },
  delivered: { label: 'Delivered', chipStatus: 'success' },
  completed: { label: 'Completed', chipStatus: 'success' },
  cancelled: { label: 'Cancelled', chipStatus: 'danger' },
  disputed: { label: 'Disputed', chipStatus: 'danger' },
}

/** The most photos a card stacks. */
const MAX_STACK = 4
/** How far each photo behind the top one peeks out, in px. */
const STACK_OFFSET = 6
/** Tilt of each photo behind the top one, in degrees. */
const STACK_TILT = [0, 4, -3, 6]

function StackPhoto({ src, alt, index, count }: { src: string; alt: string; index: number; count: number }) {
  const [state, setState] = React.useState<'loading' | 'loaded' | 'failed'>('loading')
  const inset = (count - 1) * STACK_OFFSET
  return (
    <Box
      data-testid="order-card-photo"
      sx={{
        position: 'absolute',
        left: index * STACK_OFFSET,
        top: (count - 1 - index) * STACK_OFFSET,
        width: `calc(100% - ${inset}px)`,
        height: `calc(100% - ${inset}px)`,
        zIndex: count - index,
        transform: `rotate(${STACK_TILT[index]}deg)`,
        borderRadius: `${tokens.radius.md}px`,
        overflow: 'hidden',
        bgcolor: tokens.colors.background,
        border: count > 1 ? `2px solid ${tokens.colors.surface}` : 'none',
        boxShadow: count > 1 ? tokens.shadows.card : 'none',
      }}
    >
      {state === 'loading' && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, ${tokens.colors.background} 25%, ${tokens.colors.divider} 50%, ${tokens.colors.background} 75%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      )}
      {state !== 'failed' && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: state === 'loaded' ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
          }}
        />
      )}
    </Box>
  )
}

/** Up to four photos stacked like a small pile, the first item's on top. */
function PhotoStack({ photos, title }: { photos: readonly string[]; title: string }) {
  return (
    <Box
      sx={{
        width: { xs: 64, sm: 80 },
        height: { xs: 64, sm: 80 },
        flexShrink: 0,
        position: 'relative',
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }}
    >
      {photos.map((src, index) => (
        // Only the top photo is described: the others repeat the same order.
        // eslint-disable-next-line react/no-array-index-key -- a photo may repeat; its position is its identity
        <StackPhoto key={`${index}-${src}`} src={src} alt={index === 0 ? title : ''} index={index} count={photos.length} />
      ))}
    </Box>
  )
}

/**
 * OrderCard — compact order summary card for order history lists.
 * Matches CartItem design language: image left, details right, natural wrapping.
 */
export function OrderCard({
  orderShortId,
  title,
  imageUrl,
  images,
  itemCount,
  total,
  totalKes,
  deliveryFee,
  deliveryFeeKes,
  status,
  createdAt,
  onClick,
  onTrack,
  sx,
  titleLevel,
  href,
  linkComponent,
}: OrderCardProps) {
  const { money } = useMitumbaFormat()
  const fee = deliveryFee ?? deliveryFeeKes
  const config = STATUS_CONFIG[status]
  const isInteractive = Boolean(href) || Boolean(onClick)
  // There is a package to track only once the order has shipped.
  const showTrack = isInteractive && onTrack !== undefined && status === 'shipped'
  const photos = (images && images.length > 0 ? images : [imageUrl].filter((url): url is string => Boolean(url))).slice(0, MAX_STACK)
  const accessibleName = `Order #${orderShortId}, ${title}`

  return (
    <Box
      component="article"
      aria-label={accessibleName}
      sx={[
        {
          position: 'relative',
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          p: `${tokens.spacing.lg}px`,
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.divider}`,
          transition: tokens.motion.transitions.interaction,
          '&:hover': isInteractive ? {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadows.elevated,
          } : {},
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/*
        Stretched primary surface (anchor/button/none). Rendered as a sibling
        overlay so the nested Track action stays a valid, non-nested control.
      */}
      {isInteractive && (
        <SemanticSurface
          href={href}
          linkComponent={linkComponent}
          onClick={onClick}
          aria-label={accessibleName}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            p: 0,
            m: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            appearance: 'none',
            color: 'inherit',
            textDecoration: 'none',
          }}
        />
      )}

      {/* Image: one photo, or a stack of up to four with the first on top */}
      {photos.length > 0 && <PhotoStack photos={photos} title={title} />}

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, ml: photos.length > 0 ? `${tokens.spacing.base}px` : 0 }}>
        {/* Top row: order ID + status */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${tokens.spacing.sm}px`, mb: '4px' }}>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.bold,
              color: tokens.colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Order #{orderShortId}
          </Typography>
          <MitumbaChip
            label={config.label}
            status={config.chipStatus}
            size="small"
            variant="solid"
            rounding="pill"
          />
        </Box>

        {/* Title */}
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: '4px',
          }}
        >
          {title}
        </SemanticTitle>

        {/* Date, and how many items when more than one */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: `${tokens.spacing.sm}px` }}>
          {itemCount !== undefined && itemCount > 1 && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                fontWeight: tokens.typography.fontWeights.bold,
                color: tokens.colors.textSecondary,
              }}
            >
              {itemCount} items
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
            }}
          >
            {createdAt}
          </Typography>
        </Box>

        {/* Bottom row: price + delivery + action */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.lg}px`,
            flexWrap: 'wrap',
            mt: `${tokens.spacing.base}px`,
          }}
        >
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.md,
              fontWeight: 900,
              color: tokens.colors.textPrimary,
            }}
          >
            {formatMoney(total ?? totalKes ?? 0, money)}
          </Typography>

          {fee != null && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                color: tokens.colors.textSecondary,
              }}
            >
              +{formatMoney(fee, money)} delivery
            </Typography>
          )}

          {showTrack && (
            <Box
              onClick={(e) => { e.stopPropagation() }}
              sx={{ ml: 'auto', display: 'flex', gap: 0, position: 'relative', zIndex: 2 }}
            >
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MitumbaPrimaryButton
                  label="Track"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                  onClick={onTrack}
                />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MitumbaPrimaryButton
                  label="Track Package"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                  onClick={onTrack}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderCard
