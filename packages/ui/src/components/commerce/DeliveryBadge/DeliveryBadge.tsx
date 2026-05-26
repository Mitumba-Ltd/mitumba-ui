import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { DeliveryBadgeProps } from './DeliveryBadge.types'

/**
 * Premium Delivery Status Badge.
 * Redefined by the benchmarked Chip rules.
 */
export function DeliveryBadge({ type, estimatedDays }: DeliveryBadgeProps) {
  const statusMap = {
    'same-city': 'active',
    'intercity': 'common',
  } as const

  return (
    <MitumbaChip
      label={estimatedDays || type}
      status={statusMap[type]}
      variant="soft"
      size="small"
      icon={<LocalShippingIcon />}
    />
  )
}

export default DeliveryBadge
