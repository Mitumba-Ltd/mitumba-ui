export type BreadcrumbItem = {
  /** Display label. */
  label: string
  /** Optional href. If provided, renders as a link. */
  href?: string
}

export interface MitumbaBreadcrumbProps {
  /** Breadcrumb trail items. */
  items: BreadcrumbItem[]
}
