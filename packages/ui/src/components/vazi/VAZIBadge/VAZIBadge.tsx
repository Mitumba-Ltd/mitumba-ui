import React from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { VAZIBadgeProps } from './VAZIBadge.types'

/**
 * Premium VAZI Status Badge.
 * Redefined by the benchmarked Chip rules.
 */
export function VAZIBadge({ size = 'small' }: VAZIBadgeProps) {
  return (
    <MitumbaChip
      label="VAZI Curation"
      status="special"
      variant="solid"
      size={size}
      icon={<AutoAwesomeIcon />}
      color="purple"
    />
  )
}

export default VAZIBadge
