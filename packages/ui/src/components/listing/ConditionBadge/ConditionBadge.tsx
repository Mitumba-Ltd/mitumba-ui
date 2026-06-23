import React from 'react'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { ChipStatus } from '../../foundation/MitumbaChip/MitumbaChip.types'
import type { ConditionBadgeProps } from './ConditionBadge.types'

const CONFIG: Record<string, { status: ChipStatus; label: string; short: string }> = {
  A: { status: 'success', label: 'Like New', short: 'A' },
  B: { status: 'active', label: 'Good', short: 'B' },
  C: { status: 'incomplete', label: 'Fair', short: 'C' },
  new: { status: 'success', label: 'New', short: 'New' },
  like_new: { status: 'success', label: 'Like New', short: 'Like New' },
  good: { status: 'active', label: 'Good', short: 'Good' },
  fair: { status: 'incomplete', label: 'Fair', short: 'Fair' },
}

/**
 * Condition badge — accepts grade (A/B/C) or condition string (new/like_new/good/fair).
 */
export function ConditionBadge({ grade, showLabel = false }: ConditionBadgeProps) {
  const config = CONFIG[grade] ?? CONFIG.C

  return (
    <MitumbaChip
      label={showLabel ? `${config.short} • ${config.label}` : config.short}
      status={config.status}
      variant="solid"
      size="small"
      rounding="pill"
    />
  )
}

export default ConditionBadge
