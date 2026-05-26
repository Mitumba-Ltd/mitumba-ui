import React from 'react'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { ConditionBadgeProps } from './ConditionBadge.types'

/**
 * Premium Listing Condition Badge.
 * Redefined by the benchmarked Chip rules.
 */
export function ConditionBadge({ grade, showLabel = false }: ConditionBadgeProps) {
  const gradeConfig = {
    A: { status: 'success', label: 'Like new' },
    B: { status: 'active', label: 'Good' },
    C: { status: 'incomplete', label: 'Fair' },
  } as const

  const config = gradeConfig[grade]

  return (
    <MitumbaChip
      label={showLabel ? `${grade} • ${config.label}` : grade}
      status={config.status}
      variant="solid"
      size="small"
      rounding="pill"
    />
  )
}

export default ConditionBadge
